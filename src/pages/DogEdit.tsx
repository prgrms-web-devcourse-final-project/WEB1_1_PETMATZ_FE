import { useParams } from 'react-router-dom';
import Back from '@/assets/images/header/back.svg?react';
import { useFadeNavigate } from '@/hooks';
import { useState, useCallback, useEffect } from 'react';
import ImageSelectBox from '@/components/common/ImageSelectBox';
import { useCustomToast } from '@/hooks';
import { ToastAnchor } from '@/components/common';
import Loading from '@/components/common/Loading';

import {
    editDogProfileInfo,
    fetchDogsInfo,
    deleteDogInfo,
} from '@/hooks/api/dogInfo';
import { useUserStore } from '@/stores';

export default function DogEdit() {
    const { user } = useUserStore();
    const { dogId } = useParams<{ dogId: string }>();
    const [showModal, setShowModal] = useState(false);
    const { showToast } = useCustomToast();
    const navigate = useFadeNavigate();
    const [img, setImg] = useState<File | null>(null);

    const [petName, setPetName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('수컷');
    const [neuterYn, setNeuterYn] = useState('');
    const [size, setSize] = useState('');
    const [age, setAge] = useState(0);
    const [temperament, setTemperament] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [comment, setComment] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!dogId) {
            console.error('ID가 존재하지 않습니다.');
            return;
        }

        if (user) {
            const fetchDogProfile = async () => {
                const response = await fetchDogsInfo(user.id);
                if (response.ok) {
                    const profiles = response.data;

                    const profile = profiles?.find(
                        (dog: any) => dog.id === Number(dogId),
                    );

                    if (profile) {
                        setPetName(profile.dogNm || '');
                        setBreed(profile.kindNm || '');
                        setGender(profile.sexNm === 'FEMALE' ? '암컷' : '수컷');
                        setNeuterYn(profile.neuterYn || '');
                        setSize(profile.size || '');
                        setAge(profile.age || 0);
                        setTemperament(profile.temperament || '');
                        setProfileImg(profile.profileImg || '');
                        setComment(profile.comment || '');
                    } else {
                        console.error(
                            'ID와 일치하는 데이터를 찾을 수 없습니다.',
                        );
                    }
                    setIsLoading(false);
                } else {
                    console.error(
                        '강아지 프로필 정보를 가져오는데 실패했습니다:',
                        response.error,
                    );
                }
            };

            fetchDogProfile();
        } else {
            console.log('유저 정보를 확인하지 못했습니다.');
        }
    }, [dogId]);

    const handleDeletePost = useCallback(async () => {
        if (!dogId) {
            showToast('유효하지 않은 ID입니다.', 'warning');
            setShowModal(false); // 모달 닫기
            return;
        }

        try {
            const { ok, error } = await deleteDogInfo(Number(dogId));
            if (ok) {
                showToast(
                    '강아지 정보가 성공적으로 삭제되었습니다!',
                    'success',
                );
                setTimeout(() => {
                    navigate(-1);
                }, 3000);
            } else {
                showToast('해당 강아지 정보는 사용중입니다.', 'warning');
                console.error('삭제 실패:', error);
            }
            console.log(dogId);
        } catch (error) {
            showToast('삭제 요청 중 오류가 발생했습니다.', 'warning');
            console.error('삭제 중 에러 발생:', error);
        } finally {
            setShowModal(false); // 모달 닫기
        }
    }, [dogId, navigate, showToast]);

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const updateDogProfile = useCallback(async () => {
        if (!dogId) return;
        const id = Number(dogId);

        const response = await editDogProfileInfo(Number(id), {
            id,
            // dogRegNo,
            // ownerNm,
            petName,
            breed,
            gender,
            neuterYn,
            size,
            age,
            temperament,
            // preferredWalkingLocation,
            profileImg,
            comment,
        });

        if (response.ok) {
            showToast('강아지 정보가 수정되었습니다!', 'success');
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } else {
            console.log(response.error);

            showToast('강아지 정보 수정에 실패했습니다.', 'warning');
        }
    }, [
        dogId,
        petName,
        breed,
        gender,
        neuterYn,
        size,
        age,
        temperament,
        profileImg,
        comment,
        navigate,
        showToast,
    ]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <Loading />
            </div>
        );
    }

    return (
        <div className="h-screen bg-white flex flex-col overflow-y-auto">
            <header className="bg-white min-h-14 w-full flex items-center justify-center sticky top-0 z-50">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    멍멍이 정보 수정
                </h1>
            </header>

            <div className="flex flex-col px-6 py-4">
                <p className="text-title-s font-extrabold mb-6 text-gray-800">
                    <span className="text-point-500">{petName}</span>
                    의 정보를
                    <br /> 수정해주세요!
                </p>

                <div className="mb-6">
                    <ImageSelectBox
                        label="멍멍이 사진"
                        bottomSheetLabel="프로필 이미지 선택"
                        imgName={profileImg}
                        setImgName={setProfileImg}
                        setImg={setImg}
                    />
                </div>

                <div className="mb-6">
                    <label className="text-label-m font-normal text-gray-500 mb-2 block">
                        나이
                    </label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => {
                            const value = e.target.value;

                            // 값이 비어 있으면 0으로 설정, 최대 2자리 숫자까지만 허용
                            if (value === '') {
                                setAge(0);
                            } else if (Number(value) <= 20) {
                                setAge(Number(value));
                            }
                        }}
                        className="w-12 text-body-m font-normal text-gray-900 outline-none focus:ring-0 border border-gray-200 rounded-lg px-3 py-2.5 "
                    />
                </div>

                <div className="mb-4">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        중성화 여부
                    </p>
                    <div className="flex">
                        <div className="w-[170px] bg-gray-100 flex rounded-lg overflow-hidden">
                            <button
                                onClick={() => setNeuterYn('중성')}
                                className={`flex-1 px-[18px] py-1.5 rounded-lg transition-colors duration-300 ${
                                    neuterYn == '중성'
                                        ? 'bg-point-500 text-white '
                                        : 'text-gray-300 '
                                }  -mr-[5px]`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setNeuterYn('미중성')}
                                className={`flex-1 px-[18px] py-1.5 rounded-lg transition-colorsm duration-300 ${
                                    neuterYn == '미중성'
                                        ? 'bg-point-500 text-white '
                                        : 'text-gray-300 '
                                }  -ml-[5px]`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-[18px]">
                    <div className="mb-6">
                        <label className="text-label-m font-normal text-gray-500 mb-2 block">
                            멍멍이 크기
                        </label>
                        <div className="flex gap-2">
                            {['SMALL', 'MEDIUM', 'LARGE'].map((sizeOption) => (
                                <button
                                    key={sizeOption}
                                    onClick={() => setSize(sizeOption)}
                                    className={`px-[18px] py-1.5 rounded-lg border text-center transition-all duration-300 ${
                                        size === sizeOption
                                            ? 'bg-point-500 text-white border-point-500'
                                            : 'bg-white text-gray-300 border-gray-200'
                                    }`}
                                >
                                    {sizeOption === 'SMALL'
                                        ? '소형견'
                                        : sizeOption === 'MEDIUM'
                                          ? '중형견'
                                          : '대형견'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        멍멍이소개 (최대 50글자)
                    </p>
                    <textarea
                        placeholder="자기소개를 작성해주세요!"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-6 py-2.5 border border-gray-200 text-gray-900 rounded-lg"
                        maxLength={50}
                    />
                </div>
                <ToastAnchor>
                    <button
                        onClick={updateDogProfile}
                        className="w-full bg-point-500 text-white rounded-lg px-6 py-2.5 font-bold hover:bg-point-600"
                    >
                        수정 완료
                    </button>
                </ToastAnchor>
                <div className="flex justify-center items-center mt-12 mb-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex text-label-l w-24 text-gray-400 justify-center underline"
                    >
                        게시글 삭제
                    </button>
                </div>
            </div>

            {/* 모달 */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-72 h-36 flex flex-col justify-center items-center">
                        <h3 className="text-body-m mb-6">
                            멍멍이 정보를 삭제하시겠습니까?
                        </h3>
                        <div className="flex justify-between gap-4">
                            <button
                                className="px-6 py-2 bg-gray-200 rounded-lg text-gray-600"
                                onClick={() => setShowModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="px-6 py-2 bg-point-500 text-white rounded-lg"
                                onClick={handleDeletePost}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

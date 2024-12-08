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
import { httpForImage } from '@/hooks/api/base';
import { BaseApiResponse } from '@/types/baseResponse';

export default function DogEdit() {
    const { user } = useUserStore();
    const { dogId } = useParams();
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
            if (response.data.result.imgURL !== '') {
                const imgURL = response.data.result.imgURL;
                const imgFile = img!;
                const res = await httpForImage.put<BaseApiResponse, File>(
                    imgURL,
                    imgFile,
                );
                if (res.ok)
                    showToast('강아지 정보가 업데이트 되었습니다.', 'success');
                else {
                    showToast('이미지 업로드에 실패했습니다.', 'warning');
                }
            }

            showToast('강아지 정보가 업데이트 되었습니다.', 'success');
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } else {
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
            <div className="h-full flex items-center justify-center bg-white">
                <Loading />
            </div>
        );
    }

    return (
        <div className="h-full bg-white flex flex-col overflow-hidden">
            <header className="h-[56px] flex items-center justify-between px-[24px]">
                <Back onClick={handleBackBtn} className="cursor-pointer" />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    멍멍이 정보 수정
                </h1>
                <div className="w-[24px] h-[24px]"></div>
            </header>
            <main className="flex-1 flex flex-col px-6 py-4 overflow-y-auto gap-[16px]">
                <section className="flex-1 flex flex-col gap-[16px]">
                    <p className="text-title-s font-extrabold text-gray-800">
                        <span className="text-point-500">{petName}</span>
                        의 정보를
                        <br /> 수정해주세요!
                    </p>
                    <div>
                        <ImageSelectBox
                            label="멍멍이 사진"
                            bottomSheetLabel="프로필 이미지 선택"
                            imgName={profileImg}
                            setImgName={setProfileImg}
                            setImg={setImg}
                        />
                    </div>

                    <div>
                        <label className="text-label-m font-normal text-gray-500 mb-2 block">
                            나이
                        </label>
                        <div className="flex items-center">
                            <button
                                className="px-2 py-1.5 mr-2 bg-point-400 rounded-lg text-white hover:bg-point-400 active:bg-point-600 focus:outline-none"
                                onClick={() =>
                                    setAge((prev) => Math.max(prev - 1, 0))
                                } // 최소값 0 제한
                            >
                                -
                            </button>
                            <input
                                value={age === 0 ? 0 : age} // age가 0일 때 빈 문자열로 표시
                                onChange={(e) => {
                                    let value = e.target.value;

                                    if (value === '') {
                                        setAge(0);
                                    } else {
                                        const numericValue = Math.min(
                                            Number(value),
                                            20,
                                        ); // 최대값 20 제한
                                        setAge(numericValue);
                                    }
                                }}
                                className="w-12 text-body-m font-normal rounded-lg text-gray-900 outline-none focus:ring-0 border-t border-b border-gray-200 px-3 py-2.5 text-center"
                            />
                            <button
                                className="px-2 py-1.5 ml-2 bg-point-400 rounded-lg text-white hover:bg-point-400 active:bg-point-600 focus:outline-none"
                                onClick={() =>
                                    setAge((prev) => Math.min(prev + 1, 20))
                                } // 최대값 20 제한
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-label-m font-normal text-gray-500 mb-2">
                            중성화 여부
                        </p>
                        <div className="flex">
                            <div className="w-[170px] bg-gray-100 flex rounded-lg">
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
                    <div>
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
                    <div>
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
                </section>
                <ToastAnchor>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={updateDogProfile}
                            className="btn-solid"
                        >
                            수정 완료
                        </button>
                    </div>
                </ToastAnchor>
                <div className="flex justify-center items-center">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex text-label-l w-24 text-gray-400 justify-center underline"
                    >
                        게시글 삭제
                    </button>
                </div>
            </main>

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

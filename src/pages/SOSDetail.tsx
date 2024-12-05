import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '@/assets/images/header/back.svg?react';
import { useCallback } from 'react';
import { useFadeNavigate } from '@/hooks';
import ProfileImg from '@/assets/images/profile/profile1.svg?react';
import { DogCard, Loading } from '@/components/common';
import { getSOSDetails } from '@/hooks/api/sos';
import { SOSDetails } from '@/types/Sos';
import { useUserStore } from '@/stores';

export default function SOSDetail() {
    const navigate = useFadeNavigate();
    const { id } = useParams<{ id: string }>();
    const [sosDetails, setSOSDetails] = useState<SOSDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUserStore();

    const handleBackBtn = useCallback(() => {
        navigate('/sos');
    }, [navigate]);

    useEffect(() => {
        const fetchSOSDetails = async () => {
            const { ok, data, error } = await getSOSDetails(Number(id));

            if (ok) {
                if (data) {
                    setSOSDetails(data.result); // result가 있는 경우에만 상태 업데이트
                } else {
                    console.error('result가 없습니다.');
                }
            } else {
                console.error('API 요청 실패:', error);
            }
        };
        if (id) {
            fetchSOSDetails();
        }
        setLoading(false);
    }, [id]);

    if (loading || !sosDetails) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white">
                <div>
                    <Loading />
                    <button
                        onClick={handleBackBtn}
                        className="flex w-full items-center justify-center mt-3 text-gray-400 underline text-body-m"
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-y-auto h-full bg-white">
            <header className="h-[56px] w-full flex items-center justify-center sticky top-0 z-50">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    SOS 상세내용
                </h1>
            </header>
            <div className="p-6">
                <section className="mb-4">
                    <h2 className="text-title-s font-extrabold mb-4">
                        {sosDetails.title}
                    </h2>
                    <div className="w-full flex items-center p-2 rounded-md">
                        <ProfileImg className="w-14 h-14 border border-gray-200 rounded-full" />
                        <div className="ml-2">
                            <div className="flex mb-1">
                                <p className="text-body-l font-extrabold">
                                    {sosDetails.authorNickname}
                                </p>
                                <div
                                    className={`ml-2 px-2 rounded-lg ${sosDetails.authorGender === 'MALE' ? ' bg-point-500' : ' bg-pink-400'}`}
                                >
                                    <p className="text-label-l p-1 text-white">
                                        {sosDetails.authorGender === 'MALE'
                                            ? '남성'
                                            : '여성'}
                                    </p>
                                </div>
                            </div>
                            <p className="text-label-m text-gray-400">
                                {sosDetails.authorRegion}
                            </p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <textarea
                            name="comment"
                            className="pointer-events-none w-full rounded-lg bg-gray-100 border border-gray-100 p-2"
                            value={`안녕하세요`}
                            readOnly
                        />
                    </div>
                    <div className="mb-2">
                        <p className="text-label-m text-gray-500 mb-1">기간</p>
                        <p className="text-label-l font-extrabold text-gray-600">
                            {sosDetails.startDate}
                            <br />
                            {sosDetails.endDate}
                        </p>
                    </div>
                    <div>
                        <p className="text-label-m text-gray-500 mb-1">시급</p>
                        <p className="text-label-l font-extrabold text-gray-600">
                            {sosDetails.price}
                        </p>
                    </div>
                </section>
                <section>
                    <p className="text-label-m text-gray-500 mb-2">
                        강아지 정보
                    </p>
                    {sosDetails.pets.map((pet) => (
                        <DogCard
                            key={pet.id}
                            id={pet.id}
                            dogNm={pet.dogNm ?? ''}
                            sexNm={pet.sexNm === 'FEMALE' ? '암컷' : '수컷'}
                            kindNm={pet.kindNm ?? ''}
                            neuterYn={pet.neuterYn ?? ''}
                            profileImg={pet.profileImg ?? ''}
                            age={pet.age ?? 0}
                            temperament={pet.temperament ?? ''}
                            size={pet.size ?? ''}
                            comment={!!pet.comment}
                        />
                    ))}
                </section>
                {Number(user?.id) !== Number(sosDetails?.userId) && (
                    <button className="btn-solid my-6">채팅하기</button>
                )}
            </div>
        </div>
    );
}

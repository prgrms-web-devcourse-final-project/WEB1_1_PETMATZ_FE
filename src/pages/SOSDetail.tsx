import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '@/assets/images/header/back.svg?react';
import { useCallback } from 'react';
import { useFadeNavigate } from '@/hooks';
import { DogCard, Loading } from '@/components/common';
import { getSOSDetails, deleteSOSPost } from '@/hooks/api/sos';
import { SOSDetails } from '@/types/Sos';
import { useUserStore } from '@/stores';
import { createChatRoom } from '@/hooks/api/chat';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SampleNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next-arrow`}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev-arrow`}
            onClick={onClick}
        />
    );
};

// Slider 설정
const sliderSettings = {
    dots: true, // 하단 점 표시
    infinite: false, // 무한 슬라이드 비활성화
    speed: 500, // 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    arrows: true, // 좌우 화살표 표시
    className: 'dog-slider',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};

export default function SOSDetail() {
    const navigate = useFadeNavigate();
    const { id } = useParams<{ id: string }>();
    const [sosDetails, setSOSDetails] = useState<SOSDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUserStore();
    const [showModal, setShowModal] = useState(false);
    const handleBackBtn = useCallback(() => {
        navigate('/sos');
    }, [navigate]);

    const handleChatBtn = useCallback(async () => {
        const entrustedEmail = sosDetails!.accountId; // 상대방 이메일
        const caregiverEmail = user!.accountId; // 나의 이메일
        await createChatRoom({ entrustedEmail, caregiverEmail }).then(
            (response) => {
                if (response.ok) {
                    navigate(`/chat/${response.data.result}`);
                } else {
                    console.log(response.error?.msg);
                }
            },
        );
    }, [sosDetails, user]);

    const handleDeletePost = useCallback(async () => {
        if (id) {
            const { ok, error } = await deleteSOSPost(Number(id));
            if (ok) {
                navigate('/sos'); // 삭제 성공 시 목록으로 이동
            } else {
                console.error('삭제 실패:', error);
            }
        }
        setShowModal(false); // 모달 닫기
    }, [id, navigate]);

    useEffect(() => {
        const fetchSOSDetails = async () => {
            const { ok, data, error } = await getSOSDetails(Number(id));

            if (ok) {
                if (data) {
                    setSOSDetails(data.result);
                    console.log(data);
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
                        <div className="w-14 h-14 border border-gray-200 rounded-full">
                            <img
                                src={sosDetails.authorProfileImg}
                                alt="authorProfileImg"
                            />
                        </div>

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
                            className="pointer-events-none w-full text-label-l text-black font-bold rounded-lg bg-gray-100 border border-gray-200 p-2 mb-2"
                            value={sosDetails.comment}
                            readOnly
                        />
                    </div>
                    <div className="mb-2 flex justify-start ">
                        <p className="text-label-m text-gray-500 mb-1 mr-1">
                            작성일 :
                        </p>
                        <p className="text-label-m text-gray-500 pb-2">
                            {new Date(sosDetails.createdAt).toLocaleString(
                                'ko-KR',
                                {
                                    timeZone: 'Asia/Seoul',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                },
                            )}
                        </p>
                    </div>
                    <div className="flex flex-col mb-4">
                        <div>
                            <p className="text-label-m text-gray-500 mb-1">
                                기간
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex font-bold text-point-500 border border-point-500 p-2 rounded-lg">
                                <p className="text-label-l ">
                                    {new Date(
                                        sosDetails.startDate,
                                    ).toLocaleString('ko-KR', {
                                        timeZone: 'Asia/Seoul',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div className="text-point-500">~</div>
                            <div className="flex font-bold text-point-500 border border-point-500 p-2 rounded-lg">
                                <p className="text-label-l ">
                                    {new Date(
                                        sosDetails.endDate,
                                    ).toLocaleString('ko-KR', {
                                        timeZone: 'Asia/Seoul',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                        <p className="text-label-l font-bold text-point-500"></p>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <p className="text-label-m text-gray-500 mb-1">
                                {sosDetails.paymentType === 'HOURLY' && `시급`}
                                {sosDetails.paymentType === 'DAILY' && `일급`}
                                {sosDetails.paymentType === 'NEGOTIABLE' &&
                                    '금액 협의'}
                            </p>
                        </div>
                        {sosDetails.paymentType !== 'NEGOTIABLE' && (
                            <div className="flex w-fit font-bold text-point-500 border border-point-500 p-2 rounded-lg">
                                <p className="text-label-l font-bold text-point-500">
                                    {new Intl.NumberFormat('ko-KR').format(
                                        sosDetails.price,
                                    )}{' '}
                                    원
                                </p>
                            </div>
                        )}
                    </div>
                </section>
                <section>
                    <p className="text-label-m text-gray-500 mb-2">
                        강아지 정보
                    </p>
                    {sosDetails.pets.length === 1 ? (
                        // 강아지가 한 마리일 경우
                        <div className="px-2">
                            <DogCard
                                id={sosDetails.pets[0].id}
                                dogNm={sosDetails.pets[0].dogNm ?? ''}
                                sexNm={
                                    sosDetails.pets[0].sexNm === 'FEMALE'
                                        ? '암컷'
                                        : '수컷'
                                }
                                kindNm={sosDetails.pets[0].kindNm ?? ''}
                                neuterYn={sosDetails.pets[0].neuterYn ?? ''}
                                profileImg={sosDetails.pets[0].profileImg ?? ''}
                                age={sosDetails.pets[0].age ?? 0}
                                temperament={
                                    sosDetails.pets[0].temperament ?? ''
                                }
                                size={sosDetails.pets[0].size ?? ''}
                                comment={!!sosDetails.pets[0].comment}
                            />
                        </div>
                    ) : (
                        // 강아지가 여러 마리일 경우 슬라이더로 표시
                        <Slider {...sliderSettings}>
                            {sosDetails.pets.map((pet) => (
                                <div
                                    key={pet.id}
                                    className="px-2 flex justify-center items-center"
                                >
                                    <DogCard
                                        id={pet.id}
                                        dogNm={pet.dogNm ?? ''}
                                        sexNm={
                                            pet.sexNm === 'FEMALE'
                                                ? '암컷'
                                                : '수컷'
                                        }
                                        kindNm={pet.kindNm ?? ''}
                                        neuterYn={pet.neuterYn ?? ''}
                                        profileImg={pet.profileImg ?? ''}
                                        age={pet.age ?? 0}
                                        temperament={pet.temperament ?? ''}
                                        size={pet.size ?? ''}
                                        comment={false}
                                    />
                                </div>
                            ))}
                        </Slider>
                    )}
                </section>
                {user?.accountId !== sosDetails?.accountId && (
                    <button onClick={handleChatBtn} className="btn-solid mt-12">
                        채팅하기
                    </button>
                )}
                {user?.accountId == sosDetails?.accountId && (
                    <div className="flex justify-center items-center mt-12">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex text-label-l w-24 text-gray-400 justify-center underline"
                        >
                            게시글 삭제
                        </button>
                    </div>
                )}
            </div>
            {/* 모달 */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-72 h-36 flex flex-col justify-center items-center">
                        <h3 className="text-body-m mb-6">
                            게시글을 삭제하시겠습니까?
                        </h3>
                        <div className="flex justify-between gap-4">
                            <button
                                className="px-6 py-2 bg-gray-200 rounded-lg text-gray-600"
                                onClick={() => setShowModal(false)} // 취소
                            >
                                취소
                            </button>
                            <button
                                className="px-6 py-2 bg-point-500 text-white rounded-lg"
                                onClick={handleDeletePost} // 삭제
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '@/assets/images/header/back.svg?react';
import { useCallback } from 'react';
import { useFadeNavigate } from '@/hooks';
import { DogCard, Loading } from '@/components/common';
import { getSOSDetails, deleteSOSPost } from '@/hooks/api/sos';
import { SOSDetails } from '@/types/Sos';
import { useUserStore } from '@/stores';
import { createChatRoom } from '@/hooks/api/Chat';
import Slider from 'react-slick';
import { formatDateWithTime } from '@/utils';
import { PAYMENT_TYPE } from '@/constants/sos';

// CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// SVG
import LetterIcon from '@/assets/images/sos/letter.svg?react';
import CalendarIcon from '@/assets/images/sos/calender.svg?react';
import PencilIcon from '@/assets/images/sos/pencil.svg?react';

// Slider 설정
const sliderSettings = {
    dots: true, // 하단 점 표시
    infinite: false, // 무한 슬라이드 비활성화
    speed: 500, // 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    arrows: false, // 좌우 화살표 표시
    className: 'dog-slider',
    beforeChange: (_: number, next: number) => {
        const slides = document.querySelectorAll('.slick-slide');
        slides.forEach((slide, index) => {
            if (index === next) {
                slide.removeAttribute('inert');
            } else {
                slide.setAttribute('inert', 'true');
            }
        });
    },
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
        <div className="h-full bg-white overflow-hidden flex flex-col">
            <header className="h-[56px] flex items-center justify-between px-[24px]">
                <Back
                    onClick={handleBackBtn}
                    className="w-[24px] h-[24px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    도와줘 멍멍
                </h1>
                <div className="w-[24px] h-[24px]" />
            </header>
            <main className="px-[24px] flex flex-col overflow-y-auto flex-1 py-[10px]">
                {/* 유저 정보 */}
                <section className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                        <img
                            className="w-[40px] h-[40px] border-1 border-gray-200 rounded-full"
                            src={sosDetails.authorProfileImg}
                            alt="authorProfileImg"
                        />
                        <div className="flex items-center gap-[2px]">
                            <span className="text-gray-900 text-body-m font-extrabold">
                                {sosDetails.authorNickname}
                            </span>
                            <span
                                className={`text-white text-label-s py-[4px] px-[12px] h-[20px] font-semibold rounded-lg ${sosDetails.authorGender === 'MALE' ? 'bg-point-400' : 'bg-warning-200'}`}
                            >
                                {sosDetails.authorGender === 'MALE'
                                    ? '남성'
                                    : '여성'}
                            </span>
                        </div>
                    </div>
                    <span className="text-gray-400 text-label-l font-semibold">
                        {sosDetails.authorRegion}
                    </span>
                </section>
                {/* 타이틀 */}
                <section className="flex flex-col flex-1">
                    <h2 className="text-point-500 text-body-m font-extrabold flex items-center gap-[4px] py-[16px]">
                        <LetterIcon className="w-[20px] h-[20px]" />
                        <span>{sosDetails.title}</span>
                    </h2>
                    <div className="flex-1 flex flex-col border-t-2 border-point-500">
                        <div className="flex items-center gap-[4px] p-[8px] bg-point-50 border-b-1 border-point-200">
                            <CalendarIcon className="w-[20px] h-[20px]" />
                            <div className="flex flex-col text-gray-500 text-label-m">
                                <span>
                                    {formatDateWithTime(sosDetails.startDate)}
                                </span>
                                <span>
                                    {formatDateWithTime(sosDetails.endDate)}
                                </span>
                            </div>
                        </div>
                        <div className="text-label-m font-extrabold text-gray-500 px-[8px] py-[16px] bg-point-50 rounded-b-lg">
                            <span className="py-[2px] px-[8px] bg-gray-300 rounded-full">
                                {`${sosDetails.price ? `${sosDetails.price} / ` : ''}${PAYMENT_TYPE[sosDetails.paymentType]}`}
                            </span>
                        </div>
                        <div className="py-[16px]">
                            {sosDetails.pets.length === 1 ? (
                                // 강아지가 한 마리일 경우
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
                                    profileImg={
                                        sosDetails.pets[0].profileImg ?? ''
                                    }
                                    age={sosDetails.pets[0].age ?? 0}
                                    temperament={
                                        sosDetails.pets[0].temperament ?? ''
                                    }
                                    size={sosDetails.pets[0].size ?? ''}
                                    comment={
                                        sosDetails.pets[0].comment !== ''
                                            ? sosDetails.pets[0].comment
                                            : '멍멍이 소개가 없습니다.'
                                    }
                                    isComment={true}
                                />
                            ) : (
                                // 강아지가 여러 마리일 경우 슬라이더로 표시
                                <Slider {...sliderSettings}>
                                    {sosDetails.pets.map((pet) => (
                                        <div
                                            key={pet.id}
                                            className="flex justify-center items-center cursor-pointer py-[8px]"
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
                                                profileImg={
                                                    pet.profileImg ?? ''
                                                }
                                                age={pet.age ?? 0}
                                                temperament={
                                                    pet.temperament ?? ''
                                                }
                                                size={pet.size ?? ''}
                                                comment={
                                                    pet.comment !== ''
                                                        ? pet.comment
                                                        : '멍멍이 소개가 없습니다.'
                                                }
                                                isComment={true}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            )}
                        </div>
                        <div className="py-[16px] flex-1 flex flex-col">
                            <div className="text-label-l font-semibold border-none w-full flex-1">
                                {sosDetails.comment &&
                                    sosDetails.comment
                                        .split('\n')
                                        .map((line, idx) => (
                                            <React.Fragment key={idx}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex items-center justify-end text-gray-400 text-label-m py-[16px] gap-[4px]">
                    <PencilIcon className="w-[14px] h-[14px]" />
                    <span>{formatDateWithTime(sosDetails.createdAt)}</span>
                </div>
                {user?.accountId !== sosDetails?.accountId && (
                    <button
                        onClick={handleChatBtn}
                        className="btn-solid m-auto"
                    >
                        채팅하기
                    </button>
                )}
                {user?.accountId == sosDetails?.accountId && (
                    <div className="flex justify-center items-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex text-label-l w-full text-gray-400 justify-center underline"
                        >
                            게시글 삭제
                        </button>
                    </div>
                )}
            </main>
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

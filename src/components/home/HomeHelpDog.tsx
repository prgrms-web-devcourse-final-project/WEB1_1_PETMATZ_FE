import ArrowRight from '@/assets/images/arrow/arrowRight.svg?react';
import HelpDog from '@/assets/images/intro/helpDog.svg?react';
import Female from '@/assets/images/gender/female.svg?react';
import Male from '@/assets/images/gender/male.svg?react';
import { CustomToggle } from '../common';
import { useFadeNavigate } from '@/hooks';
import { useState, useCallback } from 'react';
import { MainPageMissionResponse, PetMissionResult } from '@/types/home';
import { useUserStore } from '@/stores';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface HomeHelpDogProps {
    missionData: MainPageMissionResponse | undefined;
}

export default function HomeHelpDog({ missionData }: HomeHelpDogProps) {
    const sliderSettings = {
        dots: true, // 하단 네비게이션 점 표시
        infinite: false, // 무한 슬라이드
        speed: 500, // 슬라이드 속도
        slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
        arrows: false, // 좌우 화살표 표시
    };
    const missionDataState = missionData?.data.result.length !== 0;

    const navigate = useFadeNavigate();

    const handleHelpBtn = useCallback(() => {
        navigate('/please');
    }, [navigate]);

    const handleSOSBtn = useCallback(() => {
        navigate('/sos');
    }, [navigate]);

    const handleToggleChange = (checked: boolean) => {
        setIsInfoTab(checked);
    };
    const { user } = useUserStore();
    const [isInfoTab, setIsInfoTab] = useState(true);

    const takenCareDogs: PetMissionResult[] =
        missionData?.data?.result?.filter(
            (item): item is PetMissionResult => item?.roleType === 'DOL',
        ) || [];

    const entrustedDogs: PetMissionResult[] =
        missionData?.data?.result?.filter(
            (item): item is PetMissionResult => item?.roleType === 'MAL',
        ) || [];

    return (
        <div className="w-full h-auto flex flex-col gap-6">
            {/* 상단 알림 */}
            <button onClick={handleHelpBtn}>
                {missionDataState ? (
                    <p className="flex justify-between text-label-m font-extrabold text-gray-700 px-[18px] py-3 bg-point-50 rounded-full rounded-bl-lg">
                        {user?.nickname}님은 현재 부탁을 진행하고 있어요!
                        <ArrowRight className="w-3 h-3" />
                    </p>
                ) : (
                    <p className="flex justify-between text-label-m font-extrabold text-gray-700 px-[18px] py-3 bg-point-50 rounded-full rounded-bl-lg">
                        {user?.nickname}님은 현재 진행중인 부탁 내용이 없습니다.
                        <ArrowRight className="w-3 h-3" />
                    </p>
                )}
            </button>

            {/* 상단 타이틀 */}

            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-body-xl font-extrabold text-gray-800">
                        부탁해 멍멍
                    </h2>
                    <button
                        onClick={handleHelpBtn}
                        className="text-label-m font-semibold text-gray-400"
                    >
                        더보기
                    </button>
                </div>

                {!missionDataState ? (
                    <div className="flex justify-between items-center w-full h-[153px] px-6 py-[18px] bg-white rounded-2xl mt-6">
                        <div>
                            <h2 className="text-body-l font-extrabold mb-2 text-gray-900">
                                아직 부탁을 주고 받은{<br />} 멍멍이가 없네요!
                            </h2>
                            <p className="text-label-m font-semibold text-gray-600 mb-[18px]">
                                멍멍이를 맡기거나 돌보러 가볼까요
                            </p>
                            <button
                                onClick={handleSOSBtn}
                                className="btn-solid h-[31px] w-[90px] text-label-m font-extrabold"
                            >
                                부탁보기
                            </button>
                        </div>
                        <HelpDog />
                    </div>
                ) : (
                    <>
                        <div>
                            {/* 토글 영역 */}
                            <div className="flex justify-center py-[18px]">
                                <CustomToggle
                                    name="pleaseTab"
                                    leftText="돌본 멍멍이"
                                    rightText="맡긴 멍멍이"
                                    onChange={handleToggleChange}
                                />
                            </div>
                            {/* 토글 상태에 따라 내용 변경 */}
                            <div>
                                {isInfoTab ? (
                                    <div className="flex flex-col gap rounded-lg">
                                        <Slider {...sliderSettings}>
                                            {takenCareDogs?.map(
                                                (dog: PetMissionResult) => (
                                                    <div
                                                        key={dog.petMissionId}
                                                        className="w-full flex flex-col gap-[2px] rounded-lg"
                                                    >
                                                        {/* 상단 반려견 정보 */}
                                                        <div className="flex gap-4 w-full h-[92px] px-6 py-[18px] bg-white rounded-t-2xl rounded-b-md items-center">
                                                            <div className="w-14 h-14 border border-gray-200 rounded-full overflow-hidden">
                                                                <img
                                                                    src={
                                                                        dog
                                                                            .petInfoList[0]
                                                                            ?.profileImg ||
                                                                        'default-image-url'
                                                                    }
                                                                    alt={
                                                                        dog
                                                                            .petInfoList[0]
                                                                            ?.petName
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center mb-2">
                                                                    <p className="text-body-l font-extrabold mr-0.5">
                                                                        {
                                                                            dog
                                                                                .petInfoList[0]
                                                                                ?.petName
                                                                        }
                                                                    </p>
                                                                    <div className="mr-2">
                                                                        {dog
                                                                            .petInfoList[0]
                                                                            ?.gender ===
                                                                        'MALE' ? (
                                                                            <Male className="w-6 h-6 text-point-500" />
                                                                        ) : (
                                                                            <Female className="w-6 h-6 text-warning-200" />
                                                                        )}
                                                                    </div>
                                                                    <p className="text-label-m font-semibold text-gray-400">
                                                                        {
                                                                            dog
                                                                                .petInfoList[0]
                                                                                ?.breed
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-1.5">
                                                                    <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                                                        {
                                                                            dog
                                                                                .petInfoList[0]
                                                                                ?.age
                                                                        }
                                                                        살
                                                                    </div>
                                                                    <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                                                        {dog
                                                                            .petInfoList[0]
                                                                            ?.temperament ||
                                                                            '성격'}
                                                                    </div>
                                                                    <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                                                        {dog
                                                                            .petInfoList[0]
                                                                            ?.neuterYn ||
                                                                            '중성화'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* 하단 부탁 리스트 */}
                                                        <div className="w-full h-[166px] px-6 py-[18px] bg-white rounded-b-2xl rounded-t-md mt-[2px]">
                                                            <p className="text-label-l font-semibold text-gray-900 mb-4">
                                                                댕댕이 부탁이{' '}
                                                                <span className="text-point-500">
                                                                    {
                                                                        dog
                                                                            .comment
                                                                            .length
                                                                    }
                                                                    개
                                                                </span>{' '}
                                                                남았어요!
                                                            </p>
                                                            <div className="w-full flex gap-2">
                                                                {dog.comment
                                                                    .slice(0, 2) // 최대 2개만 가져오기
                                                                    .map(
                                                                        (
                                                                            task,
                                                                            taskIndex,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    taskIndex
                                                                                }
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        `/please/${dog.petMissionId}`,
                                                                                    )
                                                                                }
                                                                                className="flex flex-col flex-1 px-[18px] py-3 bg-gray-100 w-fit rounded-lg mb-2"
                                                                            >
                                                                                <p className="text-label-s font-semibold text-gray-400 mb-1">
                                                                                    {`${taskIndex + 1}번째`}
                                                                                </p>
                                                                                <p className="h-[30px] text-label-m font-extrabold text-gray-900 mb-1">
                                                                                    {
                                                                                        task
                                                                                    }
                                                                                </p>
                                                                                <div className="flex justify-end">
                                                                                    <div
                                                                                        className={`bg-white px-2 py-1 rounded-[30px] text-center text-label-s font-extrabold ${
                                                                                            dog.status ===
                                                                                            'AFT'
                                                                                                ? 'text-point-300'
                                                                                                : 'text-point-500'
                                                                                        } w-fit`}
                                                                                    >
                                                                                        {dog.status ===
                                                                                        'AFT'
                                                                                            ? '등록완료'
                                                                                            : '등록하기'}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </Slider>
                                    </div>
                                ) : (
                                    <Slider {...sliderSettings}>
                                        {entrustedDogs?.map(
                                            (dog: PetMissionResult) => (
                                                <div
                                                    key={dog.petMissionId}
                                                    className="w-full flex flex-col gap-[2px] rounded-lg"
                                                >
                                                    {/* 상단 반려견 정보 */}
                                                    <div className="flex gap-4 w-full h-[92px] px-6 py-[18px] bg-white rounded-t-2xl rounded-b-md items-center">
                                                        <div className="w-14 h-14 border border-gray-200 rounded-full overflow-hidden">
                                                            <img
                                                                src={
                                                                    dog
                                                                        .petInfoList[0]
                                                                        ?.profileImg ||
                                                                    'default-image-url'
                                                                }
                                                                alt={
                                                                    dog
                                                                        .petInfoList[0]
                                                                        ?.petName
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center mb-2">
                                                                <p className="text-body-l font-extrabold mr-0.5">
                                                                    {
                                                                        dog
                                                                            .petInfoList[0]
                                                                            ?.petName
                                                                    }
                                                                </p>
                                                                <div className="mr-2">
                                                                    {dog
                                                                        .petInfoList[0]
                                                                        ?.gender ===
                                                                    'MALE' ? (
                                                                        <Male className="w-6 h-6 text-point-500" />
                                                                    ) : (
                                                                        <Female className="w-6 h-6 text-warning-200" />
                                                                    )}
                                                                </div>
                                                                <p className="text-label-m font-semibold text-gray-400">
                                                                    {
                                                                        dog
                                                                            .petInfoList[0]
                                                                            ?.breed
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-1.5">
                                                                <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                                                    {
                                                                        dog
                                                                            .petInfoList[0]
                                                                            ?.age
                                                                    }
                                                                    살
                                                                </div>
                                                                <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                                                    {dog
                                                                        .petInfoList[0]
                                                                        ?.temperament ||
                                                                        '성격'}
                                                                </div>
                                                                <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                                                    {dog
                                                                        .petInfoList[0]
                                                                        ?.neuterYn ||
                                                                        '중성화'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 하단 부탁 리스트 */}
                                                    <div className="w-full h-[166px] px-6 py-[18px] bg-white rounded-b-2xl rounded-t-md mt-[2px]">
                                                        <p className="text-label-l font-semibold text-gray-900 mb-4">
                                                            댕댕이 부탁이{' '}
                                                            <span className="text-point-500">
                                                                {
                                                                    dog.comment
                                                                        .length
                                                                }
                                                                개
                                                            </span>{' '}
                                                            남았어요!
                                                        </p>
                                                        <div className="w-full flex gap-2">
                                                            {dog.comment
                                                                .slice(0, 2) // 최대 2개만 가져오기
                                                                .map(
                                                                    (
                                                                        task,
                                                                        taskIndex,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                taskIndex
                                                                            }
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/please/${dog.petMissionId}`,
                                                                                )
                                                                            }
                                                                            className="flex flex-col flex-1 px-[18px] py-3 bg-gray-100 w-fit rounded-lg mb-2"
                                                                        >
                                                                            <p className="text-label-s font-semibold text-gray-400 mb-1">
                                                                                {`${taskIndex + 1}번째`}
                                                                            </p>
                                                                            <p className="h-[30px] text-label-m font-extrabold text-gray-900 mb-1">
                                                                                {
                                                                                    task
                                                                                }
                                                                            </p>
                                                                            <div className="flex justify-end">
                                                                                <div
                                                                                    className={`bg-white px-2 py-1 rounded-[30px] text-center text-label-s font-extrabold ${
                                                                                        dog.status ===
                                                                                        'AFT'
                                                                                            ? 'text-point-300'
                                                                                            : 'text-point-500'
                                                                                    } w-fit`}
                                                                                >
                                                                                    {dog.status ===
                                                                                    'AFT'
                                                                                        ? '등록완료'
                                                                                        : '등록하기'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ),
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </Slider>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center w-full h-[153px] px-6 py-[18px] bg-white rounded-2xl mt-8">
                            <div>
                                <h2 className="text-body-l font-extrabold mb-2 text-gray-900">
                                    다른 댕댕이도{<br />} 도움이 필요한 것
                                    같아요
                                </h2>
                                <p className="text-label-m font-semibold text-gray-600 mb-[18px]">
                                    도움이 필요한 댕댕이를 찾아봐요
                                </p>
                                <button
                                    onClick={handleSOSBtn}
                                    className="btn-solid h-[31px] w-[90px] text-label-m font-extrabold"
                                >
                                    부탁보기
                                </button>
                            </div>
                            <HelpDog />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

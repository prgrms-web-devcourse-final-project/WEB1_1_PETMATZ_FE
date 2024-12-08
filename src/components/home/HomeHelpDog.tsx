import ArrowRight from '@/assets/images/arrow/arrowRight.svg?react';
import HelpDog from '@/assets/images/intro/helpDog.svg?react';
import { CustomToggle } from '../common';
import { useState, useEffect } from 'react';
import { mainPageMission } from '@/hooks/api/home'; // API 호출 함수 가져오기
import { MainPageMissionResponse } from '@/types/home'; // 타입 가져오기

export default function HomeHelpDog() {
    const [isInfoTab, setIsInfoTab] = useState(true);
    const [missionData, setMissionData] =
        useState<MainPageMissionResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // API 호출
    useEffect(() => {
        const fetchMissionData = async () => {
            try {
                const data = await mainPageMission();
                console.log('data', data);

                setMissionData(data);
            } catch (err) {
                console.error('Error fetching mission data:', err);
                setError('미션 데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchMissionData();
    }, []);

    const handleToggleChange = (checked: boolean) => {
        setIsInfoTab(checked);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full h-auto border border-point-700 flex flex-col gap-6">
            {/* 상단 알림 */}
            <div>
                <p className="flex justify-between text-label-m font-extrabold text-gray-700 px-[18px] py-3 bg-point-50 rounded-full rounded-bl-lg">
                    님은 를 돌보고 있어요!
                    <ArrowRight className="w-3 h-3" />
                </p>
            </div>

            {/* 상단 타이틀 */}
            <div>
                <div className="flex justify-between items-center border border-point-600">
                    <h2 className="text-body-xl font-extrabold text-gray-800">
                        부탁해 멍멍
                    </h2>
                    <button className="text-label-m font-semibold text-gray-400">
                        더보기
                    </button>
                </div>

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
                <div className="">
                    {isInfoTab ? (
                        <div className="flex flex-col gap p-4 rounded-lg shadow gap-[2px]">
                            <div className="flex gap-4 w-full h-[92px] px-6 py-[18px] bg-white rounded-t-2xl items-center">
                                <div className="w-14 h-14 border border-gray-200 rounded-full"></div>
                                <div>
                                    <div className="flex items-center mb-2">
                                        <p className="text-body-l font-extrabold mr-0.5"></p>
                                        <div className="mr-2">성별</div>
                                        <p className="text-label-m font-semibold text-gray-400">
                                            포메라니안
                                        </p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="px-2 py-1 rounded-[30px] text-label-s font-extrabold text-gray-900 bg-gray-100">
                                            ENFP
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[166px] px-6 py-[18px] bg-white rounded-b-2xl">
                                <p className="text-label-l font-semibold text-gray-900 mb-4">
                                    댕댕이 부탁이{' '}
                                    <span className="text-point-500">3개</span>{' '}
                                    남았어요!
                                </p>
                                <div className="w-full">
                                    <div className="px-[18px] py-3 bg-gray-100 w-fit rounded-lg">
                                        <p className="text-label-s font-semibold text-gray-400 mb-1">
                                            첫번째
                                        </p>
                                        <p className="h-[30px] text-label-m font-extrabold text-gray-900 mb-1">
                                            호수공원 산책하기
                                        </p>
                                        <div className="flex justify-end">
                                            <div className="bg-white px-2 py-1 rounded-[30px] text-center text-label-s font-extrabold text-point-300 w-fit">
                                                등록완료
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap p-4 rounded-lg shadow gap-[2px]">
                            <div className="w-full h-[92px] px-6 py-[18px] bg-white  rounded-t-2xl">
                                <p className="text-label-m text-gray-600 mt-2">
                                    인절미는 포메라니안으로, 2살이고 성격이
                                    ENFP입니다. 중성화가 완료된 상태로, 소형견에
                                    속합니다.
                                </p>
                            </div>
                            <div className="w-full h-[166px] px-6 py-[18px] bg-white rounded-b-2xl">
                                <p>댕댕이 부탁이 3개 남았어요!</p>
                                <div>미션 카드 슬라이더</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 추가 섹션 */}
            <div className="flex justify-between items-center w-full h-[153px] px-6 py-[18px] bg-white rounded-2xl">
                <div>
                    <h2 className="text-body-l font-extrabold mb-2 text-gray-900">
                        다른 댕댕이도{<br />} 도움이 필요한 것 같아요
                    </h2>
                    <p className="text-label-m font-semibold text-gray-600 mb-[18px]">
                        도움이 필요한 댕댕이를 찾아봐요
                    </p>
                    <button className="btn-solid h-[31px] w-[90px] text-label-m font-extrabold">
                        부탁보기
                    </button>
                </div>
                <HelpDog />
            </div>
        </div>
    );
}

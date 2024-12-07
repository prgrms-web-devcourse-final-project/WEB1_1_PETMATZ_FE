import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useFadeNavigate, usePetMissionInfo } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Back from '@/assets/images/header/back.svg?react';
import { CustomToggle, Loading, ToastAnchor } from '@/components/common';
import DogInfoComponent from '@/components/please/DogInformation';
import RequestListComponent from '@/components/please/RequestList';
import { useUserStore } from '@/stores';

export default function PleaseDetail() {
    const { id } = useParams(); // 부탁에 대한 id
    const userId = useUserStore().user?.id; // userId
    // const { data: missionInfo, isLoading, error } = usePetMissionInfo(id!);
    const navigate = useFadeNavigate();
    const [isInfoTab, setIsInfoTab] = useState(true);
    // console.log(missionInfo?.result);
    const missionInfo = {
        result: {
            id: 1,
            careName: '파워', // 맡김이
            careId: 2,
            receiverName: 'gunwoo121112', // 돌봄이
            receiverId: 1,
            receiverStart: '2024-12-01T10:00:00',
            receiverEnd: '2024-12-01T12:00:00',
            petMissionPetInfos: [
                {
                    petName: '야호22',
                    breed: '페키니2즈',
                    age: 17,
                    gender: 'FEMALE' as 'FEMALE' | 'MALE',
                    neuterYn: '중성',
                    temperament: 'ENFP',
                    size: 'SMALL',
                    profileImg: 'https://cdn.pixabay.com/photo',
                },
            ],
            petMissionAskInfos: [
                {
                    id: null,
                    comment: null,
                    ask: 'Feed the dog',
                    imgURL: null,
                },
                {
                    id: null,
                    comment: null,
                    ask: 'Walk the dog',
                    imgURL: null,
                },
                {
                    id: null,
                    comment: null,
                    ask: 'Walk the dog',
                    imgURL: null,
                },
                {
                    id: null,
                    comment: null,
                    ask: 'Walk the dog',
                    imgURL: null,
                },
            ],
            status: 'INP' as 'BEF' | 'AFT' | 'INP',
        },
    };

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, []);

    const handleToggleChange = (checked: boolean) => {
        setIsInfoTab(checked);
    };

    const getButtonText = () => {
        switch (missionInfo?.result.status) {
            case 'BEF':
                return '멍멍이 돌봄 시작하기';
            case 'INP':
                return '돌봄 완료하기';
            case 'AFT':
                return '돌봄 완료';
            default:
                return '멍멍이 돌봄 시작하기';
        }
    };

    const isButtonDisabled = missionInfo?.result.status === 'AFT';

    // if (isLoading) return <Loading />;
    // if (error) return <div>에러가 발생했습니다.</div>;

    const pageVariants = {
        initial: {
            opacity: 0,
            x: isInfoTab ? -50 : 50,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            x: isInfoTab ? 50 : -50,
        },
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header - Fixed */}
            <header className="bg-white h-14 w-full flex items-center justify-center shrink-0">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    멍멍이의 부탁
                </h1>
            </header>

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-white flex-1 overflow-hidden flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto flex flex-col flex-1">
                        {/* Toggle - 스크롤 컨테이너 내에서 고정*/}
                        <div className="pt-6 flex justify-center shrink-0">
                            <CustomToggle
                                name="pleaseTab"
                                leftText="멍멍이 정보"
                                rightText="부탁 리스트"
                                onChange={handleToggleChange}
                            />
                        </div>

                        {/* Content - Scrollable */}
                        <AnimatePresence mode="wait">
                            {isInfoTab ? (
                                <motion.div
                                    key="info-tab"
                                    className="w-full"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageVariants}
                                    transition={{ duration: 0.3 }}
                                >
                                    {missionInfo && (
                                        <DogInfoComponent
                                            missionInfo={missionInfo.result}
                                            status={missionInfo.result.status}
                                        />
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="request-tab"
                                    className="w-full"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={pageVariants}
                                    transition={{ duration: 0.3 }}
                                >
                                    {missionInfo && (
                                        <RequestListComponent
                                            missionInfo={missionInfo.result}
                                            status={missionInfo.result.status}
                                            userId={userId}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Footer - Fixed */}
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto shrink-0">
                <ToastAnchor>
                    <button
                        type="submit"
                        className={`btn-solid ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isButtonDisabled}
                    >
                        {getButtonText()}
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

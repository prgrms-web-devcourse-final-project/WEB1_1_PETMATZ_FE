import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useFadeNavigate, usePetMissionInfo } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Back from '@/assets/images/header/back.svg?react';
import { CustomToggle, Loading, ToastAnchor } from '@/components/common';
import DogInfoComponent from '@/components/please/DogInformation';
import RequestListComponent from '@/components/please/RequestList';

export default function PleaseDetail() {
    const { id } = useParams();
    // const { data: missionInfo, isLoading, error } = usePetMissionInfo(id!);
    const navigate = useFadeNavigate();
    // console.log(missionInfo?.result);
    const missionInfo = {
        id: 1,
        careName: '파워', // 맡김이
        receiverName: 'gunwoo121112', // 돌봄이
        receiverStart: '2024-12-01T10:00:00',
        receiverEnd: '2024-12-01T12:00:00',
        petMissionPetInfos: [
            {
                petName: '야호22',
                breed: '페키니2즈',
                age: 17,
                gender: 'FEMALE',
                neuterYn: '중성',
                temperament: 'ENFP',
                size: 'SMALL',
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
        ],
    };

    // if (isLoading) return <Loading />;
    // if (error) return <div>에러가 발생했습니다.</div>;

    const [isInfoTab, setIsInfoTab] = useState(true);

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, []);

    const handleToggleChange = (checked: boolean) => {
        setIsInfoTab(checked);
    };

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
                                    <DogInfoComponent
                                        dogId={id}
                                        missionInfo={missionInfo}
                                    />
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
                                    <RequestListComponent dogId={id} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Footer - Fixed */}
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto shrink-0">
                <ToastAnchor>
                    <button type="submit" className="btn-solid">
                        멍멍이 돌봄 시작하기
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

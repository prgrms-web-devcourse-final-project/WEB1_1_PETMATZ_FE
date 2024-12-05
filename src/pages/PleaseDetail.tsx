import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useFadeNavigate } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Back from '@/assets/images/header/back.svg?react';
import { CustomToggle, ToastAnchor } from '@/components/common';
import DogInfoComponent from '@/components/please/DogInformation';
import RequestListComponent from '@/components/please/RequestList';

export default function PleaseDetail() {
    const { id } = useParams();
    const navigate = useFadeNavigate();

    const [isInfoTab, setIsInfoTab] = useState(true);

    const handleBackBtn = useCallback(() => {
        navigate('/');
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
        <div className="h-screen flex flex-col bg-gray-100">
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
                                    <DogInfoComponent dogId={id} />
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
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto shrink-0 bg-white">
                <ToastAnchor>
                    <button type="submit" className="btn-solid">
                        멍멍이 돌봄 시작하기
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

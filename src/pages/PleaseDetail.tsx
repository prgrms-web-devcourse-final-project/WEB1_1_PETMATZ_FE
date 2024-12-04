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

    // toggle 상태 관리
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

    // useEffect로 부탁 id에 해당하는 데이터를 불러와서 상세 페이지 구성

    return (
        <>
            <div className="h-screen bg-gray-100 flex flex-col justify-between overflow-hidden">
                <header className="bg-white h-14 w-full flex items-center justify-center">
                    <Back
                        onClick={handleBackBtn}
                        className="absolute left-[26px] cursor-pointer"
                    />
                    <h1 className="text-point-900 text-body-l font-extrabold">
                        멍멍이의 부탁
                    </h1>
                </header>
                <section className="flex-1 flex flex-col justify-start">
                    <div className="bg-white pt-6 pb-12 flex flex-col">
                        <div className="w-full max-w-[600px] px-6 mx-auto">
                            <div className="flex flex-col justify-center items-center">
                                <CustomToggle
                                    name="pleaseTab"
                                    leftText="멍멍이 정보"
                                    rightText="부탁 리스트"
                                    onChange={handleToggleChange}
                                />
                            </div>
                            {/* 조건부 렌더링 + dogId 전달 */}
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
                </section>
                <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                    <ToastAnchor>
                        <button type="submit" className="btn-solid">
                            멍멍이 돌봄 시작하기
                        </button>
                    </ToastAnchor>
                </footer>
            </div>
        </>
    );
}

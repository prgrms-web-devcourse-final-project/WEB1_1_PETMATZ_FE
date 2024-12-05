import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Arrow from '@/assets/images/arrow/arrowBig.svg?react';

interface Request {
    id: number;
    title: string;
}

export default function RequestListAccordion() {
    const [showMenu, setShowMenu] = useState(false);

    const requests: Request[] = [
        // 요청은 상단 페이지에서 불러올 예정
        { id: 1, title: '산책 부탁' },
        { id: 2, title: '급식 주기' },
        { id: 3, title: '약 먹이기' },
        { id: 4, title: '급식 주기' },
        { id: 5, title: '급식 주기' },
        { id: 6, title: '간식 주기' },
        { id: 7, title: '물 채우기' },
        { id: 8, title: '장난감 놀아주기' },
    ];

    const handleShowRequestsBtn = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    const handleRegisterRequest = useCallback(() => {
        console.log('부탁 등록');
    }, []);

    return (
        <div className="flex flex-col">
            <motion.div
                onClick={handleShowRequestsBtn}
                className="flex justify-between px-6 py-[12.5px] sm:!mt-2 !mt-0 text-body-m font-extrabold text-point-900 rounded-lg cursor-pointer bg-gray-100"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <span>부탁 목록 열기</span>
                <motion.div
                    animate={{ rotate: showMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Arrow className="text-gray-400" />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.3 },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.2 },
                            },
                        }}
                        className="overflow-hidden"
                    >
                        <div className="flex-1 mb-4">
                            <motion.div
                                className="flex flex-col gap-4 mt-4"
                                variants={{
                                    open: {
                                        transition: {
                                            staggerChildren: 0.07,
                                        },
                                    },
                                }}
                                initial="closed"
                                animate="open"
                            >
                                {requests.map((request, index) => (
                                    <motion.div
                                        key={request.id}
                                        className="bg-gray-100 rounded-lg px-4 py-3"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    type: 'spring',
                                                    stiffness: 300,
                                                    damping: 24,
                                                },
                                            },
                                            closed: {
                                                opacity: 0,
                                                y: 20,
                                            },
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="px-2 py-1 bg-white rounded-full w-fit mb-2">
                                            <h3 className="text-label-s font-extrabold text-point-500">
                                                {index + 1}번째 부탁
                                            </h3>
                                        </div>
                                        <div className="flex items-center px-2 py-1">
                                            <p className="flex-1 text-body-s font-semibold text-gray-900">
                                                <strong>{request.title}</strong>{' '}
                                            </p>
                                            <button
                                                onClick={handleRegisterRequest}
                                                className="text-label-m w-fit p-2 text-point-500 hover:bg-gray-200 rounded-lg transition-colors"
                                            >
                                                기록하기
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

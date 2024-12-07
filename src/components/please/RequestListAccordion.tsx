import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Arrow from '@/assets/images/arrow/arrowBig.svg?react';
import { Request, RequestListAccordionProps } from '@/types/please';
import MissionRecordModal from './MissionRecordModal';
import { getMissionAnswerInfo } from '@/hooks/api/please';

interface ModalState {
    isOpen: boolean;
    selectedRequest: Request | null;
    comment: string;
    imagePreview: string | null;
}

export default function RequestListAccordion({
    petMissionAskInfos,
    status,
    userId,
    receiverId,
}: RequestListAccordionProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [modalStates, setModalStates] = useState<Record<number, ModalState>>(
        {},
    );
    const [updatedRequests, setUpdatedRequests] = useState<Request[]>(
        petMissionAskInfos.map((ask) => ({
            id: ask.id,
            ask: ask.ask,
            comment: ask.comment || '',
            imgURL: ask.imgURL || null,
            isRegistered: Boolean(ask.comment || ask.imgURL),
        })),
    );

    const canRegister = status === 'INP' && userId === receiverId;

    const handleShowRequestsBtn = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    const handleRegisterRequest = useCallback((request: Request) => {
        setModalStates((prev) => ({
            ...prev,
            [request.id]: {
                isOpen: true,
                selectedRequest: request,
                comment: '',
                imagePreview: null,
            },
        }));
    }, []);

    // 개별 미션 정보를 업데이트하는 함수
    const updateSingleMission = async (askId: number) => {
        const response = await getMissionAnswerInfo(askId.toString());

        if (response.data) {
            setUpdatedRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req.id === askId
                        ? {
                              ...req,
                              comment: response.data.comment || '',
                              imgURL: response.data.imgURL || null,
                              isRegistered: true,
                          }
                        : req,
                ),
            );
        }
    };

    const handleCloseModal = useCallback(
        async (askId: number, shouldRefresh: boolean) => {
            setModalStates((prev) => ({
                ...prev,
                [askId]: {
                    isOpen: false,
                    selectedRequest: null,
                    comment: '',
                    imagePreview: null,
                },
            }));

            if (shouldRefresh) {
                // 즉시 해당 미션 정보를 업데이트
                await updateSingleMission(askId);
            }
        },
        [],
    );

    return (
        <div className="flex flex-col">
            <motion.div
                onClick={handleShowRequestsBtn}
                className="flex justify-between px-6 py-[12.5px] sm:!mt-2 !mt-0 mb-2 text-body-m font-extrabold text-point-900 rounded-lg cursor-pointer bg-gray-100"
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
                                        transition: { staggerChildren: 0.07 },
                                    },
                                }}
                                initial="closed"
                                animate="open"
                            >
                                {updatedRequests.map((request, index) => (
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
                                            closed: { opacity: 0, y: 20 },
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
                                                <strong>{request.ask}</strong>
                                            </p>
                                            {canRegister &&
                                                !request.isRegistered && (
                                                    <button
                                                        onClick={() =>
                                                            handleRegisterRequest(
                                                                request,
                                                            )
                                                        }
                                                        className="text-label-m w-fit p-2 text-point-500 hover:bg-gray-200 rounded-lg transition-colors"
                                                    >
                                                        기록하기
                                                    </button>
                                                )}
                                        </div>

                                        {(request.imgURL ||
                                            request.comment) && (
                                            <div className="mt-4 px-2 py-2 bg-white rounded-lg flex items-center gap-4">
                                                {request.imgURL && (
                                                    <div className="w-1/2 h-1/2 flex-shrink-0">
                                                        <img
                                                            src={request.imgURL}
                                                            alt="Mission record"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    </div>
                                                )}
                                                {request.comment && (
                                                    <p className="text-body-s text-gray-700 flex-1 line-clamp-3">
                                                        {request.comment}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {updatedRequests.map((request) => (
                <MissionRecordModal
                    key={request.id}
                    isOpen={modalStates[request.id]?.isOpen || false}
                    onClose={(shouldRefresh) =>
                        handleCloseModal(request.id, shouldRefresh)
                    }
                    askId={request.id}
                />
            ))}
        </div>
    );
}

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Arrow from '@/assets/images/arrow/arrowBig.svg?react';
import { Request, RequestListAccordionProps } from '@/types/please';
import MissionRecordModal from './MissionRecordModal';
import { getMissionAnswerInfo } from '@/hooks/api/please';
import { usePleaseStore } from '@/stores';
import { useParams } from 'react-router-dom';
interface ModalState {
    isOpen: boolean;
    selectedRequest: Request | null;
    comment: string | null;
    imagePreview: string | null;
}

export default function RequestListAccordion({
    petMissionAskInfos,
    status,
    userId,
    receiverId,
}: RequestListAccordionProps) {
    const { id: missionId } = useParams<{ id: string }>();
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
            isTemporarilyHidden: false,
        })),
    );

    const canRegister = status === 'INP' && userId === receiverId;

    const handleShowRequestsBtn = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    const handleRegisterRequest = useCallback((request: Request) => {
        if (!request.isRegistered) {
            // 모달 상태 설정
            setModalStates((prev) => ({
                ...prev,
                [request.id]: {
                    isOpen: true,
                    selectedRequest: request,
                    comment: null,
                    imagePreview: null,
                },
            }));
        }
    }, []);

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
                              isRegistered: Boolean(
                                  response.data.comment || response.data.imgURL,
                              ),
                          }
                        : req,
                ),
            );

            // 완료 상태 즉시 업데이트
            usePleaseStore
                .getState()
                .setMissionRequestCompletion(
                    Number(missionId),
                    askId,
                    Boolean(response.data.comment || response.data.imgURL),
                );
        }
    };

    const handleCloseModal = useCallback(
        async (askId: number, shouldRefresh: boolean = false) => {
            // 모달 상태 초기화
            setModalStates((prev) => ({
                ...prev,
                [askId]: {
                    isOpen: false,
                    selectedRequest: null,
                    comment: null,
                    imagePreview: null,
                },
            }));

            if (shouldRefresh) {
                // 등록 성공 시 업데이트
                await updateSingleMission(askId);

                // 요청의 실제 완료 상태를 기반으로 완료 여부 결정
                const response = await getMissionAnswerInfo(askId.toString());
                const isRequestCompleted = Boolean(
                    response.data?.comment || response.data?.imgURL,
                );

                // 완료 상태를 안전하게 업데이트
                usePleaseStore
                    .getState()
                    .setMissionRequestCompletion(
                        Number(missionId),
                        askId,
                        isRequestCompleted,
                    );
            }
        },
        [missionId],
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
                                                (!request.isRegistered ||
                                                    request.isTemporarilyHidden) && (
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
                                                    <p className="text-body-s text-gray-700 flex-1">
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
                    onClose={(shouldRefresh = false) =>
                        handleCloseModal(request.id, shouldRefresh === true)
                    }
                    askId={request.id}
                />
            ))}
        </div>
    );
}

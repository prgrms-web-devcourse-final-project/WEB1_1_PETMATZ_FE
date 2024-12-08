import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCustomToast, useFadeNavigate } from '@/hooks';
import {
    usePetMissionInfo,
    useMissionStatus,
    useTabState,
} from '@/hooks/please';
import { motion, AnimatePresence } from 'framer-motion';
import Back from '@/assets/images/header/back.svg?react';
import { CustomToggle, Loading, ToastAnchor } from '@/components/common';
import DogInfoComponent from '@/components/please/DogInformation';
import RequestListComponent from '@/components/please/RequestList';
import { usePleaseStore, useUserStore } from '@/stores';

export default function PleaseDetail() {
    const { id } = useParams(); // 부탁에 대한 id
    const userId = useUserStore().user?.id; // userId
    const { data: missionInfo, isLoading, error } = usePetMissionInfo(id!);
    const navigate = useFadeNavigate();
    const [isInfoTab, setIsInfoTab] = useTabState(id!);
    const { showToast } = useCustomToast();

    const {
        status: missionStatus,
        changeMissionStatus,
        updateInitialStatus,
    } = useMissionStatus(
        'BEF',
        Number(id)!,
        missionInfo?.result.careEmail || '',
        missionInfo?.result.receiverEmail || '',
    );

    // API 데이터 로딩 완료 시 상태 업데이트
    useEffect(() => {
        if (missionInfo?.result.status) {
            // API에서 받은 실제 미션 상태로 초기 상태 업데이트
            updateInitialStatus(missionInfo.result.status);

            // 실제 미션 요청 길이에 맞춰 초기화
            const requestCompletions = missionInfo.result.petMissionAskInfos
                .filter(
                    (ask) => ask.comment !== null && ask.comment !== undefined,
                )
                .map((ask) => (ask.comment ? true : false));

            usePleaseStore
                .getState()
                .initializeMissionRequests(Number(id), requestCompletions);
        }
    }, [missionInfo, id]);

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, []);

    const handleToggleChange = (checked: boolean) => {
        setIsInfoTab(checked);
    };

    const handleStatusChange = async () => {
        let targetStatus: 'BEF' | 'INP' | 'AFT';

        switch (missionStatus) {
            case 'BEF':
                targetStatus = 'INP';
                break;
            case 'INP':
                // Zustand Store를 통해 미션 완료 상태 체크
                const isAllRequestsCompleted = usePleaseStore
                    .getState()
                    .checkAllMissionRequestsCompleted(Number(id));

                if (!isAllRequestsCompleted) {
                    showToast('모든 돌봄 일지를 작성해주세요.', 'warning');
                    return;
                }

                targetStatus = 'AFT';
                break;
            default:
                return;
        }

        const success = await changeMissionStatus(targetStatus);

        if (!success) {
            showToast('상태 변경 중 오류가 발생했습니다.', 'warning');
        }
    };

    const getButtonText = () => {
        switch (missionStatus) {
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

    const isButtonDisabled = missionStatus === 'AFT';

    if (isLoading) return <Loading />;
    if (error) return <div>에러가 발생했습니다.</div>;

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
                                defaultChecked={isInfoTab}
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
                                            status={missionStatus}
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
                                            status={missionStatus}
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
                        onClick={handleStatusChange}
                    >
                        {getButtonText()}
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

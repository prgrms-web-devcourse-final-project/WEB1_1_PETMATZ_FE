import { create } from 'zustand';

type MissionStatus = 'BEF' | 'INP' | 'AFT';

interface PleaseState {
    missionStatuses: Record<number, MissionStatus>;
    completedMissions: Record<number, boolean[]>; // 각 미션의 요청별 완료 상태
    setMissionStatus: (missionId: number, status: MissionStatus) => void;
    getMissionStatus: (missionId: number) => MissionStatus | undefined;
    setMissionRequestCompletion: (
        missionId: number,
        requestId: number,
        isCompleted: boolean,
    ) => void;
    checkAllMissionRequestsCompleted: (missionId: number) => boolean;
    initializeMissionRequests: (
        missionId: number,
        requestCompletions: boolean[],
    ) => void;
}

export const usePleaseStore = create<PleaseState>((set, get) => ({
    missionStatuses: {},
    completedMissions: {},
    setMissionStatus: (missionId, status) =>
        set((state) => ({
            missionStatuses: {
                ...state.missionStatuses,
                [missionId]: status,
            },
        })),
    getMissionStatus: (missionId) => get().missionStatuses[missionId],

    // New method to initialize mission requests
    // initializeMissionRequests: (missionId, requestCompletions) =>
    //     set((state) => {
    //         // 기존 상태에서 해당 미션의 데이터를 완전히 제거
    //         const { [missionId]: removedMission, ...remainingMissions } =
    //             state.completedMissions;

    //         return {
    //             completedMissions: {
    //                 ...remainingMissions,
    //                 [missionId]: requestCompletions.map((completion) =>
    //                     completion === null ? false : completion,
    //                 ),
    //             },
    //         };
    //     }),
    initializeMissionRequests: (missionId, requestCompletions) =>
        set((state) => {
            console.log('Initializing Mission Requests:', {
                missionId,
                requestCompletions,
                currentState: state.completedMissions,
            });

            // 기존 상태에서 해당 미션의 데이터를 완전히 제거
            const { [missionId]: removedMission, ...remainingMissions } =
                state.completedMissions;

            const processedCompletions = requestCompletions.map((completion) =>
                completion === null ? false : completion,
            );

            console.log('Processed Completions:', processedCompletions);

            return {
                completedMissions: {
                    ...remainingMissions,
                    [missionId]: processedCompletions,
                },
            };
        }),

    setMissionRequestCompletion: (missionId, requestId, isCompleted) =>
        set((state) => {
            const currentCompletions = state.completedMissions[missionId] || [];
            const updatedCompletions = [...currentCompletions];
            updatedCompletions[requestId] = isCompleted;

            return {
                completedMissions: {
                    ...state.completedMissions,
                    [missionId]: updatedCompletions,
                },
            };
        }),

    // checkAllMissionRequestsCompleted: (missionId: number) => {
    //     const completedMissions = get().completedMissions;
    //     const missionRequests = completedMissions[missionId] || [];

    //     // 요청의 전체 길이와 실제 요청 길이를 고려
    //     const totalRequestSlots = missionRequests.length;

    //     // true 값만 있는 연속된 요청들의 끝 인덱스 찾기
    //     const lastTrueIndex = missionRequests.reduce(
    //         (max, current, index) => (current === true ? index : max),
    //         -1,
    //     );

    //     // 마지막 true 인덱스 이후의 요소들 확인
    //     const hasUncompletedRequestsAfterTrue = missionRequests
    //         .slice(lastTrueIndex + 1)
    //         .some((req) => req === false);

    //     // 로깅을 통해 상세 상태 확인
    //     console.log('Mission Requests:', missionRequests);
    //     console.log('Last True Index:', lastTrueIndex);
    //     console.log('Total Request Slots:', totalRequestSlots);
    //     console.log(
    //         'Has Uncompleted Requests:',
    //         hasUncompletedRequestsAfterTrue,
    //     );

    //     // 조건 1: true 값들이 연속되어 있고, 마지막 true 이후 false가 없어야 함
    //     const isFullyCompleted =
    //         lastTrueIndex === totalRequestSlots - 1 &&
    //         !hasUncompletedRequestsAfterTrue;

    //     return isFullyCompleted;
    // },
    checkAllMissionRequestsCompleted: (missionId: number) => {
        const completedMissions = get().completedMissions;
        const missionRequests = completedMissions[missionId] || [];

        // 불필요한 요소들 제거하고 실제 요청만 필터링
        const validRequests = missionRequests.filter(
            (request) => request !== undefined && request !== null,
        );

        const isFullyCompleted =
            validRequests.length > 0 &&
            validRequests.every((request) => request === true);

        console.log('Raw Mission Requests:', missionRequests);
        console.log('Valid Requests:', validRequests);
        console.log('Is Fully Completed:', isFullyCompleted);

        return isFullyCompleted;
    },
}));

export default usePleaseStore;

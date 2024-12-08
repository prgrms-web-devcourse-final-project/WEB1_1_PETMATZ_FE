import { create } from 'zustand';

type MissionStatus = 'BEF' | 'INP' | 'AFT';

interface PleaseState {
    missionStatuses: Record<number, MissionStatus>;
    setMissionStatus: (missionId: number, status: MissionStatus) => void;
    getMissionStatus: (missionId: number) => MissionStatus | undefined;
}

export const usePleaseStore = create<PleaseState>((set, get) => ({
    missionStatuses: {},
    setMissionStatus: (missionId, status) =>
        set((state) => ({
            missionStatuses: {
                ...state.missionStatuses,
                [missionId]: status,
            },
        })),
    getMissionStatus: (missionId) => get().missionStatuses[missionId],
}));

export default usePleaseStore;

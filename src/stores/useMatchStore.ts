import { getMatchList } from '@/hooks/api/match';
import { IMatch } from '@/types/match';
import { create } from 'zustand';

export interface MatchWidthColor extends IMatch {
    color?: string;
}

interface MatchStore {
    matchList: MatchWidthColor[];
    showStamp: boolean;
    removeMatch: (userId: number, otherId: number) => void;
    fetchMatchList: () => void;
    setShowStamp: (state: boolean) => void;
    curPage: number;
    totalPages: number;
    isLastPage: boolean;
    setIsLastPage: (state: boolean) => void;
    setCurPage: (state: number) => void;
}

const useMatchStore = create<MatchStore>((set, get) => ({
    matchList: [],
    showStamp: false,
    curPage: 0,
    totalPages: 1,
    isLastPage: false,

    setCurPage: (state: number) => set({ curPage: state }),

    setIsLastPage: (state) => {
        set({ isLastPage: state });
    },

    setShowStamp: (state) => set(() => ({ showStamp: state })),

    removeMatch: async (_, otherId) => {
        // 데이터가 없어서 API 호출 로직 주석처리
        // const { ok } = await postMatchFail({
        //     userId,
        //     targetUserId: otherId,
        // });

        // if (!ok) return;

        set((state) => ({
            matchList: state.matchList.filter(
                (otherUser) => otherUser.id !== otherId,
            ),
        }));
    },
    fetchMatchList: async () => {
        const { curPage, totalPages } = get();

        if (curPage >= totalPages) {
            set(() => ({ isLastPage: true }));
            return;
        }

        const { ok, data, error, status } = await getMatchList({
            page: curPage,
            size: 5,
        });

        if (!ok) {
            console.error(error?.status, error?.msg);
            return;
        }

        if (status === 204) {
            set(() => ({ isLastPage: true }));
            return;
        }

        if (data.matchResults.length < 5) {
            set(() => ({ isLastPage: true }));
        }

        const { matchResults, totalPages: newTotalPage } = data;

        if (matchResults.length > 0) {
            set((state) => ({
                matchList: matchResults.map((match, idx) => ({
                    ...match,
                    color: idx % 2 === 0 ? 'bg-white' : 'bg-point-50',
                })),
                curPage: state.curPage + 1,
                totalPages: newTotalPage,
            }));
        }
    },
}));

export default useMatchStore;

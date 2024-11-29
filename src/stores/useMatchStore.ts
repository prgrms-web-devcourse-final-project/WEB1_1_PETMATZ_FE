import { getMatchList, postMatchFail } from '@/hooks/api/match';
import { IMatch } from '@/types/match';
import { create } from 'zustand';

export interface MatchWidthColor extends IMatch {
    color?: string;
}

interface MatchStore {
    matchList: MatchWidthColor[];
    showStamp: boolean;
    removeMatch: (userId: number, otherId: number) => void;
    fetchMatchList: (userId: number) => void;
    setShowStamp: (state: boolean) => void;
    curPage: number;
    totalPages: number;
    isLastPage: boolean;
}

const useMatchStore = create<MatchStore>((set, get) => ({
    matchList: [],
    showStamp: false,
    curPage: 1,
    totalPages: 1,
    isLastPage: false,
    setShowStamp: (state) => set(() => ({ showStamp: state })),
    removeMatch: async (userId, otherId) => {
        const { ok } = await postMatchFail({
            userId,
            targetUserId: otherId,
        });

        if (!ok) return;

        set((state) => ({
            matchList: state.matchList.filter(
                (otherUser) => otherUser.id !== otherId,
            ),
        }));
    },
    fetchMatchList: async (userId) => {
        const { curPage, totalPages } = get();

        if (curPage > totalPages) {
            set(() => ({ isLastPage: true }));
            return;
        }

        const { ok, data, error, status } = await getMatchList({
            userId,
            page: curPage,
        });

        if (!ok) {
            console.error(error?.status, error?.msg);
            return;
        }

        if (status === 204) {
            set(() => ({ isLastPage: true }));
            return;
        }

        const { matchResults, totalPages: newTotalPage } = data.result;

        if (matchResults.length > 0) {
            set((state) => ({
                matchList: matchResults.map((match, idx) => ({
                    ...match,
                    color: idx % 2 === 0 ? 'bg-white' : 'bg-point-50',
                })),
                curPage: state.curPage,
                totalPages: newTotalPage,
            }));
        }
    },
}));

export default useMatchStore;

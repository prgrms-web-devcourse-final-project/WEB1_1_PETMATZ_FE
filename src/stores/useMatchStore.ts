import { Match } from '@/types/match';
import { create } from 'zustand';

interface MatchStore {
    matchList: Match[];
    removeMatch: (id: string) => void;
    fetchMatchList: () => void;
}

const useMatchStore = create<MatchStore>((set) => ({
    matchList: [
        {
            id: '1',
            nickname: '테스트1',
            introduction: '애견인입니다.',
            recommendationCount: 101,
            careCompletionCount: 105,
            latitude: 37.55258760777118,
            longitude: 126.97441248152484,
        },
        {
            id: '2',
            nickname: '테스트2',
            introduction: '애견인입니다.',
            recommendationCount: 101,
            careCompletionCount: 105,
            latitude: 37.55258760777118,
            longitude: 126.97441248152484,
        },
        {
            id: '3',
            nickname: '테스트3',
            introduction: '애견인입니다.',
            recommendationCount: 101,
            careCompletionCount: 105,
            latitude: 37.55258760777118,
            longitude: 126.97441248152484,
        },
        {
            id: '4',
            nickname: '테스트4',
            introduction: '애견인입니다.',
            recommendationCount: 101,
            careCompletionCount: 105,
            latitude: 37.55258760777118,
            longitude: 126.97441248152484,
        },
        {
            id: '5',
            nickname: '테스트5',
            introduction: '애견인입니다.',
            recommendationCount: 101,
            careCompletionCount: 105,
            latitude: 37.55258760777118,
            longitude: 126.97441248152484,
        },
    ],
    removeMatch: (id) =>
        set((state) => ({
            matchList: state.matchList.filter((match) => match.id !== id),
        })),
    fetchMatchList: () =>
        set(() => ({
            matchList: [
                {
                    id: '1',
                    nickname: '테스트1',
                    introduction: '애견인입니다.',
                    recommendationCount: 101,
                    careCompletionCount: 105,
                    latitude: 37.55258760777118,
                    longitude: 126.97441248152484,
                },
                {
                    id: '2',
                    nickname: '테스트2',
                    introduction: '애견인입니다.',
                    recommendationCount: 101,
                    careCompletionCount: 105,
                    latitude: 37.55258760777118,
                    longitude: 126.97441248152484,
                },
                {
                    id: '3',
                    nickname: '테스트3',
                    introduction: '애견인입니다.',
                    recommendationCount: 101,
                    careCompletionCount: 105,
                    latitude: 37.55258760777118,
                    longitude: 126.97441248152484,
                },
                {
                    id: '4',
                    nickname: '테스트4',
                    introduction: '애견인입니다.',
                    recommendationCount: 101,
                    careCompletionCount: 105,
                    latitude: 37.55258760777118,
                    longitude: 126.97441248152484,
                },
                {
                    id: '5',
                    nickname: '테스트5',
                    introduction: '애견인입니다.',
                    recommendationCount: 101,
                    careCompletionCount: 105,
                    latitude: 37.55258760777118,
                    longitude: 126.97441248152484,
                },
            ],
        })),
}));

export default useMatchStore;

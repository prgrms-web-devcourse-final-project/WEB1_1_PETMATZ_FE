import { getMySOSList, getSOSList } from '../api/sos';
import { useUserStore } from '@/stores';
import { useInfiniteQuery } from '@tanstack/react-query';

const useFetchSOSList = (activeTab: string) => {
    const { user } = useUserStore();

    const queryFn = async ({ pageParam = 1 }) => {
        if (!user) throw new Error('로그인된 사용자 정보가 없습니다.');

        if (activeTab === 'all')
            return getSOSList({ region: user.region, pageNum: pageParam });

        if (activeTab === 'user')
            return getMySOSList(user.nickname, { pageNum: pageParam });

        throw new Error('알 수 없는 탭 정보가 사용되었습니다.');
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['tabData', activeTab, user?.region, user?.nickname],
        queryFn,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.data.result;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    };
};

export default useFetchSOSList;

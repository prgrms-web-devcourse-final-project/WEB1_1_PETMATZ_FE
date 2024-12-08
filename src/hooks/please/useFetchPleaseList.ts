import { useQuery } from '@tanstack/react-query';
import { getPleaseList } from '@/hooks/api/please';
import { useUserStore } from '@/stores';

interface FetchPleaseListParams {
    activeTab: 'DOL' | 'MAL';
}

const useFetchPleaseList = ({ activeTab }: FetchPleaseListParams) => {
    const { user } = useUserStore();
    return useQuery({
        queryKey: ['pleaseList', activeTab, user?.id],
        queryFn: async () => {
            const res = await getPleaseList();
            const statusPriority = { INP: 0, BEF: 1, AFT: 2 };

            const filteredData = res.data.result.filter((item) =>
                item.petMissionUsers.some(
                    (userInfo) =>
                        userInfo.userId === user?.id &&
                        userInfo.roleType === activeTab,
                ),
            );

            const sortedData = filteredData.sort(
                (a, b) => statusPriority[a.status] - statusPriority[b.status],
            );

            return sortedData;
        },
        retry: 3,
        enabled: !!user,
    });
};

export default useFetchPleaseList;

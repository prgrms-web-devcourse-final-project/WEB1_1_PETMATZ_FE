import { useQuery } from '@tanstack/react-query';
import { getPleaseList } from '../api/please';
import { PleaseListApiResponse } from '@/types/please';

const useFetchPleaseList = () => {
    return useQuery<PleaseListApiResponse>({
        queryKey: ['pleaseList'],
        queryFn: getPleaseList,
        retry: 3,
    });
};

export default useFetchPleaseList;

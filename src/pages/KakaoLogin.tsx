import { Success } from '@/components/login';
import { useFadeNavigate } from '@/hooks';
import { getMyProfileInfo } from '@/hooks/api/user';
import { useUserStore } from '@/stores';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/common';
export default function KakaoLogin() {
    const navigate = useFadeNavigate();
    const { setUser } = useUserStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getMyProfileInfo();
            if (response.ok) {
                const { id, accountId, nickname, isRegistered, region } =
                    response.data;
                setUser({
                    id,
                    accountId,
                    nickname,
                    isRegistered,
                    region,
                });
                setLoading(true);
                const profile = response.data;
                console.log(profile);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                console.log('Failed to retrieve profile', response.error);
            }
        };

        fetchProfile();
    }, []);
    if (!loading) {
        return (
            <div className="bg-white h-full flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <Success />
        </div>
    );
}

import { getMyProfileInfo } from '@/hooks/api/profile';
import { useUserStore } from '@/stores';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthenticationProps {
    element: React.ReactNode;
    redirectTo?: string;
}

export default function AuthGuard({
    element,
    redirectTo,
}: AuthenticationProps) {
    const { user, setUser } = useUserStore();
    const navigate = useNavigate();

    const validationAuth = async () => {
        const { ok, data } = await getMyProfileInfo();

        if (!ok) {
            navigate(redirectTo || '/login');
        } else {
            const { id, accountId, nickname, isRegistered, region } = data;
            setUser({ id, accountId, nickname, isRegistered, region });
        }
    };

    useEffect(() => {
        if (!user) {
            validationAuth();
        }
    }, [user]);

    return element;
}

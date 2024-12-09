import { getMyProfileInfo } from '@/hooks/api/user';
import { useUserStore } from '@/stores';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface AuthenticationProps {
    element?: React.ReactNode;
    redirectTo?: string;
    children?: React.ReactNode;
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
            navigate(redirectTo || '/');
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

    return element || <Outlet />;
}

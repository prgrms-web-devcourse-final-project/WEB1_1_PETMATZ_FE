import Logo from '@/assets/images/header/logo.svg?react';
import SmallDog from '@/assets/images/login/smallDog.svg?react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useUserStore } from '@/stores';
import { useEffect, useState } from 'react';
import { getMyProfileInfo } from '@/hooks/api/user';
import { Loading } from '../common';

// 카카오 회원가입 성공시 화면
export default function Success() {
    const { user } = useUserStore();
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
        <div className="h-screen bg-white flex flex-col justify-between overflow-hidden">
            <header className="h-14 w-full flex items-center justify-center">
                <Logo />
            </header>
            <section className="bg-white flex-1 flex flex-col justify-center items-center mb-16">
                <DotLottieReact
                    src="https://lottie.host/0ec6bf75-6681-413d-8992-4aba08e67c7b/8PPFhpM9DL.lottie"
                    autoplay
                    style={{
                        position: 'absolute',
                        height: '202.26px',
                        width: '352px',
                        top: '24vh',
                    }}
                />
                <SmallDog className="mb-8 z-10" />
                <p className="text-body-s font-semibold text-gray-400 mb-2">
                    회원가입 완료
                </p>
                <div className="text-black text-body-xl font-extrabold text-center">
                    <p>
                        <span className="text-point-500">{user?.nickname}</span>
                        님,
                    </p>
                    <p>환영해요 멍멍!</p>
                </div>
            </section>
        </div>
    );
}

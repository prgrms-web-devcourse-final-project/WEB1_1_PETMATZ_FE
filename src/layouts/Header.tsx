import Logo from '@/assets/images/header/logo.svg?react';
import NotificationIcon from '@/assets/images/header/notification.svg?react';
import UserIcon from '@/assets/images/header/user.svg?react';
import { Dropdown } from '@/components/common';
import { useTitleStore, useUserStore } from '@/stores';
import { useFadeNavigate } from '@/hooks';

// SVG
import ExitIcon from '@/assets/images/header/exit.svg?react';
import ProfileIcon from '@/assets/images/header/profile.svg?react';
import HeartIcon from '@/assets/images/profile/heart.svg?react';

export default function Header() {
    const { title } = useTitleStore();
    const { user } = useUserStore();
    const navigate = useFadeNavigate();

    const handleClickLogout = () => {
        // 로그아웃 로직
    };

    return (
        <header className="flex items-center justify-between w-full p-4 text-gray-900 bg-white">
            <div className="w-[60px] h-6"></div>
            <h1 className="flex-1 flex items-center justify-center text-body-l font-extrabold text-point-900">
                {title ? title : <Logo className="cursor-pointer" />}
            </h1>
            <div className="flex items-center justify-between w-[60px] h-6">
                <NotificationIcon className="w-6 h-6 cursor-pointer" />
                <Dropdown
                    icon={<UserIcon className="w-6 h-6 cursor-pointer" />}
                >
                    <li
                        className="flex items-center py-[10px] px-[14px] gap-[8px] hover:bg-point-50 active:bg-point-50 rounded-t-lg"
                        onClick={() => navigate(`/${user?.id}`)}
                    >
                        <ProfileIcon className="w-[18px] h-[18px]" />
                        <span>내 정보</span>
                    </li>
                    <li
                        className="flex items-center py-[10px] px-[14px] gap-[8px] hover:bg-point-50 active:bg-point-50"
                        onClick={() => navigate('/like')}
                    >
                        <HeartIcon className="w-[18px] h-[18px] text-gray-900" />
                        <span>찜 목록</span>
                    </li>
                    <li
                        className="flex items-center py-[10px] px-[14px] gap-[8px] text-warning-400 hover:bg-warning-100 active:bg-warning-100 rounded-b-lg"
                        onClick={handleClickLogout}
                    >
                        <ExitIcon className="w-[18px] h-[18px]" />
                        <span>로그아웃</span>
                    </li>
                </Dropdown>
            </div>
        </header>
    );
}

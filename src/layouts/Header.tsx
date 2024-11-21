import Logo from '@/assets/images/header/logo.svg?react';
import NotificationIcon from '@/assets/images/header/notification.svg?react';
import UserIcon from '@/assets/images/header/user.svg?react';

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full p-4 text-gray-900">
            <div className="w-[60px] h-6"></div>
            <h1 className="flex-1 flex items-center justify-center">
                <Logo className="cursor-pointer" />
            </h1>
            <div className="flex items-center justify-between w-[60px] h-6">
                <NotificationIcon className="w-6 h-6 cursor-pointer" />
                <UserIcon className="w-6 h-6 cursor-pointer" />
            </div>
        </header>
    );
}

import LeftArrowIcon from '@/assets/images/leftArrow.svg?react';
import MenuDotsIcon from '@/assets/images/menuDots.svg?react';
import { useFadeNavigate } from '@/hooks';
import { IChatUserInfo } from '@/types/chat';
import { Dropdown } from '@/components/common';

interface ChatHeaderProps {
    user: IChatUserInfo | null;
}

export default function ChatHeader({ user }: ChatHeaderProps) {
    const navigate = useFadeNavigate();
    const dropdownItems = [
        { label: '채팅방 나가기', onClick: () => console.log('채팅방 나가기') },
    ];

    return (
        <div className="flex gap-4 px-4 items-center">
            <button onClick={() => navigate(-1)}>
                <LeftArrowIcon className="w-4 h-4 text-point-500" />
            </button>
            {user && (
                <div className="flex w-full items-center gap-4 px-2 py-3 text-gray-900">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                            <img
                                className="w-12 h-12"
                                src={user.profileImgUrl || ''}
                                alt={'사용자 프로필 이미지'}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex items-center py-2 h-14 overflow-hidden">
                        <div className="font-semibold text-lg">
                            {user.nickname}
                        </div>
                    </div>
                </div>
            )}
            <Dropdown
                title={<MenuDotsIcon className={`w-6 h-6 text-point-500`} />}
                items={dropdownItems}
            />
        </div>
    );
}

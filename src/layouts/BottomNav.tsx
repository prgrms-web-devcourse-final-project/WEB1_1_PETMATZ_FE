import ChatIcon from '@/assets/images/bottom-nav/chat.svg?react';
import HomeIcon from '@/assets/images/bottom-nav/home.svg?react';
import MatchIcon from '@/assets/images/bottom-nav/match.svg?react';
import PleaseIcon from '@/assets/images/bottom-nav/please.svg?react';
import SOSIcon from '@/assets/images/bottom-nav/sos.svg?react';
import { useFadeNavigate } from '@/hooks';
import { useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useFadeNavigate();
    const { pathname } = useLocation();

    const isAtive = (path: string) => pathname.startsWith(path);

    return (
        <nav className="flex items-center justify-around w-full text-gray-300">
            <MatchIcon
                onClick={() => navigate('/match')}
                className={`w-[75px] h-[48px] cursor-pointer ${isAtive('/match') && 'text-point-500'}`}
            />
            <ChatIcon
                onClick={() => navigate('/chat')}
                className={`w-[75px] h-[48px] cursor-pointer ${isAtive('/chat') && 'text-point-500'}`}
            />
            <HomeIcon
                onClick={() => navigate('/home')}
                className={`w-[75px] h-[48px] cursor-pointer ${isAtive('/home') && 'text-point-500'}`}
            />
            <PleaseIcon
                onClick={() => navigate('/please')}
                className={`w-[75px] h-[48px] cursor-pointer ${isAtive('/please') && 'text-point-500'}`}
            />
            <SOSIcon
                onClick={() => navigate('/sos')}
                className={`w-[75px] h-[48px] cursor-pointer ${isAtive('/sos') && 'text-point-500'}`}
            />
        </nav>
    );
}

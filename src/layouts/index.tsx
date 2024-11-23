import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

interface RootLayoutProps {
    header: boolean;
    bottomNav: boolean;
}

export default function RootLayout({ header, bottomNav }: RootLayoutProps) {
    return (
        <div className="h-screen relative max-w-[768px] min-w-[360px] bg-white mx-auto flex flex-col justify-center shadow-[0_7px_29px_0px_rgba(100,100,111,0.5)]">
            {header && <Header />}
            <main className="flex flex-col h-full overflow-hidden">
                <Outlet />
            </main>
            {bottomNav && <BottomNav />}
        </div>
    );
}

import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

interface RootLayoutProps {
    layout: boolean;
}

export default function RootLayout({ layout }: RootLayoutProps) {
    return (
        <div className="h-screen relative max-w-[768px] bg-white mx-auto flex flex-col justify-center">
            {layout && <Header />}
            <main className="flex flex-col h-full overflow-hidden">
                <Outlet />
            </main>
            {layout && <BottomNav />}
        </div>
    );
}

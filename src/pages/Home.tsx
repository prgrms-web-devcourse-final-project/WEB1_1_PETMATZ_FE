import { HomeSchedule } from '@/components/home';
import { HomeRanking } from '@/components/home';
import { HomeSOS } from '@/components/home';

export default function Home() {
    return (
        <div className="h-screen flex flex-col gap-2 overflow-y-auto">
            <HomeSchedule />
            <HomeRanking />
            <HomeSOS />
        </div>
    );
}

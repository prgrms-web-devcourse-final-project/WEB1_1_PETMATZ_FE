import { HomeHelpDog, HomeLike } from '@/components/home';
import { HomeRanking } from '@/components/home';
import { HomeSOS } from '@/components/home';

export default function Home() {
    return (
        <div className="bg-gray-100 h-screen flex flex-col gap-14 overflow-y-auto p-6">
            <HomeHelpDog />
            <HomeLike />
            <HomeRanking />
            <HomeSOS />
        </div>
    );
}

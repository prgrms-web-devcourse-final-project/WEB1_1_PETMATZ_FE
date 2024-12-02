import { DogCard } from '@/components/common';
import { HomeSchedule } from '@/components/home';
import { HomeRanking } from '@/components/home';
import { HomeSOS } from '@/components/home';

export default function Home() {
    return (
        <div className="h-screen flex flex-col gap-2 overflow-y-auto">
            <HomeSchedule />
            <HomeRanking />
            <DogCard
                id={5}
                dogNm="예삐"
                sexNm="암컷"
                kindNm="페키니즈"
                neuterYn="중성"
                profileImg="https://example.com/uploads/1478c76c-015f-48b2-9d25-2f80f7e242c5_06.png"
                age={7}
                temperament="ENTP"
                size="SMALL"
                comment={true}
                edit={true}
            />
            <HomeSOS />
        </div>
    );
}

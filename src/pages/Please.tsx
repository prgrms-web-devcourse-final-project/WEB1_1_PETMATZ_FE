import { Loading } from '@/components/common';
import { NonPlease, PleaseCard } from '@/components/please';
import PleaseTabMenu from '@/components/please/PleaseTabMenu';
import { pleaseTab } from '@/constants/please';
import { useFetchPleaseList } from '@/hooks/please';
import { useTitleStore, useUserStore } from '@/stores';
import { useEffect, useState } from 'react';

export default function Please() {
    const { setTitle } = useTitleStore();
    const { user } = useUserStore();
    const [activeTab, setActiveTab] = useState<'DOL' | 'MAL'>('MAL');
    const { data, isLoading } = useFetchPleaseList({
        activeTab,
    });

    useEffect(() => {
        setTitle('부탁해 멍멍');
    }, []);

    return (
        <div className="h-full bg-gray-100 overflow-y-auto flex flex-col">
            <PleaseTabMenu
                tabs={pleaseTab}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            {isLoading && <Loading />}
            {!isLoading && data && data.length === 0 && <NonPlease />}
            {!isLoading &&
                user &&
                data &&
                data.length > 0 &&
                data.map((item) => (
                    <PleaseCard
                        key={item.missionId}
                        item={item}
                        activeTab={activeTab}
                        userId={user.id}
                    />
                ))}
        </div>
    );
}

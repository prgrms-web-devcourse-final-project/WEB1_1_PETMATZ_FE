import { TabMenu } from '@/components/common';
import { pleaseTab } from '@/constants/please';
import { useFetchPleaseList } from '@/hooks/please';
import { useTitleStore } from '@/stores';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Please() {
    const navigate = useNavigate();
    const { setTitle } = useTitleStore();
    const [activeTab, setActiveTab] = useState('care');
    const { data, isLoading } = useFetchPleaseList();

    useEffect(() => {
        setTitle('부탁해 멍멍');
    }, []);

    console.log(data);

    return (
        <div className="h-full bg-gray-100 overflow-y-auto">
            <TabMenu
                tabs={pleaseTab}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
}

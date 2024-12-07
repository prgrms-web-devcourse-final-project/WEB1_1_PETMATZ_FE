import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SOSTabMenu from '@/components/sos/SOSTabMenu';
import useFetchSOSList from '@/hooks/sos/useFetchSOSList';
import { Loading } from '@/components/common';
import { SOSCard, SOSNonContent } from '@/components/sos';
import { useTitleStore } from '@/stores';

// SVG
import PencilIcon from '@/assets/images/sos/pencil.svg?react';

export default function SOS() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const { setTitle } = useTitleStore();
    const observerRef = useRef<HTMLDivElement | null>(null);

    const { data, fetchNextPage, hasNextPage, isLoading } =
        useFetchSOSList(activeTab);

    useEffect(() => {
        setTitle('도와줘 멍멍');
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 },
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasNextPage, fetchNextPage]);

    const isEmptyContent =
        !isLoading &&
        (!data ||
            data.pages.every((page) => page.data.result.content.length === 0));

    return (
        <div className="h-full bg-gray-100 overflow-y-auto">
            <SOSTabMenu activeTab={activeTab} onTabChange={setActiveTab} />
            {isLoading ? (
                <Loading />
            ) : isEmptyContent ? (
                <SOSNonContent />
            ) : (
                <>
                    {data?.pages.map((page, idx) => (
                        <div key={idx} className="divide-y-1 divide-point-100">
                            {page.data.result.content.map((item) => (
                                <SOSCard key={item.id} item={item} />
                            ))}
                        </div>
                    ))}
                    <div ref={observerRef} className="h-[0.5px]" />
                </>
            )}

            <div
                className="fixed bottom-[64px] right-[16px] flex items-center justify-center w-[70px] h-[70px] text-gray-100 rounded-full shadow-xl bg-point-300 opacity-75 cursor-pointer hover:opacity-100 active:opacity-100"
                onClick={() => navigate('/sos/write')}
            >
                <PencilIcon className="w-[35px] h-[35px]" />
            </div>
        </div>
    );
}

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabMenu from '@/components/common/TabMenu';
import useFetchSOSList from '@/hooks/sos/useFetchSOSList';
import { Loading } from '@/components/common';
import { SOSCard, SOSNonContent } from '@/components/sos';
import { useTitleStore } from '@/stores';
import { sosTabs } from '@/constants/sos';

// SVG
import PencilIcon from '@/assets/images/sos/pencil.svg?react';

export default function SOS() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const { setTitle } = useTitleStore();
    const observerRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조
    const [buttonPosition, setButtonPosition] = useState<number>(0);

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

    // 스크롤 위치 업데이트
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const scrollTop = scrollRef.current.scrollTop;
                setButtonPosition(scrollTop);
            }
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const isEmptyContent =
        !isLoading &&
        (!data ||
            data.pages.every((page) => page.data.result.content.length === 0));

    return (
        <div
            ref={scrollRef}
            className="relative h-full bg-gray-100 overflow-y-auto"
        >
            <TabMenu
                tabs={sosTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
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
                style={{
                    transform: `translateY(${buttonPosition}px)`,
                    transition: 'transform 0.2s ease',
                }}
                className="absolute bottom-[16px] right-[16px] flex items-center justify-center w-[70px] h-[70px] text-white rounded-full shadow-xl bg-point-500 opacity-75 cursor-pointer hover:opacity-100 active:opacity-100"
                onClick={() => navigate('/sos/write')}
            >
                <PencilIcon className="w-[35px] h-[35px]" />
            </div>
        </div>
    );
}

import ReactDOM from 'react-dom';
import { useMatchStore } from '@/stores';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IntroMatch, MatchCard } from '@/components/match';
import FetchMoreCard from '@/components/match/FetchMoreCard';

export default function Match() {
    const { matchList, removeMatch, fetchMatchList, setShowStamp } =
        useMatchStore();
    const [isModalOpen, setIsModalOpen] = useState(true);

    // 카드 관련 이벤트 핸들러
    const handleDragEnd = (id: string) => {
        removeMatch(id);
        setShowStamp(false);
    };
    const handleFetchMore = () => {
        fetchMatchList();
    };
    const handleOnClickBtn = () => {
        if (matchList.length > 0) setShowStamp(true);
    };

    // 인트로 관련 이벤트 핸들러
    const handleOnCloseIntro = () => {
        localStorage.setItem('skipMatchIntro', 'true');
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!(matchList.length > 0)) fetchMatchList();

        const skip = localStorage.getItem('skipMatchIntro');
        if (skip === 'true') {
            setIsModalOpen(false);
        }
    }, []);

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center gap-[120px] bg-gray-100">
                <div className="relative w-[240px] h-[400px] flex items-center justify-center">
                    <AnimatePresence>
                        {/* 가장 위 카드와 바로 아래 카드만 렌더링 */}
                        {matchList.slice(0, 3).map((card, index) => (
                            <MatchCard
                                key={card.id}
                                card={card}
                                index={index}
                                zIndex={matchList.length - index}
                                onDragEnd={handleDragEnd}
                            />
                        ))}

                        {/* 모든 카드가 사라지면 새로운 데이터를 요청하는 카드 표시 */}
                        {matchList.length === 0 && (
                            <FetchMoreCard onFetchMore={handleFetchMore} />
                        )}
                    </AnimatePresence>
                </div>
                <button
                    className="btn-solid max-w-[240px]"
                    onClick={handleOnClickBtn}
                    disabled={!(matchList.length > 0)}
                >
                    우리 멍멍이 부탁하기
                </button>
            </div>
            {isModalOpen &&
                ReactDOM.createPortal(
                    <IntroMatch onClose={handleOnCloseIntro} />,
                    document.body,
                )}
        </>
    );
}

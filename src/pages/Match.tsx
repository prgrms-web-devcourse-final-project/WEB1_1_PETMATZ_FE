import ReactDOM from 'react-dom';
import { useMatchStore, useTitleStore, useUserStore } from '@/stores';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IntroMatch, MatchCard, NoMoreCard } from '@/components/match';
import FetchMoreCard from '@/components/match/FetchMoreCard';
import { createChatRoom } from '@/hooks/api/Chat';
import { useFadeNavigate } from '@/hooks';

export default function Match() {
    const {
        matchList,
        removeMatch,
        fetchMatchList,
        setShowStamp,
        isLastPage,
        setIsLastPage,
        setCurPage,
    } = useMatchStore();
    const { user } = useUserStore();
    const { setTitle } = useTitleStore();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useFadeNavigate();

    // 카드 관련 이벤트 핸들러
    const handleDragEnd = (otherId: number) => {
        if (user) {
            removeMatch(user.id, otherId);
            setShowStamp(false);
        }
    };
    const handleFetchMore = () => {
        if (user) fetchMatchList(user.id);
    };
    const handleOnClickBtn = async () => {
        if (matchList.length > 0) {
            setShowStamp(true);

            if (user) {
                const { ok, data, error } = await createChatRoom({
                    entrustedEmail: matchList[0].accountId,
                    caregiverEmail: user.accountId,
                });

                if (!ok) {
                    console.error('채팅방 생성에 실패했습니다.', error?.msg);
                    return;
                }

                setTimeout(() => {
                    navigate(`/chat/${data.result}`);
                }, 300);
            }
        }
    };

    const handleOnClickResetBtn = () => {
        setIsLastPage(false);
        setCurPage(0);

        if (user) fetchMatchList(user.id);
    };

    // 인트로 관련 이벤트 핸들러
    const handleOnCloseIntro = () => {
        localStorage.setItem('skipMatchIntro', 'true');
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!(matchList.length > 0) && user) fetchMatchList(user.id);

        const skip = localStorage.getItem('skipMatchIntro');
        if (skip === 'true') {
            setIsModalOpen(false);
        }

        setTitle('돌봄 매칭');

        return () => {
            useMatchStore.setState({ isLastPage: false });
        };
    }, []);

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100 gap-[40px]">
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
                        {matchList.length === 0 && isLastPage && <NoMoreCard />}
                        {matchList.length === 0 && !isLastPage && (
                            <FetchMoreCard onFetchMore={handleFetchMore} />
                        )}
                    </AnimatePresence>
                </div>
                {!isLastPage && (
                    <button
                        className={`btn-solid max-w-[240px] ${(matchList.length === 0 || isLastPage) && 'active:scale-100'}`}
                        onClick={handleOnClickBtn}
                        disabled={matchList.length === 0 || isLastPage}
                    >
                        우리 멍멍이 부탁하기
                    </button>
                )}
                {isLastPage && (
                    <button
                        className={'btn-outline max-w-[240px]'}
                        onClick={handleOnClickResetBtn}
                    >
                        매칭 초기화 하기
                    </button>
                )}
            </div>
            {isModalOpen &&
                ReactDOM.createPortal(
                    <IntroMatch onClose={handleOnCloseIntro} />,
                    document.body,
                )}
        </>
    );
}

import { useMatchStore } from '@/stores';
import { motion, AnimatePresence } from 'framer-motion';

export default function Match() {
    const { matchList, removeMatch, fetchMatchList } = useMatchStore();

    const handleDragEnd = (id: string) => {
        removeMatch(id);
    };

    const handleFetchMore = () => {
        fetchMatchList();
    };

    return (
        <div className="relative h-screen flex items-center justify-center">
            <AnimatePresence>
                {/* 가장 위 카드와 바로 아래 카드만 렌더링 */}
                {matchList.slice(0, 2).map((card, index) => (
                    <motion.div
                        key={card.id}
                        className="absolute w-80 h-96 bg-white shadow-md rounded-xl flex items-center justify-center text-xl cursor-pointer"
                        drag={index === 0 ? 'y' : false} // 첫 번째 카드만 드래그 가능
                        dragConstraints={{ top: -300, bottom: 0 }}
                        onDragEnd={(event, info) => {
                            if (info.offset.y < -100 && index === 0)
                                handleDragEnd(card.id);
                        }}
                        style={{
                            zIndex: matchList.length - index,
                        }}
                        initial={{
                            scale: index === 0 ? 1 : 0.9, // 첫 번째 카드와 두 번째 카드의 크기 차이
                            y: index === 0 ? 0 : 50, // 두 번째 카드는 살짝 아래로 이동
                            opacity: 1,
                        }}
                        animate={{
                            scale: index === 0 ? 1 : 0.9,
                            y: index === 0 ? 0 : 50,
                            opacity: 1,
                        }}
                        exit={{
                            y: -200, // 첫 번째 카드가 위로 날아가며 사라짐
                            opacity: 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        {card.id}
                    </motion.div>
                ))}

                {/* 모든 카드가 사라지면 새로운 데이터를 요청하는 카드 표시 */}
                {matchList.length === 0 && (
                    <motion.div
                        className="absolute w-80 h-96 bg-gray-200 shadow-md rounded-xl flex items-center justify-center text-xl"
                        initial={{
                            scale: 0.9,
                            y: 50,
                            opacity: 1,
                        }}
                        animate={{
                            y: 0,
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <p>No more cards available.</p>
                            <button
                                onClick={handleFetchMore}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Fetch New Cards
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

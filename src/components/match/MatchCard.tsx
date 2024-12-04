import { motion } from 'framer-motion';
import useMatchStore, { MatchWidthColor } from '@/stores/useMatchStore';
import { useFadeNavigate } from '@/hooks';

// SVG
import ArrowRightIcon from '@/assets/images/arrow/arrowRight.svg?react';
import HeartIcon from '@/assets/images/match/heart.svg?react';
import GraphIcon from '@/assets/images/match/graph.svg?react';
import ProfileIcon from '@/assets/images/profile/profile1.svg?react';
import PawStampIcon from '@/assets/images/match/pawStamp.svg?react';

interface MatchCardProps {
    card: MatchWidthColor;
    index: number;
    zIndex: number;
    onDragEnd: (id: number) => void;
}

export default function MatchCard({
    card,
    index,
    zIndex,
    onDragEnd,
}: MatchCardProps) {
    const navigate = useFadeNavigate();
    const { showStamp } = useMatchStore();

    return (
        <motion.div
            key={card.id}
            className={`absolute w-[240px] h-[375px] px-[24.5px] py-[32px] ${card.color} shadow-md rounded-xl flex flex-col items-center justify-between text-xl cursor-pointer border-1 border-point-100`}
            drag={index === 0 ? 'y' : false} // 첫 번째 카드만 드래그 가능
            dragConstraints={{ top: -300, bottom: 0 }}
            onDragEnd={(_, info) => {
                if (info.offset.y < -100 && index === 0) onDragEnd(card.id);
            }}
            style={{
                zIndex,
            }}
            initial={{
                scale: index === 0 ? 1 : index === 1 ? 0.75 : 0.5, // 첫 번째 카드와 두 번째 카드의 크기 차이
                y: index === 0 ? 0 : index === 1 ? 65.5 : 130, // 두 번째, 세번째 카드는 살짝 아래로 이동
                opacity: 1,
            }}
            animate={{
                scale: index === 0 ? 1 : index === 1 ? 0.75 : 0.5,
                y: index === 0 ? 0 : index === 1 ? 65.5 : 130,
                opacity: 1,
            }}
            exit={{
                y: -200, // 첫 번째 카드가 위로 날아가며 사라짐
                opacity: 0,
            }}
            transition={{ duration: 0.5 }}
        >
            {showStamp && (
                <motion.div
                    className="absolute w-[87px] h-[90px] flex items-center justify-center z-50"
                    style={{
                        top: '61px',
                        right: '26px',
                    }}
                    initial={{ scale: 2, opacity: 0.7 }} // 크게 시작
                    animate={{ scale: 1, opacity: 1 }} // 원래 크기로 줄어듦
                    exit={{ opacity: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 10,
                        duration: 0.4,
                    }}
                >
                    <PawStampIcon className="w-[87px] h-[90px] text-point-500" />
                </motion.div>
            )}
            <div className="flex flex-col items-center justify-between h-full">
                <span className="py-[5.5px] px-[11px] rounded-full bg-gray-100 text-point-400 text-label-s">
                    {card.region}
                </span>
                <div className="px-[9px]">
                    <ProfileIcon className="w-[100px] h-[100px] border-1 border-gray-200 rounded-full" />
                </div>
                <div className="flex flex-col justify-center items-center gap-[24px] w-full">
                    <div
                        className="flex flex-col items-center justify-center w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center text-gray-900 text-body-l font-extrabold">
                            {card.nickname}
                        </div>
                        <div
                            className="flex items-center justify-between text-label-m text-point-400 cursor-pointer py-[8px] px-[12px] gap-[12px]"
                            onClick={() => navigate(`/profile/${card.id}`)}
                        >
                            프로필 방문
                            <ArrowRightIcon className="w-[14px] h-[14px]" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center justify-center px-[24px]">
                            <HeartIcon className="text-point-500" />
                            <span className="text-gray-500 text-label-s font-semibold">
                                추천수
                            </span>
                            <div className="text-gray-900 text-label-l font-extrabold">
                                {card.recommendationCount}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center px-[24px]">
                            <GraphIcon className="text-point-500" />
                            <span className="text-gray-500 text-label-s font-semibold">
                                돌봄등급
                            </span>
                            <div className="text-gray-900 text-label-l font-extrabold">
                                {card.careCompletionCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

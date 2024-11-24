import { motion } from 'framer-motion';

// SVG
import DogLargeIcon from '@/assets/images/dogs/dogLarge.svg?react';
import PlusIcon from '@/assets/images/match/plus.svg?react';

interface FetchMoreCardProps {
    onFetchMore: () => void;
}

export default function FetchMoreCard({ onFetchMore }: FetchMoreCardProps) {
    return (
        <motion.div
            onClick={onFetchMore}
            className="absolute w-[240px] h-[375px] bg-white shadow-md rounded-xl flex flex-col items-center justify-center gap-[32px] border-1 border-point-100 cursor-pointer hover:bg-point-50 active:bg-point-50"
            initial={{
                scale: 0.75,
                y: 65.5,
                opacity: 1,
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1,
            }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center justify-center w-[111.5px] gap-[8px]">
                <PlusIcon className="w-[48px] h-[48px] text-point-500" />
                <span className="text-center text-body-l font-extrabold">
                    새로운 돌봄이를 불러와요
                </span>
            </div>
            <DogLargeIcon className="w-[111.5px] h-[120px]" />
        </motion.div>
    );
}

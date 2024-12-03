import { motion } from 'framer-motion';

// SVG
import DogCryIcon from '@/assets/images/dogs/dogCry.svg?react';

export default function NoMoreCard() {
    return (
        <motion.div
            className="absolute w-[240px] h-[375px] bg-gray-200 shadow-md rounded-xl flex flex-col items-center justify-center gap-[32px] border-1 border-point-100 text-gray-400"
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
                <span className="text-center text-body-l font-extrabold">
                    매칭 가능한
                </span>
                <span className="text-center text-body-l font-extrabold">
                    돌봄이를
                </span>
                <span className="text-center text-body-l font-extrabold">
                    찾을 수 없어요.
                </span>
            </div>
            <DogCryIcon className="w-[111.5px] h-[120px]" />
        </motion.div>
    );
}

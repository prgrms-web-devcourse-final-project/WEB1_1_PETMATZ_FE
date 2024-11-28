import { motion } from 'framer-motion';
import LoadingDog from '@/assets/images/loadingDog.svg?react';
import Logo from '@/assets/images/header/logo.svg?react';

export default function Loading() {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, 0], // 각도를 변경하여 회전
                    }}
                    transition={{
                        duration: 2, // 애니메이션 지속 시간
                        repeat: Infinity, // 무한 반복
                        repeatType: 'loop', // 루프 형태
                    }}
                >
                    <LoadingDog />
                </motion.div>
                <div className="flex w-70 flex-col ml-2 justify-center items-center">
                    <Logo className="mt-4 w-56 h-6 mb-3 text-point-500" />
                    <p className="flex text-gray-400 text-body-m font-extrabold">
                        우리동네 멍멍이 돌보기
                    </p>
                </div>
            </div>
        </div>
    );
}

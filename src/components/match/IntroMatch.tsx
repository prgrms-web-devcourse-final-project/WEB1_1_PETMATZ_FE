import { motion } from 'framer-motion';

// SVG
import MatchIntroIcon from '@/assets/images/match/matchIntro.svg?react';
import MatchIntroBtnIcon from '@/assets/images/match/matchIntroBtn.svg?react';
interface IntroMatchProps {
    onClose: () => void;
}

export default function IntroMatch({ onClose }: IntroMatchProps) {
    return (
        <div
            onClick={onClose}
            className="fixed mx-auto inset-0 z-50 bg-dim opacity-90 flex flex-col justify-center items-center min-w-[360px] max-w-[768px] cursor-pointer gap-[82px]"
        >
            <motion.div
                className="w-[240px] h-[480px] flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
            >
                <MatchIntroIcon />
            </motion.div>

            <MatchIntroBtnIcon />
        </div>
    );
}

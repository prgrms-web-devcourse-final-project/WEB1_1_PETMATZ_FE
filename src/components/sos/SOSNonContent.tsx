import DogCryIcon from '@/assets/images/dogs/dogCry.svg?react';

export default function SOSNonContent() {
    return (
        <div className="h-full flex items-center justify-center bg-point-50">
            <div className="flex flex-col items-center justify-center gap-[8px]">
                <DogCryIcon />
                <span className="text-body-s font-semibold text-gray-400">
                    돌봄 글이 없습니다
                </span>
                <span className="text-body-xl font-extrabold text-gray-900">
                    SOS 돌봄을 요청해보세요!
                </span>
            </div>
        </div>
    );
}

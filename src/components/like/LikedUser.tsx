import Heart from '@/assets/images/profile/heart.svg?react';

export default function LikedUser() {
    return (
        <li className="w-full max-w-[600px] mx-auto px-6 py-[10px] border-b-2 border-gray-200 flex items-center gap-6">
            <div className="relative w-[75px] h-[75px] cursor-pointer">
                <img
                    src="/src/assets/images/profile/profile1.svg"
                    alt="프로필 이미지"
                    className="object-cover w-full h-full rounded-full border-1 border-gray-200"
                />
            </div>
            <section className="flex-1 flex flex-col justify-around gap-[10px]">
                <h2 className="text-gray-900 text-body-l font-extrabold">
                    <span className="cursor-pointer">닉네임</span>
                </h2>
                <div className="flex flex-wrap gap-[10px] text-label-m text-point-500 font-extrabold">
                    <span>#돌봄 불가능</span>
                    <span>#소형</span>
                    <span>#중형</span>
                    <span>#대형</span>
                </div>
            </section>
            <Heart className="cursor-pointer w-8 h-8 text-warning-200" />
        </li>
    );
}

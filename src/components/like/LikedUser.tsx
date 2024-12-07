import Heart from '@/assets/images/profile/heart.svg?react';
import Unheart from '@/assets/images/profile/unheart.svg?react';
import { useFadeNavigate } from '@/hooks';
import { postLikeProfile } from '@/hooks/api/user';
import type { LikedUser } from '@/types/user';
import { useCallback, useState } from 'react';

export default function LikedUser({
    myId,
    heartedId,
    nickname,
    profileImg,
    careAvailable,
    preferredSizes,
}: LikedUser) {
    const navigate = useFadeNavigate();
    const [like, setLike] = useState(true);

    const handleProfileBtn = useCallback(() => {
        navigate(`/profile/${heartedId}`);
    }, []);

    const handleLikeBtn = useCallback(async () => {
        await postLikeProfile({ heartedId }).then((response) => {
            if (response.ok) {
                setLike((prev) => !prev);
            } else {
                console.log(response.error?.msg);
            }
        });
    }, []);

    return (
        <li className="w-full max-w-[600px] mx-auto px-6 py-[10px] border-b-2 border-gray-200 flex items-center gap-6">
            <div
                onClick={handleProfileBtn}
                className="relative w-[75px] h-[75px] cursor-pointer"
            >
                <img
                    src={profileImg}
                    alt="프로필 이미지"
                    className="object-cover w-full h-full rounded-full border-1 border-gray-200"
                />
            </div>
            <section className="flex-1 flex flex-col justify-around gap-[10px]">
                <h2 className="text-gray-900 text-body-l font-extrabold">
                    <span onClick={handleProfileBtn} className="cursor-pointer">
                        {nickname}
                    </span>
                </h2>
                <div className="flex flex-wrap gap-[10px] text-label-m text-point-500 font-extrabold">
                    <span>#돌봄 {!careAvailable && '불'}가능</span>
                    {preferredSizes?.map((size, index) => (
                        <span key={`${myId}-${heartedId}-${index}`}>
                            #
                            {size === 'SMALL'
                                ? '소형'
                                : size === 'MEDIUM'
                                  ? '중형'
                                  : '대형'}
                        </span>
                    ))}
                </div>
            </section>
            {like ? (
                <Heart
                    onClick={handleLikeBtn}
                    className="cursor-pointer w-8 h-8 text-warning-200"
                />
            ) : (
                <Unheart
                    onClick={handleLikeBtn}
                    className="cursor-pointer w-8 h-8 text-warning-200"
                />
            )}
        </li>
    );
}

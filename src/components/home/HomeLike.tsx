import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';
import { HomeLikeProps } from '@/types/home';

export default function HomeLike({ likedListData }: HomeLikeProps) {
    const navigate = useFadeNavigate();

    // "더보기" 버튼 클릭 시 전체 찜한 돌봄이 리스트로 이동
    const handleMoreClick = () => {
        navigate('/like');
    };

    // 돌봄이 찾기 플러스 클릭시 매칭으로 이동
    const handleMatchClick = () => {
        navigate('/match');
    };

    // 프로필 클릭 시 이동
    const handleProfileClick = useCallback(
        (heartedId: number) => {
            navigate(`/profile/${heartedId}`); // heartedId로 이동
        },
        [navigate],
    );

    const lastFourHeartedUsers = likedListData?.data.heartedUsers.slice(-4);

    return (
        <div className="bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-body-xl font-extrabold text-gray-800">
                    최근에 찜한 돌봄이
                </h2>
                <button
                    className="text-label-m font-semibold text-gray-400"
                    onClick={handleMoreClick}
                >
                    더보기
                </button>
            </div>
            <div className="flex justify-start space-x-5 px-6">
                {lastFourHeartedUsers && lastFourHeartedUsers.length > 0 ? (
                    lastFourHeartedUsers.map((heartedUser, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center cursor-pointer"
                            onClick={() =>
                                handleProfileClick(heartedUser.heartedId)
                            }
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                                    <img
                                        src={heartedUser.profileImg}
                                        alt={heartedUser.nickname}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="mt-2 text-label-s font-semibold text-gray-900 truncate w-14 text-center">
                                    {heartedUser.nickname}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center text-center cursor-pointer">
                        <div
                            onClick={handleMatchClick}
                            className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100"
                        >
                            <span className="text-2xl font-bold text-gray-500">
                                +
                            </span>
                        </div>
                        <span className="mt-2 text-label-s font-semibold text-gray-900 truncate w-14 text-center">
                            돌봄이 찾기
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

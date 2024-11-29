import ArrowRight from '@/assets/images/intro/arrowRight.svg?react';
import Profile2 from '@/assets/images/profile/profile2.svg?react';
import { useFadeNavigate } from '@/hooks';

export default function HomeSOS() {
    const navigate = useFadeNavigate();
    const pets = [
        {
            name: '인절미',
            gender: '♂',
            breed: '골든리트리버',
            tags: ['ENFP', '4살', '대형견'],
        },
        {
            name: '두부',
            gender: '♂',
            breed: '말티즈',
            tags: ['ENFP', '3살', '소형견'],
        },
        {
            name: '인절미',
            gender: '♂',
            breed: '포메라니안',
            tags: ['ENTP', '2살', '소형견'],
        },
    ];

    return (
        <div className="bg-white w-full h-auto p-6">
            {/* 제목 */}
            <p className="text-body-l font-extrabold leading-7 mb-4">
                SOS! 돌봄이 필요한 친구들이 있어요!
                <br />
                <button
                    onClick={() => {
                        navigate('/sos');
                    }}
                >
                    <span className="text-body-s text-gray-500 font-bold flex gap-1 items-center mt-2">
                        도움을 주고 싶으신가요?{' '}
                        <ArrowRight className="text-gray-500" />
                    </span>
                </button>
            </p>

            {/* 카드 리스트 */}
            <div className="flex justify-around items-start space-x-3">
                {pets.map((pet, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 shadow-md rounded-lg p-3 text-center flex flex-col items-center w-1/3"
                    >
                        {/* 이미지 */}
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                            <Profile2 />
                        </div>

                        {/* 이름 및 성별 */}
                        <p className="text-label-l font-semibold">
                            {pet.name}
                            <span className="ml-1 text-sm">{pet.gender}</span>
                        </p>

                        {/* 견종 */}
                        <p className="text-label-m text-gray-500">
                            {pet.breed}
                        </p>

                        {/* 태그 */}
                        <div className="mt-1 text-label-m font-semibold text-blue-500">
                            {pet.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-label-m mr-1"
                                >{`#${tag}`}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

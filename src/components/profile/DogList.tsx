import { useCallback } from 'react';
import Arrow from '@/assets/images/arrow/arrowBig.svg?react';
import { DogCard } from '../common';
import { useFadeNavigate } from '@/hooks';
import { DogInfoResponse } from '@/types/dogInfo';

interface DogListPropsType {
    dogsData: DogInfoResponse;
    isMyProfile: boolean;
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DogList({
    dogsData,
    isMyProfile,
    showMenu,
    setShowMenu,
}: DogListPropsType) {
    const navigate = useFadeNavigate();

    const handleAddDogBtn = useCallback(() => {
        navigate('/register');
    }, []);

    const handleShowDogsBtn = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    return (
        <article className="flex flex-col gap-4">
            <div
                onClick={handleShowDogsBtn}
                className="flex justify-between px-6 py-[12.5px] text-body-l font-semibold text-point-900 border-1 border-gray-200 rounded-lg shadow-md cursor-pointer"
            >
                <span>등록된 멍멍이 정보</span>
                <Arrow className="text-gray-400" />
            </div>
            {showMenu &&
                dogsData.data?.map((dog, index) => (
                    <DogCard
                        key={index}
                        id={dog.id}
                        dogNm={dog.dogNm}
                        sexNm={dog.sexNm}
                        kindNm={dog.kindNm}
                        neuterYn={dog.neuterYn}
                        profileImg={dog.profileImg}
                        age={dog.age}
                        temperament={dog.temperament}
                        size={dog.size}
                        comment={true}
                        edit={isMyProfile}
                    />
                ))}
            {showMenu && isMyProfile && (
                <button onClick={handleAddDogBtn} className="btn-solid">
                    + 멍멍이 등록하기
                </button>
            )}
        </article>
    );
}

import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores';
import { getPetList } from '@/hooks/api/sos';
import { Pet } from '@/types/Sos';

interface DogSelectorProps {
    petIds: number[];
    onDogSelect: (petId: number) => void;
    onDogRemove: (petId: number) => void;
}

export default function DogSelector({
    petIds,
    onDogSelect,
    onDogRemove,
}: DogSelectorProps) {
    const [myDogs, setMyDogs] = useState<Pet[]>([]);
    const { user } = useUserStore();

    useEffect(() => {
        const fetchPets = async () => {
            if (user?.id) {
                const response = await getPetList(user.id);
                if (response.ok && response.data) {
                    setMyDogs(response.data);
                    console.log(response.data);
                }
            }
        };

        fetchPets();
    }, [user?.id]);

    return (
        <div className="mt-2">
            <label className="block text-sm text-gray-700 mb-2">
                대상 멍멍이
            </label>
            <select
                className="w-full p-2 border rounded-lg mb-2"
                onChange={(e) => onDogSelect(Number(e.target.value))}
            >
                <option value="">멍멍이를 선택하세요</option>
                {myDogs.map((dog) => (
                    <option key={dog.id} value={dog.id}>
                        {dog.dogNm}
                    </option>
                ))}
            </select>

            {/* 기존 선택된 강아지 표시 로직 유지 */}
            <div className="flex flex-wrap gap-2">
                {myDogs
                    .filter((dog) => petIds.includes(dog.id))
                    .map((dog) => (
                        <span
                            key={dog.id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                        >
                            {dog.dogNm}
                            <button
                                type="button"
                                onClick={() => onDogRemove(dog.id)}
                                className="text-blue-600 hover:text-blue-800 ml-1"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
            </div>
        </div>
    );
}

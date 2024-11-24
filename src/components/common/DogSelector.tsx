interface DogSelectorProps {
    selectedDogs: string[];
    onDogSelect: (dogName: string) => void;
    onDogRemove: (dogName: string) => void;
}

const MY_DOGS = [
    { id: '1', name: '멍멍이1' },
    { id: '2', name: '멍멍이2' },
    { id: '3', name: '멍멍이3' },
];

export default function DogSelector({
    selectedDogs,
    onDogSelect,
    onDogRemove,
}: DogSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                대상 멍멍이
            </label>
            <select
                className="w-full p-2 border rounded-lg mb-2"
                onChange={(e) => onDogSelect(e.target.value)}
            >
                <option value="">멍멍이를 선택하세요</option>
                {MY_DOGS.map((dog) => (
                    <option key={dog.id} value={dog.name}>
                        {dog.name}
                    </option>
                ))}
            </select>

            <div className="flex flex-wrap gap-2">
                {selectedDogs.map((dog) => (
                    <span
                        key={dog}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                    >
                        {dog}
                        <button
                            type="button"
                            onClick={() => onDogRemove(dog)}
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

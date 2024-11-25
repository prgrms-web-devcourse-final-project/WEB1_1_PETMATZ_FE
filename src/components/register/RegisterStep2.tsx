interface RegisterStep2Props {
    onNext: () => void;
    updateFormData: (field: string, value: string) => void;
    formData: {
        dogName: string;
        breed: string;
        age: string;
        favoritePlace: string;
        gender: string;
        neutered: string;
        size: string;
    };
}

export default function RegisterStep2({
    onNext,
    updateFormData,
    formData,
}: RegisterStep2Props) {
    return (
        <div className="flex flex-col w-full h-screen">
            {/* 중앙 스크롤 영역 */}
            <div className="flex-1 px-4 pt-6 pb-24">
                {/* 멍멍이 이름 */}
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        멍멍이 이름
                    </p>
                    <input
                        type="text"
                        className="input-outline"
                        value={formData.dogName}
                        onChange={(e) =>
                            updateFormData('dogName', e.target.value)
                        }
                    />
                </div>
                {/* 품종 입력 */}
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        품종 입력
                    </p>
                    <input
                        type="text"
                        className="input-outline"
                        value={formData.breed}
                        onChange={(e) =>
                            updateFormData('breed', e.target.value)
                        }
                    />
                </div>
                {/* 나이 */}
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        나이
                    </p>
                    <input
                        type="number"
                        className="input-outline"
                        value={formData.age}
                        onChange={(e) => updateFormData('age', e.target.value)}
                    />
                </div>
                {/* 선호 산책 장소 */}
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        선호 산책 장소
                    </p>
                    <input
                        type="text"
                        className="input-outline"
                        value={formData.favoritePlace}
                        onChange={(e) =>
                            updateFormData('favoritePlace', e.target.value)
                        }
                    />
                </div>
                {/* 성별 선택 */}
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        성별
                    </p>
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.gender === '남'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('gender', '남')}
                        >
                            남
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.gender === '여'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('gender', '여')}
                        >
                            여
                        </button>
                    </div>
                </div>
                {/* 중성화 여부 */}
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        중성화 여부
                    </p>
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.neutered === '예'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('neutered', '예')}
                        >
                            예
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.neutered === '아니오'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('neutered', '아니오')}
                        >
                            아니오
                        </button>
                    </div>
                </div>
                {/* 멍멍이 사이즈 */}
                <div className="flex w-full flex-col gap-2">
                    <p className="text-label-m font-normal text-gray-500">
                        멍멍이 사이즈
                    </p>
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.size === '소'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('size', '소')}
                        >
                            소
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.size === '중'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('size', '중')}
                        >
                            중
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                formData.size === '대'
                                    ? 'bg-point-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                            onClick={() => updateFormData('size', '대')}
                        >
                            대
                        </button>
                    </div>
                </div>
            </div>

            {/* 하단 고정 버튼 */}
            <div className="fixed py-2.5 bottom-0 w-full left-0 px-4 bg-white shadow-md">
                <button
                    className="btn-solid bg-point-500 w-full py-2 text-white"
                    onClick={onNext}
                >
                    멍멍이 등록완료
                </button>
            </div>
        </div>
    );
}

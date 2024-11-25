import { useState } from 'react';

interface RegisterStep3Props {
    onNext: () => void;
    updateFormData: (field: string, value: string) => void;
}

export default function RegisterStep3({
    onNext,
    updateFormData,
}: RegisterStep3Props) {
    const [answers, setAnswers] = useState({
        first: '', // E or I
        second: '', // S or N
        third: '', // F or T
        fourth: '', // P or J
    });

    const handleAnswer = (question: string, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [question]: value,
        }));
    };

    const handleSubmit = () => {
        // DMBTI 계산
        const dmbti = `${answers.first}${answers.second}${answers.third}${answers.fourth}`;
        updateFormData('dmbti', dmbti); // 상태 업데이트
        onNext(); // 다음 단계로 이동
    };

    return (
        <div>
            <p className="text-lg py-4 font-extrabold">
                애견의 성향을 입력해주세요.
            </p>

            {/* Question 1 */}
            <div className="mb-4">
                <p>새로운 사람이나 애견 친구를 만나면 금방 친해지나요?</p>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.first === 'E'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('first', 'E')}
                    >
                        예 (E)
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.first === 'I'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('first', 'I')}
                    >
                        아니오 (I)
                    </button>
                </div>
            </div>

            {/* Question 2 */}
            <div className="mb-4">
                <p>산책 중 새로운 냄새를 맡으면 바로 반응하나요?</p>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.second === 'S'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('second', 'S')}
                    >
                        예 (S)
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.second === 'N'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('second', 'N')}
                    >
                        아니오 (N)
                    </button>
                </div>
            </div>

            {/* Question 3 */}
            <div className="mb-4">
                <p>애견이 주인의 기분 변화에 민감하게 반응하나요?</p>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.third === 'F'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('third', 'F')}
                    >
                        예 (F)
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.third === 'T'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('third', 'T')}
                    >
                        아니오 (T)
                    </button>
                </div>
            </div>

            {/* Question 4 */}
            <div className="mb-4">
                <p>애견이 산책 중 우연히 발견한 것에 강한 호기심을 보이나요?</p>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.fourth === 'P'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('fourth', 'P')}
                    >
                        예 (P)
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            answers.fourth === 'J'
                                ? 'bg-point-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                        onClick={() => handleAnswer('fourth', 'J')}
                    >
                        아니오 (J)
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <div className="fixed py-2.5 bottom-0 w-full left-0 px-4">
                <button
                    className="btn-solid bg-point-500 w-full py-2 text-white"
                    onClick={handleSubmit}
                    disabled={
                        !answers.first ||
                        !answers.second ||
                        !answers.third ||
                        !answers.fourth
                    } // 모든 질문에 응답해야 활성화
                >
                    DMBTI 완료
                </button>
            </div>
        </div>
    );
}

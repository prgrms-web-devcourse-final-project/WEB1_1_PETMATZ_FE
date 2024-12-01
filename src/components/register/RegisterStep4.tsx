import { useState } from 'react';
import { ToastAnchor } from '@/components/common';
import { RegisterStep4Props } from '@/types/register';
import { RadioOption } from '@/components/register';

export default function RegisterStep4({ setValue }: RegisterStep4Props) {
    const [firstAnswer, setFirstAnswer] = useState(''); // E or I
    const [secondAnswer, setSecondAnswer] = useState(''); // S or N
    const [thirdAnswer, setThirdAnswer] = useState(''); // F or T
    const [fourthAnswer, setFourthAnswer] = useState(''); // P or J

    const questions = [
        {
            question:
                '애견이 새로운 사람이나 애견 친구를 만나면 금방 친해지나요?',
            name: 'dmbti_first',
            value: firstAnswer,
            options: [
                { id: 'q1-yes', value: 'E', label: 'Yes' },
                { id: 'q1-no', value: 'I', label: 'No' },
            ],
            setter: setFirstAnswer,
        },
        {
            question:
                '애견이 산책 중 새로운 냄새나 소리를 감지하면 바로 반응하나요?',
            name: 'dmbti_second',
            value: secondAnswer,
            options: [
                { id: 'q2-yes', value: 'S', label: 'Yes' },
                { id: 'q2-no', value: 'N', label: 'No' },
            ],
            setter: setSecondAnswer,
        },
        {
            question: '애견이 주인의 기분 변화에 민감하게 반응하나요?',
            name: 'dmbti_third',
            value: thirdAnswer,
            options: [
                { id: 'q3-yes', value: 'F', label: 'Yes' },
                { id: 'q3-no', value: 'T', label: 'No' },
            ],
            setter: setThirdAnswer,
        },
        {
            question:
                '애견이 산책 중 우연히 발견한 것에 강한 호기심을 보이나요?',
            name: 'dmbti_fourth',
            value: fourthAnswer,
            options: [
                { id: 'q4-yes', value: 'P', label: 'Yes' },
                { id: 'q4-no', value: 'J', label: 'No' },
            ],
            setter: setFourthAnswer,
        },
    ];

    const handleNext = () => {
        const dmbti = `${firstAnswer}${secondAnswer}${thirdAnswer}${fourthAnswer}`;
        setValue('temperament', dmbti);
    };

    const isNextButtonDisabled =
        !firstAnswer || !secondAnswer || !thirdAnswer || !fourthAnswer;

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="w-full bg-white h-1">
                <div className="bg-point-400 h-1 w-[100%]"></div>
            </div>

            <section className="flex flex-col w-full flex-1">
                <div className="bg-white pt-6 pb-12 flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <h1 className="mb-12 text-title-s text-gray-800 font-extrabold">
                            마지막으로
                            <br />
                            멍멍이 성향 정보가 필요해요!
                        </h1>

                        <div className="flex flex-col gap-7">
                            {questions.map((q) => (
                                <div
                                    key={q.name}
                                    className="flex flex-col gap-2"
                                >
                                    <p className="text-gray-800">
                                        {q.question}
                                    </p>
                                    <div className="flex flex-wrap">
                                        {q.options.map((option) => (
                                            <RadioOption
                                                key={option.id}
                                                id={option.id}
                                                value={option.value}
                                                name={q.name}
                                                currentValue={q.value}
                                                label={option.label}
                                                onSelect={q.setter}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <ToastAnchor>
                    <button
                        type="submit"
                        className="btn-solid w-full"
                        onClick={handleNext}
                        disabled={isNextButtonDisabled}
                    >
                        다음
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

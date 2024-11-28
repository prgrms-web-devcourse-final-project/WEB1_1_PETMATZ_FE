import { CustomInput, CustomToggle, MultiSelectTag } from '../common';
import { ToastAnchor } from '@/components/common';
import { RegisterStep3Props } from '@/types/register';

export default function RegisterStep3({
    onNext,
    register,
    watch,
    errors,
    control,
    getValue,
}: RegisterStep3Props) {
    const dogSizeOptions = [
        { value: 'small', label: '소형견' },
        { value: 'medium', label: '중형견' },
        { value: 'large', label: '대형견' },
    ];

    const neutered = watch('neutered');
    const size = watch('size');
    const age = watch('age');

    // 나이 validation
    const ageValidation = {
        required: '나이는 필수 입력사항입니다.',
        pattern: {
            value: /^[0-9]+$/,
            message: '숫자만 입력 가능합니다',
        },
    };

    const isNextButtonDisabled =
        !age || !size?.length || neutered === undefined;

    const handleNext = () => {
        if (getValue) {
            console.log(getValue());
        }
        onNext();
    };

    return (
        <div className="flex flex-col justify-between h-full">
            {/* 프로그래스바 */}
            <div className="w-full bg-white h-1">
                <div className="bg-point-400 h-1 w-[75%]"></div>
            </div>

            <section className="flex flex-col w-full flex-1">
                <div className="bg-white pt-6 pb-12 flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <h1 className="mb-12 text-title-s text-gray-800 font-extrabold">
                            멍멍이의
                            <br /> 추가 정보를 알려주세요
                        </h1>

                        {/* 중성화 여부 */}
                        <div className="flex flex-col gap-7 mb-4">
                            <CustomToggle
                                name="neutered"
                                label="중성화 여부"
                                leftText="Yes"
                                rightText="No"
                                register={register}
                                watch={watch}
                            />

                            {/* 애견 크기 */}
                            <MultiSelectTag
                                label="애견 크기"
                                name="size"
                                options={dogSizeOptions}
                                control={control}
                                rules={{
                                    required: '크기를 선택해주세요!',
                                    validate: (value: string[]) =>
                                        value.length > 0 ||
                                        '크기를 선택해주세요!',
                                }}
                            />

                            {/* 나이 입력 */}
                            <CustomInput
                                id="age"
                                label="나이"
                                placeholder="나이를 연 단위로 입력해주세요 (예: 3)"
                                register={register}
                                watch={watch}
                                validation={ageValidation}
                                error={errors.age?.message?.toString()}
                                design="outline"
                                successMsg=""
                            />

                            {/* 선호 산책 장소 입력 */}
                            <CustomInput
                                id="favoritePlace"
                                label="선호 산책 장소"
                                placeholder="(선택)선호 산책 장소를 입력해주세요"
                                register={register}
                                watch={watch}
                                design="outline"
                                successMsg=""
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <ToastAnchor>
                    <button
                        type="button"
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

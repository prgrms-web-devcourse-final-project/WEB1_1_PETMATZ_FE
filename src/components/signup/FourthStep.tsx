import { SignUpInputs } from '@/hooks/useSignupForm';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
    UseFormWatch,
} from 'react-hook-form';
import { CustomToggle, MultiSelectTag, SelectBox } from '../common';
import { useSelectBox } from '@/hooks';
import { Option } from '@/hooks/useSelectBox';

interface FourthStepPropsType {
    pageNumber: number;
    register: UseFormRegister<SignUpInputs>;
    watch: UseFormWatch<SignUpInputs>;
    errors: FieldErrors<SignUpInputs>;
    control: Control<SignUpInputs, any>;
}

export default function FourthStep({
    pageNumber,
    register,
    watch,
    errors,
    control,
}: FourthStepPropsType) {
    // 강아지 크기 옵션 정의
    const dogSizeOptions = [
        { value: 'small', label: '소형견' },
        { value: 'medium', label: '중형견' },
        { value: 'large', label: '대형견' },
    ];

    const options: Option[] = [
        { value: 'ENFP', label: 'ENFP' },
        { value: 'ENFJ', label: 'ENFJ' },
        { value: 'ENTP', label: 'ENTP' },
        { value: 'ENTJ', label: 'ENTJ' },
        { value: 'ESFP', label: 'ESFP' },
        { value: 'ESFJ', label: 'ESFJ' },
        { value: 'ESTP', label: 'ESTP' },
        { value: 'ESTJ', label: 'ESTJ' },
        { value: 'INFP', label: 'INFP' },
        { value: 'INFJ', label: 'INFJ' },
        { value: 'INTP', label: 'INTP' },
        { value: 'INTJ', label: 'INTJ' },
        { value: 'ISFP', label: 'ISFP' },
        { value: 'ISFJ', label: 'ISFJ' },
        { value: 'ISTP', label: 'ISTP' },
        { value: 'ISTJ', label: 'ISTJ' },
    ];

    const {
        options: selectOptions,
        selectOption,
        isOpen,
        toggleSelectBox,
        selectedOption,
        selectBoxRef,
    } = useSelectBox(options);

    return (
        <>
            <div className={`${pageNumber !== 4 && 'hidden'}`}>
                {/* 프로그래스바 */}
                <div className="w-full bg-white h-1">
                    <div className="bg-point-400 h-1 w-[100%]"></div>
                </div>
                <div className="bg-white pt-6 pb-12">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <div className="text-title-s font-extrabold text-gray-800 pb-12">
                            <p>마지막으로</p>
                            <p>추가 정보가 필요해요!</p>
                        </div>
                        {pageNumber === 4 && (
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-7">
                                    <CustomToggle
                                        name="gender"
                                        label="성별"
                                        leftText="여성"
                                        rightText="남성"
                                        register={register}
                                        watch={watch}
                                        defaultChecked={true}
                                    />
                                    <CustomToggle
                                        name="possible"
                                        label="돌봄이 가능 여부"
                                        leftText="가능"
                                        rightText="불가능"
                                        register={register}
                                        watch={watch}
                                        defaultChecked={true}
                                    />
                                    <MultiSelectTag
                                        label="선호 애견 크기"
                                        name="dogSizes"
                                        options={dogSizeOptions}
                                        control={control}
                                        rules={{
                                            required:
                                                '최소 하나의 크기를 선택해주세요!',
                                            validate: (value: string[]) =>
                                                value.length > 0 ||
                                                '최소 하나의 크기를 선택해주세요!',
                                        }}
                                    />
                                </div>
                                <Controller
                                    name="mbti"
                                    control={control}
                                    rules={{
                                        required: 'MBTI를 선택해주세요!',
                                    }}
                                    render={({ field }) => (
                                        <SelectBox
                                            id="mbti"
                                            label="MBTI"
                                            design="solid"
                                            options={selectOptions}
                                            value={selectedOption}
                                            onChange={(option) => {
                                                selectOption(option);
                                                field.onChange(option.value);
                                            }}
                                            toggleSelectBox={toggleSelectBox}
                                            isOpen={isOpen}
                                            selectBoxRef={selectBoxRef}
                                            error={errors.mbti?.message}
                                        />
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <footer
                className={`w-full max-w-[600px] px-6 py-2.5 mx-auto ${pageNumber !== 4 && 'hidden'}`}
            >
                <button
                    type="submit"
                    form="signup-form"
                    className="btn-solid mb-8"
                    disabled={
                        !!errors.dogSizes?.message || !!errors.mbti?.message
                    }
                >
                    다음
                </button>
            </footer>
        </>
    );
}

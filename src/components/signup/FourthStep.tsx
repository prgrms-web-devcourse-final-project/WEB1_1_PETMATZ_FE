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
import { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import Check from '@/assets/images/forgot-password/check.svg?react';

interface FourthStepPropsType {
    pageNumber: number;
    register: UseFormRegister<SignUpInputs>;
    watch: UseFormWatch<SignUpInputs>;
    errors: FieldErrors<SignUpInputs>;
    control: Control<SignUpInputs, any>;
    isValid: boolean;
}

export default function FourthStep({
    pageNumber,
    register,
    watch,
    errors,
    control,
    isValid,
}: FourthStepPropsType) {
    // 강아지 크기 옵션 정의
    const dogSizeOptions = [
        { value: 'SMALL', label: '소형견' },
        { value: 'MEDIUM', label: '중형견' },
        { value: 'LARGE', label: '대형견' },
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

    const [showModal, setShowModal] = useState(false);

    const handleNextBtn = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCancelBtn = useCallback(() => {
        setShowModal(false);
    }, []);

    const modalContent = (
        <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 mx-auto z-50 flex justify-center items-center min-w-[360px] max-w-[768px]"
        >
            {/* 배경에만 opacity 적용 */}
            <div className="absolute inset-0 bg-dim opacity-90"></div>
            {/* 모달 컨텐츠 */}
            <section className="z-10 w-[303px] min-w-[303px] h-[406px] bg-white rounded-xl p-6 flex flex-col gap-[16px]">
                <div className="flex flex-col gap-2 items-center">
                    <Check />
                    <h1 className="text-gray-900 text-body-xl font-extrabold flex flex-col items-center">
                        <div className="items-center">동의하고</div>
                        <div>가입 완료하기!</div>
                    </h1>
                    <div className="w-full text-label-l text-gray-500 items-center flex flex-col gap-2">
                        <span>지역별 돌봄 랭킹을 사용하시려면</span>
                        <span>아래 항목의 동의가 필요해요!</span>
                    </div>
                </div>
                <div className="border-[0.5px] border-gray-100"></div>
                <div className="flex flex-col gap-2 w-full text-body-s text-gray-900 font-semibold">
                    <article className="rounded-lg w-full bg-gray-100 px-2 py-[10px]">{`(필수) 개인정보 수집 및 이용에 대한 동의`}</article>
                    <article className="rounded-lg w-full bg-gray-100 px-2 py-[10px]">{`(필수) 사용자 위치 서비스 이용에 대한 동의`}</article>
                </div>
                <div className="flex gap-[10px] w-full">
                    <button onClick={handleCancelBtn} className="btn-outline">
                        취소하기
                    </button>
                    <button
                        type="submit"
                        form="signup-form"
                        className="btn-solid"
                    >
                        동의하기
                    </button>
                </div>
            </section>
        </div>
    );

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
                    form="none"
                    className="btn-solid"
                    disabled={
                        !isValid ||
                        !!errors.dogSizes?.message ||
                        !!errors.mbti?.message
                    }
                    onClick={handleNextBtn}
                >
                    다음
                </button>
            </footer>
            {showModal && ReactDOM.createPortal(modalContent, document.body)}
        </>
    );
}

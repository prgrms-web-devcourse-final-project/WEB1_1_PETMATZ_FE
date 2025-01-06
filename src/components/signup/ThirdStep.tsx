import { CustomInput, ImageSelectBox } from '../common';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useCallback } from 'react';
import {
    introduceValidationType,
    nicknameValidationType,
    SignUpInputs,
} from '@/types/user';

interface ThirdStepPropsType {
    register: UseFormRegister<SignUpInputs>;
    watch: UseFormWatch<SignUpInputs>;
    nicknameValidation: nicknameValidationType;
    introduceValidation: introduceValidationType;
    errors: FieldErrors<SignUpInputs>;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    imgName: string;
    setImgName: React.Dispatch<React.SetStateAction<string>>;
    setImg: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ThirdStep({
    register,
    watch,
    nicknameValidation,
    introduceValidation,
    errors,
    setPageNumber,
    imgName,
    setImgName,
    setImg,
}: ThirdStepPropsType) {
    const nickname = watch('nickname');
    const introduce = watch('introduce');

    const handleNextBtn = useCallback(() => {
        setPageNumber((prev) => prev + 1);
    }, [setPageNumber]);

    return (
        <>
            <div>
                {/* 프로그래스바 */}
                <div className="w-full bg-white h-1">
                    <div className="bg-point-400 h-1 w-[75%]"></div>
                </div>
                <div className="bg-white pt-6 pb-1">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <div className="text-title-s font-extrabold text-gray-800 pb-12">
                            <p>어떤 프로필로</p>
                            <p>대화할까요?</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <ImageSelectBox
                                label="프로필 사진"
                                bottomSheetLabel="프로필 이미지를 선택하세요."
                                imgName={imgName}
                                setImgName={setImgName}
                                setImg={setImg}
                            />
                            <CustomInput
                                id="nickname"
                                label="닉네임"
                                type="text"
                                placeholder="닉네임을 알려주세요."
                                register={register}
                                watch={watch}
                                validation={nicknameValidation}
                                error={errors.nickname?.message}
                                design="outline"
                                successMsg="좋아요!"
                            />
                            <CustomInput
                                id="introduce"
                                label="프로필 소개 (최대 50글자)"
                                type="textarea"
                                placeholder="자기소개를 작성해주세요!"
                                register={register}
                                watch={watch}
                                validation={introduceValidation}
                                error={errors.introduce?.message}
                                design="outline"
                                successMsg="좋아요!"
                            />
                            <div className="flex justify-end">
                                <span className="text-label-m text-gray-500">
                                    {introduce?.length || '0'}/50
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={`w-full max-w-[600px] px-6 py-2.5 mx-auto`}>
                <button
                    form="none"
                    className="btn-solid"
                    disabled={
                        nickname === '' ||
                        !!errors.nickname?.message ||
                        !!errors.introduce?.message
                    }
                    onClick={handleNextBtn}
                >
                    다음
                </button>
            </footer>
        </>
    );
}

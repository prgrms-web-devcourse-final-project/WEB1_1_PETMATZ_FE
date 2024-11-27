import { useAnimalRegistration } from '@/hooks';
import { CustomInput } from '@/components/common';
import { RegisterStep1Props } from '@/types/register';
import { ToastAnchor } from '@/components/common';

export default function RegisterStep1({
    onNext,
    register,
    watch,
    errors,
    // getValue,
    setValue,
}: RegisterStep1Props) {
    const { fetchAnimalRegistration } = useAnimalRegistration();
    const registrationNumber = watch('registrationNumber');
    const ownerName = watch('ownerName');

    const ownerNameValidation = {
        required: '소유자 성명은 필수 입력 항목입니다.',
    };

    const registrationNumberValidation = {
        required: '등록번호는 필수 입력 항목입니다.',
        validate: (value: string) =>
            (value.length === 15 && /^\d+$/.test(value)) ||
            '등록번호는 숫자 15자리여야 합니다.',
    };

    const isButtonDisabled =
        !ownerName ||
        !registrationNumber ||
        registrationNumber.length !== 15 ||
        !!errors.registrationNumber ||
        !!errors.ownerName;

    const handleSearch = async () => {
        const response = await fetchAnimalRegistration({
            dog_reg_no: registrationNumber,
            owner_nm: ownerName,
        });

        if (response?.response.body.item) {
            const item = response.response.body.item;
            setValue('dogName', item.dogNm);
            setValue('registrationNumber', item.dogRegNo);
            setValue('breed', item.kindNm);
            setValue('neutered', item.neuterYn);
            setValue('gender', item.sexNm);
            setTimeout(() => {
                onNext();
            }, 1000);
        }
        // console.log('formData :,', getValue());
    };

    return (
        <div className="flex flex-col justify-between h-full">
            {/* 프로그래스바 */}
            <div className="w-full bg-white h-1">
                <div className="bg-point-400 h-1 w-[25%]"></div>
            </div>
            <section className="flex flex-col w-full flex-1">
                <div className="bg-white pt-6 pb-12 flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <h1 className="mb-12 text-title-s text-gray-800 font-extrabold">
                            등록번호를
                            <br /> 조회할게요!
                        </h1>
                        <CustomInput
                            id="ownerName"
                            label="소유자 성명"
                            placeholder="이름을 입력해주세요."
                            register={register}
                            watch={watch}
                            validation={ownerNameValidation}
                            error={errors.ownerName?.message?.toString()}
                            design="outline"
                            successMsg=""
                        />
                        <div className="mt-4">
                            <CustomInput
                                id="registrationNumber"
                                label="멍멍이 등록 번호(숫자 15자리)"
                                placeholder="등록번호를 입력해주세요."
                                register={register}
                                watch={watch}
                                validation={registrationNumberValidation}
                                error={errors.registrationNumber?.message?.toString()}
                                design="outline"
                                successMsg="올바른 등록번호입니다."
                            />
                        </div>

                        <div className="flex justify-end items-center w-full mt-4">
                            <a
                                href="https://www.animal.go.kr/front/index.do"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-label-l font-semibold text-point-400 cursor-pointer"
                            >
                                등록번호를 잊으셨나요?
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <ToastAnchor>
                    <button
                        type="button"
                        className="btn-solid w-full"
                        onClick={handleSearch}
                        disabled={isButtonDisabled}
                    >
                        조회하기
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

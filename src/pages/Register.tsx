import { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFadeNavigate } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import Logo from '@/assets/images/header/logo.svg?react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegisterStep1 } from '@/components/register';
import { RegisterStep2 } from '@/components/register';
import { RegisterStep3 } from '@/components/register';
import { RegisterStep4 } from '@/components/register';
import { RegisterComplete } from '@/components/register';
import { RegisterFormData } from '@/types/register';

// 폼 데이터 타입 정의
export default function Register() {
    const navigate = useFadeNavigate();
    const [step, setStep] = useState(1);
    const [imgName, setImgName] = useState('profile1');

    // react-hook-form 사용
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        control,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        defaultValues: {
            ownerName: '',
            registrationNumber: '',
            dogName: '',
            breed: '', // 품종
            age: '',
            favoritePlace: '',
            gender: '',
            neutered: '',
            size: '',
            dmbti: '',
            dogImg: 'profile1', // 기본 이미지
        },
    });

    const handleBackBtn = useCallback(() => {
        if (step > 1) {
            setStep((prevStep) => prevStep - 1);
        } else {
            navigate('/');
        }
    }, [step, navigate]);

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid && step < 5) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        console.log('전체 폼 데이터:', data);
        // 최종 제출 로직
    };

    // 애니메이션 설정
    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-screen bg-gray-100 flex flex-col items-center justify-between overflow-hidden"
        >
            {step < 5 ? (
                <header className="bg-white h-14 w-full flex items-center justify-center">
                    <Back
                        onClick={handleBackBtn}
                        className="absolute left-[26px] cursor-pointer"
                    />
                    <h1 className="text-point-900 text-body-l font-extrabold">
                        멍멍이 등록
                    </h1>
                </header>
            ) : (
                <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
                    <Logo className="text-black h-10 sm:w-80 " />
                </header>
            )}

            <main className="w-full flex flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            className="w-full"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <RegisterStep1
                                onNext={handleNextStep}
                                register={register}
                                errors={errors}
                                watch={watch}
                                // getValue={getValues}
                                setValue={setValue}
                            />
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            className="w-full overflow-y-auto"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <RegisterStep2
                                onNext={handleNextStep}
                                watch={watch}
                                getValue={getValues}
                                setValue={setValue}
                                imgName={imgName}
                                setImgName={setImgName}
                            />
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            className="w-full"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <RegisterStep3
                                onNext={handleNextStep}
                                register={register}
                                control={control}
                                watch={watch}
                                errors={errors}
                                getValue={getValues}
                                setValue={setValue}
                            />
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            className="w-full"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <RegisterStep4
                                onNext={handleNextStep}
                                updateFormData={getValues}
                            />
                        </motion.div>
                    )}
                    {step === 5 && (
                        <motion.div
                            key="complete"
                            className="w-full flex flex-col items-center justify-center"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <RegisterComplete formData={getValues()} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </form>
    );
}

import { useState, useCallback, useEffect } from 'react';
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
import { useDogRegistration } from '@/hooks/api/register';

// 폼 데이터 타입 정의
export default function Register() {
    const navigate = useFadeNavigate();
    const [step, setStep] = useState(1);
    const [imgName, setImgName] = useState('profile1');
    const { registerDog } = useDogRegistration();

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
            dogRegNo: '',
            petName: '',
            breed: '',
            age: 1,
            comment: '',
            gender: undefined, //암컷, 수컷
            neuterYn: false, // 미중성, 중성
            size: '',
            temperament: '', // 견BTI
            profileImg: 'profile1', // 기본 이미지
        },
    });

    // Step3에서 neuterYn 값이 "미중성"으로 설정될 때를 처리하는 로직
    useEffect(() => {
        if (step === 3) {
            const currentneuterYn = getValues('neuterYn');
            if (currentneuterYn === '미중성') {
                setValue('neuterYn', false);
            } else if (currentneuterYn === '중성') {
                setValue('neuterYn', true);
            }
        }
    }, [step]);

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

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        // neuterYn 변환 (true -> 중성, false -> 미중성)
        const transformneuterYn = (neuterYn: boolean): '중성' | '미중성' => {
            return neuterYn ? '중성' : '미중성';
        };

        // ownerName을 분리하고 나머지 데이터 변환
        const { ownerName, ...restData } = data;
        const transformedData = {
            ...restData,
            neuterYn: transformneuterYn(data.neuterYn as boolean),
        };

        const response = await registerDog(transformedData);
        if (response) {
            setTimeout(() => {
                setStep(5); // 성공 시 1초 후 완료 단계로 이동
            }, 1000);
        }
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
                                getValue={getValues}
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
                            <RegisterStep4 setValue={setValue} />
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
                            <RegisterComplete getValue={getValues} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </form>
    );
}

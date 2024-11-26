import { useState, useCallback } from 'react';
import { useFadeNavigate } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import Logo from '@/assets/images/header/logo.svg?react';
import { StepIndicator } from '@/components/register';
import { RegisterStep1 } from '@/components/register';
import { RegisterStep2 } from '@/components/register';
import { RegisterStep3 } from '@/components/register';
import { RegisterComplete } from '@/components/register';
import { motion, AnimatePresence } from 'framer-motion';

const STEP_TITLES = ['등록번호 조회', '추가 정보입력', 'DMBTI'];

export default function Register() {
    const navigate = useFadeNavigate();
    const [step, setStep] = useState(1);

    // 강아지 정보 상태 관리
    const [formData, setFormData] = useState({
        dogName: '',
        breed: '',
        age: '',
        favoritePlace: '',
        gender: '',
        neutered: '',
        size: '',
        dmbti: '',
    });

    const handleBackBtn = useCallback(() => {
        if (step > 1) {
            setStep((prevStep) => prevStep - 1);
        } else {
            navigate('/');
        }
    }, [step, navigate]);

    const handleNextStep = () => {
        if (step < 4) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // 애니메이션 설정
    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between overflow-hidden">
            {step < 4 ? (
                <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
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

            {/* {step < 4 && (
                <div className="w-full h-14 flex justify-center mt-4">
                    <StepIndicator
                        currentStep={step}
                        totalSteps={STEP_TITLES.length}
                        stepTitles={STEP_TITLES}
                    />
                </div>
            )} */}
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
                            <RegisterStep1 onNext={handleNextStep} />
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
                                updateFormData={updateFormData}
                                formData={formData}
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
                                updateFormData={updateFormData}
                            />
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key="complete"
                            className="w-full flex flex-col items-center justify-center"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <RegisterComplete formData={formData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

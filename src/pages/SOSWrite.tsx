import {
    BasicInfoSection,
    DateTimeSection,
    PaymentSection,
} from '@/components/sos';
import { DogSelector } from '@/components/common';
import { useSosForm } from '@/hooks/useSosForm';

export default function SOSWrite() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        trigger,
        selectedDogs,
        dateTimeError,
        getInputStyle,
        handleDogSelect,
        handleRemoveDog,
        onSubmit,
        onError,
    } = useSosForm();

    return (
        <div className="p-4 overflow-y-auto h-full max-w-3xl mx-auto mt-4">
            <h1 className="text-2xl font-bold text-center mb-8">
                '도와줘 멍멍' 글 등록
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-6"
            >
                <BasicInfoSection
                    register={register}
                    errors={errors}
                    getInputStyle={getInputStyle}
                />

                <DateTimeSection
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    trigger={trigger}
                    errors={errors}
                    dateTimeError={dateTimeError}
                />

                <PaymentSection
                    register={register}
                    watch={watch}
                    getInputStyle={getInputStyle}
                />

                <DogSelector
                    selectedDogs={selectedDogs}
                    onDogSelect={handleDogSelect}
                    onDogRemove={handleRemoveDog}
                />

                <button type="submit" className="btn-solid">
                    등록하기
                </button>
            </form>
        </div>
    );
}

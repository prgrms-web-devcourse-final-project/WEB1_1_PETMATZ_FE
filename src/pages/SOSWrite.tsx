import {
    BasicInfoSection,
    DateTimeSection,
    PaymentSection,
} from '@/components/sos';
import { DogSelector, ToastAnchor } from '@/components/common';
import { useSosForm } from '@/hooks/useSosForm';

export default function SOSWrite() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        trigger,
        petIds,
        dateTimeError,
        getInputStyle,
        handleDogSelect,
        handleRemoveDog,
        onSubmit,
        onError,
    } = useSosForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="min-h-screen bg-gray-100 flex flex-col items-center justify-between overflow-hidden"
        >
            <header className="bg-white h-14 w-full flex items-center justify-center relative">
                <h1 className="text-point-900 text-title-m font-extrabold">
                    도와줘 멍멍 글 등록
                </h1>
            </header>

            {/* 메인 컨텐츠 */}
            <main className="relative w-full flex flex-1 overflow-y-auto bg-white">
                <div className="w-full max-w-[600px] px-6 mx-auto py-6 space-y-4">
                    <BasicInfoSection
                        register={register}
                        watch={watch}
                        errors={errors}
                    />
                    {/* 날짜/시간 섹션 */}
                    <DateTimeSection
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        trigger={trigger}
                        errors={errors}
                        dateTimeError={dateTimeError}
                    />
                    {/* 결제 정보 섹션 */}
                    <PaymentSection
                        register={register}
                        watch={watch}
                        getInputStyle={getInputStyle}
                    />
                    {/* 강아지 선택 섹션 */}
                    <DogSelector
                        petIds={petIds}
                        onDogSelect={handleDogSelect}
                        onDogRemove={handleRemoveDog}
                    />
                </div>
            </main>

            {/* 하단 버튼 */}
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto bg-white">
                <ToastAnchor>
                    <button type="submit" className="btn-solid w-full">
                        등록하기
                    </button>
                </ToastAnchor>
            </footer>
        </form>
    );
}

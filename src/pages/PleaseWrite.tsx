import { ToastAnchor } from '@/components/common';
import {
    DateTimeSection,
    DynamicInputFields,
    MultiSelectBottomSheet,
} from '@/components/please';
import { useCustomToast, useFadeNavigate } from '@/hooks';
import { getPetList } from '@/hooks/api/sos';
import { FormData } from '@/types/please';
import { useEffect, useState } from 'react';
import {
    Controller,
    FieldErrors,
    FormProvider,
    useForm,
} from 'react-hook-form';
import { useUserStore } from '@/stores';
import { getFirstErrorMessage } from '@/utils';

// SVG
import ArrowLeftIcon from '@/assets/images/arrow/arrowLeft.svg?react';
import { useSearchParams } from 'react-router-dom';
import { createPlease } from '@/hooks/api/please';

export default function PleaseWrite() {
    const [searchParams] = useSearchParams();
    const getQueryParam = (key: string): string | null => searchParams.get(key);
    const navigate = useFadeNavigate();
    const { showToast } = useCustomToast();

    const receiverId = getQueryParam('receiverId');

    const { user } = useUserStore();
    const [options, setOptions] = useState<{ id: number; label: string }[]>([]);

    const methods = useForm<FormData>({
        defaultValues: {
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            multiSelect: [],
            dynamicInputs: [{ value: '' }],
        },
        mode: 'onSubmit',
    });
    const { handleSubmit, control, formState, watch, setError, clearErrors } =
        methods;

    const onSubmit = async (data: FormData) => {
        const validationErrors = validateDateTimeFields();

        if (validationErrors) {
            console.log('서브밋 valid', validationErrors);
            onError(validationErrors);
            return;
        }

        if (!receiverId) return;

        const missionStarted = new Date(
            `${data.startDate}T${data.startTime}`,
        ).toISOString();
        const missionEnd = new Date(
            `${data.endDate}T${data.endTime}`,
        ).toISOString();
        const petMissionAsk = data.dynamicInputs.map((input) => input.value);
        const petId = data.multiSelect.map((pet) => String(pet.id));

        const { ok, data: res } = await createPlease({
            missionEnd,
            missionStarted,
            petMissionAsk,
            petId,
            receiverId: Number(receiverId),
        });

        if (!ok) {
            showToast('부탁 등록에 실패했습니다.', 'warning');
            return;
        }

        showToast('멍멍이 부탁이 등록되었씁니다.', 'success');
        setTimeout(() => {
            navigate(`/please/${res.result.petMissionId}`);
        }, 300);
    };

    const onError = (errors: FieldErrors<FormData>) => {
        const firstErrorMessage = getFirstErrorMessage(errors);

        if (firstErrorMessage) {
            showToast(firstErrorMessage, 'warning');
            return;
        }
    };

    const validateDateTime = (
        startDate: string,
        startTime: string,
        endDate: string,
        endTime: string,
    ): { field: 'startTime' | 'endTime'; message: string } | null => {
        if (!startDate || !startTime || !endDate || !endTime) return null;

        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);

        if (end < start) {
            return {
                field: 'endTime',
                message: '종료 시간은 시작 시간 이후여야 합니다.',
            };
        }
        return null;
    };

    // DateTime 유효성 검증 함수
    const validateDateTimeFields = (): FieldErrors<FormData> | null => {
        const startDate = watch('startDate');
        const startTime = watch('startTime');
        const endDate = watch('endDate');
        const endTime = watch('endTime');

        const error = validateDateTime(startDate, startTime, endDate, endTime);
        if (error) {
            setError(error.field, { type: 'manual', message: error.message });
            return {
                [error.field]: {
                    type: 'manual',
                    message: error.message,
                },
            }; // 에러 객체 반환
        } else {
            clearErrors(['startTime', 'endTime']);
            return null;
        }
    };

    useEffect(() => {
        if (user) {
            getPetList(user.id).then((res) => {
                if (res.ok && res.data) {
                    setOptions(
                        res.data?.map((pet) => {
                            return { id: pet.id, label: pet.dogNm };
                        }),
                    );
                }
            });
        }
    }, [user]);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <header className="flex justify-between items-center py-[16px] px-[26px] bg-white">
                <ArrowLeftIcon
                    className="w-[24px] h-[24px] text-point-900 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="flex-1 text-point-900 text-body-l font-extrabold text-center">
                    부탁 등록
                </h1>
                <div className="w-[24px] h-[24px]"></div>
            </header>
            <main className="flex flex-col h-full overflow-hidden p-[24px] bg-white gap-[48px]">
                <h2 className="text-title-s font-extrabold text-gray-800 flex flex-col">
                    <span>멍멍이 부탁 미션을</span>
                    <span>작성해봐요!</span>
                </h2>
                <div className="flex flex-col h-full overflow-y-auto">
                    <FormProvider {...methods}>
                        <form
                            className="flex flex-col gap-[34px]"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                {/* MultiSelect */}
                                <Controller
                                    name="multiSelect"
                                    control={methods.control}
                                    rules={{
                                        required: '멍멍이를 선택해주세요',
                                    }}
                                    defaultValue={[]}
                                    render={({
                                        field: { value, onChange },
                                        fieldState,
                                    }) => (
                                        <MultiSelectBottomSheet
                                            options={options}
                                            title="멍멍이 선택"
                                            placeholder="멍멍이 선택하기"
                                            value={value}
                                            onChange={onChange}
                                            className={`${fieldState.error ? 'border-warning-400' : ''}`}
                                        />
                                    )}
                                />

                                {/* DateTimeSection */}
                                <DateTimeSection
                                    register={methods.register}
                                    setValue={methods.setValue}
                                    validateDateTimeFields={
                                        validateDateTimeFields
                                    }
                                    errors={methods.formState.errors}
                                />
                            </div>

                            {/* DynamicInputFields */}
                            <div className="flex flex-col gap-[16px]">
                                <h3 className="text-body-l font-extrabold text-gray-800">
                                    부탁 노트
                                </h3>
                                <DynamicInputFields<FormData>
                                    control={control}
                                    name="dynamicInputs"
                                    errors={formState.errors}
                                    label="부탁"
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <ToastAnchor>
                    <button
                        className="btn-solid max-w-full"
                        onClick={methods.handleSubmit(onSubmit, onError)}
                    >
                        부탁 보내기
                    </button>
                </ToastAnchor>
            </main>
        </div>
    );
}

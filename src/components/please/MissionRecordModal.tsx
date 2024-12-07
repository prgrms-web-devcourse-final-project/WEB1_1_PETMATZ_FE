import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/common/CustomInput';
import { useMissionRecord } from '@/hooks/please';
import { useParams } from 'react-router-dom';

interface RecordModalProps {
    isOpen: boolean;
    onClose: (shouldRefresh?: any) => void;
    askId: number;
}

interface FormInputs {
    comment: string;
}

export default function MissionRecordModal({
    isOpen,
    onClose,
    askId,
}: RecordModalProps) {
    const { id: petMissionId } = useParams();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { recordMission } = useMissionRecord({
        petMissionId: petMissionId!,
        onSuccess: () => {
            onClose();
        },
        onError: (error) => {
            // 에러 처리 (예: Toast 메시지 표시)
            console.error(error);
        },
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>();

    // 모달이 닫힐 때마다 상태 초기화
    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null);
            setImagePreview(null);
            reset();
        }
    }, [isOpen, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: FormInputs) => {
        console.log({
            askId,
            imgURL: selectedImage,
            comment: data.comment,
        });

        /// api 호출 로직
        await recordMission({
            askId: askId.toString(),
            comment: data.comment,
            image: selectedImage || undefined,
        });
        onClose(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col gap-6">
                    <h2 className="text-body-l font-bold text-center">
                        미션 기록하기
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="text-body-m font-bold">
                                멍멍이와의 사진
                            </h3>
                            <p className="text-label-m text-gray-500">
                                미션하고 있는 사진을 업로드 해주세요!
                            </p>
                            <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id={`image-upload-${askId}`}
                                />
                                <label
                                    htmlFor={`image-upload-${askId}`}
                                    className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                    사진 선택하기
                                </label>
                                {imagePreview && (
                                    <div className="w-full max-w-xs">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-body-m font-bold">
                                어떤 일이 있었나요?
                            </h3>
                            <p className="text-label-m text-gray-500">
                                미션을 하며 생긴 에피소드를 입력해주세요.
                            </p>
                            <CustomInput<FormInputs>
                                id="comment"
                                label=""
                                type="textarea"
                                placeholder="오늘의 에피소드를 입력해주세요"
                                register={register}
                                watch={watch}
                                validation={{
                                    required: '에피소드를 반드시 입력해주세요!',
                                }}
                                error={errors.comment?.message}
                                design="solid"
                                successMsg=""
                            />
                        </div>

                        <div className="flex gap-4 justify-center mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-200 rounded-lg text-gray-600"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-point-500 text-white rounded-lg"
                            >
                                등록할게요!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

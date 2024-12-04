import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FormData } from '@/types/Sos';
import { CustomInput } from '@/components/common';

interface BasicInfoSectionProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    watch: UseFormWatch<FormData>;
}

export default function ({ register, errors, watch }: BasicInfoSectionProps) {
    return (
        <div className="space-y-4">
            <div>
                <CustomInput
                    id="title"
                    label="제목"
                    type="text"
                    placeholder="제목을 입력하세요"
                    register={register}
                    watch={watch}
                    error={errors.comment?.message}
                    design="outline"
                    successMsg=""
                />
            </div>
            <div>
                <CustomInput
                    id="comment"
                    label="내용"
                    type="textarea"
                    placeholder="내용을 입력하세요"
                    register={register}
                    watch={watch}
                    error={errors.comment?.message}
                    design="outline"
                    successMsg=""
                />
            </div>
        </div>
    );
}

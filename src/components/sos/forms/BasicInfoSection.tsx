import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '@/types/Sos';

interface BasicInfoSectionProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    getInputStyle: (fieldName: keyof FormData) => string;
}

export default function ({ register, getInputStyle }: BasicInfoSectionProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목
                </label>
                <input
                    {...register('title', { required: true })}
                    className={getInputStyle('title') + ':valid:border-error'}
                    placeholder="제목을 입력하세요"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용
                </label>
                <textarea
                    {...register('content', { required: true })}
                    className={`${getInputStyle('content')} h-32 resize-none`}
                    placeholder="내용을 입력하세요"
                />
            </div>
        </div>
    );
}

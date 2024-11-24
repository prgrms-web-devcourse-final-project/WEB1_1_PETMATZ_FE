import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
    UseFormWatch,
} from 'react-hook-form';
import WarningIcon from '@/assets/images/warning.svg?react';
import SuccessIcon from '@/assets/images/success.svg?react';

interface CustomInputProps<T extends FieldValues> {
    id: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<T>;
    watch: UseFormWatch<T>; // 타입을 정확히 명시
    validation?: RegisterOptions<T>;
    error?: string;
    design: 'solid' | 'outline';
    successMsg: string;
}

export default function CustomInput<T extends FieldValues>({
    id,
    label,
    type = 'text',
    placeholder,
    register,
    watch,
    validation,
    error,
    design = 'solid',
    successMsg,
}: CustomInputProps<T>) {
    const inputValue = watch(id);

    const inputClasses = `
			${design === 'solid' ? 'input-solid' : 'input-outline'}
			${error ? 'input-warning' : successMsg && inputValue ? 'input-success' : ''}
	`;

    return (
        <div className="flex flex-col text-gray-500 gap-[8px]">
            <label htmlFor={id} className="text-label-m">
                {label}
            </label>
            <div className="flex flex-col gap-[4px]">
                <input
                    className={inputClasses.trim()}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...register(id, validation)}
                    style={{
                        WebkitBoxShadow: '0 0 0 30px white inset',
                        WebkitTextFillColor: 'inherit',
                    }}
                />
                <p className="text-label-s px-[24px]">
                    {error ? (
                        <span className="text-warning-400 flex items-center gap-[0.5px]">
                            <WarningIcon />
                            {error}
                        </span>
                    ) : successMsg && inputValue ? (
                        <span className="text-success-400 flex items-center gap-[0.5px]">
                            <SuccessIcon />
                            {successMsg}
                        </span>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </p>
            </div>
        </div>
    );
}

import {
    ArrayPath,
    Control,
    FieldErrors,
    FieldValues,
    Path,
    useFieldArray,
} from 'react-hook-form';

interface DynamicInputFieldsProps<T extends FieldValues> {
    control: Control<T>;
    name: ArrayPath<T>;
    errors: FieldErrors<T>;
    label: string;
}

export default function DynamicInputFields<T extends FieldValues>({
    control,
    name,
    errors,
    label,
}: DynamicInputFieldsProps<T>) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="flex flex-col h-full gap-[16px]">
            <div className="flex flex-col gap-[8px]">
                {fields.map((field, index) => {
                    const fieldName = `${name}.${index}.value` as Path<T>;
                    const fieldError = (
                        errors[name as keyof FieldErrors<T>] as any
                    )?.[index]?.value;

                    return (
                        <div key={field.id} className="flex flex-col gap-[8px]">
                            <label
                                className="text-gray-500 text-label-m"
                                htmlFor={`${name}.${index}`}
                            >{`${label} ${index + 1}`}</label>
                            <div className="flex items-center gap-[8px]">
                                <input
                                    id={`${name}.${index}`}
                                    {...control.register(fieldName, {
                                        required: `${label} ${index + 1}(을/를) 입력해주세요`,
                                    })}
                                    placeholder={`${label}을 입력하세요`}
                                    className={`input-outline flex-1 ${fieldError ? 'input-warning' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="btn-md border-1 min-w-[48px] border-warning-300 rounded-lg text-warning-300 hover:bg-warning-100 active:bg-warning-100 hover:border-warning-400 hover:text-warning-400 focus:border-warning-400 focus:text-warning-400"
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button
                type="button"
                onClick={() => append({ value: '' } as any)} // 초기값 추가
                className="btn-outline max-w-full"
            >
                +
            </button>
        </div>
    );
}

import { Controller, Control, FieldValues, Path } from 'react-hook-form';

// 제네릭 타입을 사용해 더 유연하게 만듦
export interface MultiSelectTagProps<T extends FieldValues> {
    label: string;
    name: keyof T;
    options: { value: string; label: string }[];
    control: Control<T>;
    rules?: object;
}

export default function MultiSelectTag<T extends FieldValues>({
    label,
    name,
    options,
    control,
    rules = {},
}: MultiSelectTagProps<T>) {
    return (
        <div className="mb-4">
            <label className="block text-gray-500 text-label-m mb-2">
                {label}
            </label>
            <Controller
                name={name as Path<T>}
                control={control}
                rules={rules}
                render={({ field: { value, onChange } }) => (
                    <div className="flex flex-wrap gap-2">
                        {options.map((option) => (
                            <span
                                key={option.value}
                                onClick={() => {
                                    const newValue = value?.includes(
                                        option.value,
                                    )
                                        ? value.filter(
                                              (v: string) => v !== option.value,
                                          )
                                        : [...(value || []), option.value];
                                    onChange(newValue);
                                }}
                                className={`cursor-pointer text-body-m px-[18px] py-[6px] rounded-full ${
                                    value?.includes(option.value)
                                        ? 'bg-point-500 text-white border-point-500'
                                        : 'bg-white text-point-300 border-point-100'
                                } border`}
                            >
                                {option.label}
                            </span>
                        ))}
                    </div>
                )}
            />
        </div>
    );
}

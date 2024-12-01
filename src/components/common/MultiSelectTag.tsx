import { Controller, Control, FieldValues, Path } from 'react-hook-form';

export interface MultiSelectTagProps<T extends FieldValues> {
    label: string;
    name: keyof T;
    options: { value: string; label: string }[];
    control: Control<T>;
    rules?: object;
    singleSelect?: boolean;
}

export default function MultiSelectTag<T extends FieldValues>({
    label,
    name,
    options,
    control,
    rules = {},
    singleSelect = false,
}: MultiSelectTagProps<T>) {
    return (
        <div className="mb-4 w-[fit-content]">
            <label className="block text-gray-500 text-label-m mb-2">
                {label}
            </label>
            <Controller
                name={name as Path<T>}
                control={control}
                rules={rules}
                render={({ field: { value, onChange } }) => {
                    // 값을 배열로 변환 (내부 처리용)
                    const currentValue: string[] = Array.isArray(value)
                        ? value
                        : value
                          ? [value]
                          : [];

                    return (
                        <div className="flex flex-wrap gap-2">
                            {options.map((option) => (
                                <span
                                    key={option.value}
                                    onClick={() => {
                                        // 단일 선택일 경우 값만 전달, 다중 선택일 경우 배열로 전달
                                        const newArrayValue = singleSelect
                                            ? [option.value]
                                            : currentValue?.includes(
                                                    option.value,
                                                )
                                              ? currentValue.filter(
                                                    (v: string) =>
                                                        v !== option.value,
                                                )
                                              : [
                                                    ...(currentValue || []),
                                                    option.value,
                                                ];

                                        // singleSelect일 경우 배열의 첫 번째 값만 전달
                                        onChange(
                                            singleSelect
                                                ? newArrayValue[0]
                                                : newArrayValue,
                                        );
                                    }}
                                    className={`cursor-pointer text-body-m px-[18px] py-[6px] rounded-full border ${
                                        currentValue?.includes(option.value)
                                            ? 'bg-point-500 text-white border-point-500'
                                            : 'bg-white text-point-300 border-point-100'
                                    }`}
                                >
                                    {option.label}
                                </span>
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
}

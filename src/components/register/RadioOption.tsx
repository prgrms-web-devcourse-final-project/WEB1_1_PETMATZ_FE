interface RadioOptionProps {
    id: string;
    value: string;
    register?: () => void;
    name: string;
    currentValue: string;
    label: string;
    onSelect?: (value: string) => void;
}

export default function RadioOption({
    id,
    value,
    register,
    name,
    currentValue,
    label,
    onSelect,
}: RadioOptionProps) {
    const handleChange = () => {
        register?.();
        onSelect?.(value);
    };

    return (
        <div className="flex items-center me-4">
            <input
                id={id}
                type="radio"
                value={value}
                name={name}
                checked={currentValue === value}
                onChange={handleChange}
                className={`w-4 h-4 border-gray-300 ${
                    currentValue === value ? 'text-point-500' : 'text-point-50'
                }`}
            />
            <label
                htmlFor={id}
                className="ms-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
        </div>
    );
}

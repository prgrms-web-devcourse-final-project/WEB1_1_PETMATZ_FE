import { useRef, useState } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';

// SVG
import ArrowBottomIcon from '@/assets/images/arrow/arrowBottom.svg?react';
import XIcon from '@/assets/images/common/x.svg?react';

interface Option {
    id: number;
    label: string;
}

interface MultiSelectBottomSheetProp {
    options: Option[];
    title: string;
    placeholder: string;
    value: Option[];
    onChange: (value: Option[]) => void;
    className?: string;
}

const MultiSelectBottomSheet: React.FC<MultiSelectBottomSheetProp> = ({
    placeholder,
    options,
    title,
    value,
    onChange,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const sheetRef = useRef<SheetRef>();

    // 선택 해제
    const handleRemoveOption = (optionId: number) => {
        const updatedValue = value.filter((v) => v.id !== optionId);
        onChange(updatedValue);
    };

    // 옵션 추가/제거 핸들러
    const handleToggleOption = (option: Option) => {
        if (value.some((v) => v.id === option.id)) {
            // 이미 선택된 경우 제거
            handleRemoveOption(option.id);
        } else {
            onChange([...value, option]);
        }
    };

    return (
        <div className="flex flex-col gap-[8px]">
            <span className="text-gray-500 text-label-m">{title}</span>
            <div
                className={`w-full flex justify-between items-center py-[14px] px-[24px] text-gray-400 text-body-m border-gray-200 border-1 rounded-lg cursor-pointer focus:text-point-300 focus:border-point-300 hover:text-point-300 hover:border-point-300 active:text-point-300 active:border-point-300 ${className}`}
                onClick={() => setIsOpen(true)}
            >
                {placeholder}
                <ArrowBottomIcon className="w-[18px] h-[18px]" />
            </div>
            <div className="flex items-center gap-[4px] flex-wrap">
                {value.length > 0 ? (
                    value.map((selected: Option) => (
                        <span
                            key={selected.id}
                            className="flex items-center justify-center text-label-s font-extrabold text-point-500 cursor-pointer py-[4px] px-[8px] rounded-lg bg-point-100 gap-[4px]"
                            onClick={() => handleRemoveOption(selected.id)}
                        >
                            {selected.label}
                            <XIcon className="w-[13px] h-[13px] text-point-300" />
                        </span>
                    ))
                ) : (
                    <div className="h-[21px]" />
                )}
            </div>

            {/* Bottom Sheet */}
            <Sheet
                ref={sheetRef}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                snapPoints={[260, 0]}
                initialSnap={0}
                className="max-w-[768px] mx-auto cursor-pointer"
            >
                <Sheet.Backdrop onTap={() => setIsOpen(false)} />
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <p className="text-body-m font-extrabold text-gray-900 text-center">
                            {title}
                        </p>
                        <Sheet.Scroller>
                            <div className="flex flex-col">
                                {options?.map((option) => (
                                    <div
                                        key={option.id}
                                        className="py-[16px] px-[24px] text-body-s text-gray-900 hover:bg-point-100 active:bg-point-100"
                                        onClick={() =>
                                            handleToggleOption(option)
                                        }
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        </div>
    );
};

export default MultiSelectBottomSheet;

import ReactDOM from 'react-dom';
import CameraBtn from '@/assets/images/signup/camera-s.svg?react';
import { useCallback, useState } from 'react';

interface ImageSelectBoxProps {
    label: string;
    bottomSheetLabel: string; // label string for bottom sheet
    imgName: string; // state value of image name
    setImgName: React.Dispatch<React.SetStateAction<string>>; // setState about image name
    className?: string;
}

export default function ImageSelectBox({
    label,
    bottomSheetLabel,
    imgName,
    setImgName,
    className = '',
}: ImageSelectBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenImgName, setChosenImgName] = useState(imgName);

    const handleToggleBottomSheetBtn = useCallback(() => {
        setChosenImgName(imgName);
        setIsOpen((prev) => !prev);
    }, [imgName]);

    const handleChooseImg = useCallback((name: string) => {
        setChosenImgName(name);
    }, []);

    const handleDecideImg = useCallback(() => {
        setImgName(chosenImgName);
        setIsOpen((prev) => !prev);
    }, [chosenImgName]);

    const modalContent = (
        <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 mx-auto z-50 bg-dim opacity-90 w-full"
        >
            <div className="absolute w-full bottom-0 rounded-t-2xl bg-white">
                <div className="flex justify-begin items-center rounded-t-2xl text-body-m text-black font-extrabold p-6">
                    {bottomSheetLabel}
                </div>
                <div className="px-[43px] py-[16px] flex flex-col gap-8">
                    <section className="flex flex-col gap-6">
                        <div className="flex justify-center">
                            <img
                                src={`src/assets/images/signup/${chosenImgName}.svg`}
                                alt="기본 프로필 이미지"
                                className="w-100 h-100 rounded-full border-[1px] border-gray-200"
                            />
                        </div>
                        <div className="flex justify-center gap-4">
                            <img
                                src={`src/assets/images/signup/profile=1.svg`}
                                alt="기본 프로필 이미지 1"
                                onClick={() => handleChooseImg('profile=1')}
                                className="w-[56px] h-[56px] rounded-full border-[1px] border-gray-200 cursor-pointer"
                            />
                            <img
                                src={`src/assets/images/signup/profile=2.svg`}
                                alt="기본 프로필 이미지 2"
                                onClick={() => handleChooseImg('profile=2')}
                                className="w-[56px] h-[56px] rounded-full border-[1px] border-gray-200 cursor-pointer"
                            />
                            <img
                                src={`src/assets/images/signup/profile=3.svg`}
                                alt="기본 프로필 이미지 3"
                                onClick={() => handleChooseImg('profile=3')}
                                className="w-[56px] h-[56px] rounded-full border-[1px] border-gray-200 cursor-pointer"
                            />
                        </div>
                    </section>
                    <section className="flex gap-[10px]">
                        <button
                            onClick={handleToggleBottomSheetBtn}
                            className="btn-outline flex-1"
                        >
                            돌아가기
                        </button>
                        <button
                            onClick={handleDecideImg}
                            className="btn-solid flex-1"
                        >
                            확인
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`w-full mx-auto flex flex-col gap-2 ${className}`}>
            <label className="text-label-m">{label}</label>
            <div className="w-full flex justify-center pb-[18px]">
                <div className="relative">
                    <img
                        src={`src/assets/images/signup/${imgName}.svg`}
                        alt="기본 프로필 이미지"
                        className="w-100 h-100 rounded-full border-[1px] border-gray-200"
                    />
                    <CameraBtn
                        onClick={handleToggleBottomSheetBtn}
                        className="absolute bottom-0 right-0 cursor-pointer"
                    />
                </div>
            </div>
            {isOpen && ReactDOM.createPortal(modalContent, document.body)}
        </div>
    );
}

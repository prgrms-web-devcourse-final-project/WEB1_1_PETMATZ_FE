import ReactDOM from 'react-dom';
import CameraBtn from '@/assets/images/profile/camera-s.svg?react';
import AlbumBtn from '@/assets/images/profile/camera-g.svg?react';
import { useCallback, useRef, useState } from 'react';

interface ImageSelectBoxProps {
    label: string;
    bottomSheetLabel: string; // label string for bottom sheet
    imgName: string; // state value of image name
    setImgName: React.Dispatch<React.SetStateAction<string>>; // setState about image name
    className?: string;
    setImg: React.Dispatch<React.SetStateAction<File | null>>; // setState about image file
}

export default function ImageSelectBox({
    label,
    bottomSheetLabel,
    imgName,
    setImgName,
    className = '',
    setImg,
}: ImageSelectBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenImgName, setChosenImgName] = useState(imgName);
    const fileInput = useRef<HTMLInputElement>(null);

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

    const handleButtonClick = useCallback(() => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }, [fileInput]);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setImg(file);
                setChosenImgName(URL.createObjectURL(file));
            }
        },
        [setImg, setChosenImgName],
    );

    const modalContent = (
        <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 mx-auto z-50 w-full min-w-[360px] max-w-[768px]"
        >
            <div className="absolute inset-0 bg-dim opacity-90"></div>
            <div className="absolute w-full bottom-0 rounded-t-2xl bg-white">
                <div className="flex justify-begin items-center rounded-t-2xl text-body-m text-black font-extrabold p-6">
                    {bottomSheetLabel}
                </div>
                <div className="px-[43px] py-[16px] flex flex-col gap-8">
                    <section className="flex flex-col gap-6">
                        <div className="w-full flex justify-center ">
                            <div className="relative w-[100px] h-[100px]">
                                <img
                                    src={
                                        chosenImgName.startsWith('profile')
                                            ? `/profile/${chosenImgName}.svg`
                                            : chosenImgName
                                    }
                                    alt="프로필 이미지"
                                    className="object-cover w-full h-full rounded-full border-[1px] border-gray-200"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInput}
                                onChange={handleFileChange}
                            />
                            <AlbumBtn
                                onClick={handleButtonClick}
                                className="cursor-pointer"
                            />
                            <img
                                src={`/profile/profile1.svg`}
                                alt="기본 프로필 이미지 1"
                                onClick={() => handleChooseImg('profile1')}
                                className="w-[56px] h-[56px] rounded-full border-[1px] border-gray-200 cursor-pointer"
                            />
                            <img
                                src={`/profile/profile2.svg`}
                                alt="기본 프로필 이미지 2"
                                onClick={() => handleChooseImg('profile2')}
                                className="w-[56px] h-[56px] rounded-full border-[1px] border-gray-200 cursor-pointer"
                            />
                            <img
                                src={`/profile/profile3.svg`}
                                alt="기본 프로필 이미지 3"
                                onClick={() => handleChooseImg('profile3')}
                                className="w-[56px] h-[56px] rounded-full border-[1px] border-gray-200 cursor-pointer"
                            />
                        </div>
                    </section>
                    <section className="flex gap-[10px] w-full max-w-[600px] mx-auto">
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
            <label className="text-label-m text-gray-500">{label}</label>
            <div className="w-full flex justify-center pb-[18px]">
                <div className="relative">
                    <div className="relative w-[100px] h-[100px]">
                        <img
                            src={
                                imgName.startsWith('profile')
                                    ? `/profile/${imgName}.svg`
                                    : imgName
                            }
                            alt="기본 프로필 이미지"
                            className="object-cover w-full h-full rounded-full border-[1px] border-gray-200"
                        />
                    </div>
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

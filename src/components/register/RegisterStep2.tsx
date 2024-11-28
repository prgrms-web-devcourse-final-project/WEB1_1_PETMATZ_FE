import { ImageSelectBox } from '../common';
import { ToastAnchor } from '@/components/common';
import { RegisterStep2Props } from '@/types/register';

export default function RegisterStep2({
    onNext,
    watch,
    // getValue,
    setValue,
    imgName,
    setImgName,
}: RegisterStep2Props) {
    const handleNext = () => {
        setValue('dogImg', imgName);
        // console.log(getValue());

        onNext();
    };

    return (
        <div className="flex flex-col justify-between h-full">
            {/* 프로그래스바 */}
            <div className="w-full bg-white h-1">
                <div className="bg-point-400 h-1 w-[50%]"></div>
            </div>

            <section className="flex flex-col w-full flex-1">
                <div className="bg-white pt-6 pb-12 flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <h1 className="mb-12 text-title-s text-gray-800 font-extrabold">
                            멍멍이 정보를
                            <br /> 확인해주세요
                        </h1>

                        {/* 프로필 사진 */}
                        <div className="flex w-full flex-col gap-2 mb-4">
                            <ImageSelectBox
                                label="프로필 사진"
                                bottomSheetLabel="프로필 이미지를 선택하세요."
                                imgName={imgName}
                                setImgName={setImgName}
                            />
                        </div>

                        {/* 멍멍이 이름 */}
                        <div className="flex w-full flex-col gap-2 mb-4">
                            <p className="text-label-m font-normal text-gray-500">
                                멍멍이 이름
                            </p>
                            <input
                                type="text"
                                className="input-outline bg-gray-200"
                                value={watch('dogName')}
                                disabled
                            />
                        </div>

                        {/* 품종 입력 */}
                        <div className="flex w-full flex-col gap-2 mb-4">
                            <p className="text-label-m font-normal text-gray-500">
                                품종 입력
                            </p>
                            <input
                                type="text"
                                className="input-outline bg-gray-200"
                                value={watch('breed')}
                                disabled
                            />
                        </div>

                        {/* 성별 선택 */}
                        <div className="flex w-full flex-col gap-2 mb-4">
                            <p className="text-label-m font-normal text-gray-500">
                                성별
                            </p>
                            <input
                                type="text"
                                className="input-outline bg-gray-200"
                                value={watch('gender')}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <ToastAnchor>
                    <button
                        type="button"
                        className="btn-solid w-full"
                        onClick={handleNext}
                    >
                        다음
                    </button>
                </ToastAnchor>
            </footer>
        </div>
    );
}

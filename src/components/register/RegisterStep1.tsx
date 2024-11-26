interface RegisterStep1Props {
    onNext: () => void;
}

export default function RegisterStep1({ onNext }: RegisterStep1Props) {
    return (
        <div className="flex flex-col justify-between h-full ">
            {/* 프로그래스바 */}
            <div className="w-full bg-white h-1">
                <div className="bg-point-400 h-1 w-[25%]"></div>
            </div>
            <section className="flex flex-col w-full flex-1 ">
                <div className="bg-white pt-6 pb-12 flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <h1 className="mb-12 text-title-s text-gray-800 font-extrabold">
                            등록번호를
                            <br /> 조회할게요!
                        </h1>
                        <div className="flex w-full flex-col gap-2 mb-4">
                            <label className="flex text-label-m font-normal text-gray-500">
                                소유자 성명
                            </label>
                            <input
                                type="text"
                                className="input-outline w-full"
                                placeholder="등록번호를 입력해주세요."
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2 mb-4">
                            <label className="text-label-m font-normal text-gray-500">
                                멍멍이 등록 번호
                            </label>
                            <input
                                type="text"
                                className="input-outline"
                                placeholder="이름을 입력해주세요."
                            />
                        </div>

                        <div className="flex justify-end items-center w-full">
                            <a
                                href="https://www.animal.go.kr/front/index.do"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-label-l font-semibold text-point-400 cursor-pointer"
                            >
                                등록번호를 잊으셨나요?
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <button className="btn-solid w-full" onClick={onNext}>
                    조회하기
                </button>
            </footer>
        </div>
    );
}

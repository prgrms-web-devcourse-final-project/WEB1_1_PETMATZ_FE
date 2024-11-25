interface RegisterStep1Props {
    onNext: () => void;
}

export default function RegisterStep1({ onNext }: RegisterStep1Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col flex-1 w-full py-3">
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="text-label-m font-normal text-gray-500">
                        멍멍이 등록 번호
                    </p>
                    <input type="text" className="input-outline" />
                </div>
                <div className="flex w-full flex-col gap-2 mb-4">
                    <p className="flex text-label-m font-normal text-gray-500">
                        소유자 성명
                    </p>
                    <input type="text" className="input-outline w-full" />
                </div>
                <div>
                    <a
                        href="https://www.animal.go.kr/front/index.do" // 외부 주소
                        target="_blank" // 새 창에서 열리도록 설정
                        rel="noopener noreferrer" // 보안 및 성능 개선
                        className="flex justify-center text-label-m font-normal text-gray-500 hover:text-point-500"
                    >
                        등록번호를 잊어버리셨나요?{' '}
                    </a>
                </div>
            </div>
            <div className="fixed py-2.5 bottom-0 w-full left-0 px-4">
                <button
                    className="btn-solid bg-point-500 w-full py-2 text-white"
                    onClick={onNext}
                >
                    조회하기
                </button>
            </div>
        </div>
    );
}

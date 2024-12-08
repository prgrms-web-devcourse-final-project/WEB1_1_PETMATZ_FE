import ArrowRight from '@/assets/images/arrow/arrowRight.svg?react';

export default function HomeHelpDog() {
    return (
        <div className="w-full h-auto border border-point-700 flex flex-col gap-6">
            <div>
                <p className="flex justify-between text-label-m font-extrabold text-gray-700 px-[18px] py-3 bg-point-50 rounded-full rounded-bl-lg">
                    12월9일 성민님은 인절미를 돌보고 있어요!
                    <ArrowRight className="w-3 h-3" />
                </p>
            </div>

            <div>
                <div className="flex justify-between items-center border border-point-600">
                    <h2 className="text-body-xl font-extrabold text-gray-800 mb-[18px]">
                        부탁해 멍멍
                    </h2>
                    <button className="text-label-m font-semibold text-gray-400">
                        더보기
                    </button>
                </div>
                돌본 댕댕이 맡긴 댕댕이 카드영역
            </div>

            <div className="w-full h-[153px] px-6 py-[18px] bg-white rounded-2xl">
                <h2 className="text-body-l font-extrabold mb-2 text-gray-900">
                    다른 댕댕이도{<br />} 도움이 필요한 것 같아요
                </h2>
                <p className="text-label-m font-semibold gray-600 mb-[18px]">
                    도움이 필요한 댕댕이를 찾아봐요
                </p>
                <button className="btn-solid h-[31px] w-[90px] text-label-m font-extrabold">
                    부탁보기
                </button>
            </div>
        </div>
    );
}

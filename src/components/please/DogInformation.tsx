interface DogInfoProps {
    dogId?: string; // 필요하다면 개별 멍멍이 ID 추가
}

export default function DogInformation({ dogId }: DogInfoProps) {
    // 만약 특정 멍멍이 ID로 데이터를 불러와야 한다면 useEffect 등을 사용
    return (
        <div className="p-4 overflow-y-auto h-full">
            <h1 className="text-title-s font-extrabold text-gray-800 pt-8">
                <p>우리가</p>
                <p>도와줄 멍멍이는</p>
            </h1>
            <div className="space-y-3">
                <div>
                    <label className="text-gray-600 font-medium">이름</label>
                    <p className="text-gray-900">멍멍이</p>
                </div>
                <div>
                    <label className="text-gray-600 font-medium">나이</label>
                    <p className="text-gray-900">3살</p>
                </div>
                <div>
                    <label className="text-gray-600 font-medium">견종</label>
                    <p className="text-gray-900">말티즈</p>
                </div>
            </div>
        </div>
    );
}

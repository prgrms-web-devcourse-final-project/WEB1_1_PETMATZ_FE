interface RequestListProps {
    dogId?: string; // 필요하다면 개별 멍멍이 ID 추가
}

export default function RequestList({ dogId }: RequestListProps) {
    // 실제 데이터는 API 호출 등으로 가져올 수 있음
    const requests = [
        { id: 1, title: '산책 부탁', description: '오후 3시에 30분간 산책' },
        { id: 2, title: '급식 주기', description: '저녁 6시에 사료 급여' },
        {
            id: 3,
            title: '약 먹이기',
            description: '저녁 식사 후 약 2알 먹이기',
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-title-s font-extrabold text-gray-800 mb-4">
                부탁 리스트
            </h2>
            <div className="space-y-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                        <h3 className="font-bold text-gray-900 mb-2">
                            {request.title}
                        </h3>
                        <p className="text-gray-600">{request.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

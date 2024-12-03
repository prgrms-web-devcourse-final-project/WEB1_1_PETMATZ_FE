import { useParams } from 'react-router-dom';

export default function SOSDetail() {
    const { id } = useParams();
    // useEffect로 postId에 해당하는 데이터를 불러와서 상세 페이지 구성

    return (
        <div className="p-4 overflow-y-auto h-full">
            <h1 className="text-xl font-bold">
                id : {id} 도와줘 멍멍 디테일 페이지
            </h1>
        </div>
    );
}

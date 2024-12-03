import { useParams } from 'react-router-dom';

export default function PleaseDetail() {
    const { id } = useParams();
    // useEffect로 부탁 id에 해당하는 데이터를 불러와서 상세 페이지 구성

    return (
        <div className="p-4 overflow-y-auto h-full">
            <h1 className="text-xl font-bold">id : {id} 부탁 디테일 페이지</h1>
        </div>
    );
}

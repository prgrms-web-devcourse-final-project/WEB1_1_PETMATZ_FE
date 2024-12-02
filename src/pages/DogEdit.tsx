import { useParams } from 'react-router-dom';

export default function DogEdit() {
    const { id } = useParams<{ id: string }>();

    return <div>멍멍이 프로필 수정페이지, id: {id}</div>;
}

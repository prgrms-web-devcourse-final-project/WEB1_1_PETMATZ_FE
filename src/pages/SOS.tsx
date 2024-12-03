import { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '@/types/Sos';
import { PostItem } from '@/components/sos';
import { Loading } from '@/components/common';
import { useUserStore } from '@/stores';

const PostList = ({ posts }: { posts: Post[] }) => {
    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post, id) => <PostItem key={id} post={post} />)
            ) : (
                <p className="text-center text-gray-500">
                    아직 게시된 SOS 요청이 없습니다.
                </p>
            )}
        </div>
    );
};

export default function SOS() {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(true); // 임시 loading
    const [dummy, setDummy] = useState<Post[]>([]);
    const { user } = useUserStore();
    console.log(user?.region);

    const goToWrite = () => {
        navigate('/sos/write');
    };

    useEffect(() => {
        // 임시로 3초 뒤에 로딩 해제
        // const timer = setTimeout(() => {
        //     setIsLoading(false);
        // }, 3000);

        fetch('/data/sosList.json')
            .then((res) => res.json())
            .then((res) => setDummy(res));
        // return () => clearTimeout(timer);
    }, []);

    // if (isLoading) {
    //     // @tanstack/react-query 적용 후 제거, 임시 테스트용
    //     return <Loading />;
    // }

    return (
        // <Suspense fallback={<Loading />}>
        <div className="p-4 overflow-y-auto h-full">
            <h1 className="text-xl font-bold">도와줘 멍멍</h1>
            <h2 className="text-lg mb-4">
                급한 돌봄이 필요한 멍멍이들을 도와주세요!
            </h2>
            <button onClick={goToWrite} className="text-purple-500">
                글쓰러 가기(bottomSheet나 버튼으로 이동 적용)
            </button>

            <PostList posts={dummy} />

            {/* pagination 적용 */}
        </div>
        // </Suspense>
    );
}

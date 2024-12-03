import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useFadeNavigate } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import { ToastAnchor } from '@/components/common';

export default function PleaseDetail() {
    const { id } = useParams();
    const navigate = useFadeNavigate();

    const handleBackBtn = useCallback(() => {
        navigate('/');
    }, []);

    // useEffect로 부탁 id에 해당하는 데이터를 불러와서 상세 페이지 구성

    return (
        <>
            <div className="h-screen bg-gray-100 flex flex-col justify-between overflow-hidden">
                <header className="bg-white h-14 w-full flex items-center justify-center">
                    <Back
                        onClick={handleBackBtn}
                        className="absolute left-[26px] cursor-pointer"
                    />
                    <h1 className="text-point-900 text-body-l font-extrabold">
                        멍멍이의 부탁
                    </h1>
                </header>
                <section className="flex-1 flex flex-col justify-start">
                    <div className="bg-white pt-6 pb-12 flex flex-col">
                        <div className="w-full max-w-[600px] px-6 mx-auto">
                            <div className="p-4 overflow-y-auto h-full">
                                <h1 className="text-title-s font-extrabold text-gray-800 pb-12">
                                    id : {id} 부탁 디테일 페이지
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                    <ToastAnchor>
                        <button type="submit" className="btn-solid">
                            멍멍이 돌봄 시작하기
                        </button>
                    </ToastAnchor>
                </footer>
            </div>
        </>
    );
}

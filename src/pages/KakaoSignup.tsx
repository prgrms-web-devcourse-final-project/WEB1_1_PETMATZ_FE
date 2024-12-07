import { useState, useCallback, useEffect } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import { Loading } from '@/components/common';
import { KakaoFourthStep, KakaoThirdStep, Success } from '@/components/kakao';
import { useFadeNavigate } from '@/hooks';
import { getMyProfileInfo } from '@/hooks/api/user';
import useKakaoSignupForm from '@/hooks/useKakaoForm';
import { useUserStore } from '@/stores';

export default function KakaoSignup() {
    const navigate = useFadeNavigate();
    const { setUser } = useUserStore();
    const [loading, setLoading] = useState(true); // 추가: 프로필 데이터 로딩 상태 관리

    // Zustand에서 유저 정보를 가져오거나 초기화
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getMyProfileInfo();
            if (response.ok) {
                const { id, accountId, nickname, isRegistered, region } =
                    response.data;
                setUser({
                    id,
                    accountId,
                    nickname,
                    isRegistered,
                    region,
                });
            } else {
                console.error('Failed to retrieve profile:', response.error);
            }
            setLoading(false); // 로딩 완료
        };

        fetchProfile();
    }, [setUser]);

    // useKakaoSignupForm 훅
    const {
        pageNumber,
        setPageNumber,
        nicknameValidation,
        introduceValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        setValue,
        isValid,
        control,
        success,
        imgName,
        setImgName,
        setImg,
        showModal,
        setShowModal,
    } = useKakaoSignupForm();

    // 뒤로가기 버튼 핸들러
    const handleBackBtn = useCallback(() => {
        if (pageNumber === 1) {
            navigate(-1);
        } else {
            setPageNumber((prev) => prev - 1);
        }
    }, [pageNumber, navigate, setPageNumber]);

    // 로딩 상태 처리
    if (loading) {
        return (
            <div className="bg-white h-full flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    // 성공 화면
    if (success) return <Success />;

    // 회원가입 폼 화면
    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
            <header className="bg-white h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    회원가입
                </h1>
            </header>
            <form
                id="signup-form"
                onSubmit={handleSubmit(onSubmit)}
                className="h-full flex-1 flex flex-col justify-between"
            >
                <KakaoThirdStep
                    pageNumber={pageNumber}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    nicknameValidation={nicknameValidation}
                    introduceValidation={introduceValidation}
                    errors={errors}
                    setPageNumber={setPageNumber}
                    imgName={imgName}
                    setImgName={setImgName}
                    setImg={setImg}
                />
                <KakaoFourthStep
                    pageNumber={pageNumber}
                    register={register}
                    watch={watch}
                    errors={errors}
                    control={control}
                    isValid={isValid}
                    loading={loading}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </form>
        </div>
    );
}

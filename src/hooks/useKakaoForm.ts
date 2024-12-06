import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFadeNavigate from './useFadeNavigate';
import { useCustomToast } from '@/components/common';
import { postkakaoSignup } from './api/user';
import { putImageToS3 } from './api/auth';

/**
 * Kakao Signup form types
 */
export interface KakaoSignUpInputs {
    /** User's nickname */
    nickname: string;
    /** User's introduce */
    introduce: string;
    /** User's gender */
    genderBool: boolean;
    /** User's possibility of caring dogs */
    possible: boolean;
    /** User's preference of dog sizes */
    dogSizes: string[];
    /** User's mbti */
    mbti: string;
}

export interface nicknameValidationType {
    required: string;
    minLength: {
        value: number;
        message: string;
    };
    maxLength: {
        value: number;
        message: string;
    };
    pattern: {
        value: RegExp;
        message: string;
    };
}

export interface introduceValidationType {
    maxLength: {
        value: number;
        message: string;
    };
}

// 위치 정보를 가져오는 함수
const getLocation = () => {
    return new Promise<{ latitude: string; longitude: string }>(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    });
                },
                (error) => {
                    reject(error);
                },
            );
        },
    );
};

/**
 * Custom hook for handling KakaoSignup form logic
 * @returns {Object} Form methods and handlers
 */
export default function useKakaoSignupForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        control,
    } = useForm<KakaoSignUpInputs>({
        shouldFocusError: false,
        mode: 'onChange',
    });

    const [pageNumber, setPageNumber] = useState(3);
    const [success, setSuccess] = useState(false);
    const [imgName, setImgName] = useState('profile1');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { showToast, isToastActive } = useCustomToast();
    const navigate = useFadeNavigate();
    const [imgFile, setImg] = useState<File | null>(null);

    /**
     * Handles form submission
     */
    const onSubmit = async (data: KakaoSignUpInputs) => {
        if (isToastActive()) {
            return;
        }
        setLoading(true);
        // 여기에 로그인 로직을 구현하세요
        const { nickname, introduce, genderBool, possible, dogSizes, mbti } =
            data;

        const introduction = introduce;
        const isCareAvailable = possible;
        const preferredSizes = dogSizes;
        const gender = genderBool ? 'FEMALE' : 'MALE';
        const profileImg = imgName.startsWith('profile') ? imgName : '';
        // 위치 정보 가져오기
        const { latitude, longitude } = await getLocation();
        await postkakaoSignup({
            nickname,
            gender,
            preferredSizes,
            introduction,
            isCareAvailable,
            mbti,
            latitude,
            longitude,
            profileImg,
        }).then(async (response) => {
            setShowModal(false);
            if (response.ok) {
                // if (response.data.imgURL !== '') {
                //     const id = response.data.id!;
                //     const imgURL = response.data.imgURL!;
                //     const img = new FormData();
                //     img.append('file', imgFile!);
                //     const type = 'U';

                //     const result = await putImageToS3({
                //         id,
                //         imgURL,
                //         img,
                //         type,
                //     });

                //     if (result) {
                //         setSuccess(true);
                //         setTimeout(() => {
                //             navigate('/login');
                //         }, 3000);
                //     } else {
                //         showToast('회원 등록에 실패했습니다!', 'warning');
                //     }
                // } else {
                //     setSuccess(true);
                //     setTimeout(() => {
                //         navigate('/login');
                //     }, 3000);
                // }
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                showToast('서버 연결 문제가 발생했습니다!', 'warning');
            }
        });
        setLoading(false);
    };

    /**
     * nickname validation
     */
    const nicknameValidation = {
        required: '닉네임은 필수입니다!',
        minLength: {
            value: 2,
            message: '닉네임은 최소 2자 이상이어야 합니다!',
        },
        maxLength: {
            value: 10,
            message: '닉네임은 최대 10자 이하이어야 합니다!',
        },
        pattern: {
            value: /^[^\d]/,
            message: '닉네임은 숫자로 시작할 수 없습니다!',
        },
    };

    /**
     * introduce validation
     */
    const introduceValidation = {
        maxLength: {
            value: 50,
            message: '자기소개는 최대 50자 이하이어야 합니다!',
        },
    };

    return {
        pageNumber,
        setPageNumber,
        nicknameValidation,
        introduceValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isValid,
        control,
        success,
        imgName,
        setImgName,
        loading,
        showModal,
        setShowModal,
        setImg,
    };
}

import { BaseApiResponse } from './baseResponse';

export interface RegisterFormData {
    ownerName: string;
    registrationNumber: string;
    dogName: string;
    breed: string;
    age: string;
    favoritePlace: string;
    gender: string;
    neutered: string | boolean; //open api: string, post api: boolean
    size: string;
    dmbti: string;
    dogImg: string;
}

export interface RegisterStep1Props {
    onNext: () => void;
    register: UseFormRegister<RegisterFormData>;
    watch: UseFormWatch<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    getValue?: UseFormGetValues<RegisterFormData>;
    setValue: UseFormSetValue<RegisterFormData>;
}

// API 요청 인터페이스
export interface AnimalRegistrationParams {
    dog_reg_no: string; // 동물 등록 번호 (15자리 숫자)
    owner_nm: string; // 소유자 성명
}

// API 응답 인터페이스
export interface Register {
    dogNm: string;
    dogRegNo: string;
    kindNm: string;
    neuterYn: string;
    sexNm: string;
    // profileImg?: string;
}

// API 전체 응답 인터페이스
export interface AnimalRegistrationResponse {
    response: {
        header: {
            resultCode: string;
            resultMsg: string;
        };
        body: {
            item?: AnimalRegistrationData;
        };
    };
}

export interface RegisterStep2Props {
    onNext: () => void;
    watch: UseFormWatch<RegisterFormData>;
    getValue?: UseFormGetValues<RegisterFormData>;
    setValue: UseFormSetValue<RegisterFormData>;
    imgName: string;
    setImgName: React.Dispatch<React.SetStateAction<string>>;
}

export interface RegisterStep3Props {
    onNext: () => void;
    register: UseFormRegister<RegisterFormData>;
    watch: UseFormWatch<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    control: Control<RegisterFormData, any>;
    getValue?: UseFormWatch<RegisterFormData>;
}

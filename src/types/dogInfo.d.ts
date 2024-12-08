import { BaseApiResponse } from './baseResponse';

interface DogInfo {
    id: number; // 강아지 ID
    dogRegNo: null; // 등록 번호
    dogNm: string; // 강아지 이름
    sexNm: string; // 성별 ("수컷" 또는 "암컷")
    kindNm: string; // 품종
    neuterYn: string; // 중성화 여부 ("중성" 또는 "미중성")
    profileImg: string; // 프로필 이미지 URL
    age: number; // 나이
    temperament: string; // 성격 MBTI
    size: string; // 크기 ("SMALL", "MIDDLE", "Large")
    preferredWalkingLocation?: string; // 선호 산책 장소
    comment?: string; // 소개 또는 추가 정보
}

// 단일 강아지 정보 응답 타입
interface DogInfoResponse extends BaseApiResponse {
    data?: DogInfo;
}

// 복수 강아지 정보 응답 타입
interface DogsInfoResponse extends BaseApiResponse {
    data?: DogInfo[];
}

// Request body type
export interface DogProfileRequestBody {
    id: number;
    // dogRegNo?: string; // 동물등록번호
    petName: string; // 댕댕이 이름
    breed: string; // 견종
    // ownerNm: string;
    gender: string; // 성별
    neuterYn: string; // 중성화 여부
    size: string; // 댕댕이 크기
    age: number; // 나이
    temperament: string; // 성격
    // preferredWalkingLocation: string;
    profileImg: string; // 프로필 사진 URL
    comment?: string; // 간단한 소개 (특이사항)
}

export interface DogProfileResponse extends BaseApiResponse {
    responseCode: string;
    message: string; // Success message (e.g., "댕댕이 정보가 업데이트 완료되었습니다.")
}

// 멍멍이 삭제 요청값
export interface DeleteDogRequest {
    id: number; // 삭제할 멍멍이 ID
}

// 멍멍이 정보 삭제 응답 값
export interface DeleteDogResponse extends BaseApiResponse {
    data?: {
        responseCode: string;
        result: SOSDetails;
    };
}

export type {
    DogInfo,
    DogInfoResponse,
    DogsInfoResponse,
    DogProfileRequestBody,
    DogProfileResponse,
    DeleteDogRequest,
    DeleteDogResponse,
};

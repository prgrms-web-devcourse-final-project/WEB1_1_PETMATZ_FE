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
    data?: DogInfo[];
}

export type { DogInfo, DogInfoResponse };

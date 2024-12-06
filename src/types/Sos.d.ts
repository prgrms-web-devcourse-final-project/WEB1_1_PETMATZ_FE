import { BaseApiResponse } from './baseResponse';

export interface UserInfo {
    name: string; // 유저 이름
    recommendationCount: number; // 추천수
    careCount: number; // 돌봄수
    entrustCount: number; // 맡김수
    gender: 'male' | 'female'; // 유저 성별
}

// 멍멍이 정보 타입
export interface DogInfo {
    name: string; // 멍멍이 이름
    gender: 'male' | 'female'; // 멍멍이 성별
    size: '소형' | '중형' | '대형'; // 멍멍이 크기
    neuterYn: boolean; // 중성화 여부
    breed: string; // 품종
    age: number; // 나이 (년 기준)
    img: string; // 멍멍이 사진
}

// 게시물 타입
export interface Post {
    title: string; // 제목
    comment: string; // 내용
    user: UserInfo; // 유저 정보
    dog: DogInfo; // 멍멍이 정보
    startDate: string; // 돌봄 시작일 ex)2024-11-18  11:30
    endDate: string; // 돌봄 종료일
    wantPrice: number; // 희망 금액
    wantPriceType: 'hour' | 'day'; // 희망 금액 타입
    createdAt: string; // 게시물 생성일
}

export interface PostItemProps {
    post: Post; // 게시물 정보
    onClick?: () => void; // 클릭 이벤트
}

// SOS 게시물 목록 응답 타입(data 필드)
export interface SOSListResponse {
    posts: Post[];
    totalCount: number;
    pageNum: number;
    pageSize: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

export interface SOSListApiResponse extends BaseApiResponse {
    data: SOSListResponse;
}

// SOS 글 목록 조회 요청 타입
export interface SOSListRequest {
    pageNum?: number; // 페이지 번호
    pageSize?: number; // 페이지당 아이템 수
    // 필터링은 default : 최신순
}

// SOS 글 생성 요청 타입
export interface SOSCreateRequest {
    title: string;
    comment: string;
    startDate: string; // 'YYYY-MM-DD HH:MM' 형식
    endDate: string; // 'YYYY-MM-DD HH:MM' 형식
    paymentType: 'HOURLY' | 'DAILY' | 'NEGOTIABLE';
    price: number;
    petIds: number[];
}

// SOS 게시물 생성 응답 타입
export interface SOSCreateResponse {
    result: {
        id: number;
    };
}

// SOS 게시물 생성 API 응답 타입
export interface SOSCreateApiResponse extends BaseApiResponse {
    data: SOSCreateResponse;
}

// SOS 글 작성 저장 타입
export interface FormData {
    title: string;
    comment: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    paymentType: 'HOURLY' | 'DAILY' | 'NEGOTIABLE';
    price: number;
    selectedDogs: string[];
}

// 유저 강아지 타입 정의
export interface Pet {
    id: number;
    dogNm: string;
    dogRegNo?: string | null;
    sexNm?: string;
    kindNm?: string;
    neuterYn?: string;
    profileImg?: string;
    age?: number;
    temperament?: string;
    size?: string;
    preferredWalkingLocation?: string | null;
    comment?: string;
}

// 강아지 목록 API 응답 타입
export interface PetListResponse extends BaseApiResponse {
    data?: Pet[];
}

// SOS 글 수정 요청 인터페이스
export interface SOSUpdateRequest extends Partial<SOSCreateRequest> {
    postId: number; // 수정할 게시물 ID
}

export interface SOSDetails {
    id: number;
    title: string;
    paymentType: string;
    accountId: string;
    commnet: string;
    price: number;
    startDate: string;
    endDate: string;
    pets: Pet[];
    authorNickname: string;
    authorProfileImg: string;
    authorGender: string; // MALE or FEMALE
    authorRegion: string;
    userId: string;
    updatedAt: string;
    createdAt: string;
}

export interface SOSDetailsResponse extends BaseApiResponse {
    data?: {
        responseCode: string;
        result: SOSDetails;
    };
}
// SOS 글 삭제 요청 값
export interface SOSDeleteRequest {
    id: number; // 수정할 게시물 ID
}

// SOS 글 삭제 응답 값
export interface SOSDeleteResponse extends BaseApiResponse {
    data?: {
        responseCode: string;
        result: SOSDetails;
    };
}

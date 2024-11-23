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
    neutered: boolean; // 중성화 여부
    breed: string; // 품종
    age: number; // 나이 (년 기준)
    img: string; // 멍멍이 사진
}

// 게시물 타입
export interface Post {
    title: string; // 제목
    content: string; // 내용
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

// SOS 글 작성 요청 인터페이스
export interface SOSCreateRequest {
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    wantPrice: number;
    wantPriceType: 'hour' | 'day';

    dog: {
        name: string;
        gender: 'male' | 'female';
        size: '소형' | '중형' | '대형';
        neutered: boolean;
        breed: string;
        age: number;
        img?: string;
    };
}

// SOS 글 작성 타입
export interface FormData {
    title: string;
    content: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    paymentType: '시급' | '일급' | '협의';
    paymentAmount: number;
    selectedDogs: string[];
}

export interface Dog {
    id: string;
    name: string;
}

// SOS 글 수정 요청 인터페이스
export interface SOSUpdateRequest extends Partial<SOSCreateRequest> {
    postId: number; // 수정할 게시물 ID
}

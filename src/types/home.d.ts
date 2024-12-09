import { BaseApiResponse } from './baseResponse';

// `result` 배열의 각 요소 타입 정의
interface PetMissionUser {
    userId: number;
    userNickname: string;
    userProfileURL: string;
    roleType: string;
}

// `petInfoList` 배열의 요소 타입 정의
interface PetInfo {
    age: number;
    breed: string;
    gender: 'MALE' | 'FEMALE';
    neuterYn: '중성' | '미중성';
    petId: number;
    petName: string;
    profileImg?: string; // 이미지가 없는 경우를 대비해 optional로 처리
    temperament: string;
}

// `result` 배열의 각 요소 타입 정의
export interface PetMissionResult {
    comment: string[]; // 댓글 배열
    petInfoList: PetInfo[]; // 반려동물 정보 리스트
    petMissionId: number; // 고유 ID
    roleType: 'MAL' | 'DOL'; // 역할 타입
    status: 'BEF' | 'INP' | 'AFT'; // 상태 값 제한
    userId: number; // 사용자 ID
}

// API 응답 타입 정의
interface MainPageMissionResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        result: PetMissionResult[]; // result 배열의 타입 지정
    };
}

// 랭킹 데이터 타입 정의
interface RankingItem {
    userId: number;
    rank: number;
    nickname: string;
    recommendationCount: number;
    profileImage: string | null;
}
// 랭킹 조회 API 응답 타입 정의
interface RankingResponse extends BaseApiResponse {
    data: RankingItem[]; // 배열을 포함하는 객체
}
interface HeartedUser {
    heartedId: number; // 유저 ID
    nickname: string; // 닉네임
    profileImg: string; // 프로필 이미지 URL
}

interface LikedListData {
    data: {
        heartedUsers: HeartedUser[]; // 찜한 돌봄이 리스트
    };
}

interface HomeLikeProps {
    likedListData: LikedListData; // 전체 찜한 리스트 데이터
}

export type {
    MainPageMissionResponse,
    RankingResponse,
    RankingItem,
    HomeLikeProps,
};

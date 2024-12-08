import { BaseApiResponse } from './baseResponse';

// `result` 배열의 각 요소 타입 정의
interface PetMissionUser {
    userId: number;
    userNickname: string;
    userProfileURL: string;
    roleType: string;
}

interface PetInfo {
    petId: number;
    imgURL: string;
}

interface PetMissionResult {
    petMissionUsers: PetMissionUser[];
    missionId: number;
    comment: string[];
    petMissionStarted: string; // ISO8601 날짜 문자열
    petMissionEnd: string; // ISO8601 날짜 문자열
    status: 'BEF' | 'INP' | 'AFT'; // 상태 값 제한
    petInfo: PetInfo[];
}

// API 응답 타입 정의
interface MainPageMissionResponse extends BaseApiResponse {
    path: string;
    responseCode: string;
    message: string;
    result: PetMissionResult[]; // result 배열의 타입 지정
    timeStamp: string; // ISO8601 날짜 문자열
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
export type { MainPageMissionResponse, RankingResponse, RankingItem };

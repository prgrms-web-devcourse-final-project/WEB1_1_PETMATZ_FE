interface IUser {
    id: number;
    accountId: string;
    nickname: string;
    loginRole: string;
    loginType: string;
    role: string;
    preferredSize: string;
    gender: string;
    isRegistered: boolean;
    recommendationCount: number;
    careCompletionCount: number;
    isCareAvailable: boolean;
    mbti: string;
}

export type { IUser };

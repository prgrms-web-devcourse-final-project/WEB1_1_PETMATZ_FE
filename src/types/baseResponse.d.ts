interface BaseApiResponse {
    ok: boolean;
    status?: number;
    error?: {
        status: number;
        msg: string;
    };
}

export type { BaseApiResponse };

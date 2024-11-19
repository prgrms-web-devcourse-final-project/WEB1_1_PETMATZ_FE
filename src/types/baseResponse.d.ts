interface BaseApiResponse {
    ok: boolean;
    error?: {
        status: number;
        msg: string;
    };
}

export type { BaseApiResponse };

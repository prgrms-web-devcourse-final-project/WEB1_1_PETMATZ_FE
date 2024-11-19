import axios, { AxiosResponse } from 'axios';

const service = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
    timeout: 5000,
});

// 응답 인터셉터 설정
service.interceptors.response.use(
    (res: AxiosResponse) => res, // 정상 응답 반환
    (error) => {
        // 에러를 일반 객체로 변환하지 않고 그대로 반환
        return Promise.reject(error);
    },
);

export const http = {
    get: async function get<T, P = undefined>(
        url: string,
        params?: P,
    ): Promise<{ ok: boolean; data?: T; error?: any }> {
        try {
            const response = await service.get<T>(url, { params });
            return { ok: true, data: response.data };
        } catch (error: any) {
            return {
                ok: false,
                error: {
                    status: error.response?.status || 500,
                    msg:
                        error.response?.data?.message ||
                        error.message ||
                        'Unknown error occurred',
                },
            };
        }
    },
    post: async function post<T, D = undefined>(
        url: string,
        data?: D,
    ): Promise<{ ok: boolean; data?: T; error?: any }> {
        try {
            const response = await service.post<T>(url, data);
            return { ok: true, data: response.data };
        } catch (error: any) {
            return {
                ok: false,
                error: {
                    status: error.response?.status || 500,
                    msg:
                        error.response?.data?.message ||
                        error.message ||
                        'Unknown error occurred',
                },
            };
        }
    },
    delete: async function remove<T>(
        url: string,
    ): Promise<{ ok: boolean; data?: T; error?: any }> {
        try {
            const response = await service.delete<T>(url);
            return { ok: true, data: response.data };
        } catch (error: any) {
            return {
                ok: false,
                error: {
                    status: error.response?.status || 500,
                    msg:
                        error.response?.data?.message ||
                        error.message ||
                        'Unknown error occurred',
                },
            };
        }
    },
    put: async function put<T, D = undefined>(
        url: string,
        data?: D,
    ): Promise<{ ok: boolean; data?: T; error?: any }> {
        try {
            const response = await service.put<T>(url, data);
            return { ok: true, data: response.data };
        } catch (error: any) {
            return {
                ok: false,
                error: {
                    status: error.response?.status || 500,
                    msg:
                        error.response?.data?.message ||
                        error.message ||
                        'Unknown error occurred',
                },
            };
        }
    },
    patch: async function patch<T, D = undefined>(
        url: string,
        data?: D,
    ): Promise<{ ok: boolean; data?: T; error?: any }> {
        try {
            const response = await service.patch<T>(url, data);
            return { ok: true, data: response.data };
        } catch (error: any) {
            return {
                ok: false,
                error: {
                    status: error.response?.status || 500,
                    msg:
                        error.response?.data?.message ||
                        error.message ||
                        'Unknown error occurred',
                },
            };
        }
    },
};

import axios, { AxiosResponse } from 'axios';

const service = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
    timeout: 5000,
});

const serviceForImage = axios.create({
    baseURL: ``,
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
serviceForImage.interceptors.response.use(
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
    ): Promise<T> {
        try {
            const response = await service.get<T>(url, { params });
            return {
                ok: true,
                status: response.status,
                data: response.data,
            } as T;
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
            } as T;
        }
    },
    post: async function post<T, D = undefined>(
        url: string,
        data?: D,
    ): Promise<T> {
        try {
            const response = await service.post<T>(url, data);
            return {
                ok: true,
                status: response.status,
                data: response.data,
            } as T;
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
            } as T;
        }
    },
    delete: async function remove<T, P>(url: string, params?: P): Promise<T> {
        try {
            const response = await service.delete<T>(url, { params });
            return {
                ok: true,
                status: response.status,
                data: response.data,
            } as T;
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
            } as T;
        }
    },
    put: async function put<T, D = undefined>(
        url: string,
        data?: D,
    ): Promise<T> {
        try {
            const response = await service.put<T>(url, data);
            return {
                ok: true,
                status: response.status,
                data: response.data,
            } as T;
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
            } as T;
        }
    },
    patch: async function patch<T, D = undefined>(
        url: string,
        data?: D,
    ): Promise<T> {
        try {
            const response = await service.patch<T>(url, data);
            return {
                ok: true,
                status: response.status,
                data: response.data,
            } as T;
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
            } as T;
        }
    },
};

export const httpForImage = {
    put: async function put<T, D>(url: string, data: File): Promise<T> {
        try {
            const response = await serviceForImage.put<T>(url, data, {
                headers: {
                    'Content-Type': data.type, // 이미지 파일의 MIME 타입 설정
                },
            });
            return {
                ok: true,
                status: response.status,
                data: response.data,
            } as T;
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
            } as T;
        }
    },
};

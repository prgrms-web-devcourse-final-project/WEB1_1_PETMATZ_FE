import {
    DeleteAccountApiRequest,
    DeleteAccountApiResponse,
} from '@/types/deleteAccount';
import { http } from './base';

/**
 * POST	delete account
 * 회원 탈퇴를 요청합니다.
 */
export const postDeleteAccount = async ({
    password,
}: DeleteAccountApiRequest): Promise<DeleteAccountApiResponse> =>
    await http.post<DeleteAccountApiResponse, DeleteAccountApiRequest>(
        '/api/auth/delete-user',
        {
            password,
        },
    );

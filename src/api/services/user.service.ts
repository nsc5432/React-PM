import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { UserInfo, ApiResponse } from '@/types/api.types';

export const userService = {
    // key로 사용자 정보 조회
    getByKey: async (key: string): Promise<UserInfo> => {
        const response = await apiClient.get<ApiResponse<UserInfo>>(
            API_ENDPOINTS.USER_INFO_BY_KEY(key),
        );
        return response.data.data;
    },
};

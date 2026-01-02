import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { TimeSlotData, ApiResponse } from '@/types/api.types';

export const timeslotService = {
    // 타임슬롯 데이터 조회
    getData: async (): Promise<TimeSlotData[]> => {
        const response = await apiClient.get<ApiResponse<TimeSlotData[]>>(
            API_ENDPOINTS.TIMESLOT_DATA,
        );
        return response.data.data;
    },
};

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { ChartDataPoint, ApiResponse } from '@/types/api.types';

export const chartService = {
    // 차트 데이터 조회
    getData: async (): Promise<ChartDataPoint[]> => {
        const response = await apiClient.get<ApiResponse<ChartDataPoint[]>>(
            API_ENDPOINTS.CHART_DATA,
        );
        return response.data.data;
    },
};

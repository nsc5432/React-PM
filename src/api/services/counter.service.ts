import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { CounterStatus, ApiResponse } from '@/types/api.types'

export const counterService = {
  // 모든 카운터 조회
  getAll: async (): Promise<CounterStatus[]> => {
    const response = await apiClient.get<ApiResponse<CounterStatus[]>>(API_ENDPOINTS.COUNTERS)
    return response.data.data
  },

  // 특정 카운터 조회
  getById: async (id: number): Promise<CounterStatus> => {
    const response = await apiClient.get<ApiResponse<CounterStatus>>(API_ENDPOINTS.COUNTER_BY_ID(id))
    return response.data.data
  },
}

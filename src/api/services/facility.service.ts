import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { FacilityStatus, ApiResponse } from '@/types/api.types'

export const facilityService = {
  // 모든 시설 조회
  getAll: async (): Promise<FacilityStatus[]> => {
    const response = await apiClient.get<ApiResponse<FacilityStatus[]>>(API_ENDPOINTS.FACILITIES)
    return response.data.data
  },

  // 특정 아일랜드 조회
  getByIsland: async (island: string): Promise<FacilityStatus> => {
    const response = await apiClient.get<ApiResponse<FacilityStatus>>(
      API_ENDPOINTS.FACILITY_BY_ISLAND(island)
    )
    return response.data.data
  },
}

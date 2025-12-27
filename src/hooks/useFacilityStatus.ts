import { useState, useEffect } from 'react'
import { facilityService } from '@/api/services/facility.service'
import { facilityStatusData } from '@/lib/mock-data'
import type { FacilityStatus, ApiError } from '@/types/api.types'

export const useFacilityStatus = () => {
  // 초기값을 mock 데이터로 설정하여 항상 데이터 표시 가능
  const [data, setData] = useState<FacilityStatus[]>(facilityStatusData)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ApiError | null>(null)

  const enableMock = import.meta.env.VITE_ENABLE_MOCK === 'true'

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      if (enableMock) {
        setData(facilityStatusData)
        setLoading(false)
      } else {
        const result = await facilityService.getAll()
        setData(result)
        setLoading(false)
      }
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)

      console.warn('[useFacilityStatus] API failed (status: ' + apiError.status + '), using mock data')
      setData(facilityStatusData)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [enableMock])

  return { data, loading, error, refetch: fetchData }
}

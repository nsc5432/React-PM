import { useState, useEffect } from 'react'
import { timeslotService } from '@/api/services/timeslot.service'
import { timeSlotData as mockTimeSlotData } from '@/lib/mock-data'
import type { TimeSlotData, ApiError } from '@/types/api.types'

export const useTimeSlotData = () => {
  // 초기값을 mock 데이터로 설정하여 항상 데이터 표시 가능
  const [data, setData] = useState<TimeSlotData[]>(mockTimeSlotData)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ApiError | null>(null)

  const enableMock = import.meta.env.VITE_ENABLE_MOCK === 'true'

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      if (enableMock) {
        setData(mockTimeSlotData)
        setLoading(false)
      } else {
        const result = await timeslotService.getData()
        setData(result)
        setLoading(false)
      }
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)

      console.warn('[useTimeSlotData] API failed (status: ' + apiError.status + '), using mock data')
      setData(mockTimeSlotData)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [enableMock])

  return { data, loading, error, refetch: fetchData }
}

import { useState, useEffect } from 'react'
import { chartService } from '@/api/services/chart.service'
import { chartData as mockChartData } from '@/lib/mock-data'
import type { ChartDataPoint, ApiError } from '@/types/api.types'

export const useChartData = () => {
  // 초기값을 mock 데이터로 설정하여 항상 데이터 표시 가능
  const [data, setData] = useState<ChartDataPoint[]>(mockChartData)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ApiError | null>(null)

  const enableMock = import.meta.env.VITE_ENABLE_MOCK === 'true'

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      if (enableMock) {
        setData(mockChartData)
        setLoading(false)
      } else {
        const result = await chartService.getData()
        setData(result)
        setLoading(false)
      }
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)

      console.warn('[useChartData] API failed (status: ' + apiError.status + '), using mock data')
      setData(mockChartData)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [enableMock])

  return { data, loading, error, refetch: fetchData }
}

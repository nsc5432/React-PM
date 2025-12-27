// API 타입 정의

export interface CounterStatus {
  counter: number
  airline: string
  status: "busy" | "closed" | "warning" | "available"
  waitPeople: number
  waitTime: number
  processedPeople: number
}

export interface FacilityStatus {
  island: string
  waitPeople: number
  waitTime: number
  revenue: number
  status: "normal" | "warning" | "busy"
}

export interface TimeSlotData {
  time: string
  leftCounter: string
  rightCounter: string
  leftProcessed: string
  rightProcessed: string
  leftWait: string
  rightWait: string
  highlight?: boolean
}

export interface ChartDataPoint {
  time: string
  processedPeople: number
  waitingCurrent: number
  waitingForecast: number
  waitingPrevWeek: number
}

// API 응답 래퍼 타입
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// 에러 타입
export interface ApiError {
  status: number
  message: string
  code?: string
}

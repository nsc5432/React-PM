// Mock data for the Airport Check-in Counter Congestion Simulation Dashboard

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

// Counter Status Data (ref: pm_002.JPG)
export const counterStatusData: CounterStatus[] = [
  { counter: 1, airline: "OZ", status: "busy", waitPeople: 45, waitTime: 15, processedPeople: 120 },
  { counter: 2, airline: "OZ", status: "busy", waitPeople: 42, waitTime: 15, processedPeople: 115 },
  { counter: 3, airline: "OZ", status: "busy", waitPeople: 38, waitTime: 12, processedPeople: 110 },
  { counter: 4, airline: "OZ", status: "busy", waitPeople: 35, waitTime: 12, processedPeople: 105 },
  { counter: 5, airline: "OZ", status: "busy", waitPeople: 40, waitTime: 14, processedPeople: 118 },
  { counter: 6, airline: "OZ", status: "busy", waitPeople: 43, waitTime: 15, processedPeople: 122 },
  { counter: 7, airline: "OZ", status: "busy", waitPeople: 37, waitTime: 13, processedPeople: 108 },
  { counter: 8, airline: "OZ", status: "busy", waitPeople: 41, waitTime: 14, processedPeople: 116 },
  { counter: 9, airline: "OZ", status: "available", waitPeople: 8, waitTime: 3, processedPeople: 95 },
  { counter: 10, airline: "OZ", status: "available", waitPeople: 6, waitTime: 2, processedPeople: 90 },
  { counter: 11, airline: "OZ", status: "available", waitPeople: 7, waitTime: 3, processedPeople: 92 },
  { counter: 12, airline: "OZ", status: "available", waitPeople: 5, waitTime: 2, processedPeople: 88 },
  { counter: 13, airline: "OZ", status: "available", waitPeople: 9, waitTime: 3, processedPeople: 94 },
  { counter: 14, airline: "OZ", status: "available", waitPeople: 6, waitTime: 2, processedPeople: 89 },
  { counter: 15, airline: "OZ", status: "available", waitPeople: 8, waitTime: 3, processedPeople: 91 },
  { counter: 16, airline: "OZ", status: "available", waitPeople: 7, waitTime: 2, processedPeople: 93 },
  { counter: 17, airline: "OZ", status: "warning", waitPeople: 20, waitTime: 8, processedPeople: 100 },
  { counter: 18, airline: "OZ", status: "available", waitPeople: 5, waitTime: 2, processedPeople: 87 },
]

// Facility Status Data (ref: pm_001.JPG)
export const facilityStatusData: FacilityStatus[] = [
  { island: "A", waitPeople: 45, waitTime: 15, revenue: 1234567, status: "busy" },
  { island: "B", waitPeople: 32, waitTime: 10, revenue: 987654, status: "warning" },
  { island: "C", waitPeople: 18, waitTime: 6, revenue: 765432, status: "normal" },
  { island: "E", waitPeople: 28, waitTime: 9, revenue: 854321, status: "warning" },
  { island: "F", waitPeople: 12, waitTime: 4, revenue: 543210, status: "normal" },
  { island: "G", waitPeople: 25, waitTime: 8, revenue: 678901, status: "warning" },
  { island: "H", waitPeople: 35, waitTime: 12, revenue: 1098765, status: "busy" },
  { island: "I", waitPeople: 22, waitTime: 7, revenue: 789012, status: "normal" },
  { island: "J", waitPeople: 30, waitTime: 10, revenue: 901234, status: "warning" },
  { island: "K", waitPeople: 15, waitTime: 5, revenue: 654321, status: "normal" },
  { island: "L", waitPeople: 40, waitTime: 13, revenue: 1123456, status: "busy" },
  { island: "M", waitPeople: 20, waitTime: 7, revenue: 712345, status: "normal" },
  { island: "N", waitPeople: 38, waitTime: 12, revenue: 1056789, status: "busy" },
]

// Detailed Grid Data (ref: pm_003.JPG)
export const timeSlotData: TimeSlotData[] = [
  {
    time: "04:00",
    leftCounter: "처리 여건 : 00명\n처리 시간 : 000초\n대기 여건 : 00명\n대기 시간 : 000초",
    rightCounter: "처리 여건 : 00명\n처리 시간 : 000초\n대기 여건 : 00명\n대기 시간 : 000초",
    leftProcessed: "0",
    rightProcessed: "0",
    leftWait: "0",
    rightWait: "0",
    highlight: true,
  },
  {
    time: "04:30",
    leftCounter: "처리 여건 : 00명\n처리 시간 : 000초\n대기 여건 : 00명\n대기 시간 : 000초",
    rightCounter: "처리 여건 : 00명\n처리 시간 : 000초\n대기 여건 : 00명\n대기 시간 : 000초",
    leftProcessed: "0",
    rightProcessed: "0",
    leftWait: "0",
    rightWait: "0",
  },
  {
    time: "05:00",
    leftCounter: "처리 여건 : 00명\n처리 시간 : 000초\n대기 여건 : 00명\n대기 시간 : 000초",
    rightCounter: "처리 여건 : 00명\n처리 시간 : 000초\n대기 여건 : 00명\n대기 시간 : 000초",
    leftProcessed: "0",
    rightProcessed: "0",
    leftWait: "0",
    rightWait: "0",
  },
]

// Chart Data (ref: pm_004.JPG)
export const chartData: ChartDataPoint[] = [
  { time: "4:00", processedPeople: 15, waitingCurrent: 25, waitingForecast: 28, waitingPrevWeek: 22 },
  { time: "6:00", processedPeople: 22, waitingCurrent: 45, waitingForecast: 48, waitingPrevWeek: 42 },
  { time: "8:00", processedPeople: 50, waitingCurrent: 75, waitingForecast: 78, waitingPrevWeek: 70 },
  { time: "10:00", processedPeople: 85, waitingCurrent: 95, waitingForecast: 98, waitingPrevWeek: 88 },
  { time: "12:00", processedPeople: 95, waitingCurrent: 145, waitingForecast: 150, waitingPrevWeek: 138 },
  { time: "14:00", processedPeople: 82, waitingCurrent: 175, waitingForecast: 180, waitingPrevWeek: 165 },
  { time: "16:00", processedPeople: 90, waitingCurrent: 189, waitingForecast: 195, waitingPrevWeek: 180 },
  { time: "18:00", processedPeople: 88, waitingCurrent: 195, waitingForecast: 220, waitingPrevWeek: 205 },
  { time: "20:00", processedPeople: 52, waitingCurrent: 145, waitingForecast: 168, waitingPrevWeek: 155 },
  { time: "22:00", processedPeople: 35, waitingCurrent: 115, waitingForecast: 142, waitingPrevWeek: 125 },
  { time: "0:00", processedPeople: 20, waitingCurrent: 42, waitingForecast: 52, waitingPrevWeek: 45 },
  { time: "2:00", processedPeople: 12, waitingCurrent: 18, waitingForecast: 22, waitingPrevWeek: 15 },
]

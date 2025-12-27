// Mock data for the Airport Check-in Counter Congestion Simulation Dashboard

// 타입 정의는 별도 파일로 분리
export * from '@/types/api.types'
import type { CounterStatus, FacilityStatus, TimeSlotData, ChartDataPoint } from '@/types/api.types'

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

// 시간대별 시설 혼잡도 데이터 (TimelinePlayer용)
// 시간: 분 단위 (240 = 04:00, 1440 = 24:00)
export const timeBasedFacilityData: Record<number, FacilityStatus[]> = {
  240: [ // 04:00 - 새벽 (한산함)
    { island: "1", waitPeople: 5, waitTime: 2, revenue: 123456, status: "normal" },
    { island: "2", waitPeople: 3, waitTime: 1, revenue: 98765, status: "normal" },
    { island: "3", waitPeople: 4, waitTime: 2, revenue: 76543, status: "normal" },
    { island: "4", waitPeople: 2, waitTime: 1, revenue: 54321, status: "normal" },
    { island: "5", waitPeople: 6, waitTime: 2, revenue: 67890, status: "normal" },
    { island: "6", waitPeople: 4, waitTime: 1, revenue: 45678, status: "normal" },
  ],
  270: [ // 04:30
    { island: "1", waitPeople: 8, waitTime: 3, revenue: 234567, status: "normal" },
    { island: "2", waitPeople: 6, waitTime: 2, revenue: 187654, status: "normal" },
    { island: "3", waitPeople: 7, waitTime: 3, revenue: 165432, status: "normal" },
    { island: "4", waitPeople: 5, waitTime: 2, revenue: 143210, status: "normal" },
    { island: "5", waitPeople: 9, waitTime: 3, revenue: 178901, status: "normal" },
    { island: "6", waitPeople: 7, waitTime: 2, revenue: 156789, status: "normal" },
  ],
  300: [ // 05:00
    { island: "1", waitPeople: 12, waitTime: 4, revenue: 345678, status: "normal" },
    { island: "2", waitPeople: 10, waitTime: 3, revenue: 276543, status: "normal" },
    { island: "3", waitPeople: 11, waitTime: 4, revenue: 254321, status: "normal" },
    { island: "4", waitPeople: 8, waitTime: 3, revenue: 232109, status: "normal" },
    { island: "5", waitPeople: 13, waitTime: 4, revenue: 267890, status: "normal" },
    { island: "6", waitPeople: 10, waitTime: 3, revenue: 245678, status: "normal" },
  ],
  360: [ // 06:00 - 아침 (혼잡도 증가)
    { island: "1", waitPeople: 22, waitTime: 7, revenue: 567890, status: "warning" },
    { island: "2", waitPeople: 18, waitTime: 6, revenue: 498765, status: "normal" },
    { island: "3", waitPeople: 20, waitTime: 7, revenue: 476543, status: "warning" },
    { island: "4", waitPeople: 15, waitTime: 5, revenue: 454321, status: "normal" },
    { island: "5", waitPeople: 24, waitTime: 8, revenue: 489012, status: "warning" },
    { island: "6", waitPeople: 19, waitTime: 6, revenue: 467890, status: "normal" },
  ],
  420: [ // 07:00
    { island: "1", waitPeople: 30, waitTime: 10, revenue: 789012, status: "warning" },
    { island: "2", waitPeople: 25, waitTime: 8, revenue: 720987, status: "warning" },
    { island: "3", waitPeople: 28, waitTime: 9, revenue: 698765, status: "warning" },
    { island: "4", waitPeople: 22, waitTime: 7, revenue: 676543, status: "warning" },
    { island: "5", waitPeople: 32, waitTime: 11, revenue: 710123, status: "busy" },
    { island: "6", waitPeople: 26, waitTime: 8, revenue: 689012, status: "warning" },
  ],
  480: [ // 08:00 - 출근 시간 (매우 혼잡)
    { island: "1", waitPeople: 42, waitTime: 14, revenue: 1012345, status: "busy" },
    { island: "2", waitPeople: 38, waitTime: 12, revenue: 943210, status: "busy" },
    { island: "3", waitPeople: 40, waitTime: 13, revenue: 920987, status: "busy" },
    { island: "4", waitPeople: 35, waitTime: 11, revenue: 898765, status: "busy" },
    { island: "5", waitPeople: 45, waitTime: 15, revenue: 932345, status: "busy" },
    { island: "6", waitPeople: 39, waitTime: 13, revenue: 911234, status: "busy" },
  ],
  540: [ // 09:00
    { island: "1", waitPeople: 38, waitTime: 12, revenue: 945678, status: "busy" },
    { island: "2", waitPeople: 35, waitTime: 11, revenue: 876543, status: "busy" },
    { island: "3", waitPeople: 36, waitTime: 12, revenue: 854321, status: "busy" },
    { island: "4", waitPeople: 32, waitTime: 10, revenue: 832109, status: "warning" },
    { island: "5", waitPeople: 40, waitTime: 13, revenue: 865678, status: "busy" },
    { island: "6", waitPeople: 34, waitTime: 11, revenue: 844567, status: "busy" },
  ],
  600: [ // 10:00 - 오전 피크
    { island: "1", waitPeople: 45, waitTime: 15, revenue: 1123456, status: "busy" },
    { island: "2", waitPeople: 42, waitTime: 14, revenue: 1054321, status: "busy" },
    { island: "3", waitPeople: 43, waitTime: 14, revenue: 1032109, status: "busy" },
    { island: "4", waitPeople: 38, waitTime: 12, revenue: 1009876, status: "busy" },
    { island: "5", waitPeople: 48, waitTime: 16, revenue: 1043567, status: "busy" },
    { island: "6", waitPeople: 41, waitTime: 13, revenue: 1022456, status: "busy" },
  ],
  660: [ // 11:00
    { island: "1", waitPeople: 35, waitTime: 11, revenue: 887654, status: "busy" },
    { island: "2", waitPeople: 32, waitTime: 10, revenue: 818765, status: "warning" },
    { island: "3", waitPeople: 33, waitTime: 11, revenue: 796543, status: "warning" },
    { island: "4", waitPeople: 28, waitTime: 9, revenue: 774321, status: "warning" },
    { island: "5", waitPeople: 37, waitTime: 12, revenue: 807890, status: "busy" },
    { island: "6", waitPeople: 31, waitTime: 10, revenue: 786789, status: "warning" },
  ],
  720: [ // 12:00 - 점심 시간
    { island: "1", waitPeople: 28, waitTime: 9, revenue: 729012, status: "warning" },
    { island: "2", waitPeople: 25, waitTime: 8, revenue: 660123, status: "warning" },
    { island: "3", waitPeople: 26, waitTime: 8, revenue: 638765, status: "warning" },
    { island: "4", waitPeople: 22, waitTime: 7, revenue: 616543, status: "normal" },
    { island: "5", waitPeople: 30, waitTime: 10, revenue: 649234, status: "warning" },
    { island: "6", waitPeople: 24, waitTime: 8, revenue: 628123, status: "warning" },
  ],
  780: [ // 13:00
    { island: "1", waitPeople: 32, waitTime: 10, revenue: 770345, status: "warning" },
    { island: "2", waitPeople: 28, waitTime: 9, revenue: 701234, status: "warning" },
    { island: "3", waitPeople: 30, waitTime: 10, revenue: 679012, status: "warning" },
    { island: "4", waitPeople: 25, waitTime: 8, revenue: 656790, status: "warning" },
    { island: "5", waitPeople: 34, waitTime: 11, revenue: 690567, status: "warning" },
    { island: "6", waitPeople: 27, waitTime: 9, revenue: 669456, status: "warning" },
  ],
  840: [ // 14:00 - 오후 피크
    { island: "1", waitPeople: 40, waitTime: 13, revenue: 911678, status: "busy" },
    { island: "2", waitPeople: 36, waitTime: 12, revenue: 842567, status: "busy" },
    { island: "3", waitPeople: 38, waitTime: 12, revenue: 820345, status: "busy" },
    { island: "4", waitPeople: 33, waitTime: 11, revenue: 798123, status: "warning" },
    { island: "5", waitPeople: 42, waitTime: 14, revenue: 831890, status: "busy" },
    { island: "6", waitPeople: 35, waitTime: 11, revenue: 810789, status: "busy" },
  ],
  900: [ // 15:00
    { island: "1", waitPeople: 44, waitTime: 14, revenue: 1052901, status: "busy" },
    { island: "2", waitPeople: 40, waitTime: 13, revenue: 983790, status: "busy" },
    { island: "3", waitPeople: 42, waitTime: 14, revenue: 961568, status: "busy" },
    { island: "4", waitPeople: 37, waitTime: 12, revenue: 939346, status: "busy" },
    { island: "5", waitPeople: 46, waitTime: 15, revenue: 973123, status: "busy" },
    { island: "6", waitPeople: 39, waitTime: 13, revenue: 952012, status: "busy" },
  ],
  960: [ // 16:00
    { island: "1", waitPeople: 48, waitTime: 16, revenue: 1194234, status: "busy" },
    { island: "2", waitPeople: 44, waitTime: 14, revenue: 1125123, status: "busy" },
    { island: "3", waitPeople: 46, waitTime: 15, revenue: 1102901, status: "busy" },
    { island: "4", waitPeople: 41, waitTime: 13, revenue: 1080679, status: "busy" },
    { island: "5", waitPeople: 50, waitTime: 17, revenue: 1114456, status: "busy" },
    { island: "6", waitPeople: 43, waitTime: 14, revenue: 1093345, status: "busy" },
  ],
  1020: [ // 17:00 - 퇴근 시간 (가장 혼잡)
    { island: "1", waitPeople: 52, waitTime: 18, revenue: 1335567, status: "busy" },
    { island: "2", waitPeople: 48, waitTime: 16, revenue: 1266456, status: "busy" },
    { island: "3", waitPeople: 50, waitTime: 17, revenue: 1244234, status: "busy" },
    { island: "4", waitPeople: 45, waitTime: 15, revenue: 1222012, status: "busy" },
    { island: "5", waitPeople: 55, waitTime: 19, revenue: 1255789, status: "busy" },
    { island: "6", waitPeople: 47, waitTime: 16, revenue: 1234678, status: "busy" },
  ],
  1080: [ // 18:00
    { island: "1", waitPeople: 46, waitTime: 15, revenue: 1176900, status: "busy" },
    { island: "2", waitPeople: 42, waitTime: 14, revenue: 1107789, status: "busy" },
    { island: "3", waitPeople: 44, waitTime: 14, revenue: 1085567, status: "busy" },
    { island: "4", waitPeople: 39, waitTime: 13, revenue: 1063345, status: "busy" },
    { island: "5", waitPeople: 48, waitTime: 16, revenue: 1097122, status: "busy" },
    { island: "6", waitPeople: 41, waitTime: 13, revenue: 1076011, status: "busy" },
  ],
  1140: [ // 19:00
    { island: "1", waitPeople: 38, waitTime: 12, revenue: 918233, status: "busy" },
    { island: "2", waitPeople: 34, waitTime: 11, revenue: 849122, status: "busy" },
    { island: "3", waitPeople: 36, waitTime: 12, revenue: 826900, status: "busy" },
    { island: "4", waitPeople: 31, waitTime: 10, revenue: 804678, status: "warning" },
    { island: "5", waitPeople: 40, waitTime: 13, revenue: 838455, status: "busy" },
    { island: "6", waitPeople: 33, waitTime: 11, revenue: 817344, status: "warning" },
  ],
  1200: [ // 20:00 - 저녁 (혼잡도 감소)
    { island: "1", waitPeople: 30, waitTime: 10, revenue: 759566, status: "warning" },
    { island: "2", waitPeople: 26, waitTime: 8, revenue: 690455, status: "warning" },
    { island: "3", waitPeople: 28, waitTime: 9, revenue: 668233, status: "warning" },
    { island: "4", waitPeople: 23, waitTime: 7, revenue: 646011, status: "warning" },
    { island: "5", waitPeople: 32, waitTime: 11, revenue: 679788, status: "warning" },
    { island: "6", waitPeople: 25, waitTime: 8, revenue: 658677, status: "warning" },
  ],
  1260: [ // 21:00
    { island: "1", waitPeople: 22, waitTime: 7, revenue: 600899, status: "warning" },
    { island: "2", waitPeople: 18, waitTime: 6, revenue: 531788, status: "normal" },
    { island: "3", waitPeople: 20, waitTime: 7, revenue: 509566, status: "warning" },
    { island: "4", waitPeople: 15, waitTime: 5, revenue: 487344, status: "normal" },
    { island: "5", waitPeople: 24, waitTime: 8, revenue: 521121, status: "warning" },
    { island: "6", waitPeople: 17, waitTime: 6, revenue: 500010, status: "normal" },
  ],
  1320: [ // 22:00
    { island: "1", waitPeople: 15, waitTime: 5, revenue: 442232, status: "normal" },
    { island: "2", waitPeople: 12, waitTime: 4, revenue: 373121, status: "normal" },
    { island: "3", waitPeople: 14, waitTime: 5, revenue: 350899, status: "normal" },
    { island: "4", waitPeople: 10, waitTime: 3, revenue: 328677, status: "normal" },
    { island: "5", waitPeople: 16, waitTime: 5, revenue: 362454, status: "normal" },
    { island: "6", waitPeople: 11, waitTime: 4, revenue: 341343, status: "normal" },
  ],
  1380: [ // 23:00 - 밤 (한산함)
    { island: "1", waitPeople: 10, waitTime: 3, revenue: 283565, status: "normal" },
    { island: "2", waitPeople: 8, waitTime: 3, revenue: 214454, status: "normal" },
    { island: "3", waitPeople: 9, waitTime: 3, revenue: 192232, status: "normal" },
    { island: "4", waitPeople: 6, waitTime: 2, revenue: 170010, status: "normal" },
    { island: "5", waitPeople: 11, waitTime: 4, revenue: 203787, status: "normal" },
    { island: "6", waitPeople: 7, waitTime: 2, revenue: 182676, status: "normal" },
  ],
  1440: [ // 24:00 (00:00) - 자정
    { island: "1", waitPeople: 5, waitTime: 2, revenue: 124898, status: "normal" },
    { island: "2", waitPeople: 3, waitTime: 1, revenue: 55787, status: "normal" },
    { island: "3", waitPeople: 4, waitTime: 2, revenue: 33565, status: "normal" },
    { island: "4", waitPeople: 2, waitTime: 1, revenue: 11343, status: "normal" },
    { island: "5", waitPeople: 6, waitTime: 2, revenue: 45120, status: "normal" },
    { island: "6", waitPeople: 3, waitTime: 1, revenue: 24009, status: "normal" },
  ],
}

// 시간(분)을 기준으로 가장 가까운 시간대의 데이터를 반환하는 헬퍼 함수
export const getFacilityDataByTime = (timeInMinutes: number): FacilityStatus[] => {
  // 30분 단위로 반올림
  const roundedTime = Math.round(timeInMinutes / 30) * 30
  // 범위 제한 (240 ~ 1440)
  const clampedTime = Math.max(240, Math.min(1440, roundedTime))

  return timeBasedFacilityData[clampedTime] || timeBasedFacilityData[600] // 기본값: 10:00
}

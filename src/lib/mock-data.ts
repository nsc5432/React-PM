// Mock data for the Airport Check-in Counter Congestion Simulation Dashboard

// 타입 정의는 별도 파일로 분리
export * from '@/types/api.types';
import type {
    CounterStatus,
    FacilityStatus,
    TimeSlotData,
    ChartDataPoint,
} from '@/types/api.types';

// Counter Status Data (ref: pm_002.JPG)
export const counterStatusData: CounterStatus[] = [
    {
        counter: 1,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 45,
        waitTime: 15,
        processedPeople: 120,
    },
    {
        counter: 2,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 42,
        waitTime: 15,
        processedPeople: 115,
    },
    {
        counter: 3,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 38,
        waitTime: 12,
        processedPeople: 110,
    },
    {
        counter: 4,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 35,
        waitTime: 12,
        processedPeople: 105,
    },
    {
        counter: 5,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 40,
        waitTime: 14,
        processedPeople: 118,
    },
    {
        counter: 6,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 43,
        waitTime: 15,
        processedPeople: 122,
    },
    {
        counter: 7,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 37,
        waitTime: 13,
        processedPeople: 108,
    },
    {
        counter: 8,
        airline: 'OZ',
        status: 'busy',
        waitPeople: 41,
        waitTime: 14,
        processedPeople: 116,
    },
    {
        counter: 9,
        airline: 'OZ',
        status: 'available',
        waitPeople: 8,
        waitTime: 3,
        processedPeople: 95,
    },
    {
        counter: 10,
        airline: 'OZ',
        status: 'available',
        waitPeople: 6,
        waitTime: 2,
        processedPeople: 90,
    },
    {
        counter: 11,
        airline: 'OZ',
        status: 'available',
        waitPeople: 7,
        waitTime: 3,
        processedPeople: 92,
    },
    {
        counter: 12,
        airline: 'OZ',
        status: 'available',
        waitPeople: 5,
        waitTime: 2,
        processedPeople: 88,
    },
    {
        counter: 13,
        airline: 'OZ',
        status: 'available',
        waitPeople: 9,
        waitTime: 3,
        processedPeople: 94,
    },
    {
        counter: 14,
        airline: 'OZ',
        status: 'available',
        waitPeople: 6,
        waitTime: 2,
        processedPeople: 89,
    },
    {
        counter: 15,
        airline: 'OZ',
        status: 'available',
        waitPeople: 8,
        waitTime: 3,
        processedPeople: 91,
    },
    {
        counter: 16,
        airline: 'OZ',
        status: 'available',
        waitPeople: 7,
        waitTime: 2,
        processedPeople: 93,
    },
    {
        counter: 17,
        airline: 'OZ',
        status: 'warning',
        waitPeople: 20,
        waitTime: 8,
        processedPeople: 100,
    },
    {
        counter: 18,
        airline: 'OZ',
        status: 'available',
        waitPeople: 5,
        waitTime: 2,
        processedPeople: 87,
    },
];

// Facility Status Data (ref: pm_001.JPG)
export const facilityStatusData: FacilityStatus[] = [
    { island: 'A', waitPeople: 45, waitTime: 15, revenue: 1234567, status: 'busy' },
    { island: 'B', waitPeople: 32, waitTime: 10, revenue: 987654, status: 'warning' },
    { island: 'C', waitPeople: 18, waitTime: 6, revenue: 765432, status: 'normal' },
    { island: 'E', waitPeople: 28, waitTime: 9, revenue: 854321, status: 'warning' },
    { island: 'F', waitPeople: 12, waitTime: 4, revenue: 543210, status: 'normal' },
    { island: 'G', waitPeople: 25, waitTime: 8, revenue: 678901, status: 'warning' },
    { island: 'H', waitPeople: 35, waitTime: 12, revenue: 1098765, status: 'busy' },
    { island: 'I', waitPeople: 22, waitTime: 7, revenue: 789012, status: 'normal' },
    { island: 'J', waitPeople: 30, waitTime: 10, revenue: 901234, status: 'warning' },
    { island: 'K', waitPeople: 15, waitTime: 5, revenue: 654321, status: 'normal' },
    { island: 'L', waitPeople: 40, waitTime: 13, revenue: 1123456, status: 'busy' },
    { island: 'M', waitPeople: 20, waitTime: 7, revenue: 712345, status: 'normal' },
    { island: 'N', waitPeople: 38, waitTime: 12, revenue: 1056789, status: 'busy' },
];

// Detailed Grid Data (ref: pm_003.JPG)
export const timeSlotData: TimeSlotData[] = [
    {
        time: '04:00',
        leftCounter: '처리 여객 : 00명\n처리 시간 : 000초\n대기 여객 : 00명\n대기 시간 : 000초',
        rightCounter: '처리 여객 : 00명\n처리 시간 : 000초\n대기 여객 : 00명\n대기 시간 : 000초',
        leftProcessed: '0',
        rightProcessed: '0',
        leftWait: '0',
        rightWait: '0',
        highlight: true,
    },
    {
        time: '04:30',
        leftCounter: '처리 여객 : 00명\n처리 시간 : 000초\n대기 여객 : 00명\n대기 시간 : 000초',
        rightCounter: '처리 여객 : 00명\n처리 시간 : 000초\n대기 여객 : 00명\n대기 시간 : 000초',
        leftProcessed: '0',
        rightProcessed: '0',
        leftWait: '0',
        rightWait: '0',
    },
    {
        time: '05:00',
        leftCounter: '처리 여객 : 00명\n처리 시간 : 000초\n대기 여객 : 00명\n대기 시간 : 000초',
        rightCounter: '처리 여객 : 00명\n처리 시간 : 000초\n대기 여객 : 00명\n대기 시간 : 000초',
        leftProcessed: '0',
        rightProcessed: '0',
        leftWait: '0',
        rightWait: '0',
    },
];

// Chart Data (ref: pm_004.JPG)
export const chartData: ChartDataPoint[] = [
    {
        time: '4:00',
        processedPeople: 15,
        waitingCurrent: 25,
        waitingForecast: 28,
        waitingPrevWeek: 22,
    },
    {
        time: '6:00',
        processedPeople: 22,
        waitingCurrent: 45,
        waitingForecast: 48,
        waitingPrevWeek: 42,
    },
    {
        time: '8:00',
        processedPeople: 50,
        waitingCurrent: 75,
        waitingForecast: 78,
        waitingPrevWeek: 70,
    },
    {
        time: '10:00',
        processedPeople: 85,
        waitingCurrent: 95,
        waitingForecast: 98,
        waitingPrevWeek: 88,
    },
    {
        time: '12:00',
        processedPeople: 95,
        waitingCurrent: 145,
        waitingForecast: 150,
        waitingPrevWeek: 138,
    },
    {
        time: '14:00',
        processedPeople: 82,
        waitingCurrent: 175,
        waitingForecast: 180,
        waitingPrevWeek: 165,
    },
    {
        time: '16:00',
        processedPeople: 90,
        waitingCurrent: 189,
        waitingForecast: 195,
        waitingPrevWeek: 180,
    },
    {
        time: '18:00',
        processedPeople: 88,
        waitingCurrent: 195,
        waitingForecast: 220,
        waitingPrevWeek: 205,
    },
    {
        time: '20:00',
        processedPeople: 52,
        waitingCurrent: 145,
        waitingForecast: 168,
        waitingPrevWeek: 155,
    },
    {
        time: '22:00',
        processedPeople: 35,
        waitingCurrent: 115,
        waitingForecast: 142,
        waitingPrevWeek: 125,
    },
    {
        time: '0:00',
        processedPeople: 20,
        waitingCurrent: 42,
        waitingForecast: 52,
        waitingPrevWeek: 45,
    },
    {
        time: '2:00',
        processedPeople: 12,
        waitingCurrent: 18,
        waitingForecast: 22,
        waitingPrevWeek: 15,
    },
];

// 시간대별 시설 혼잡도 데이터 (TimelinePlayer용)
// 시간: 분 단위 (240 = 04:00, 1440 = 24:00)
export const timeBasedFacilityData: Record<number, FacilityStatus[]> = {
    240: [
        // 04:00 - 새벽 (한산함)
        { island: '1', waitPeople: 5, waitTime: 2, revenue: 123456, status: 'normal' },
        { island: '2', waitPeople: 3, waitTime: 1, revenue: 98765, status: 'normal' },
        { island: '3', waitPeople: 4, waitTime: 2, revenue: 76543, status: 'normal' },
        { island: '4', waitPeople: 2, waitTime: 1, revenue: 54321, status: 'normal' },
        { island: '5', waitPeople: 6, waitTime: 2, revenue: 67890, status: 'normal' },
        { island: '6', waitPeople: 4, waitTime: 1, revenue: 45678, status: 'normal' },
    ],
    270: [
        // 04:30
        { island: '1', waitPeople: 8, waitTime: 3, revenue: 234567, status: 'normal' },
        { island: '2', waitPeople: 6, waitTime: 2, revenue: 187654, status: 'normal' },
        { island: '3', waitPeople: 7, waitTime: 3, revenue: 165432, status: 'normal' },
        { island: '4', waitPeople: 5, waitTime: 2, revenue: 143210, status: 'normal' },
        { island: '5', waitPeople: 9, waitTime: 3, revenue: 178901, status: 'normal' },
        { island: '6', waitPeople: 7, waitTime: 2, revenue: 156789, status: 'normal' },
    ],
    300: [
        // 05:00
        { island: '1', waitPeople: 12, waitTime: 4, revenue: 345678, status: 'normal' },
        { island: '2', waitPeople: 10, waitTime: 3, revenue: 276543, status: 'normal' },
        { island: '3', waitPeople: 11, waitTime: 4, revenue: 254321, status: 'normal' },
        { island: '4', waitPeople: 8, waitTime: 3, revenue: 232109, status: 'normal' },
        { island: '5', waitPeople: 13, waitTime: 4, revenue: 267890, status: 'normal' },
        { island: '6', waitPeople: 10, waitTime: 3, revenue: 245678, status: 'normal' },
    ],
    360: [
        // 06:00 - 아침 (혼잡도 증가)
        { island: '1', waitPeople: 22, waitTime: 7, revenue: 567890, status: 'warning' },
        { island: '2', waitPeople: 18, waitTime: 6, revenue: 498765, status: 'normal' },
        { island: '3', waitPeople: 20, waitTime: 7, revenue: 476543, status: 'warning' },
        { island: '4', waitPeople: 15, waitTime: 5, revenue: 454321, status: 'normal' },
        { island: '5', waitPeople: 24, waitTime: 8, revenue: 489012, status: 'warning' },
        { island: '6', waitPeople: 19, waitTime: 6, revenue: 467890, status: 'normal' },
    ],
    420: [
        // 07:00
        { island: '1', waitPeople: 30, waitTime: 10, revenue: 789012, status: 'warning' },
        { island: '2', waitPeople: 25, waitTime: 8, revenue: 720987, status: 'warning' },
        { island: '3', waitPeople: 28, waitTime: 9, revenue: 698765, status: 'warning' },
        { island: '4', waitPeople: 22, waitTime: 7, revenue: 676543, status: 'warning' },
        { island: '5', waitPeople: 32, waitTime: 11, revenue: 710123, status: 'busy' },
        { island: '6', waitPeople: 26, waitTime: 8, revenue: 689012, status: 'warning' },
    ],
    480: [
        // 08:00 - 출근 시간 (매우 혼잡)
        { island: '1', waitPeople: 42, waitTime: 14, revenue: 1012345, status: 'busy' },
        { island: '2', waitPeople: 38, waitTime: 12, revenue: 943210, status: 'busy' },
        { island: '3', waitPeople: 40, waitTime: 13, revenue: 920987, status: 'busy' },
        { island: '4', waitPeople: 35, waitTime: 11, revenue: 898765, status: 'busy' },
        { island: '5', waitPeople: 45, waitTime: 15, revenue: 932345, status: 'busy' },
        { island: '6', waitPeople: 39, waitTime: 13, revenue: 911234, status: 'busy' },
    ],
    540: [
        // 09:00
        { island: '1', waitPeople: 38, waitTime: 12, revenue: 945678, status: 'busy' },
        { island: '2', waitPeople: 35, waitTime: 11, revenue: 876543, status: 'busy' },
        { island: '3', waitPeople: 36, waitTime: 12, revenue: 854321, status: 'busy' },
        { island: '4', waitPeople: 32, waitTime: 10, revenue: 832109, status: 'warning' },
        { island: '5', waitPeople: 40, waitTime: 13, revenue: 865678, status: 'busy' },
        { island: '6', waitPeople: 34, waitTime: 11, revenue: 844567, status: 'busy' },
    ],
    600: [
        // 10:00 - 오전 피크
        { island: '1', waitPeople: 45, waitTime: 15, revenue: 1123456, status: 'busy' },
        { island: '2', waitPeople: 42, waitTime: 14, revenue: 1054321, status: 'busy' },
        { island: '3', waitPeople: 43, waitTime: 14, revenue: 1032109, status: 'busy' },
        { island: '4', waitPeople: 38, waitTime: 12, revenue: 1009876, status: 'busy' },
        { island: '5', waitPeople: 48, waitTime: 16, revenue: 1043567, status: 'busy' },
        { island: '6', waitPeople: 41, waitTime: 13, revenue: 1022456, status: 'busy' },
    ],
    660: [
        // 11:00
        { island: '1', waitPeople: 35, waitTime: 11, revenue: 887654, status: 'busy' },
        { island: '2', waitPeople: 32, waitTime: 10, revenue: 818765, status: 'warning' },
        { island: '3', waitPeople: 33, waitTime: 11, revenue: 796543, status: 'warning' },
        { island: '4', waitPeople: 28, waitTime: 9, revenue: 774321, status: 'warning' },
        { island: '5', waitPeople: 37, waitTime: 12, revenue: 807890, status: 'busy' },
        { island: '6', waitPeople: 31, waitTime: 10, revenue: 786789, status: 'warning' },
    ],
    720: [
        // 12:00 - 점심 시간
        { island: '1', waitPeople: 28, waitTime: 9, revenue: 729012, status: 'warning' },
        { island: '2', waitPeople: 25, waitTime: 8, revenue: 660123, status: 'warning' },
        { island: '3', waitPeople: 26, waitTime: 8, revenue: 638765, status: 'warning' },
        { island: '4', waitPeople: 22, waitTime: 7, revenue: 616543, status: 'normal' },
        { island: '5', waitPeople: 30, waitTime: 10, revenue: 649234, status: 'warning' },
        { island: '6', waitPeople: 24, waitTime: 8, revenue: 628123, status: 'warning' },
    ],
    780: [
        // 13:00
        { island: '1', waitPeople: 32, waitTime: 10, revenue: 770345, status: 'warning' },
        { island: '2', waitPeople: 28, waitTime: 9, revenue: 701234, status: 'warning' },
        { island: '3', waitPeople: 30, waitTime: 10, revenue: 679012, status: 'warning' },
        { island: '4', waitPeople: 25, waitTime: 8, revenue: 656790, status: 'warning' },
        { island: '5', waitPeople: 34, waitTime: 11, revenue: 690567, status: 'warning' },
        { island: '6', waitPeople: 27, waitTime: 9, revenue: 669456, status: 'warning' },
    ],
    840: [
        // 14:00 - 오후 피크
        { island: '1', waitPeople: 40, waitTime: 13, revenue: 911678, status: 'busy' },
        { island: '2', waitPeople: 36, waitTime: 12, revenue: 842567, status: 'busy' },
        { island: '3', waitPeople: 38, waitTime: 12, revenue: 820345, status: 'busy' },
        { island: '4', waitPeople: 33, waitTime: 11, revenue: 798123, status: 'warning' },
        { island: '5', waitPeople: 42, waitTime: 14, revenue: 831890, status: 'busy' },
        { island: '6', waitPeople: 35, waitTime: 11, revenue: 810789, status: 'busy' },
    ],
    900: [
        // 15:00
        { island: '1', waitPeople: 44, waitTime: 14, revenue: 1052901, status: 'busy' },
        { island: '2', waitPeople: 40, waitTime: 13, revenue: 983790, status: 'busy' },
        { island: '3', waitPeople: 42, waitTime: 14, revenue: 961568, status: 'busy' },
        { island: '4', waitPeople: 37, waitTime: 12, revenue: 939346, status: 'busy' },
        { island: '5', waitPeople: 46, waitTime: 15, revenue: 973123, status: 'busy' },
        { island: '6', waitPeople: 39, waitTime: 13, revenue: 952012, status: 'busy' },
    ],
    960: [
        // 16:00
        { island: '1', waitPeople: 48, waitTime: 16, revenue: 1194234, status: 'busy' },
        { island: '2', waitPeople: 44, waitTime: 14, revenue: 1125123, status: 'busy' },
        { island: '3', waitPeople: 46, waitTime: 15, revenue: 1102901, status: 'busy' },
        { island: '4', waitPeople: 41, waitTime: 13, revenue: 1080679, status: 'busy' },
        { island: '5', waitPeople: 50, waitTime: 17, revenue: 1114456, status: 'busy' },
        { island: '6', waitPeople: 43, waitTime: 14, revenue: 1093345, status: 'busy' },
    ],
    1020: [
        // 17:00 - 퇴근 시간 (가장 혼잡)
        { island: '1', waitPeople: 52, waitTime: 18, revenue: 1335567, status: 'busy' },
        { island: '2', waitPeople: 48, waitTime: 16, revenue: 1266456, status: 'busy' },
        { island: '3', waitPeople: 50, waitTime: 17, revenue: 1244234, status: 'busy' },
        { island: '4', waitPeople: 45, waitTime: 15, revenue: 1222012, status: 'busy' },
        { island: '5', waitPeople: 55, waitTime: 19, revenue: 1255789, status: 'busy' },
        { island: '6', waitPeople: 47, waitTime: 16, revenue: 1234678, status: 'busy' },
    ],
    1080: [
        // 18:00
        { island: '1', waitPeople: 46, waitTime: 15, revenue: 1176900, status: 'busy' },
        { island: '2', waitPeople: 42, waitTime: 14, revenue: 1107789, status: 'busy' },
        { island: '3', waitPeople: 44, waitTime: 14, revenue: 1085567, status: 'busy' },
        { island: '4', waitPeople: 39, waitTime: 13, revenue: 1063345, status: 'busy' },
        { island: '5', waitPeople: 48, waitTime: 16, revenue: 1097122, status: 'busy' },
        { island: '6', waitPeople: 41, waitTime: 13, revenue: 1076011, status: 'busy' },
    ],
    1140: [
        // 19:00
        { island: '1', waitPeople: 38, waitTime: 12, revenue: 918233, status: 'busy' },
        { island: '2', waitPeople: 34, waitTime: 11, revenue: 849122, status: 'busy' },
        { island: '3', waitPeople: 36, waitTime: 12, revenue: 826900, status: 'busy' },
        { island: '4', waitPeople: 31, waitTime: 10, revenue: 804678, status: 'warning' },
        { island: '5', waitPeople: 40, waitTime: 13, revenue: 838455, status: 'busy' },
        { island: '6', waitPeople: 33, waitTime: 11, revenue: 817344, status: 'warning' },
    ],
    1200: [
        // 20:00 - 저녁 (혼잡도 감소)
        { island: '1', waitPeople: 30, waitTime: 10, revenue: 759566, status: 'warning' },
        { island: '2', waitPeople: 26, waitTime: 8, revenue: 690455, status: 'warning' },
        { island: '3', waitPeople: 28, waitTime: 9, revenue: 668233, status: 'warning' },
        { island: '4', waitPeople: 23, waitTime: 7, revenue: 646011, status: 'warning' },
        { island: '5', waitPeople: 32, waitTime: 11, revenue: 679788, status: 'warning' },
        { island: '6', waitPeople: 25, waitTime: 8, revenue: 658677, status: 'warning' },
    ],
    1260: [
        // 21:00
        { island: '1', waitPeople: 22, waitTime: 7, revenue: 600899, status: 'warning' },
        { island: '2', waitPeople: 18, waitTime: 6, revenue: 531788, status: 'normal' },
        { island: '3', waitPeople: 20, waitTime: 7, revenue: 509566, status: 'warning' },
        { island: '4', waitPeople: 15, waitTime: 5, revenue: 487344, status: 'normal' },
        { island: '5', waitPeople: 24, waitTime: 8, revenue: 521121, status: 'warning' },
        { island: '6', waitPeople: 17, waitTime: 6, revenue: 500010, status: 'normal' },
    ],
    1320: [
        // 22:00
        { island: '1', waitPeople: 15, waitTime: 5, revenue: 442232, status: 'normal' },
        { island: '2', waitPeople: 12, waitTime: 4, revenue: 373121, status: 'normal' },
        { island: '3', waitPeople: 14, waitTime: 5, revenue: 350899, status: 'normal' },
        { island: '4', waitPeople: 10, waitTime: 3, revenue: 328677, status: 'normal' },
        { island: '5', waitPeople: 16, waitTime: 5, revenue: 362454, status: 'normal' },
        { island: '6', waitPeople: 11, waitTime: 4, revenue: 341343, status: 'normal' },
    ],
    1380: [
        // 23:00 - 밤 (한산함)
        { island: '1', waitPeople: 10, waitTime: 3, revenue: 283565, status: 'normal' },
        { island: '2', waitPeople: 8, waitTime: 3, revenue: 214454, status: 'normal' },
        { island: '3', waitPeople: 9, waitTime: 3, revenue: 192232, status: 'normal' },
        { island: '4', waitPeople: 6, waitTime: 2, revenue: 170010, status: 'normal' },
        { island: '5', waitPeople: 11, waitTime: 4, revenue: 203787, status: 'normal' },
        { island: '6', waitPeople: 7, waitTime: 2, revenue: 182676, status: 'normal' },
    ],
    1440: [
        // 24:00 (00:00) - 자정
        { island: '1', waitPeople: 5, waitTime: 2, revenue: 124898, status: 'normal' },
        { island: '2', waitPeople: 3, waitTime: 1, revenue: 55787, status: 'normal' },
        { island: '3', waitPeople: 4, waitTime: 2, revenue: 33565, status: 'normal' },
        { island: '4', waitPeople: 2, waitTime: 1, revenue: 11343, status: 'normal' },
        { island: '5', waitPeople: 6, waitTime: 2, revenue: 45120, status: 'normal' },
        { island: '6', waitPeople: 3, waitTime: 1, revenue: 24009, status: 'normal' },
    ],
};

// 시간(분)을 기준으로 가장 가까운 시간대의 데이터를 반환하는 헬퍼 함수
export const getFacilityDataByTime = (timeInMinutes: number): FacilityStatus[] => {
    // 30분 단위로 반올림
    const roundedTime = Math.round(timeInMinutes / 30) * 30;
    // 범위 제한 (240 ~ 1440)
    const clampedTime = Math.max(240, Math.min(1440, roundedTime));

    return timeBasedFacilityData[clampedTime] || timeBasedFacilityData[600]; // 기본값: 10:00
};

// 시간대별 보안검색대 혼잡도 데이터
export const timeBasedSecurityData: Record<number, FacilityStatus[]> = {
    240: [
        // 04:00 - 새벽 (한산함)
        { island: '보안1', waitPeople: 3, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 2, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 3, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안4', waitPeople: 2, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 4, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안6', waitPeople: 3, waitTime: 1, revenue: 0, status: 'normal' },
    ],
    270: [
        // 04:30
        { island: '보안1', waitPeople: 5, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 4, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 5, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안4', waitPeople: 4, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 6, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안6', waitPeople: 5, waitTime: 2, revenue: 0, status: 'normal' },
    ],
    300: [
        // 05:00
        { island: '보안1', waitPeople: 8, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 7, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 8, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안4', waitPeople: 6, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 9, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안6', waitPeople: 7, waitTime: 3, revenue: 0, status: 'normal' },
    ],
    360: [
        // 06:00 - 아침 (혼잡도 증가)
        { island: '보안1', waitPeople: 15, waitTime: 5, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 13, waitTime: 5, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 16, waitTime: 6, revenue: 0, status: 'warning' },
        { island: '보안4', waitPeople: 12, waitTime: 4, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 18, waitTime: 6, revenue: 0, status: 'warning' },
        { island: '보안6', waitPeople: 14, waitTime: 5, revenue: 0, status: 'normal' },
    ],
    420: [
        // 07:00
        { island: '보안1', waitPeople: 25, waitTime: 8, revenue: 0, status: 'warning' },
        { island: '보안2', waitPeople: 22, waitTime: 7, revenue: 0, status: 'warning' },
        { island: '보안3', waitPeople: 26, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안4', waitPeople: 20, waitTime: 7, revenue: 0, status: 'warning' },
        { island: '보안5', waitPeople: 28, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안6', waitPeople: 23, waitTime: 8, revenue: 0, status: 'warning' },
    ],
    480: [
        // 08:00 - 출근 시간 (매우 혼잡)
        { island: '보안1', waitPeople: 38, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 35, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 40, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 33, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 42, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 36, waitTime: 12, revenue: 0, status: 'busy' },
    ],
    540: [
        // 09:00
        { island: '보안1', waitPeople: 35, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 32, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 36, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 30, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안5', waitPeople: 38, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 33, waitTime: 11, revenue: 0, status: 'busy' },
    ],
    600: [
        // 10:00 - 오전 피크
        { island: '보안1', waitPeople: 42, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 40, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 44, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 38, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 46, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 41, waitTime: 14, revenue: 0, status: 'busy' },
    ],
    660: [
        // 11:00
        { island: '보안1', waitPeople: 32, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 30, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안3', waitPeople: 33, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 28, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안5', waitPeople: 35, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 31, waitTime: 10, revenue: 0, status: 'warning' },
    ],
    720: [
        // 12:00 - 점심 시간
        { island: '보안1', waitPeople: 25, waitTime: 8, revenue: 0, status: 'warning' },
        { island: '보안2', waitPeople: 22, waitTime: 7, revenue: 0, status: 'warning' },
        { island: '보안3', waitPeople: 26, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안4', waitPeople: 20, waitTime: 7, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 28, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안6', waitPeople: 23, waitTime: 8, revenue: 0, status: 'warning' },
    ],
    780: [
        // 13:00
        { island: '보안1', waitPeople: 30, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안2', waitPeople: 27, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안3', waitPeople: 31, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안4', waitPeople: 25, waitTime: 8, revenue: 0, status: 'warning' },
        { island: '보안5', waitPeople: 33, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 28, waitTime: 9, revenue: 0, status: 'warning' },
    ],
    840: [
        // 14:00 - 오후 피크
        { island: '보안1', waitPeople: 38, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 35, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 39, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 33, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 41, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 36, waitTime: 12, revenue: 0, status: 'busy' },
    ],
    900: [
        // 15:00
        { island: '보안1', waitPeople: 43, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 40, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 44, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 38, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 46, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 41, waitTime: 14, revenue: 0, status: 'busy' },
    ],
    960: [
        // 16:00
        { island: '보안1', waitPeople: 47, waitTime: 16, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 44, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 48, waitTime: 16, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 42, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 50, waitTime: 17, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 45, waitTime: 15, revenue: 0, status: 'busy' },
    ],
    1020: [
        // 17:00 - 퇴근 시간 (가장 혼잡)
        { island: '보안1', waitPeople: 52, waitTime: 18, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 49, waitTime: 17, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 53, waitTime: 18, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 47, waitTime: 16, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 55, waitTime: 19, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 50, waitTime: 17, revenue: 0, status: 'busy' },
    ],
    1080: [
        // 18:00
        { island: '보안1', waitPeople: 45, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 42, waitTime: 14, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 46, waitTime: 15, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 40, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안5', waitPeople: 48, waitTime: 16, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 43, waitTime: 14, revenue: 0, status: 'busy' },
    ],
    1140: [
        // 19:00
        { island: '보안1', waitPeople: 36, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안2', waitPeople: 33, waitTime: 11, revenue: 0, status: 'busy' },
        { island: '보안3', waitPeople: 37, waitTime: 12, revenue: 0, status: 'busy' },
        { island: '보안4', waitPeople: 31, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안5', waitPeople: 39, waitTime: 13, revenue: 0, status: 'busy' },
        { island: '보안6', waitPeople: 34, waitTime: 11, revenue: 0, status: 'busy' },
    ],
    1200: [
        // 20:00 - 저녁 (혼잡도 감소)
        { island: '보안1', waitPeople: 28, waitTime: 9, revenue: 0, status: 'warning' },
        { island: '보안2', waitPeople: 25, waitTime: 8, revenue: 0, status: 'warning' },
        { island: '보안3', waitPeople: 29, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안4', waitPeople: 23, waitTime: 8, revenue: 0, status: 'warning' },
        { island: '보안5', waitPeople: 31, waitTime: 10, revenue: 0, status: 'warning' },
        { island: '보안6', waitPeople: 26, waitTime: 9, revenue: 0, status: 'warning' },
    ],
    1260: [
        // 21:00
        { island: '보안1', waitPeople: 20, waitTime: 7, revenue: 0, status: 'warning' },
        { island: '보안2', waitPeople: 17, waitTime: 6, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 21, waitTime: 7, revenue: 0, status: 'warning' },
        { island: '보안4', waitPeople: 15, waitTime: 5, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 23, waitTime: 8, revenue: 0, status: 'warning' },
        { island: '보안6', waitPeople: 18, waitTime: 6, revenue: 0, status: 'normal' },
    ],
    1320: [
        // 22:00
        { island: '보안1', waitPeople: 12, waitTime: 4, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 10, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 13, waitTime: 4, revenue: 0, status: 'normal' },
        { island: '보안4', waitPeople: 9, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 14, waitTime: 5, revenue: 0, status: 'normal' },
        { island: '보안6', waitPeople: 11, waitTime: 4, revenue: 0, status: 'normal' },
    ],
    1380: [
        // 23:00 - 밤 (한산함)
        { island: '보안1', waitPeople: 8, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 6, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 9, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안4', waitPeople: 5, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 10, waitTime: 3, revenue: 0, status: 'normal' },
        { island: '보안6', waitPeople: 7, waitTime: 2, revenue: 0, status: 'normal' },
    ],
    1440: [
        // 24:00 (00:00) - 자정
        { island: '보안1', waitPeople: 4, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안2', waitPeople: 3, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안3', waitPeople: 5, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안4', waitPeople: 2, waitTime: 1, revenue: 0, status: 'normal' },
        { island: '보안5', waitPeople: 6, waitTime: 2, revenue: 0, status: 'normal' },
        { island: '보안6', waitPeople: 4, waitTime: 1, revenue: 0, status: 'normal' },
    ],
};

// 시간에 따른 보안검색대 데이터 조회 헬퍼 함수
export const getSecurityDataByTime = (timeInMinutes: number): FacilityStatus[] => {
    const roundedTime = Math.round(timeInMinutes / 30) * 30;
    const clampedTime = Math.max(240, Math.min(1440, roundedTime));
    return timeBasedSecurityData[clampedTime] || timeBasedSecurityData[600];
};

// 시간대별 체크인카운터 혼잡도 데이터 (A~N 구역)
export const timeBasedCheckInCounterData: Record<number, FacilityStatus[]> = {
    240: [
        // 04:00 - 새벽 (한산함)
        { island: 'N', waitPeople: 3, waitTime: 1, revenue: 45000, status: 'normal' },
        { island: 'M', waitPeople: 2, waitTime: 1, revenue: 38000, status: 'normal' },
        { island: 'L', waitPeople: 4, waitTime: 2, revenue: 52000, status: 'normal' },
        { island: 'K', waitPeople: 3, waitTime: 1, revenue: 41000, status: 'normal' },
        { island: 'E', waitPeople: 2, waitTime: 1, revenue: 35000, status: 'normal' },
        { island: 'F', waitPeople: 3, waitTime: 1, revenue: 43000, status: 'normal' },
        { island: 'G', waitPeople: 4, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'H', waitPeople: 2, waitTime: 1, revenue: 37000, status: 'normal' },
        { island: 'I', waitPeople: 3, waitTime: 1, revenue: 42000, status: 'normal' },
        { island: 'J', waitPeople: 4, waitTime: 2, revenue: 46000, status: 'normal' },
        { island: 'K', waitPeople: 2, waitTime: 1, revenue: 39000, status: 'normal' },
        { island: 'C', waitPeople: 3, waitTime: 1, revenue: 44000, status: 'normal' },
        { island: 'B', waitPeople: 4, waitTime: 2, revenue: 50000, status: 'normal' },
        { island: 'A', waitPeople: 3, waitTime: 1, revenue: 47000, status: 'normal' },
    ],
    270: [
        // 04:30
        { island: 'N', waitPeople: 4, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'M', waitPeople: 3, waitTime: 1, revenue: 41000, status: 'normal' },
        { island: 'L', waitPeople: 5, waitTime: 2, revenue: 55000, status: 'normal' },
        { island: 'K', waitPeople: 4, waitTime: 2, revenue: 44000, status: 'normal' },
        { island: 'E', waitPeople: 3, waitTime: 1, revenue: 38000, status: 'normal' },
        { island: 'F', waitPeople: 4, waitTime: 2, revenue: 46000, status: 'normal' },
        { island: 'G', waitPeople: 5, waitTime: 2, revenue: 51000, status: 'normal' },
        { island: 'H', waitPeople: 3, waitTime: 1, revenue: 40000, status: 'normal' },
        { island: 'I', waitPeople: 4, waitTime: 2, revenue: 45000, status: 'normal' },
        { island: 'J', waitPeople: 5, waitTime: 2, revenue: 49000, status: 'normal' },
        { island: 'K', waitPeople: 3, waitTime: 1, revenue: 42000, status: 'normal' },
        { island: 'C', waitPeople: 4, waitTime: 2, revenue: 47000, status: 'normal' },
        { island: 'B', waitPeople: 5, waitTime: 2, revenue: 53000, status: 'normal' },
        { island: 'A', waitPeople: 4, waitTime: 2, revenue: 50000, status: 'normal' },
    ],
    300: [
        // 05:00
        { island: 'N', waitPeople: 6, waitTime: 3, revenue: 62000, status: 'normal' },
        { island: 'M', waitPeople: 5, waitTime: 2, revenue: 55000, status: 'normal' },
        { island: 'L', waitPeople: 7, waitTime: 3, revenue: 69000, status: 'normal' },
        { island: 'K', waitPeople: 6, waitTime: 3, revenue: 58000, status: 'normal' },
        { island: 'E', waitPeople: 5, waitTime: 2, revenue: 52000, status: 'normal' },
        { island: 'F', waitPeople: 6, waitTime: 3, revenue: 60000, status: 'normal' },
        { island: 'G', waitPeople: 7, waitTime: 3, revenue: 65000, status: 'normal' },
        { island: 'H', waitPeople: 5, waitTime: 2, revenue: 54000, status: 'normal' },
        { island: 'I', waitPeople: 6, waitTime: 3, revenue: 59000, status: 'normal' },
        { island: 'J', waitPeople: 7, waitTime: 3, revenue: 63000, status: 'normal' },
        { island: 'K', waitPeople: 5, waitTime: 2, revenue: 56000, status: 'normal' },
        { island: 'C', waitPeople: 6, waitTime: 3, revenue: 61000, status: 'normal' },
        { island: 'B', waitPeople: 7, waitTime: 3, revenue: 67000, status: 'normal' },
        { island: 'A', waitPeople: 6, waitTime: 3, revenue: 64000, status: 'normal' },
    ],
    330: [
        // 05:30
        { island: 'N', waitPeople: 8, waitTime: 4, revenue: 78000, status: 'normal' },
        { island: 'M', waitPeople: 7, waitTime: 3, revenue: 71000, status: 'normal' },
        { island: 'L', waitPeople: 9, waitTime: 4, revenue: 85000, status: 'normal' },
        { island: 'K', waitPeople: 8, waitTime: 4, revenue: 74000, status: 'normal' },
        { island: 'E', waitPeople: 7, waitTime: 3, revenue: 68000, status: 'normal' },
        { island: 'F', waitPeople: 8, waitTime: 4, revenue: 76000, status: 'normal' },
        { island: 'G', waitPeople: 9, waitTime: 4, revenue: 81000, status: 'normal' },
        { island: 'H', waitPeople: 7, waitTime: 3, revenue: 70000, status: 'normal' },
        { island: 'I', waitPeople: 8, waitTime: 4, revenue: 75000, status: 'normal' },
        { island: 'J', waitPeople: 9, waitTime: 4, revenue: 79000, status: 'normal' },
        { island: 'K', waitPeople: 7, waitTime: 3, revenue: 72000, status: 'normal' },
        { island: 'C', waitPeople: 8, waitTime: 4, revenue: 77000, status: 'normal' },
        { island: 'B', waitPeople: 9, waitTime: 4, revenue: 83000, status: 'normal' },
        { island: 'A', waitPeople: 8, waitTime: 4, revenue: 80000, status: 'normal' },
    ],
    360: [
        // 06:00 - 아침 시작
        { island: 'N', waitPeople: 12, waitTime: 5, revenue: 112000, status: 'normal' },
        { island: 'M', waitPeople: 10, waitTime: 4, revenue: 98000, status: 'normal' },
        { island: 'L', waitPeople: 13, waitTime: 5, revenue: 118000, status: 'normal' },
        { island: 'K', waitPeople: 11, waitTime: 5, revenue: 105000, status: 'normal' },
        { island: 'E', waitPeople: 10, waitTime: 4, revenue: 95000, status: 'normal' },
        { island: 'F', waitPeople: 12, waitTime: 5, revenue: 108000, status: 'normal' },
        { island: 'G', waitPeople: 13, waitTime: 5, revenue: 114000, status: 'normal' },
        { island: 'H', waitPeople: 10, waitTime: 4, revenue: 100000, status: 'normal' },
        { island: 'I', waitPeople: 11, waitTime: 5, revenue: 106000, status: 'normal' },
        { island: 'J', waitPeople: 12, waitTime: 5, revenue: 110000, status: 'normal' },
        { island: 'K', waitPeople: 10, waitTime: 4, revenue: 102000, status: 'normal' },
        { island: 'C', waitPeople: 11, waitTime: 5, revenue: 109000, status: 'normal' },
        { island: 'B', waitPeople: 13, waitTime: 5, revenue: 116000, status: 'normal' },
        { island: 'A', waitPeople: 12, waitTime: 5, revenue: 113000, status: 'normal' },
    ],
    390: [
        // 06:30
        { island: 'N', waitPeople: 15, waitTime: 6, revenue: 145000, status: 'normal' },
        { island: 'M', waitPeople: 13, waitTime: 5, revenue: 128000, status: 'normal' },
        { island: 'L', waitPeople: 16, waitTime: 6, revenue: 151000, status: 'normal' },
        { island: 'K', waitPeople: 14, waitTime: 6, revenue: 135000, status: 'normal' },
        { island: 'E', waitPeople: 13, waitTime: 5, revenue: 125000, status: 'normal' },
        { island: 'F', waitPeople: 15, waitTime: 6, revenue: 140000, status: 'normal' },
        { island: 'G', waitPeople: 16, waitTime: 6, revenue: 147000, status: 'normal' },
        { island: 'H', waitPeople: 13, waitTime: 5, revenue: 130000, status: 'normal' },
        { island: 'I', waitPeople: 14, waitTime: 6, revenue: 136000, status: 'normal' },
        { island: 'J', waitPeople: 15, waitTime: 6, revenue: 142000, status: 'normal' },
        { island: 'K', waitPeople: 13, waitTime: 5, revenue: 132000, status: 'normal' },
        { island: 'C', waitPeople: 14, waitTime: 6, revenue: 138000, status: 'normal' },
        { island: 'B', waitPeople: 16, waitTime: 6, revenue: 149000, status: 'normal' },
        { island: 'A', waitPeople: 15, waitTime: 6, revenue: 144000, status: 'normal' },
    ],
    420: [
        // 07:00 - 출근 시간대 시작 (혼잡 증가)
        { island: 'N', waitPeople: 22, waitTime: 8, revenue: 215000, status: 'warning' },
        { island: 'M', waitPeople: 19, waitTime: 7, revenue: 188000, status: 'normal' },
        { island: 'L', waitPeople: 24, waitTime: 8, revenue: 228000, status: 'warning' },
        { island: 'K', waitPeople: 21, waitTime: 7, revenue: 198000, status: 'warning' },
        { island: 'E', waitPeople: 18, waitTime: 7, revenue: 182000, status: 'normal' },
        { island: 'F', waitPeople: 22, waitTime: 8, revenue: 208000, status: 'warning' },
        { island: 'G', waitPeople: 23, waitTime: 8, revenue: 218000, status: 'warning' },
        { island: 'H', waitPeople: 19, waitTime: 7, revenue: 192000, status: 'normal' },
        { island: 'I', waitPeople: 21, waitTime: 7, revenue: 202000, status: 'warning' },
        { island: 'J', waitPeople: 22, waitTime: 8, revenue: 212000, status: 'warning' },
        { island: 'K', waitPeople: 20, waitTime: 7, revenue: 195000, status: 'warning' },
        { island: 'C', waitPeople: 21, waitTime: 7, revenue: 205000, status: 'warning' },
        { island: 'B', waitPeople: 24, waitTime: 8, revenue: 222000, status: 'warning' },
        { island: 'A', waitPeople: 23, waitTime: 8, revenue: 216000, status: 'warning' },
    ],
    450: [
        // 07:30
        { island: 'N', waitPeople: 28, waitTime: 10, revenue: 278000, status: 'warning' },
        { island: 'M', waitPeople: 25, waitTime: 9, revenue: 248000, status: 'warning' },
        { island: 'L', waitPeople: 30, waitTime: 10, revenue: 288000, status: 'warning' },
        { island: 'K', waitPeople: 27, waitTime: 9, revenue: 258000, status: 'warning' },
        { island: 'E', waitPeople: 24, waitTime: 8, revenue: 242000, status: 'warning' },
        { island: 'F', waitPeople: 28, waitTime: 10, revenue: 268000, status: 'warning' },
        { island: 'G', waitPeople: 29, waitTime: 10, revenue: 278000, status: 'warning' },
        { island: 'H', waitPeople: 25, waitTime: 9, revenue: 252000, status: 'warning' },
        { island: 'I', waitPeople: 27, waitTime: 9, revenue: 262000, status: 'warning' },
        { island: 'J', waitPeople: 28, waitTime: 10, revenue: 272000, status: 'warning' },
        { island: 'K', waitPeople: 26, waitTime: 9, revenue: 255000, status: 'warning' },
        { island: 'C', waitPeople: 27, waitTime: 9, revenue: 265000, status: 'warning' },
        { island: 'B', waitPeople: 30, waitTime: 10, revenue: 282000, status: 'warning' },
        { island: 'A', waitPeople: 29, waitTime: 10, revenue: 276000, status: 'warning' },
    ],
    480: [
        // 08:00 - 아침 피크
        { island: 'N', waitPeople: 35, waitTime: 12, revenue: 348000, status: 'busy' },
        { island: 'M', waitPeople: 32, waitTime: 11, revenue: 318000, status: 'busy' },
        { island: 'L', waitPeople: 38, waitTime: 13, revenue: 368000, status: 'busy' },
        { island: 'K', waitPeople: 34, waitTime: 12, revenue: 328000, status: 'busy' },
        { island: 'E', waitPeople: 31, waitTime: 11, revenue: 312000, status: 'busy' },
        { island: 'F', waitPeople: 35, waitTime: 12, revenue: 338000, status: 'busy' },
        { island: 'G', waitPeople: 36, waitTime: 12, revenue: 348000, status: 'busy' },
        { island: 'H', waitPeople: 32, waitTime: 11, revenue: 322000, status: 'busy' },
        { island: 'I', waitPeople: 34, waitTime: 12, revenue: 332000, status: 'busy' },
        { island: 'J', waitPeople: 35, waitTime: 12, revenue: 342000, status: 'busy' },
        { island: 'K', waitPeople: 33, waitTime: 11, revenue: 325000, status: 'busy' },
        { island: 'C', waitPeople: 34, waitTime: 12, revenue: 335000, status: 'busy' },
        { island: 'B', waitPeople: 37, waitTime: 13, revenue: 358000, status: 'busy' },
        { island: 'A', waitPeople: 36, waitTime: 12, revenue: 352000, status: 'busy' },
    ],
    510: [
        // 08:30
        { island: 'N', waitPeople: 40, waitTime: 14, revenue: 398000, status: 'busy' },
        { island: 'M', waitPeople: 37, waitTime: 13, revenue: 368000, status: 'busy' },
        { island: 'L', waitPeople: 42, waitTime: 14, revenue: 418000, status: 'busy' },
        { island: 'K', waitPeople: 39, waitTime: 13, revenue: 378000, status: 'busy' },
        { island: 'E', waitPeople: 36, waitTime: 12, revenue: 362000, status: 'busy' },
        { island: 'F', waitPeople: 40, waitTime: 14, revenue: 388000, status: 'busy' },
        { island: 'G', waitPeople: 41, waitTime: 14, revenue: 398000, status: 'busy' },
        { island: 'H', waitPeople: 37, waitTime: 13, revenue: 372000, status: 'busy' },
        { island: 'I', waitPeople: 39, waitTime: 13, revenue: 382000, status: 'busy' },
        { island: 'J', waitPeople: 40, waitTime: 14, revenue: 392000, status: 'busy' },
        { island: 'K', waitPeople: 38, waitTime: 13, revenue: 375000, status: 'busy' },
        { island: 'C', waitPeople: 39, waitTime: 13, revenue: 385000, status: 'busy' },
        { island: 'B', waitPeople: 42, waitTime: 14, revenue: 408000, status: 'busy' },
        { island: 'A', waitPeople: 41, waitTime: 14, revenue: 402000, status: 'busy' },
    ],
    540: [
        // 09:00
        { island: 'N', waitPeople: 44, waitTime: 15, revenue: 438000, status: 'busy' },
        { island: 'M', waitPeople: 41, waitTime: 14, revenue: 408000, status: 'busy' },
        { island: 'L', waitPeople: 46, waitTime: 16, revenue: 458000, status: 'busy' },
        { island: 'K', waitPeople: 43, waitTime: 15, revenue: 418000, status: 'busy' },
        { island: 'E', waitPeople: 40, waitTime: 14, revenue: 402000, status: 'busy' },
        { island: 'F', waitPeople: 44, waitTime: 15, revenue: 428000, status: 'busy' },
        { island: 'G', waitPeople: 45, waitTime: 15, revenue: 438000, status: 'busy' },
        { island: 'H', waitPeople: 41, waitTime: 14, revenue: 412000, status: 'busy' },
        { island: 'I', waitPeople: 43, waitTime: 15, revenue: 422000, status: 'busy' },
        { island: 'J', waitPeople: 44, waitTime: 15, revenue: 432000, status: 'busy' },
        { island: 'K', waitPeople: 42, waitTime: 14, revenue: 415000, status: 'busy' },
        { island: 'C', waitPeople: 43, waitTime: 15, revenue: 425000, status: 'busy' },
        { island: 'B', waitPeople: 46, waitTime: 16, revenue: 448000, status: 'busy' },
        { island: 'A', waitPeople: 45, waitTime: 15, revenue: 442000, status: 'busy' },
    ],
    570: [
        // 09:30
        { island: 'N', waitPeople: 47, waitTime: 16, revenue: 468000, status: 'busy' },
        { island: 'M', waitPeople: 44, waitTime: 15, revenue: 438000, status: 'busy' },
        { island: 'L', waitPeople: 49, waitTime: 17, revenue: 488000, status: 'busy' },
        { island: 'K', waitPeople: 46, waitTime: 16, revenue: 448000, status: 'busy' },
        { island: 'E', waitPeople: 43, waitTime: 15, revenue: 432000, status: 'busy' },
        { island: 'F', waitPeople: 47, waitTime: 16, revenue: 458000, status: 'busy' },
        { island: 'G', waitPeople: 48, waitTime: 16, revenue: 468000, status: 'busy' },
        { island: 'H', waitPeople: 44, waitTime: 15, revenue: 442000, status: 'busy' },
        { island: 'I', waitPeople: 46, waitTime: 16, revenue: 452000, status: 'busy' },
        { island: 'J', waitPeople: 47, waitTime: 16, revenue: 462000, status: 'busy' },
        { island: 'K', waitPeople: 45, waitTime: 15, revenue: 445000, status: 'busy' },
        { island: 'C', waitPeople: 46, waitTime: 16, revenue: 455000, status: 'busy' },
        { island: 'B', waitPeople: 49, waitTime: 17, revenue: 478000, status: 'busy' },
        { island: 'A', waitPeople: 48, waitTime: 16, revenue: 472000, status: 'busy' },
    ],
    600: [
        // 10:00 - 오전 피크
        { island: 'N', waitPeople: 50, waitTime: 17, revenue: 498000, status: 'busy' },
        {
            island: 'M',
            waitPeople: 15,
            waitTime: 20,
            revenue: 468000,
            status: 'busy',
            processedPeople: 3,
            processTime: 25,
            totalRevenue: 111234567890,
            commercialCount: 3,
            revenuePerPerson: 111234567890,
            peopleChange: 8,
            changeRate: 2,
            checkInRate: 90,
            selfCheckInRate: 100,
            facilityCode: 'T1-3RD-M01-01',
        },
        { island: 'L', waitPeople: 52, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'K', waitPeople: 49, waitTime: 17, revenue: 478000, status: 'busy' },
        { island: 'E', waitPeople: 46, waitTime: 16, revenue: 462000, status: 'busy' },
        { island: 'F', waitPeople: 50, waitTime: 17, revenue: 488000, status: 'busy' },
        { island: 'G', waitPeople: 51, waitTime: 17, revenue: 498000, status: 'busy' },
        { island: 'H', waitPeople: 47, waitTime: 16, revenue: 472000, status: 'busy' },
        { island: 'I', waitPeople: 49, waitTime: 17, revenue: 482000, status: 'busy' },
        { island: 'J', waitPeople: 50, waitTime: 17, revenue: 492000, status: 'busy' },
        { island: 'K', waitPeople: 48, waitTime: 16, revenue: 475000, status: 'busy' },
        { island: 'C', waitPeople: 49, waitTime: 17, revenue: 485000, status: 'busy' },
        { island: 'B', waitPeople: 52, waitTime: 18, revenue: 508000, status: 'busy' },
        { island: 'A', waitPeople: 51, waitTime: 17, revenue: 502000, status: 'busy' },
    ],
    630: [
        // 10:30
        { island: 'N', waitPeople: 52, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'M', waitPeople: 49, waitTime: 17, revenue: 488000, status: 'busy' },
        { island: 'L', waitPeople: 54, waitTime: 19, revenue: 538000, status: 'busy' },
        { island: 'K', waitPeople: 51, waitTime: 18, revenue: 498000, status: 'busy' },
        { island: 'E', waitPeople: 48, waitTime: 17, revenue: 482000, status: 'busy' },
        { island: 'F', waitPeople: 52, waitTime: 18, revenue: 508000, status: 'busy' },
        { island: 'G', waitPeople: 53, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'H', waitPeople: 49, waitTime: 17, revenue: 492000, status: 'busy' },
        { island: 'I', waitPeople: 51, waitTime: 18, revenue: 502000, status: 'busy' },
        { island: 'J', waitPeople: 52, waitTime: 18, revenue: 512000, status: 'busy' },
        { island: 'K', waitPeople: 50, waitTime: 17, revenue: 495000, status: 'busy' },
        { island: 'C', waitPeople: 51, waitTime: 18, revenue: 505000, status: 'busy' },
        { island: 'B', waitPeople: 54, waitTime: 19, revenue: 528000, status: 'busy' },
        { island: 'A', waitPeople: 53, waitTime: 18, revenue: 522000, status: 'busy' },
    ],
    660: [
        // 11:00 - 정오 피크 시작
        { island: 'N', waitPeople: 55, waitTime: 19, revenue: 548000, status: 'busy' },
        { island: 'M', waitPeople: 52, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'L', waitPeople: 57, waitTime: 20, revenue: 568000, status: 'busy' },
        { island: 'K', waitPeople: 54, waitTime: 19, revenue: 528000, status: 'busy' },
        { island: 'E', waitPeople: 51, waitTime: 18, revenue: 512000, status: 'busy' },
        { island: 'F', waitPeople: 55, waitTime: 19, revenue: 538000, status: 'busy' },
        { island: 'G', waitPeople: 56, waitTime: 19, revenue: 548000, status: 'busy' },
        { island: 'H', waitPeople: 52, waitTime: 18, revenue: 522000, status: 'busy' },
        { island: 'I', waitPeople: 54, waitTime: 19, revenue: 532000, status: 'busy' },
        { island: 'J', waitPeople: 55, waitTime: 19, revenue: 542000, status: 'busy' },
        { island: 'K', waitPeople: 53, waitTime: 18, revenue: 525000, status: 'busy' },
        { island: 'C', waitPeople: 54, waitTime: 19, revenue: 535000, status: 'busy' },
        { island: 'B', waitPeople: 57, waitTime: 20, revenue: 558000, status: 'busy' },
        { island: 'A', waitPeople: 56, waitTime: 19, revenue: 552000, status: 'busy' },
    ],
    690: [
        // 11:30
        { island: 'N', waitPeople: 58, waitTime: 20, revenue: 578000, status: 'busy' },
        { island: 'M', waitPeople: 55, waitTime: 19, revenue: 548000, status: 'busy' },
        { island: 'L', waitPeople: 60, waitTime: 21, revenue: 598000, status: 'busy' },
        { island: 'K', waitPeople: 57, waitTime: 20, revenue: 558000, status: 'busy' },
        { island: 'E', waitPeople: 54, waitTime: 19, revenue: 542000, status: 'busy' },
        { island: 'F', waitPeople: 58, waitTime: 20, revenue: 568000, status: 'busy' },
        { island: 'G', waitPeople: 59, waitTime: 20, revenue: 578000, status: 'busy' },
        { island: 'H', waitPeople: 55, waitTime: 19, revenue: 552000, status: 'busy' },
        { island: 'I', waitPeople: 57, waitTime: 20, revenue: 562000, status: 'busy' },
        { island: 'J', waitPeople: 58, waitTime: 20, revenue: 572000, status: 'busy' },
        { island: 'K', waitPeople: 56, waitTime: 19, revenue: 555000, status: 'busy' },
        { island: 'C', waitPeople: 57, waitTime: 20, revenue: 565000, status: 'busy' },
        { island: 'B', waitPeople: 60, waitTime: 21, revenue: 588000, status: 'busy' },
        { island: 'A', waitPeople: 59, waitTime: 20, revenue: 582000, status: 'busy' },
    ],
    720: [
        // 12:00 - 정오 최고 피크
        { island: 'N', waitPeople: 62, waitTime: 22, revenue: 618000, status: 'busy' },
        { island: 'M', waitPeople: 59, waitTime: 21, revenue: 588000, status: 'busy' },
        { island: 'L', waitPeople: 64, waitTime: 23, revenue: 638000, status: 'busy' },
        { island: 'K', waitPeople: 61, waitTime: 22, revenue: 598000, status: 'busy' },
        { island: 'E', waitPeople: 58, waitTime: 20, revenue: 582000, status: 'busy' },
        { island: 'F', waitPeople: 62, waitTime: 22, revenue: 608000, status: 'busy' },
        { island: 'G', waitPeople: 63, waitTime: 22, revenue: 618000, status: 'busy' },
        { island: 'H', waitPeople: 59, waitTime: 21, revenue: 592000, status: 'busy' },
        { island: 'I', waitPeople: 61, waitTime: 22, revenue: 602000, status: 'busy' },
        { island: 'J', waitPeople: 62, waitTime: 22, revenue: 612000, status: 'busy' },
        { island: 'K', waitPeople: 60, waitTime: 21, revenue: 595000, status: 'busy' },
        { island: 'C', waitPeople: 61, waitTime: 22, revenue: 605000, status: 'busy' },
        { island: 'B', waitPeople: 64, waitTime: 23, revenue: 628000, status: 'busy' },
        { island: 'A', waitPeople: 63, waitTime: 22, revenue: 622000, status: 'busy' },
    ],
    750: [
        // 12:30
        { island: 'N', waitPeople: 60, waitTime: 21, revenue: 598000, status: 'busy' },
        { island: 'M', waitPeople: 57, waitTime: 20, revenue: 568000, status: 'busy' },
        { island: 'L', waitPeople: 62, waitTime: 22, revenue: 618000, status: 'busy' },
        { island: 'K', waitPeople: 59, waitTime: 21, revenue: 578000, status: 'busy' },
        { island: 'E', waitPeople: 56, waitTime: 19, revenue: 562000, status: 'busy' },
        { island: 'F', waitPeople: 60, waitTime: 21, revenue: 588000, status: 'busy' },
        { island: 'G', waitPeople: 61, waitTime: 21, revenue: 598000, status: 'busy' },
        { island: 'H', waitPeople: 57, waitTime: 20, revenue: 572000, status: 'busy' },
        { island: 'I', waitPeople: 59, waitTime: 21, revenue: 582000, status: 'busy' },
        { island: 'J', waitPeople: 60, waitTime: 21, revenue: 592000, status: 'busy' },
        { island: 'K', waitPeople: 58, waitTime: 20, revenue: 575000, status: 'busy' },
        { island: 'C', waitPeople: 59, waitTime: 21, revenue: 585000, status: 'busy' },
        { island: 'B', waitPeople: 62, waitTime: 22, revenue: 608000, status: 'busy' },
        { island: 'A', waitPeople: 61, waitTime: 21, revenue: 602000, status: 'busy' },
    ],
    780: [
        // 13:00 - 오후 시작
        { island: 'N', waitPeople: 58, waitTime: 20, revenue: 578000, status: 'busy' },
        { island: 'M', waitPeople: 55, waitTime: 19, revenue: 548000, status: 'busy' },
        { island: 'L', waitPeople: 60, waitTime: 21, revenue: 598000, status: 'busy' },
        { island: 'K', waitPeople: 57, waitTime: 20, revenue: 558000, status: 'busy' },
        { island: 'E', waitPeople: 54, waitTime: 19, revenue: 542000, status: 'busy' },
        { island: 'F', waitPeople: 58, waitTime: 20, revenue: 568000, status: 'busy' },
        { island: 'G', waitPeople: 59, waitTime: 20, revenue: 578000, status: 'busy' },
        { island: 'H', waitPeople: 55, waitTime: 19, revenue: 552000, status: 'busy' },
        { island: 'I', waitPeople: 57, waitTime: 20, revenue: 562000, status: 'busy' },
        { island: 'J', waitPeople: 58, waitTime: 20, revenue: 572000, status: 'busy' },
        { island: 'K', waitPeople: 56, waitTime: 19, revenue: 555000, status: 'busy' },
        { island: 'C', waitPeople: 57, waitTime: 20, revenue: 565000, status: 'busy' },
        { island: 'B', waitPeople: 60, waitTime: 21, revenue: 588000, status: 'busy' },
        { island: 'A', waitPeople: 59, waitTime: 20, revenue: 582000, status: 'busy' },
    ],
    810: [
        // 13:30
        { island: 'N', waitPeople: 55, waitTime: 19, revenue: 548000, status: 'busy' },
        { island: 'M', waitPeople: 52, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'L', waitPeople: 57, waitTime: 20, revenue: 568000, status: 'busy' },
        { island: 'K', waitPeople: 54, waitTime: 19, revenue: 528000, status: 'busy' },
        { island: 'E', waitPeople: 51, waitTime: 18, revenue: 512000, status: 'busy' },
        { island: 'F', waitPeople: 55, waitTime: 19, revenue: 538000, status: 'busy' },
        { island: 'G', waitPeople: 56, waitTime: 19, revenue: 548000, status: 'busy' },
        { island: 'H', waitPeople: 52, waitTime: 18, revenue: 522000, status: 'busy' },
        { island: 'I', waitPeople: 54, waitTime: 19, revenue: 532000, status: 'busy' },
        { island: 'J', waitPeople: 55, waitTime: 19, revenue: 542000, status: 'busy' },
        { island: 'K', waitPeople: 53, waitTime: 18, revenue: 525000, status: 'busy' },
        { island: 'C', waitPeople: 54, waitTime: 19, revenue: 535000, status: 'busy' },
        { island: 'B', waitPeople: 57, waitTime: 20, revenue: 558000, status: 'busy' },
        { island: 'A', waitPeople: 56, waitTime: 19, revenue: 552000, status: 'busy' },
    ],
    840: [
        // 14:00
        { island: 'N', waitPeople: 52, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'M', waitPeople: 49, waitTime: 17, revenue: 488000, status: 'busy' },
        { island: 'L', waitPeople: 54, waitTime: 19, revenue: 538000, status: 'busy' },
        { island: 'K', waitPeople: 51, waitTime: 18, revenue: 498000, status: 'busy' },
        { island: 'E', waitPeople: 48, waitTime: 17, revenue: 482000, status: 'busy' },
        { island: 'F', waitPeople: 52, waitTime: 18, revenue: 508000, status: 'busy' },
        { island: 'G', waitPeople: 53, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'H', waitPeople: 49, waitTime: 17, revenue: 492000, status: 'busy' },
        { island: 'I', waitPeople: 51, waitTime: 18, revenue: 502000, status: 'busy' },
        { island: 'J', waitPeople: 52, waitTime: 18, revenue: 512000, status: 'busy' },
        { island: 'K', waitPeople: 50, waitTime: 17, revenue: 495000, status: 'busy' },
        { island: 'C', waitPeople: 51, waitTime: 18, revenue: 505000, status: 'busy' },
        { island: 'B', waitPeople: 54, waitTime: 19, revenue: 528000, status: 'busy' },
        { island: 'A', waitPeople: 53, waitTime: 18, revenue: 522000, status: 'busy' },
    ],
    870: [
        // 14:30
        { island: 'N', waitPeople: 50, waitTime: 17, revenue: 498000, status: 'busy' },
        { island: 'M', waitPeople: 47, waitTime: 16, revenue: 468000, status: 'busy' },
        { island: 'L', waitPeople: 52, waitTime: 18, revenue: 518000, status: 'busy' },
        { island: 'K', waitPeople: 49, waitTime: 17, revenue: 478000, status: 'busy' },
        { island: 'E', waitPeople: 46, waitTime: 16, revenue: 462000, status: 'busy' },
        { island: 'F', waitPeople: 50, waitTime: 17, revenue: 488000, status: 'busy' },
        { island: 'G', waitPeople: 51, waitTime: 17, revenue: 498000, status: 'busy' },
        { island: 'H', waitPeople: 47, waitTime: 16, revenue: 472000, status: 'busy' },
        { island: 'I', waitPeople: 49, waitTime: 17, revenue: 482000, status: 'busy' },
        { island: 'J', waitPeople: 50, waitTime: 17, revenue: 492000, status: 'busy' },
        { island: 'K', waitPeople: 48, waitTime: 16, revenue: 475000, status: 'busy' },
        { island: 'C', waitPeople: 49, waitTime: 17, revenue: 485000, status: 'busy' },
        { island: 'B', waitPeople: 52, waitTime: 18, revenue: 508000, status: 'busy' },
        { island: 'A', waitPeople: 51, waitTime: 17, revenue: 502000, status: 'busy' },
    ],
    900: [
        // 15:00 - 오후 피크 시작
        { island: 'N', waitPeople: 48, waitTime: 16, revenue: 478000, status: 'busy' },
        { island: 'M', waitPeople: 45, waitTime: 15, revenue: 448000, status: 'busy' },
        { island: 'L', waitPeople: 50, waitTime: 17, revenue: 498000, status: 'busy' },
        { island: 'K', waitPeople: 47, waitTime: 16, revenue: 458000, status: 'busy' },
        { island: 'E', waitPeople: 44, waitTime: 15, revenue: 442000, status: 'busy' },
        { island: 'F', waitPeople: 48, waitTime: 16, revenue: 468000, status: 'busy' },
        { island: 'G', waitPeople: 49, waitTime: 17, revenue: 478000, status: 'busy' },
        { island: 'H', waitPeople: 45, waitTime: 15, revenue: 452000, status: 'busy' },
        { island: 'I', waitPeople: 47, waitTime: 16, revenue: 462000, status: 'busy' },
        { island: 'J', waitPeople: 48, waitTime: 16, revenue: 472000, status: 'busy' },
        { island: 'K', waitPeople: 46, waitTime: 16, revenue: 455000, status: 'busy' },
        { island: 'C', waitPeople: 47, waitTime: 16, revenue: 465000, status: 'busy' },
        { island: 'B', waitPeople: 50, waitTime: 17, revenue: 488000, status: 'busy' },
        { island: 'A', waitPeople: 49, waitTime: 17, revenue: 482000, status: 'busy' },
    ],
    930: [
        // 15:30
        { island: 'N', waitPeople: 45, waitTime: 15, revenue: 448000, status: 'busy' },
        { island: 'M', waitPeople: 42, waitTime: 14, revenue: 418000, status: 'busy' },
        { island: 'L', waitPeople: 47, waitTime: 16, revenue: 468000, status: 'busy' },
        { island: 'K', waitPeople: 44, waitTime: 15, revenue: 428000, status: 'busy' },
        { island: 'E', waitPeople: 41, waitTime: 14, revenue: 412000, status: 'busy' },
        { island: 'F', waitPeople: 45, waitTime: 15, revenue: 438000, status: 'busy' },
        { island: 'G', waitPeople: 46, waitTime: 16, revenue: 448000, status: 'busy' },
        { island: 'H', waitPeople: 42, waitTime: 14, revenue: 422000, status: 'busy' },
        { island: 'I', waitPeople: 44, waitTime: 15, revenue: 432000, status: 'busy' },
        { island: 'J', waitPeople: 45, waitTime: 15, revenue: 442000, status: 'busy' },
        { island: 'K', waitPeople: 43, waitTime: 15, revenue: 425000, status: 'busy' },
        { island: 'C', waitPeople: 44, waitTime: 15, revenue: 435000, status: 'busy' },
        { island: 'B', waitPeople: 47, waitTime: 16, revenue: 458000, status: 'busy' },
        { island: 'A', waitPeople: 46, waitTime: 16, revenue: 452000, status: 'busy' },
    ],
    960: [
        // 16:00
        { island: 'N', waitPeople: 42, waitTime: 14, revenue: 418000, status: 'busy' },
        { island: 'M', waitPeople: 39, waitTime: 13, revenue: 388000, status: 'busy' },
        { island: 'L', waitPeople: 44, waitTime: 15, revenue: 438000, status: 'busy' },
        { island: 'K', waitPeople: 41, waitTime: 14, revenue: 398000, status: 'busy' },
        { island: 'E', waitPeople: 38, waitTime: 13, revenue: 382000, status: 'busy' },
        { island: 'F', waitPeople: 42, waitTime: 14, revenue: 408000, status: 'busy' },
        { island: 'G', waitPeople: 43, waitTime: 15, revenue: 418000, status: 'busy' },
        { island: 'H', waitPeople: 39, waitTime: 13, revenue: 392000, status: 'busy' },
        { island: 'I', waitPeople: 41, waitTime: 14, revenue: 402000, status: 'busy' },
        { island: 'J', waitPeople: 42, waitTime: 14, revenue: 412000, status: 'busy' },
        { island: 'K', waitPeople: 40, waitTime: 14, revenue: 395000, status: 'busy' },
        { island: 'C', waitPeople: 41, waitTime: 14, revenue: 405000, status: 'busy' },
        { island: 'B', waitPeople: 44, waitTime: 15, revenue: 428000, status: 'busy' },
        { island: 'A', waitPeople: 43, waitTime: 15, revenue: 422000, status: 'busy' },
    ],
    990: [
        // 16:30
        { island: 'N', waitPeople: 38, waitTime: 13, revenue: 378000, status: 'busy' },
        { island: 'M', waitPeople: 35, waitTime: 12, revenue: 348000, status: 'busy' },
        { island: 'L', waitPeople: 40, waitTime: 14, revenue: 398000, status: 'busy' },
        { island: 'K', waitPeople: 37, waitTime: 13, revenue: 358000, status: 'busy' },
        { island: 'E', waitPeople: 34, waitTime: 12, revenue: 342000, status: 'busy' },
        { island: 'F', waitPeople: 38, waitTime: 13, revenue: 368000, status: 'busy' },
        { island: 'G', waitPeople: 39, waitTime: 13, revenue: 378000, status: 'busy' },
        { island: 'H', waitPeople: 35, waitTime: 12, revenue: 352000, status: 'busy' },
        { island: 'I', waitPeople: 37, waitTime: 13, revenue: 362000, status: 'busy' },
        { island: 'J', waitPeople: 38, waitTime: 13, revenue: 372000, status: 'busy' },
        { island: 'K', waitPeople: 36, waitTime: 12, revenue: 355000, status: 'busy' },
        { island: 'C', waitPeople: 37, waitTime: 13, revenue: 365000, status: 'busy' },
        { island: 'B', waitPeople: 40, waitTime: 14, revenue: 388000, status: 'busy' },
        { island: 'A', waitPeople: 39, waitTime: 13, revenue: 382000, status: 'busy' },
    ],
    1020: [
        // 17:00 - 저녁 시작 (혼잡도 감소)
        { island: 'N', waitPeople: 34, waitTime: 12, revenue: 338000, status: 'busy' },
        { island: 'M', waitPeople: 31, waitTime: 11, revenue: 308000, status: 'busy' },
        { island: 'L', waitPeople: 36, waitTime: 12, revenue: 358000, status: 'busy' },
        { island: 'K', waitPeople: 33, waitTime: 11, revenue: 318000, status: 'busy' },
        { island: 'E', waitPeople: 30, waitTime: 10, revenue: 302000, status: 'warning' },
        { island: 'F', waitPeople: 34, waitTime: 12, revenue: 328000, status: 'busy' },
        { island: 'G', waitPeople: 35, waitTime: 12, revenue: 338000, status: 'busy' },
        { island: 'H', waitPeople: 31, waitTime: 11, revenue: 312000, status: 'busy' },
        { island: 'I', waitPeople: 33, waitTime: 11, revenue: 322000, status: 'busy' },
        { island: 'J', waitPeople: 34, waitTime: 12, revenue: 332000, status: 'busy' },
        { island: 'K', waitPeople: 32, waitTime: 11, revenue: 315000, status: 'busy' },
        { island: 'C', waitPeople: 33, waitTime: 11, revenue: 325000, status: 'busy' },
        { island: 'B', waitPeople: 36, waitTime: 12, revenue: 348000, status: 'busy' },
        { island: 'A', waitPeople: 35, waitTime: 12, revenue: 342000, status: 'busy' },
    ],
    1050: [
        // 17:30
        { island: 'N', waitPeople: 30, waitTime: 10, revenue: 298000, status: 'warning' },
        { island: 'M', waitPeople: 27, waitTime: 9, revenue: 268000, status: 'warning' },
        { island: 'L', waitPeople: 32, waitTime: 11, revenue: 318000, status: 'busy' },
        { island: 'K', waitPeople: 29, waitTime: 10, revenue: 278000, status: 'warning' },
        { island: 'E', waitPeople: 26, waitTime: 9, revenue: 262000, status: 'warning' },
        { island: 'F', waitPeople: 30, waitTime: 10, revenue: 288000, status: 'warning' },
        { island: 'G', waitPeople: 31, waitTime: 11, revenue: 298000, status: 'warning' },
        { island: 'H', waitPeople: 27, waitTime: 9, revenue: 272000, status: 'warning' },
        { island: 'I', waitPeople: 29, waitTime: 10, revenue: 282000, status: 'warning' },
        { island: 'J', waitPeople: 30, waitTime: 10, revenue: 292000, status: 'warning' },
        { island: 'K', waitPeople: 28, waitTime: 10, revenue: 275000, status: 'warning' },
        { island: 'C', waitPeople: 29, waitTime: 10, revenue: 285000, status: 'warning' },
        { island: 'B', waitPeople: 32, waitTime: 11, revenue: 308000, status: 'busy' },
        { island: 'A', waitPeople: 31, waitTime: 11, revenue: 302000, status: 'warning' },
    ],
    1080: [
        // 18:00
        { island: 'N', waitPeople: 26, waitTime: 9, revenue: 258000, status: 'warning' },
        { island: 'M', waitPeople: 23, waitTime: 8, revenue: 228000, status: 'warning' },
        { island: 'L', waitPeople: 28, waitTime: 10, revenue: 278000, status: 'warning' },
        { island: 'K', waitPeople: 25, waitTime: 8, revenue: 238000, status: 'warning' },
        { island: 'E', waitPeople: 22, waitTime: 7, revenue: 222000, status: 'warning' },
        { island: 'F', waitPeople: 26, waitTime: 9, revenue: 248000, status: 'warning' },
        { island: 'G', waitPeople: 27, waitTime: 9, revenue: 258000, status: 'warning' },
        { island: 'H', waitPeople: 23, waitTime: 8, revenue: 232000, status: 'warning' },
        { island: 'I', waitPeople: 25, waitTime: 8, revenue: 242000, status: 'warning' },
        { island: 'J', waitPeople: 26, waitTime: 9, revenue: 252000, status: 'warning' },
        { island: 'K', waitPeople: 24, waitTime: 8, revenue: 235000, status: 'warning' },
        { island: 'C', waitPeople: 25, waitTime: 8, revenue: 245000, status: 'warning' },
        { island: 'B', waitPeople: 28, waitTime: 10, revenue: 268000, status: 'warning' },
        { island: 'A', waitPeople: 27, waitTime: 9, revenue: 262000, status: 'warning' },
    ],
    1110: [
        // 18:30
        { island: 'N', waitPeople: 22, waitTime: 8, revenue: 218000, status: 'warning' },
        { island: 'M', waitPeople: 19, waitTime: 7, revenue: 188000, status: 'normal' },
        { island: 'L', waitPeople: 24, waitTime: 8, revenue: 238000, status: 'warning' },
        { island: 'K', waitPeople: 21, waitTime: 7, revenue: 198000, status: 'warning' },
        { island: 'E', waitPeople: 18, waitTime: 6, revenue: 182000, status: 'normal' },
        { island: 'F', waitPeople: 22, waitTime: 8, revenue: 208000, status: 'warning' },
        { island: 'G', waitPeople: 23, waitTime: 8, revenue: 218000, status: 'warning' },
        { island: 'H', waitPeople: 19, waitTime: 7, revenue: 192000, status: 'normal' },
        { island: 'I', waitPeople: 21, waitTime: 7, revenue: 202000, status: 'warning' },
        { island: 'J', waitPeople: 22, waitTime: 8, revenue: 212000, status: 'warning' },
        { island: 'K', waitPeople: 20, waitTime: 7, revenue: 195000, status: 'warning' },
        { island: 'C', waitPeople: 21, waitTime: 7, revenue: 205000, status: 'warning' },
        { island: 'B', waitPeople: 24, waitTime: 8, revenue: 228000, status: 'warning' },
        { island: 'A', waitPeople: 23, waitTime: 8, revenue: 222000, status: 'warning' },
    ],
    1140: [
        // 19:00
        { island: 'N', waitPeople: 18, waitTime: 6, revenue: 178000, status: 'normal' },
        { island: 'M', waitPeople: 15, waitTime: 5, revenue: 148000, status: 'normal' },
        { island: 'L', waitPeople: 20, waitTime: 7, revenue: 198000, status: 'warning' },
        { island: 'K', waitPeople: 17, waitTime: 6, revenue: 158000, status: 'normal' },
        { island: 'E', waitPeople: 14, waitTime: 5, revenue: 142000, status: 'normal' },
        { island: 'F', waitPeople: 18, waitTime: 6, revenue: 168000, status: 'normal' },
        { island: 'G', waitPeople: 19, waitTime: 7, revenue: 178000, status: 'normal' },
        { island: 'H', waitPeople: 15, waitTime: 5, revenue: 152000, status: 'normal' },
        { island: 'I', waitPeople: 17, waitTime: 6, revenue: 162000, status: 'normal' },
        { island: 'J', waitPeople: 18, waitTime: 6, revenue: 172000, status: 'normal' },
        { island: 'K', waitPeople: 16, waitTime: 6, revenue: 155000, status: 'normal' },
        { island: 'C', waitPeople: 17, waitTime: 6, revenue: 165000, status: 'normal' },
        { island: 'B', waitPeople: 20, waitTime: 7, revenue: 188000, status: 'warning' },
        { island: 'A', waitPeople: 19, waitTime: 7, revenue: 182000, status: 'normal' },
    ],
    1170: [
        // 19:30
        { island: 'N', waitPeople: 15, waitTime: 5, revenue: 148000, status: 'normal' },
        { island: 'M', waitPeople: 12, waitTime: 4, revenue: 118000, status: 'normal' },
        { island: 'L', waitPeople: 17, waitTime: 6, revenue: 168000, status: 'normal' },
        { island: 'K', waitPeople: 14, waitTime: 5, revenue: 128000, status: 'normal' },
        { island: 'E', waitPeople: 11, waitTime: 4, revenue: 112000, status: 'normal' },
        { island: 'F', waitPeople: 15, waitTime: 5, revenue: 138000, status: 'normal' },
        { island: 'G', waitPeople: 16, waitTime: 6, revenue: 148000, status: 'normal' },
        { island: 'H', waitPeople: 12, waitTime: 4, revenue: 122000, status: 'normal' },
        { island: 'I', waitPeople: 14, waitTime: 5, revenue: 132000, status: 'normal' },
        { island: 'J', waitPeople: 15, waitTime: 5, revenue: 142000, status: 'normal' },
        { island: 'K', waitPeople: 13, waitTime: 5, revenue: 125000, status: 'normal' },
        { island: 'C', waitPeople: 14, waitTime: 5, revenue: 135000, status: 'normal' },
        { island: 'B', waitPeople: 17, waitTime: 6, revenue: 158000, status: 'normal' },
        { island: 'A', waitPeople: 16, waitTime: 6, revenue: 152000, status: 'normal' },
    ],
    1200: [
        // 20:00 - 저녁 (혼잡도 감소)
        { island: 'N', waitPeople: 12, waitTime: 4, revenue: 118000, status: 'normal' },
        { island: 'M', waitPeople: 9, waitTime: 3, revenue: 88000, status: 'normal' },
        { island: 'L', waitPeople: 14, waitTime: 5, revenue: 138000, status: 'normal' },
        { island: 'K', waitPeople: 11, waitTime: 4, revenue: 98000, status: 'normal' },
        { island: 'E', waitPeople: 8, waitTime: 3, revenue: 82000, status: 'normal' },
        { island: 'F', waitPeople: 12, waitTime: 4, revenue: 108000, status: 'normal' },
        { island: 'G', waitPeople: 13, waitTime: 5, revenue: 118000, status: 'normal' },
        { island: 'H', waitPeople: 9, waitTime: 3, revenue: 92000, status: 'normal' },
        { island: 'I', waitPeople: 11, waitTime: 4, revenue: 102000, status: 'normal' },
        { island: 'J', waitPeople: 12, waitTime: 4, revenue: 112000, status: 'normal' },
        { island: 'K', waitPeople: 10, waitTime: 4, revenue: 95000, status: 'normal' },
        { island: 'C', waitPeople: 11, waitTime: 4, revenue: 105000, status: 'normal' },
        { island: 'B', waitPeople: 14, waitTime: 5, revenue: 128000, status: 'normal' },
        { island: 'A', waitPeople: 13, waitTime: 5, revenue: 122000, status: 'normal' },
    ],
    1230: [
        // 20:30
        { island: 'N', waitPeople: 10, waitTime: 3, revenue: 98000, status: 'normal' },
        { island: 'M', waitPeople: 7, waitTime: 2, revenue: 68000, status: 'normal' },
        { island: 'L', waitPeople: 12, waitTime: 4, revenue: 118000, status: 'normal' },
        { island: 'K', waitPeople: 9, waitTime: 3, revenue: 78000, status: 'normal' },
        { island: 'E', waitPeople: 6, waitTime: 2, revenue: 62000, status: 'normal' },
        { island: 'F', waitPeople: 10, waitTime: 3, revenue: 88000, status: 'normal' },
        { island: 'G', waitPeople: 11, waitTime: 4, revenue: 98000, status: 'normal' },
        { island: 'H', waitPeople: 7, waitTime: 2, revenue: 72000, status: 'normal' },
        { island: 'I', waitPeople: 9, waitTime: 3, revenue: 82000, status: 'normal' },
        { island: 'J', waitPeople: 10, waitTime: 3, revenue: 92000, status: 'normal' },
        { island: 'K', waitPeople: 8, waitTime: 3, revenue: 75000, status: 'normal' },
        { island: 'C', waitPeople: 9, waitTime: 3, revenue: 85000, status: 'normal' },
        { island: 'B', waitPeople: 12, waitTime: 4, revenue: 108000, status: 'normal' },
        { island: 'A', waitPeople: 11, waitTime: 4, revenue: 102000, status: 'normal' },
    ],
    1260: [
        // 21:00
        { island: 'N', waitPeople: 8, waitTime: 3, revenue: 78000, status: 'normal' },
        { island: 'M', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'L', waitPeople: 10, waitTime: 3, revenue: 98000, status: 'normal' },
        { island: 'K', waitPeople: 7, waitTime: 3, revenue: 58000, status: 'normal' },
        { island: 'E', waitPeople: 4, waitTime: 2, revenue: 42000, status: 'normal' },
        { island: 'F', waitPeople: 8, waitTime: 3, revenue: 68000, status: 'normal' },
        { island: 'G', waitPeople: 9, waitTime: 3, revenue: 78000, status: 'normal' },
        { island: 'H', waitPeople: 5, waitTime: 2, revenue: 52000, status: 'normal' },
        { island: 'I', waitPeople: 7, waitTime: 3, revenue: 62000, status: 'normal' },
        { island: 'J', waitPeople: 8, waitTime: 3, revenue: 72000, status: 'normal' },
        { island: 'K', waitPeople: 6, waitTime: 2, revenue: 55000, status: 'normal' },
        { island: 'C', waitPeople: 7, waitTime: 3, revenue: 65000, status: 'normal' },
        { island: 'B', waitPeople: 10, waitTime: 3, revenue: 88000, status: 'normal' },
        { island: 'A', waitPeople: 9, waitTime: 3, revenue: 82000, status: 'normal' },
    ],
    1290: [
        // 21:30
        { island: 'N', waitPeople: 6, waitTime: 2, revenue: 58000, status: 'normal' },
        { island: 'M', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'L', waitPeople: 8, waitTime: 3, revenue: 78000, status: 'normal' },
        { island: 'K', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'E', waitPeople: 3, waitTime: 1, revenue: 32000, status: 'normal' },
        { island: 'F', waitPeople: 6, waitTime: 2, revenue: 58000, status: 'normal' },
        { island: 'G', waitPeople: 7, waitTime: 3, revenue: 68000, status: 'normal' },
        { island: 'H', waitPeople: 4, waitTime: 2, revenue: 42000, status: 'normal' },
        { island: 'I', waitPeople: 5, waitTime: 2, revenue: 52000, status: 'normal' },
        { island: 'J', waitPeople: 6, waitTime: 2, revenue: 62000, status: 'normal' },
        { island: 'K', waitPeople: 4, waitTime: 2, revenue: 45000, status: 'normal' },
        { island: 'C', waitPeople: 5, waitTime: 2, revenue: 55000, status: 'normal' },
        { island: 'B', waitPeople: 8, waitTime: 3, revenue: 68000, status: 'normal' },
        { island: 'A', waitPeople: 7, waitTime: 3, revenue: 62000, status: 'normal' },
    ],
    1320: [
        // 22:00
        { island: 'N', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'M', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'L', waitPeople: 6, waitTime: 2, revenue: 58000, status: 'normal' },
        { island: 'K', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'E', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'F', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'G', waitPeople: 6, waitTime: 2, revenue: 58000, status: 'normal' },
        { island: 'H', waitPeople: 3, waitTime: 1, revenue: 32000, status: 'normal' },
        { island: 'I', waitPeople: 4, waitTime: 2, revenue: 42000, status: 'normal' },
        { island: 'J', waitPeople: 5, waitTime: 2, revenue: 52000, status: 'normal' },
        { island: 'K', waitPeople: 3, waitTime: 1, revenue: 35000, status: 'normal' },
        { island: 'C', waitPeople: 4, waitTime: 2, revenue: 45000, status: 'normal' },
        { island: 'B', waitPeople: 6, waitTime: 2, revenue: 58000, status: 'normal' },
        { island: 'A', waitPeople: 5, waitTime: 2, revenue: 52000, status: 'normal' },
    ],
    1350: [
        // 22:30
        { island: 'N', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'M', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'L', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'K', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'E', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'F', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'G', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'H', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'I', waitPeople: 3, waitTime: 1, revenue: 32000, status: 'normal' },
        { island: 'J', waitPeople: 4, waitTime: 2, revenue: 42000, status: 'normal' },
        { island: 'K', waitPeople: 2, waitTime: 1, revenue: 25000, status: 'normal' },
        { island: 'C', waitPeople: 3, waitTime: 1, revenue: 35000, status: 'normal' },
        { island: 'B', waitPeople: 5, waitTime: 2, revenue: 48000, status: 'normal' },
        { island: 'A', waitPeople: 4, waitTime: 2, revenue: 42000, status: 'normal' },
    ],
    1380: [
        // 23:00 - 밤 (한산함)
        { island: 'N', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'M', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'L', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'K', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'E', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'F', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'G', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'H', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'I', waitPeople: 3, waitTime: 1, revenue: 32000, status: 'normal' },
        { island: 'J', waitPeople: 3, waitTime: 1, revenue: 32000, status: 'normal' },
        { island: 'K', waitPeople: 2, waitTime: 1, revenue: 25000, status: 'normal' },
        { island: 'C', waitPeople: 3, waitTime: 1, revenue: 35000, status: 'normal' },
        { island: 'B', waitPeople: 4, waitTime: 2, revenue: 38000, status: 'normal' },
        { island: 'A', waitPeople: 3, waitTime: 1, revenue: 32000, status: 'normal' },
    ],
    1410: [
        // 23:30
        { island: 'N', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'M', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'L', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'K', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'E', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'F', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'G', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'H', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'I', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'J', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'K', waitPeople: 2, waitTime: 1, revenue: 25000, status: 'normal' },
        { island: 'C', waitPeople: 2, waitTime: 1, revenue: 25000, status: 'normal' },
        { island: 'B', waitPeople: 3, waitTime: 1, revenue: 28000, status: 'normal' },
        { island: 'A', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
    ],
    1440: [
        // 24:00 (00:00) - 자정
        { island: 'N', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'M', waitPeople: 1, waitTime: 1, revenue: 8000, status: 'normal' },
        { island: 'L', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'K', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'E', waitPeople: 1, waitTime: 1, revenue: 12000, status: 'normal' },
        { island: 'F', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'G', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'H', waitPeople: 1, waitTime: 1, revenue: 12000, status: 'normal' },
        { island: 'I', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'J', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
        { island: 'K', waitPeople: 1, waitTime: 1, revenue: 15000, status: 'normal' },
        { island: 'C', waitPeople: 2, waitTime: 1, revenue: 25000, status: 'normal' },
        { island: 'B', waitPeople: 2, waitTime: 1, revenue: 18000, status: 'normal' },
        { island: 'A', waitPeople: 2, waitTime: 1, revenue: 22000, status: 'normal' },
    ],
};

// 시간에 따른 체크인카운터 데이터 조회 헬퍼 함수
export const getCheckInCounterDataByTime = (timeInMinutes: number): FacilityStatus[] => {
    const roundedTime = Math.round(timeInMinutes / 30) * 30;
    const clampedTime = Math.max(240, Math.min(1440, roundedTime));
    return timeBasedCheckInCounterData[clampedTime] || timeBasedCheckInCounterData[600];
};

// 셀프체크인 키오스크 상태 인터페이스
export interface SelfCheckInKioskStatus {
    number: number;
    status: 'normal' | 'warning' | 'busy';
    waitPeople: number;
    waitTime: number;
}

// 시간대별 셀프체크인 키오스크 혼잡도 데이터
export const timeBasedSelfCheckInData: Record<number, SelfCheckInKioskStatus[]> = {
    240: [
        // 04:00 - 새벽 (한산함)
        { number: 1, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 2, status: 'normal', waitPeople: 1, waitTime: 1 },
        { number: 3, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 4, status: 'normal', waitPeople: 1, waitTime: 1 },
        { number: 5, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 6, status: 'normal', waitPeople: 1, waitTime: 1 },
    ],
    300: [
        // 05:00
        { number: 1, status: 'normal', waitPeople: 3, waitTime: 3 },
        { number: 2, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 3, status: 'normal', waitPeople: 3, waitTime: 3 },
        { number: 4, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 5, status: 'normal', waitPeople: 4, waitTime: 3 },
        { number: 6, status: 'normal', waitPeople: 3, waitTime: 3 },
    ],
    360: [
        // 06:00 - 아침 (혼잡도 증가)
        { number: 1, status: 'normal', waitPeople: 5, waitTime: 4 },
        { number: 2, status: 'normal', waitPeople: 4, waitTime: 3 },
        { number: 3, status: 'normal', waitPeople: 6, waitTime: 5 },
        { number: 4, status: 'warning', waitPeople: 8, waitTime: 7 },
        { number: 5, status: 'normal', waitPeople: 5, waitTime: 4 },
        { number: 6, status: 'normal', waitPeople: 6, waitTime: 5 },
    ],
    420: [
        // 07:00
        { number: 1, status: 'warning', waitPeople: 10, waitTime: 8 },
        { number: 2, status: 'normal', waitPeople: 8, waitTime: 6 },
        { number: 3, status: 'warning', waitPeople: 12, waitTime: 9 },
        { number: 4, status: 'warning', waitPeople: 11, waitTime: 9 },
        { number: 5, status: 'warning', waitPeople: 10, waitTime: 8 },
        { number: 6, status: 'normal', waitPeople: 9, waitTime: 7 },
    ],
    480: [
        // 08:00 - 출근 시간 (매우 혼잡)
        { number: 1, status: 'busy', waitPeople: 18, waitTime: 15 },
        { number: 2, status: 'busy', waitPeople: 16, waitTime: 13 },
        { number: 3, status: 'busy', waitPeople: 20, waitTime: 16 },
        { number: 4, status: 'busy', waitPeople: 19, waitTime: 15 },
        { number: 5, status: 'busy', waitPeople: 17, waitTime: 14 },
        { number: 6, status: 'busy', waitPeople: 18, waitTime: 15 },
    ],
    540: [
        // 09:00
        { number: 1, status: 'busy', waitPeople: 15, waitTime: 12 },
        { number: 2, status: 'warning', waitPeople: 13, waitTime: 10 },
        { number: 3, status: 'busy', waitPeople: 16, waitTime: 13 },
        { number: 4, status: 'busy', waitPeople: 14, waitTime: 11 },
        { number: 5, status: 'warning', waitPeople: 13, waitTime: 10 },
        { number: 6, status: 'busy', waitPeople: 15, waitTime: 12 },
    ],
    600: [
        // 10:00 - 오전 피크
        { number: 1, status: 'busy', waitPeople: 20, waitTime: 16 },
        { number: 2, status: 'busy', waitPeople: 18, waitTime: 14 },
        { number: 3, status: 'busy', waitPeople: 22, waitTime: 17 },
        { number: 4, status: 'busy', waitPeople: 21, waitTime: 16 },
        { number: 5, status: 'busy', waitPeople: 19, waitTime: 15 },
        { number: 6, status: 'busy', waitPeople: 20, waitTime: 16 },
    ],
    660: [
        // 11:00
        { number: 1, status: 'warning', waitPeople: 12, waitTime: 9 },
        { number: 2, status: 'warning', waitPeople: 10, waitTime: 8 },
        { number: 3, status: 'warning', waitPeople: 13, waitTime: 10 },
        { number: 4, status: 'busy', waitPeople: 15, waitTime: 12 },
        { number: 5, status: 'warning', waitPeople: 11, waitTime: 9 },
        { number: 6, status: 'warning', waitPeople: 12, waitTime: 9 },
    ],
    720: [
        // 12:00 - 점심 시간
        { number: 1, status: 'normal', waitPeople: 8, waitTime: 6 },
        { number: 2, status: 'normal', waitPeople: 7, waitTime: 5 },
        { number: 3, status: 'warning', waitPeople: 10, waitTime: 8 },
        { number: 4, status: 'normal', waitPeople: 9, waitTime: 7 },
        { number: 5, status: 'normal', waitPeople: 8, waitTime: 6 },
        { number: 6, status: 'normal', waitPeople: 7, waitTime: 5 },
    ],
    780: [
        // 13:00
        { number: 1, status: 'warning', waitPeople: 11, waitTime: 9 },
        { number: 2, status: 'normal', waitPeople: 9, waitTime: 7 },
        { number: 3, status: 'warning', waitPeople: 12, waitTime: 10 },
        { number: 4, status: 'warning', waitPeople: 11, waitTime: 9 },
        { number: 5, status: 'normal', waitPeople: 10, waitTime: 8 },
        { number: 6, status: 'warning', waitPeople: 11, waitTime: 9 },
    ],
    840: [
        // 14:00 - 오후 피크
        { number: 1, status: 'busy', waitPeople: 17, waitTime: 14 },
        { number: 2, status: 'busy', waitPeople: 15, waitTime: 12 },
        { number: 3, status: 'busy', waitPeople: 19, waitTime: 15 },
        { number: 4, status: 'busy', waitPeople: 18, waitTime: 14 },
        { number: 5, status: 'busy', waitPeople: 16, waitTime: 13 },
        { number: 6, status: 'busy', waitPeople: 17, waitTime: 14 },
    ],
    900: [
        // 15:00
        { number: 1, status: 'busy', waitPeople: 14, waitTime: 11 },
        { number: 2, status: 'warning', waitPeople: 12, waitTime: 9 },
        { number: 3, status: 'busy', waitPeople: 15, waitTime: 12 },
        { number: 4, status: 'busy', waitPeople: 14, waitTime: 11 },
        { number: 5, status: 'warning', waitPeople: 13, waitTime: 10 },
        { number: 6, status: 'busy', waitPeople: 14, waitTime: 11 },
    ],
    960: [
        // 16:00
        { number: 1, status: 'busy', waitPeople: 16, waitTime: 13 },
        { number: 2, status: 'warning', waitPeople: 14, waitTime: 11 },
        { number: 3, status: 'busy', waitPeople: 17, waitTime: 14 },
        { number: 4, status: 'busy', waitPeople: 16, waitTime: 13 },
        { number: 5, status: 'busy', waitPeople: 15, waitTime: 12 },
        { number: 6, status: 'busy', waitPeople: 16, waitTime: 13 },
    ],
    1020: [
        // 17:00 - 저녁 시간 (매우 혼잡)
        { number: 1, status: 'busy', waitPeople: 21, waitTime: 17 },
        { number: 2, status: 'busy', waitPeople: 19, waitTime: 15 },
        { number: 3, status: 'busy', waitPeople: 23, waitTime: 18 },
        { number: 4, status: 'busy', waitPeople: 22, waitTime: 17 },
        { number: 5, status: 'busy', waitPeople: 20, waitTime: 16 },
        { number: 6, status: 'busy', waitPeople: 21, waitTime: 17 },
    ],
    1080: [
        // 18:00 - 저녁 피크
        { number: 1, status: 'busy', waitPeople: 24, waitTime: 19 },
        { number: 2, status: 'busy', waitPeople: 22, waitTime: 17 },
        { number: 3, status: 'busy', waitPeople: 25, waitTime: 20 },
        { number: 4, status: 'busy', waitPeople: 24, waitTime: 19 },
        { number: 5, status: 'busy', waitPeople: 23, waitTime: 18 },
        { number: 6, status: 'busy', waitPeople: 24, waitTime: 19 },
    ],
    1140: [
        // 19:00
        { number: 1, status: 'busy', waitPeople: 18, waitTime: 14 },
        { number: 2, status: 'warning', waitPeople: 16, waitTime: 12 },
        { number: 3, status: 'busy', waitPeople: 19, waitTime: 15 },
        { number: 4, status: 'busy', waitPeople: 18, waitTime: 14 },
        { number: 5, status: 'busy', waitPeople: 17, waitTime: 13 },
        { number: 6, status: 'busy', waitPeople: 18, waitTime: 14 },
    ],
    1200: [
        // 20:00
        { number: 1, status: 'warning', waitPeople: 12, waitTime: 9 },
        { number: 2, status: 'normal', waitPeople: 10, waitTime: 8 },
        { number: 3, status: 'warning', waitPeople: 13, waitTime: 10 },
        { number: 4, status: 'warning', waitPeople: 12, waitTime: 9 },
        { number: 5, status: 'warning', waitPeople: 11, waitTime: 9 },
        { number: 6, status: 'warning', waitPeople: 12, waitTime: 9 },
    ],
    1260: [
        // 21:00
        { number: 1, status: 'normal', waitPeople: 8, waitTime: 6 },
        { number: 2, status: 'normal', waitPeople: 7, waitTime: 5 },
        { number: 3, status: 'normal', waitPeople: 9, waitTime: 7 },
        { number: 4, status: 'normal', waitPeople: 8, waitTime: 6 },
        { number: 5, status: 'normal', waitPeople: 7, waitTime: 5 },
        { number: 6, status: 'normal', waitPeople: 8, waitTime: 6 },
    ],
    1320: [
        // 22:00
        { number: 1, status: 'normal', waitPeople: 5, waitTime: 4 },
        { number: 2, status: 'normal', waitPeople: 4, waitTime: 3 },
        { number: 3, status: 'normal', waitPeople: 6, waitTime: 5 },
        { number: 4, status: 'normal', waitPeople: 5, waitTime: 4 },
        { number: 5, status: 'normal', waitPeople: 4, waitTime: 3 },
        { number: 6, status: 'normal', waitPeople: 5, waitTime: 4 },
    ],
    1380: [
        // 23:00
        { number: 1, status: 'normal', waitPeople: 3, waitTime: 2 },
        { number: 2, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 3, status: 'normal', waitPeople: 4, waitTime: 3 },
        { number: 4, status: 'normal', waitPeople: 3, waitTime: 2 },
        { number: 5, status: 'normal', waitPeople: 2, waitTime: 2 },
        { number: 6, status: 'normal', waitPeople: 3, waitTime: 2 },
    ],
    1440: [
        // 24:00 - 자정
        { number: 1, status: 'normal', waitPeople: 2, waitTime: 1 },
        { number: 2, status: 'normal', waitPeople: 1, waitTime: 1 },
        { number: 3, status: 'normal', waitPeople: 2, waitTime: 1 },
        { number: 4, status: 'normal', waitPeople: 1, waitTime: 1 },
        { number: 5, status: 'normal', waitPeople: 2, waitTime: 1 },
        { number: 6, status: 'normal', waitPeople: 1, waitTime: 1 },
    ],
};

// 시간에 따른 셀프체크인 데이터 조회 헬퍼 함수
export const getSelfCheckInDataByTime = (timeInMinutes: number): SelfCheckInKioskStatus[] => {
    const roundedTime = Math.round(timeInMinutes / 30) * 30;
    const clampedTime = Math.max(240, Math.min(1440, roundedTime));
    return timeBasedSelfCheckInData[clampedTime] || timeBasedSelfCheckInData[600];
};

// 사용자 정보 Mock Data
export const userInfoData: Record<string, { name: string; department: string }> = {
    user001: { name: '김철수', department: '운영관리팀' },
    user002: { name: '이영희', department: '공항운영팀' },
    user003: { name: '박민수', department: '여객서비스팀' },
    'test-key': { name: '홍길동', department: '시스템관리팀' },
    default: { name: '관리자', department: '운영본부' },
};

// 상업시설 위치 Mock Data
import type { CommercialFacilityPosition, Terminal } from '@/types/api.types';
import { GRID_COLUMNS } from '@/types/api.types';

// 실제 위도/경도를 포함한 Mock 데이터 (셀 내부의 다양한 위치에 배치)
// 일부 시설은 위도/경도를 가지고, 일부는 getCommercialFacilities에서 자동 계산됨
export const mockCommercialFacilities: (CommercialFacilityPosition | Omit<CommercialFacilityPosition, 'latitude' | 'longitude'>)[] = [
    // T1 터미널 상업시설
    {
        id: 'COMM-001',
        name: '면세점 A',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4587, // M2-05 셀 내부 왼쪽 상단 영역
        longitude: 126.4492,
        startCoord: 'M2-05',
        endCoord: 'M3-05',
        color: '#9333ea',
        area: 2,
        revenue: 15000000,
        description: '화장품 전문 면세점',
    },
    {
        id: 'COMM-002',
        name: '편의점 GS25',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4530, // E2-12 셀 내부 오른쪽 하단 영역
        longitude: 126.4562,
        startCoord: 'E2-12',
        endCoord: 'E2-13',
        color: '#9333ea',
        area: 2,
        revenue: 3500000,
        description: '24시간 편의점',
    },
    {
        id: 'COMM-003',
        name: '스타벅스',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4528, // E4-12 셀 내부 중앙 약간 왼쪽
        longitude: 126.4548,
        startCoord: 'E4-12',
        endCoord: 'E4-13',
        color: '#9333ea',
        area: 2,
        revenue: 5200000,
        description: '커피 전문점',
    },
    {
        id: 'COMM-004',
        name: '한식당 비빔밥',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4532, // M4-12 셀 내부 오른쪽 상단
        longitude: 126.4458,
        startCoord: 'M4-12',
        endCoord: 'M4-13',
        color: '#9333ea',
        area: 2,
        revenue: 6800000,
        description: '한식 레스토랑',
    },
    {
        id: 'COMM-005',
        name: '패션잡화 ABC',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4529, // W2-12 셀 내부 왼쪽 하단
        longitude: 126.4420,
        startCoord: 'W2-12',
        endCoord: 'W2-13',
        color: '#9333ea',
        area: 2,
        revenue: 4200000,
        description: '의류 및 잡화',
    },
    {
        id: 'COMM-006',
        name: '북카페',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4517, // W4-14 셀 내부 중앙 약간 오른쪽
        longitude: 126.4395,
        startCoord: 'W4-14',
        endCoord: 'W4-15',
        color: '#9333ea',
        area: 2,
        revenue: 2800000,
        description: '서적 및 카페',
    },
    {
        id: 'COMM-007',
        name: '면세점 B',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4518, // E1-14 셀 내부 가장자리
        longitude: 126.4575,
        startCoord: 'E1-14',
        endCoord: 'E2-15',
        color: '#9333ea',
        area: 4,
        revenue: 18500000,
        description: '종합 면세점',
    },
    {
        id: 'COMM-008',
        name: '푸드코트',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4502, // M1-16 셀 내부 중앙 하단
        longitude: 126.4505,
        startCoord: 'M1-16',
        endCoord: 'M2-16',
        color: '#9333ea',
        area: 2,
        revenue: 9200000,
        description: '다양한 음식점',
    },
    {
        id: 'COMM-009',
        name: '약국',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4448, // E3-17 셀 하단 가장자리
        longitude: 126.4555,
        startCoord: 'E3-17',
        endCoord: 'E4-17',
        color: '#9333ea',
        area: 2,
        revenue: 1500000,
        description: '의약품 및 건강용품',
    },
    {
        id: 'COMM-010',
        name: '상업시설 E',
        facilityType: 'commercial',
        terminal: 'T1',
        latitude: 37.4452, // M3-17 셀 왼쪽 하단 구석
        longitude: 126.4475,
        startCoord: 'M3-17',
        endCoord: 'M3-17',
        color: '#9333ea',
        area: 1,
        revenue: 800000,
        description: '기타 상업시설',
    },
    // T2 터미널 상업시설
    {
        id: 'COMM-101',
        name: '면세점 T2-A',
        facilityType: 'commercial',
        terminal: 'T2',
        latitude: 37.4585, // M1-04 셀 상단 왼쪽
        longitude: 126.4508,
        startCoord: 'M1-04',
        endCoord: 'M2-05',
        color: '#9333ea',
        area: 4,
        revenue: 22000000,
        description: '명품 전문 면세점',
    },
    {
        id: 'COMM-102',
        name: '베이커리',
        facilityType: 'commercial',
        terminal: 'T2',
        latitude: 37.4468, // E1-14 셀 오른쪽 상단
        longitude: 126.4578,
        startCoord: 'E1-14',
        endCoord: 'E1-14',
        color: '#9333ea',
        area: 1,
        revenue: 3200000,
        description: '베이커리 카페',
    },
    {
        id: 'COMM-103',
        name: '편의점 CU',
        facilityType: 'commercial',
        terminal: 'T2',
        latitude: 37.4455, // E3-16 셀 왼쪽 중앙
        longitude: 126.4550,
        startCoord: 'E3-16',
        endCoord: 'E3-17',
        color: '#9333ea',
        area: 2,
        revenue: 3800000,
        description: '편의점',
    },
    {
        id: 'COMM-104',
        name: '레스토랑 델리셔스',
        facilityType: 'commercial',
        terminal: 'T2',
        latitude: 37.4472, // M4-14 셀 오른쪽 하단
        longitude: 126.4465,
        startCoord: 'M4-14',
        endCoord: 'M4-15',
        color: '#9333ea',
        area: 2,
        revenue: 7500000,
        description: '양식 레스토랑',
    },
    {
        id: 'COMM-105',
        name: '기념품점',
        facilityType: 'commercial',
        terminal: 'T2',
        latitude: 37.4450, // W1-16 셀 중앙 하단
        longitude: 126.4425,
        startCoord: 'W1-16',
        endCoord: 'W2-17',
        color: '#9333ea',
        area: 4,
        revenue: 5600000,
        description: '한국 기념품',
    },
    {
        id: 'COMM-106',
        name: '카페 투썸플레이스',
        facilityType: 'commercial',
        terminal: 'T2',
        latitude: 37.4458, // W4-16 셀 왼쪽 가장자리
        longitude: 126.4390,
        startCoord: 'W4-16',
        endCoord: 'W4-16',
        color: '#9333ea',
        area: 1,
        revenue: 4100000,
        description: '커피 전문점',
    },

    // T1 터미널 체크인카운터
    {
        id: 'CHKN-001',
        name: '체크인카운터 A',
        facilityType: 'checkin',
        terminal: 'T1',
        latitude: 37.4598, // E3-03 셀 오른쪽 상단
        longitude: 126.4552,
        startCoord: 'E3-03',
        endCoord: 'E3-03',
        color: '#EAB308',
        description: '대한항공 전용',
    },
    {
        id: 'CHKN-002',
        name: '체크인카운터 B',
        facilityType: 'checkin',
        terminal: 'T1',
        latitude: 37.4475, // E2-14 셀 왼쪽 중앙
        longitude: 126.4565,
        startCoord: 'E2-14',
        endCoord: 'E2-14',
        color: '#EAB308',
        description: '아시아나항공',
    },
    {
        id: 'CHKN-003',
        name: '체크인카운터 C',
        facilityType: 'checkin',
        terminal: 'T1',
        latitude: 37.4460, // E4-16 셀 오른쪽 하단
        longitude: 126.4545,
        startCoord: 'E4-16',
        endCoord: 'E4-16',
        color: '#EAB308',
        description: '제주항공',
    },

    // T1 터미널 셀프체크인
    {
        id: 'SELF-001',
        name: '셀프체크인 A',
        facilityType: 'selfcheckin',
        terminal: 'T1',
        latitude: 37.4449, // E2-17 셀 상단 중앙
        longitude: 126.4568,
        startCoord: 'E2-17',
        endCoord: 'E2-17',
        color: '#9CA3AF',
        description: '무인 체크인 키오스크',
    },
    {
        id: 'SELF-002',
        name: '셀프체크인 B',
        facilityType: 'selfcheckin',
        terminal: 'T1',
        latitude: 37.4478, // E4-14 셀 왼쪽 하단
        longitude: 126.4542,
        startCoord: 'E4-14',
        endCoord: 'E4-14',
        color: '#9CA3AF',
        description: '무인 체크인 키오스크',
    },
    {
        id: 'SELF-003',
        name: '셀프체크인 C',
        facilityType: 'selfcheckin',
        terminal: 'T1',
        latitude: 37.4470, // W1-14 셀 오른쪽 가장자리
        longitude: 126.4432,
        startCoord: 'W1-14',
        endCoord: 'W1-14',
        color: '#9CA3AF',
        description: '무인 체크인 키오스크',
    },
    {
        id: 'SELF-004',
        name: '셀프체크인 D',
        facilityType: 'selfcheckin',
        terminal: 'T1',
        startCoord: 'W3-14',
        endCoord: 'W3-14',
        color: '#9CA3AF',
        description: '무인 체크인 키오스크',
    },

    // T1 터미널 보안검색대
    {
        id: 'SEC-001',
        name: '보안검색대 1',
        facilityType: 'security',
        terminal: 'T1',
        startCoord: 'E2-12',
        endCoord: 'E2-12',
        color: '#10B981',
        description: '승객 보안검색',
    },
    {
        id: 'SEC-002',
        name: '보안검색대 2',
        facilityType: 'security',
        terminal: 'T1',
        startCoord: 'E4-12',
        endCoord: 'E4-12',
        color: '#10B981',
        description: '승객 보안검색',
    },
    {
        id: 'SEC-003',
        name: '보안검색대 3',
        facilityType: 'security',
        terminal: 'T1',
        startCoord: 'M2-12',
        endCoord: 'M2-12',
        color: '#10B981',
        description: '승객 보안검색',
    },
    {
        id: 'SEC-004',
        name: '보안검색대 4',
        facilityType: 'security',
        terminal: 'T1',
        startCoord: 'M4-12',
        endCoord: 'M4-12',
        color: '#10B981',
        description: '승객 보안검색',
    },
    {
        id: 'SEC-005',
        name: '보안검색대 5',
        facilityType: 'security',
        terminal: 'T1',
        startCoord: 'W2-12',
        endCoord: 'W2-12',
        color: '#10B981',
        description: '승객 보안검색',
    },
    {
        id: 'SEC-006',
        name: '보안검색대 6',
        facilityType: 'security',
        terminal: 'T1',
        startCoord: 'W3-14',
        endCoord: 'W3-14',
        color: '#10B981',
        description: '승객 보안검색',
    },

    // T1 터미널 출국장
    {
        id: 'DEP-001',
        name: '출국장 1번',
        facilityType: 'departure',
        terminal: 'T1',
        startCoord: 'M3-06',
        endCoord: 'M3-06',
        color: '#EF4444',
        description: '탑승게이트 1-10',
    },
    {
        id: 'DEP-002',
        name: '출국장 2번',
        facilityType: 'departure',
        terminal: 'T1',
        startCoord: 'M1-17',
        endCoord: 'M1-17',
        color: '#EF4444',
        description: '탑승게이트 11-20',
    },
    {
        id: 'DEP-003',
        name: '출국장 3번',
        facilityType: 'departure',
        terminal: 'T1',
        startCoord: 'M3-17',
        endCoord: 'M3-17',
        color: '#EF4444',
        description: '탑승게이트 21-30',
    },
];

/**
 * 터미널별 상업시설 조회
 * latitude/longitude가 없는 경우 startCoord를 기반으로 자동 계산
 * @param terminal - 터미널 (T1 또는 T2), 미지정시 전체
 * @returns 상업시설 배열 (위도/경도 포함)
 */
export const getCommercialFacilities = (terminal?: Terminal): CommercialFacilityPosition[] => {
    const facilities = terminal
        ? mockCommercialFacilities.filter((f) => f.terminal === terminal)
        : mockCommercialFacilities;

    // latitude/longitude가 없는 시설만 자동 계산
    return facilities.map((facility) => {
        // 이미 위도/경도가 있으면 그대로 사용
        if ('latitude' in facility && 'longitude' in facility) {
            return facility as CommercialFacilityPosition;
        }

        // 없으면 startCoord를 기반으로 계산 (셀의 중앙점)
        const latLng = gridCoordToLatLngHelper(facility.startCoord);
        return {
            ...facility,
            latitude: latLng?.latitude ?? 37.4533,
            longitude: latLng?.longitude ?? 126.4480,
        } as CommercialFacilityPosition;
    });
};

// gridCoordToLatLng를 여기서 직접 구현 (순환 참조 방지)
function gridCoordToLatLngHelper(coord: string): { latitude: number; longitude: number } | null {
    // 좌표 파싱
    const match = coord.match(/^([EMWH][1-4])-(\d{2})$/);
    if (!match) return null;

    const [, colLabel, rowLabel] = match;
    const col = GRID_COLUMNS.indexOf(colLabel as (typeof GRID_COLUMNS)[number]);
    const row = parseInt(rowLabel, 10) - 1;

    if (col === -1 || row < 0 || row >= 17) return null;

    // 공항 범위 상수
    const AIRPORT_BOUNDS = {
        minLatitude: 37.4446,
        maxLatitude: 37.462,
        minLongitude: 126.438,
        maxLongitude: 126.458,
    };

    // 셀의 중앙점 계산
    const longitudeNormalized = (col + 0.5) / GRID_COLUMNS.length;
    const latitudeNormalized = (row + 0.5) / 17;

    const longitudeRange = AIRPORT_BOUNDS.maxLongitude - AIRPORT_BOUNDS.minLongitude;
    const latitudeRange = AIRPORT_BOUNDS.maxLatitude - AIRPORT_BOUNDS.minLatitude;

    const longitude = AIRPORT_BOUNDS.maxLongitude - longitudeNormalized * longitudeRange;
    const latitude = AIRPORT_BOUNDS.maxLatitude - latitudeNormalized * latitudeRange;

    return { latitude, longitude };
}

/**
 * 상업시설 저장 (localStorage)
 * @param facilities - 저장할 상업시설 배열
 */
export const saveCommercialFacilities = (facilities: CommercialFacilityPosition[]): void => {
    try {
        localStorage.setItem('commercialFacilities', JSON.stringify(facilities));
        console.log('상업시설 저장 완료:', facilities.length, '개');
    } catch (error) {
        console.error('상업시설 저장 실패:', error);
    }
};

/**
 * localStorage에서 상업시설 불러오기
 * @returns 저장된 상업시설 배열 또는 null
 */
export const loadCommercialFacilitiesFromStorage = (): CommercialFacilityPosition[] | null => {
    try {
        const stored = localStorage.getItem('commercialFacilities');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('상업시설 불러오기 실패:', error);
        return null;
    }
};

// API 타입 정의

export interface CounterStatus {
    counter: number;
    airline: string;
    status: 'busy' | 'closed' | 'warning' | 'available';
    waitPeople: number;
    waitTime: number;
    processedPeople: number;
}

export interface FacilityStatus {
    island: string;
    waitPeople: number;
    waitTime: number;
    revenue: number;
    status: 'normal' | 'warning' | 'busy';
    // 추가 필드들
    processedPeople?: number; // 처리인원
    processTime?: number; // 처리시간
    totalRevenue?: number; // 총 매출
    commercialCount?: number; // 상업시설 수
    revenuePerPerson?: number; // 인원대비 매출
    peopleChange?: number; // 매출 인원 증감
    changeRate?: number; // 증감률 (%)
    checkInRate?: number; // 체크인카운터 처리율 (%)
    selfCheckInRate?: number; // 셀프체크인 처리율 (%)
    facilityCode?: string; // 시설 코드 (예: T1-3RD-M01-01)
}

export interface TimeSlotData {
    time: string;
    leftCounter: string;
    rightCounter: string;
    leftProcessed: string;
    rightProcessed: string;
    leftWait: string;
    rightWait: string;
    highlight?: boolean;
}

export interface ChartDataPoint {
    time: string;
    processedPeople: number;
    waitingCurrent: number;
    waitingForecast: number;
    waitingPrevWeek: number;
}

// API 응답 래퍼 타입
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// 에러 타입
export interface ApiError {
    status: number;
    message: string;
    code?: string;
}

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

// 사용자 정보 타입
export interface UserInfo {
    name: string; // 이름
    department: string; // 부서
}

// 그리드 좌표 타입
export type GridCoordinate = string;

// 시설 타입
export type FacilityType = 'commercial' | 'checkin' | 'security' | 'departure' | 'selfcheckin';

// 터미널 타입
export type Terminal = 'T1' | 'T2';

// 그리드 컬럼 상수 (12개)
export const GRID_COLUMNS = [
    'E1',
    'E2',
    'E3',
    'E4',
    'M1',
    'M2',
    'M3',
    'M4',
    'W1',
    'W2',
    'W3',
    'W4',
] as const;

// 그리드 행 상수 (17개)
export const GRID_ROWS = Array.from({ length: 17 }, (_, i) => String(i + 1).padStart(2, '0'));

// 상업시설 위치 정보
export interface CommercialFacilityPosition {
    id: string; // 고유 ID (예: "COMM-001")
    name: string; // 시설명 (예: "면세점 A")
    facilityType: FacilityType; // 시설 타입
    terminal: Terminal; // 터미널
    startCoord: GridCoordinate; // 시작 좌표 (예: "M2-05") - 원형 표시 시 메인 위치
    endCoord: GridCoordinate; // 끝 좌표 (예: "M3-07") - 사각형 표시 시 사용
    color: string; // 렌더링 색상 (예: "#9333ea")
    area?: number; // 면적 (그리드 셀 개수)
    revenue?: number; // 매출
    description?: string; // 설명
    castSimulationCode?: string; // CAST시뮬레이션코드
    adjacentFacilityCode?: string; // 어깨시설코드 (위치좌표)
    displayMode?: 'circle' | 'rectangle'; // 표시 방식 (원형 또는 사각형, 기본값: circle)
}

// 시설 타입별 색상 매핑
export const FACILITY_TYPE_COLORS: Record<FacilityType, string> = {
    selfcheckin: '#9CA3AF', // 회색 (셀프체크인)
    checkin: '#F59E0B', // 주황색 (체크인카운터)
    security: '#EF4444', // 빨간색 (보안검색대)
    departure: '#10B981', // 초록색 (출국장)
    commercial: '#9333EA', // 보라색 (상업시설)
};

// 시설 타입별 한글 라벨
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
    selfcheckin: '셀프체크인',
    checkin: '체크인카운터',
    security: '보안검색대',
    departure: '출국장',
    commercial: '상업시설',
};

// 그리드 셀 메타데이터
export interface GridCell {
    coord: GridCoordinate; // 셀 좌표 (예: "M2-05")
    col: number; // 열 인덱스 (0-11)
    row: number; // 행 인덱스 (0-16)
    colLabel: string; // 열 라벨 (E1-W4)
    rowLabel: string; // 행 라벨 (01-17)
    isEmpty: boolean; // 셀이 비어있는지 여부
    facilityId?: string; // 시설 ID (셀을 차지하는 시설)
}

// 좌표 파싱 결과
export interface ParsedCoordinate {
    col: number; // 열 인덱스 (0-11)
    row: number; // 행 인덱스 (0-16)
    colLabel: string; // 열 라벨 (E1-W4)
    rowLabel: string; // 행 라벨 (01-17)
}

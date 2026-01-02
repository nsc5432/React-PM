export const API_ENDPOINTS = {
    // 카운터 관련
    COUNTERS: '/counters',
    COUNTER_BY_ID: (id: number) => `/counters/${id}`,

    // 시설 관련
    FACILITIES: '/facilities',
    FACILITY_BY_ISLAND: (island: string) => `/facilities/${island}`,

    // 차트 데이터
    CHART_DATA: '/charts',

    // 타임슬롯 데이터
    TIMESLOT_DATA: '/timeslots',
} as const;

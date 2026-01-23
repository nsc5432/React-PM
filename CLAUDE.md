# CLAUDE.md

React-PM: 인천공항 여객 관리 시뮬레이션 대시보드 (React 19 + TypeScript 5.9 + Vite 7)

## Quick Reference

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

**Path Alias:** `@/*` → `src/*`

## Directory Structure

```
src/
├── api/
│   ├── client.ts              # Axios (base: /api → localhost:8080)
│   ├── endpoints.ts           # 엔드포인트 상수
│   └── services/              # 5개 서비스
├── assets/svg/                # 35개 SVG 아이콘
├── components/
│   ├── author-info.tsx        # 시뮬레이션 작성자 정보
│   ├── icons/index.tsx        # SVG 컴포넌트 export
│   ├── layout/lnb.tsx         # 좌측 네비게이션
│   ├── time-range-selector.tsx
│   └── ui/                    # 31개 shadcn/ui 컴포넌트
├── hooks/                     # 7개 커스텀 훅
├── lib/
│   ├── utils.ts               # cn() 유틸리티
│   ├── mock-data.ts           # 목업 데이터
│   └── grid-utils.ts          # 그리드 좌표 유틸리티
├── modules/pm/
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── daily-smlt/        # 기준시뮬레이션
│   │   ├── user-smlt/         # 사용자시뮬레이션
│   │   ├── monitoring/        # 모니터링
│   │   └── facility-config/   # 시설물 매핑
│   └── shared/components/
│       ├── dashboard/         # 대시보드 공유 컴포넌트
│       └── timeline-player.tsx
├── types/api.types.ts         # 타입 정의
└── App.tsx                    # 라우팅
```

## Routes

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | UserSmltConfigPage | 사용자 시뮬레이션 설정 (기본) |
| `/pm/daily-smlt/result` | AirportDashboard | 기준 시뮬레이션 결과 |
| `/pm/user-smlt/config` | UserSmltConfigPage | 신규 시뮬레이션 설정 |
| `/pm/user-smlt/config/:key` | UserSmltConfigPage | 기존 시뮬레이션 조회 |
| `/pm/user-smlt/result/:key` | UserSmltResultPage | 사용자 시뮬레이션 결과 |
| `/pm/monitoring` | MonitoringPage | 시뮬레이션 모니터링 |
| `/pm/facility-config` | FacilityConfigPage | 시설물 매핑 |

## Core Pages

### 기준시뮬레이션 `/pm/daily-smlt/result`
- 5개 탭: 요약, 지도, 체크인카운터, 셀프체크인, 탑승구
- 각 탭 3개 뷰: Map / Table / Chart
- 위치: `src/modules/pm/pages/daily-smlt/`

### 사용자시뮬레이션 `/pm/user-smlt/*`
- 5개 설정 섹션 (항공편, 체크인, 셀프체크인, 탑승구, 보안검색대)
- 위치: `src/modules/pm/pages/user-smlt/`

### 시설물 매핑 `/pm/facility-config`
- 그리드 기반 시설물 배치, T1/T2 터미널 선택
- 위치: `src/modules/pm/pages/facility-config/`

## API Layer

### Services (`src/api/services/`)

| 서비스 | 메서드 |
|--------|--------|
| counterService | `getAll()`, `getById(id)` |
| facilityService | `getAll()`, `getByIsland(island)` |
| chartService | `getChartData()` |
| timeslotService | `getAll()` |
| userService | `getByKey(key)` |

### Hooks (`src/hooks/`)

| 훅 | 용도 |
|----|------|
| useCounterStatus | 카운터 상태 |
| useFacilityStatus | 시설물 상태 |
| useChartData | 차트 데이터 |
| useTimeSlotData | 타임슬롯 |
| useUserInfo(key) | 사용자 정보 |
| useMobile | 반응형 감지 |
| useToast | 토스트 알림 |

모든 데이터 훅: API 실패시 mock 자동 폴백, `{ data, loading, error, refetch }` 반환

## Key Components

### Dashboard (`src/modules/pm/shared/components/dashboard/`)

| 파일 | 용도 |
|------|------|
| airport-dashboard.tsx | 메인 대시보드 컨테이너 |
| dashboard-tabs.tsx | 5개 탭 네비게이션 |
| smlt-smry-rslt.tsx | 시뮬레이션 요약 (최대 컴포넌트) |
| view-mode-toggle.tsx | Map/Table/Chart 뷰 전환 |
| timeline-player.tsx | 시간 컨트롤 UI |

### Facility Views
각 시설 타입별 동일 구조 (`chkn/`, `slfchkn/`, `dep/`):
- `dashboard-header.tsx` - 헤더
- `map-view.tsx` - 지도 뷰
- `table-view.tsx` - 테이블 뷰
- `chart-view.tsx` - 차트 뷰

### UI Components (`src/components/ui/`)
31개 shadcn/ui 컴포넌트 (Radix UI + CVA 기반)

## Types (`src/types/api.types.ts`)

```typescript
// 주요 타입
ApiResponse<T>, CounterStatus, FacilityStatus, ChartDataPoint, TimeSlot

// 그리드 타입
GridCoordinate, GridCell, ParsedCoordinate, CommercialFacilityPosition

// 상수
FacilityType: 'commercial' | 'checkin' | 'security' | 'departure' | 'selfcheckin'
Terminal: 'T1' | 'T2'
Status: 'busy' | 'closed' | 'warning' | 'available'
GRID_COLUMNS (E1-W4), GRID_ROWS (01-17)
```

## Code Patterns

```typescript
// Path alias
import { Button } from '@/components/ui/button'

// Conditional className
import { cn } from '@/lib/utils'
<div className={cn('base', condition && 'extra')} />

// SVG import
import Icon from '@/assets/svg/icon.svg?react'

// Grid utils (src/lib/grid-utils.ts)
parseCoordinate('M2-05')      // { col, row, colIndex, rowIndex }
createCoordinate('M2', '05')  // 'M2-05'
```

## Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:8080  # 백엔드 URL
VITE_API_TIMEOUT=10000                    # 타임아웃 (ms)
VITE_ENABLE_MOCK=true                     # API 스킵, mock 사용
```

## Tech Stack

React 19.2, TypeScript 5.9.3, Vite 7.2.4, Tailwind CSS 4.1.18, shadcn/ui, Recharts 2.15.4, React Hook Form + Zod, Axios

## Development Notes

- **Mock 개발:** `VITE_ENABLE_MOCK=true` 설정시 백엔드 없이 개발 가능
- **언어:** UI 한국어 전용
- **테스트:** 미설정
- **폰트:** Pretendard

## LNB Navigation (4개 메뉴)

- 기준시뮬레이션 → `/pm/daily-smlt/result`
- 사용자시뮬레이션 → `/pm/user-smlt/config`
- 시뮬레이션 모니터링 → `/pm/monitoring`
- 시설물 매핑 → `/pm/facility-config`

## Statistics

- TypeScript 파일: 87개
- UI 컴포넌트: 31개
- 커스텀 훅: 7개
- API 서비스: 5개
- SVG 아이콘: 35개

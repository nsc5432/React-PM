# 시설물 매핑: 위도/경도 기반 정밀 배치 및 드래그 구현 계획

## 목표

시설물의 위도/경도 정보를 바탕으로 시설 배치 지도에 정확한 위치를 표시하고, 드래그 시 픽셀 위치를 위도/경도로 역계산하여 API를 통해 저장하는 기능 구현

## 샘플 데이터 (10개)

```javascript
출국장1: lat 37.45025103, lng 126.4542537 → W3-04
출국장2: lat 37.45015237, lng 126.4529945 → W2-04
출국장3: lat 37.44989135, lng 126.4518183 → M4-04
출국장4: lat 37.44876023, lng 126.4497998 → M1-04
출국장5: lat 37.44794488, lng 126.4490817 → E3-04
출국장6: lat 37.4471604,  lng 126.4481759 → E1-04
파스쿠찌: lat 37.44897152, lng 126.4506541 → M2-08
CU:      lat 37.44881024, lng 126.450685  → M2-10
셔틀버스: lat 37.44873571, lng 126.4514655 → M3-16
AED:     lat 37.44719312, lng 126.4489625 → E1-08
```

## 현재 문제점

1. **AIRPORT_BOUNDS 부정확**: 하드코딩된 좌표 범위가 실제 위치와 맞지 않음
2. **드래그 시 정밀도 낮음**: 셀 중앙으로만 스냅되어 정확한 위치 지정 불가
3. **API 연동 없음**: 위치 변경 시 localStorage만 사용, 서버 저장 없음

## 구현 계획

### Phase 1: 좌표 시스템 재계산

#### 1.1 AIRPORT_BOUNDS 정밀 계산

**파일**: `src/lib/grid-utils.ts:119-126`

**작업**: 10개 샘플 데이터를 분석하여 정확한 좌표 범위 도출

**기존 값**:
```typescript
const AIRPORT_BOUNDS = {
    minLatitude: 37.4446,
    maxLatitude: 37.4620,
    minLongitude: 126.4380,
    maxLongitude: 126.4580,
};
```

**새로운 값 (샘플 기반 계산)**:
- 경도 범위: 126.4482 (E1) ~ 126.4543 (W3)
- 위도 범위: 샘플 분석 후 결정
- 마진 추가: 그리드 17행 전체를 커버하도록 조정

**구현 방법**:
1. 6개 출국장(04행)의 경도 분석 → 12개 열의 경계 계산
2. 수직 샘플(M2-08, M2-10, M3-16) 위도 분석 → 17개 행의 경계 계산
3. 선형 보간으로 전체 그리드 범위 도출

#### 1.2 검증 함수 추가

**파일**: `src/lib/grid-utils.ts` (맨 아래 추가)

**함수**:
```typescript
export function verifyCoordinateAccuracy(): void
```

**용도**: 10개 샘플이 정확한 그리드 좌표로 변환되는지 검증

---

### Phase 2: 정밀 드래그 구현

#### 2.1 픽셀 → 위도/경도 역변환 함수 추가

**파일**: `src/lib/grid-utils.ts` (gridCoordToLatLng 함수 아래 추가)

**새 함수**:
```typescript
export function pixelToLatLng(
    x: number,
    y: number,
    gridWidth: number,
    gridHeight: number
): { latitude: number; longitude: number } | null
```

**로직**:
1. 픽셀 위치 → 0-1 정규화
2. 정규화 값 → 실제 위도/경도 변환
3. AIRPORT_BOUNDS 기반 계산

#### 2.2 FacilityGridMap 드래그 핸들러 개선

**파일**: `src/modules/pm/pages/facility-config/facility-grid-map.tsx:41-52`

**기존 문제**: 셀 중앙으로만 스냅

**개선 방법**:
1. `handleDrop`에서 마우스 픽셀 위치 계산
2. `pixelToLatLng()` 호출하여 정확한 위도/경도 추출
3. `onFacilityMove`에 위도/경도 전달

**주의사항**:
- Header row/column 오프셋(40px) 고려
- `gridRef.current?.getBoundingClientRect()` 사용

#### 2.3 부모 컴포넌트 핸들러 업데이트

**파일**: `src/modules/pm/pages/facility-config/facility-config-page.tsx:43-65`

**변경사항**:
```typescript
// 기존
handleFacilityMove(facilityId, newStartCoord, newEndCoord)

// 신규
handleFacilityMove(facilityId, newStartCoord, newEndCoord, latitude?, longitude?)
```

**로직**:
- `latitude`, `longitude` 파라미터가 있으면 → 정밀 드래그 위치 사용
- 없으면 → 기존처럼 `gridCoordToLatLng()`로 셀 중앙 계산

---

### Phase 3: API 연동

#### 3.1 API 엔드포인트 정의

**파일**: `src/api/endpoints.ts:1-18`

**추가**:
```typescript
UPDATE_FACILITY_POSITION: (facilityId: string) => `/facilities/${facilityId}/position`,
SAVE_FACILITIES: '/facilities/batch',
```

#### 3.2 Facility Service 확장

**파일**: `src/api/services/facility.service.ts:5-21`

**추가 메서드**:
```typescript
updatePosition: async (facilityId, latitude, longitude) => Promise<void>
saveBatch: async (facilities) => Promise<void>
```

#### 3.3 컴포넌트에서 API 호출

**파일**: `src/modules/pm/pages/facility-config/facility-config-page.tsx:43-65`

**handleFacilityMove 개선**:
1. 상태 업데이트 (기존)
2. `facilityService.updatePosition()` 호출
3. 성공 시 toast 표시
4. 실패 시 에러 toast + 상태 롤백

**handleSave 개선** (line 92-106):
1. `facilityService.saveBatch()` 호출
2. 성공 시 localStorage에도 백업 저장
3. 에러 핸들링 추가

**임포트 추가**:
```typescript
import { facilityService } from '@/api/services/facility.service';
```

---

### Phase 4: 테스트 및 검증

#### 4.1 좌표 검증 테스트 유틸리티

**새 파일**: `src/lib/coordinate-calibration-test.ts`

**내용**:
- 10개 샘플 데이터 상수 정의
- `testCoordinateAccuracy()`: 자동 검증 함수
- `printCalibrationResults()`: 콘솔 출력 함수

#### 4.2 개발 모드 테스트 버튼

**파일**: `src/modules/pm/pages/facility-config/facility-config-page.tsx:243`

**추가**:
```tsx
{import.meta.env.DEV && (
    <Button variant="outline" onClick={printCalibrationResults}>
        🧪 좌표 검증
    </Button>
)}
```

#### 4.3 Mock 데이터에 샘플 추가

**파일**: `src/lib/mock-data.ts:1666`

**작업**: 10개 샘플을 `mockCommercialFacilities` 배열에 추가

**용도**: 개발 환경에서 실제 샘플로 테스트

---

## 구현 순서

### 1단계: 좌표 재계산 (Phase 1)
- [ ] 샘플 데이터 분석하여 AIRPORT_BOUNDS 계산
- [ ] grid-utils.ts 업데이트
- [ ] 검증 함수 추가
- [ ] 테스트: 10개 샘플이 정확한 그리드 좌표로 매핑되는지 확인

### 2단계: 정밀 드래그 (Phase 2)
- [ ] `pixelToLatLng()` 함수 구현
- [ ] facility-grid-map.tsx의 `handleDrop` 개선
- [ ] facility-config-page.tsx의 `handleFacilityMove` 시그니처 변경
- [ ] 테스트: 드래그 시 위도/경도가 정확히 계산되는지 확인

### 3단계: API 연동 (Phase 3)
- [ ] API 엔드포인트 추가
- [ ] facility.service.ts 확장
- [ ] 컴포넌트에서 API 호출 통합
- [ ] 에러 핸들링 추가
- [ ] 테스트: API 호출 성공 여부 확인 (Network 탭)

### 4단계: 테스트 및 완성 (Phase 4)
- [ ] coordinate-calibration-test.ts 작성
- [ ] 테스트 버튼 추가
- [ ] Mock 데이터에 샘플 추가
- [ ] 수동 테스트 수행 (10개 샘플 시각적 확인)
- [ ] 드래그 정밀도 확인

---

## Critical Files

| 파일 | 변경 내용 | 우선순위 |
|------|-----------|----------|
| `src/lib/grid-utils.ts` | AIRPORT_BOUNDS 재계산, pixelToLatLng 추가 | ⭐⭐⭐ |
| `src/modules/pm/pages/facility-config/facility-grid-map.tsx` | handleDrop 개선 | ⭐⭐⭐ |
| `src/modules/pm/pages/facility-config/facility-config-page.tsx` | handleFacilityMove 시그니처 변경, API 연동 | ⭐⭐⭐ |
| `src/api/services/facility.service.ts` | updatePosition, saveBatch 메서드 추가 | ⭐⭐ |
| `src/api/endpoints.ts` | 엔드포인트 추가 | ⭐⭐ |
| `src/lib/coordinate-calibration-test.ts` | 새 파일 생성 (테스트용) | ⭐ |

---

## 검증 방법

### 자동 검증
```javascript
// 브라우저 콘솔에서 실행
import { printCalibrationResults } from '@/lib/coordinate-calibration-test';
printCalibrationResults();
// 결과: ✅ Passed: 10/10
```

### 수동 검증
1. 시설물 매핑 페이지 접속
2. T1 터미널 선택
3. 10개 샘플 시설물이 정확한 그리드 위치에 표시되는지 확인
4. 시설물 드래그 → 위도/경도 변경 확인 (테이블 열)
5. "저장" 버튼 → Network 탭에서 API 호출 확인
6. 페이지 새로고침 → 위치 유지 확인

### 성공 기준
- ✅ 10개 샘플 모두 정확한 그리드 셀에 표시
- ✅ 드래그 시 셀 내부 정확한 위치로 이동
- ✅ 위도/경도가 드래그 위치에 맞게 업데이트
- ✅ API 호출 성공 (또는 mock 모드에서 localStorage 저장)
- ✅ 페이지 리로드 후 위치 유지

---

## 기술적 의사결정

### 1. 좌표 보정 방식: 선형 보간
- 그리드가 균일한 직사각형이므로 선형 보간이 최적
- 복잡한 ML 모델 불필요

### 2. 드래그 정밀도: 픽셀 단위
- 요구사항에 명시된 "정확한 픽셀 위치"
- 위도/경도는 본질적으로 연속값
- 셀 스냅보다 정밀한 배치 가능

### 3. API 호출 시점: 드래그 즉시
- 즉시 저장으로 데이터 손실 방지
- 사용자에게 즉각적인 피드백
- 필요시 debounce 추가 가능

### 4. 에러 처리: Toast + 선택적 롤백
- Toast로 사용자 피드백
- API 실패 시 롤백 고려
- Optimistic UI 업데이트

---

## Edge Cases

1. **범위 외 좌표**: 가장 가까운 유효 위치로 클램핑 + 경고 toast
2. **시설물 겹침**: 현재대로 허용 (향후 충돌 감지 추가 가능)
3. **그리드 크기 변경**: `getBoundingClientRect()` 동적 계산으로 대응
4. **네트워크 실패**: 재시도 로직 + 오프라인 큐 (향후)
5. **동시 업데이트**: Optimistic UI + 서버 타임스탬프로 충돌 해결

---

## 예상 소요 시간

- Phase 1 (좌표 재계산): 2-3시간
- Phase 2 (정밀 드래그): 3-4시간
- Phase 3 (API 연동): 2-3시간
- Phase 4 (테스트): 1-2시간
- **총 예상**: 8-12시간

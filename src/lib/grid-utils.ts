import { GRID_COLUMNS, GRID_ROWS, type GridCoordinate, type ParsedCoordinate } from '@/types/api.types';

/**
 * 그리드 좌표 문자열을 파싱하여 열/행 인덱스 반환
 * @param coord - 좌표 문자열 (예: "M2-05")
 * @returns 파싱된 좌표 정보 또는 null (유효하지 않은 경우)
 */
export function parseCoordinate(coord: GridCoordinate): ParsedCoordinate | null {
    const match = coord.match(/^([EMWH][1-4])-(\d{2})$/);
    if (!match) return null;

    const [, colLabel, rowLabel] = match;
    const col = GRID_COLUMNS.indexOf(colLabel as (typeof GRID_COLUMNS)[number]);
    const row = parseInt(rowLabel, 10) - 1;

    if (col === -1 || row < 0 || row >= GRID_ROWS.length) {
        return null;
    }

    return { col, row, colLabel, rowLabel };
}

/**
 * 열/행 인덱스로부터 그리드 좌표 문자열 생성
 * @param col - 열 인덱스 (0-11)
 * @param row - 행 인덱스 (0-16)
 * @returns 좌표 문자열 (예: "M2-05") 또는 null (유효하지 않은 경우)
 */
export function createCoordinate(col: number, row: number): GridCoordinate | null {
    if (col < 0 || col >= GRID_COLUMNS.length || row < 0 || row >= GRID_ROWS.length) {
        return null;
    }
    return `${GRID_COLUMNS[col]}-${GRID_ROWS[row]}`;
}

/**
 * 픽셀 위치를 그리드 셀 좌표로 변환
 * @param x - 마우스 X 위치 (그리드 컨테이너 기준 상대 좌표)
 * @param y - 마우스 Y 위치 (그리드 컨테이너 기준 상대 좌표)
 * @param gridWidth - 그리드 전체 너비 (픽셀)
 * @param gridHeight - 그리드 전체 높이 (픽셀)
 * @returns 그리드 좌표 또는 null (범위 밖인 경우)
 */
export function pixelToGridCoord(
    x: number,
    y: number,
    gridWidth: number,
    gridHeight: number
): GridCoordinate | null {
    const cellWidth = gridWidth / GRID_COLUMNS.length;
    const cellHeight = gridHeight / GRID_ROWS.length;

    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    return createCoordinate(col, row);
}

/**
 * 그리드 좌표를 픽셀 위치로 변환 (셀의 왼쪽 상단 코너)
 * @param coord - 그리드 좌표 문자열
 * @param gridWidth - 그리드 전체 너비 (픽셀)
 * @param gridHeight - 그리드 전체 높이 (픽셀)
 * @returns { x, y } 픽셀 좌표 또는 null (유효하지 않은 좌표)
 */
export function gridCoordToPixel(
    coord: GridCoordinate,
    gridWidth: number,
    gridHeight: number
): { x: number; y: number } | null {
    const parsed = parseCoordinate(coord);
    if (!parsed) return null;

    const cellWidth = gridWidth / GRID_COLUMNS.length;
    const cellHeight = gridHeight / GRID_ROWS.length;

    return {
        x: parsed.col * cellWidth + cellWidth / 2,
        y: parsed.row * cellHeight + cellHeight / 2,
    };
}

/**
 * 두 좌표 사이의 그리드 면적 계산
 * @param startCoord - 시작 좌표
 * @param endCoord - 끝 좌표
 * @returns 그리드 셀 개수 (면적)
 */
export function calculateGridArea(startCoord: GridCoordinate, endCoord: GridCoordinate): number {
    const start = parseCoordinate(startCoord);
    const end = parseCoordinate(endCoord);

    if (!start || !end) return 0;

    const width = Math.abs(end.col - start.col) + 1;
    const height = Math.abs(end.row - start.row) + 1;

    return width * height;
}

/**
 * 좌표 범위의 유효성 검사 (시작 좌표가 끝 좌표보다 앞에 있어야 함)
 * @param startCoord - 시작 좌표
 * @param endCoord - 끝 좌표
 * @returns 유효한 범위인지 여부
 */
export function isValidCoordinateRange(
    startCoord: GridCoordinate,
    endCoord: GridCoordinate
): boolean {
    const start = parseCoordinate(startCoord);
    const end = parseCoordinate(endCoord);

    if (!start || !end) return false;

    return start.col <= end.col && start.row <= end.row;
}

// 공항 그리드 경계 상수 (인천공항 T1 기준)
// 실제 공항 구역의 위도/경도 범위를 정의
// 10개 샘플 데이터 분석 기반으로 재계산됨 (2026-01-29)
const AIRPORT_BOUNDS = {
    minLatitude: 37.4460, // 남쪽 경계 (row 17 아래)
    maxLatitude: 37.4510, // 북쪽 경계 (row 01 위)
    minLongitude: 126.4475, // 동쪽 경계 (E1 왼쪽) - 주의: 경도가 낮을수록 동쪽
    maxLongitude: 126.4550, // 서쪽 경계 (W4 오른쪽) - 주의: 경도가 높을수록 서쪽
};

/**
 * 위도/경도 좌표를 그리드 좌표로 변환
 * 인천공항 T1 터미널의 실제 지리 좌표를 12x17 그리드에 매핑
 *
 * 그리드 구조:
 * - 열 (Columns): E1, E2, E3, E4, M1, M2, M3, M4, W1, W2, W3, W4 (동쪽에서 서쪽으로)
 * - 행 (Rows): 01-17 (북쪽에서 남쪽으로)
 *
 * @param latitude - 위도 (37.4446 ~ 37.4620)
 * @param longitude - 경도 (126.4380 ~ 126.4580)
 * @returns 그리드 좌표 (예: "M2-05") 또는 null (범위를 벗어난 경우)
 */
export function latLngToGridCoord(latitude: number, longitude: number): GridCoordinate | null {
    // 경계 범위 체크
    if (
        latitude < AIRPORT_BOUNDS.minLatitude ||
        latitude > AIRPORT_BOUNDS.maxLatitude ||
        longitude < AIRPORT_BOUNDS.minLongitude ||
        longitude > AIRPORT_BOUNDS.maxLongitude
    ) {
        console.warn(
            `좌표가 공항 범위를 벗어났습니다: (${latitude}, ${longitude})`,
        );
        return null;
    }

    // 경도를 열 인덱스로 변환 (동쪽이 0, 서쪽이 11)
    // 경도가 클수록 동쪽이므로 반전 필요
    const longitudeRange = AIRPORT_BOUNDS.maxLongitude - AIRPORT_BOUNDS.minLongitude;
    const longitudeNormalized =
        (AIRPORT_BOUNDS.maxLongitude - longitude) / longitudeRange; // 0(동쪽) ~ 1(서쪽)
    const col = Math.floor(longitudeNormalized * GRID_COLUMNS.length);

    // 위도를 행 인덱스로 변환 (북쪽이 0, 남쪽이 16)
    // 위도가 클수록 북쪽이므로 반전 필요
    const latitudeRange = AIRPORT_BOUNDS.maxLatitude - AIRPORT_BOUNDS.minLatitude;
    const latitudeNormalized = (AIRPORT_BOUNDS.maxLatitude - latitude) / latitudeRange; // 0(북쪽) ~ 1(남쪽)
    const row = Math.floor(latitudeNormalized * GRID_ROWS.length);

    // 경계값 클램핑 (반올림 오차 방지)
    const clampedCol = Math.max(0, Math.min(GRID_COLUMNS.length - 1, col));
    const clampedRow = Math.max(0, Math.min(GRID_ROWS.length - 1, row));

    return createCoordinate(clampedCol, clampedRow);
}

/**
 * 그리드 좌표를 위도/경도로 역변환 (셀의 중앙점)
 * @param coord - 그리드 좌표 (예: "M2-05")
 * @returns { latitude, longitude } 또는 null (유효하지 않은 좌표)
 */
export function gridCoordToLatLng(
    coord: GridCoordinate,
): { latitude: number; longitude: number } | null {
    const parsed = parseCoordinate(coord);
    if (!parsed) return null;

    // 셀의 중앙점 계산을 위해 0.5 추가
    const longitudeNormalized = (parsed.col + 0.5) / GRID_COLUMNS.length; // 0 ~ 1
    const latitudeNormalized = (parsed.row + 0.5) / GRID_ROWS.length; // 0 ~ 1

    // 정규화된 값을 실제 좌표로 변환
    const longitudeRange = AIRPORT_BOUNDS.maxLongitude - AIRPORT_BOUNDS.minLongitude;
    const latitudeRange = AIRPORT_BOUNDS.maxLatitude - AIRPORT_BOUNDS.minLatitude;

    const longitude = AIRPORT_BOUNDS.maxLongitude - longitudeNormalized * longitudeRange;
    const latitude = AIRPORT_BOUNDS.maxLatitude - latitudeNormalized * latitudeRange;

    return { latitude, longitude };
}

/**
 * 위도/경도를 그리드 셀 내부의 상대적 픽셀 위치로 변환
 * @param latitude - 위도
 * @param longitude - 경도
 * @returns { coord, offsetX, offsetY } - 그리드 좌표와 셀 내부 오프셋 (0-1 범위의 비율)
 */
export function latLngToPixelPosition(
    latitude: number,
    longitude: number,
): { coord: GridCoordinate; offsetX: number; offsetY: number } | null {
    // 경계 범위 체크
    if (
        latitude < AIRPORT_BOUNDS.minLatitude ||
        latitude > AIRPORT_BOUNDS.maxLatitude ||
        longitude < AIRPORT_BOUNDS.minLongitude ||
        longitude > AIRPORT_BOUNDS.maxLongitude
    ) {
        return null;
    }

    // 경도를 열 위치로 변환 (0 ~ GRID_COLUMNS.length)
    const longitudeRange = AIRPORT_BOUNDS.maxLongitude - AIRPORT_BOUNDS.minLongitude;
    const longitudeNormalized = (AIRPORT_BOUNDS.maxLongitude - longitude) / longitudeRange;
    const colFloat = longitudeNormalized * GRID_COLUMNS.length;

    // 위도를 행 위치로 변환 (0 ~ GRID_ROWS.length)
    const latitudeRange = AIRPORT_BOUNDS.maxLatitude - AIRPORT_BOUNDS.minLatitude;
    const latitudeNormalized = (AIRPORT_BOUNDS.maxLatitude - latitude) / latitudeRange;
    const rowFloat = latitudeNormalized * GRID_ROWS.length;

    // 정수 부분 = 셀 인덱스, 소수 부분 = 셀 내부 위치 (0-1)
    const col = Math.floor(colFloat);
    const row = Math.floor(rowFloat);
    const offsetX = colFloat - col; // 0-1 범위
    const offsetY = rowFloat - row; // 0-1 범위

    // 경계값 클램핑
    const clampedCol = Math.max(0, Math.min(GRID_COLUMNS.length - 1, col));
    const clampedRow = Math.max(0, Math.min(GRID_ROWS.length - 1, row));

    const coord = createCoordinate(clampedCol, clampedRow);
    if (!coord) return null;

    return {
        coord,
        offsetX: Math.max(0, Math.min(1, offsetX)),
        offsetY: Math.max(0, Math.min(1, offsetY)),
    };
}

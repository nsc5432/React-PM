import { GRID_COLUMNS, GRID_ROWS, GridCoordinate, ParsedCoordinate } from '@/types/api.types';

/**
 * 그리드 좌표 문자열을 파싱하여 열/행 인덱스 반환
 * @param coord - 좌표 문자열 (예: "M2-05")
 * @returns 파싱된 좌표 정보 또는 null (유효하지 않은 경우)
 */
export function parseCoordinate(coord: GridCoordinate): ParsedCoordinate | null {
    const match = coord.match(/^([EMWH][1-4])-(\d{2})$/);
    if (!match) return null;

    const [, colLabel, rowLabel] = match;
    const col = GRID_COLUMNS.indexOf(colLabel as any);
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

import { useRef, useState, Fragment, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import {
    GRID_COLUMNS,
    GRID_ROWS,
    type CommercialFacilityPosition,
    FACILITY_TYPE_COLORS,
    FACILITY_TYPE_LABELS,
    type FacilityType,
} from '@/types/api.types';
import { createCoordinate, parseCoordinate, latLngToPixelPosition, pixelToLatLng } from '@/lib/grid-utils';

interface Props {
    facilities: CommercialFacilityPosition[];
    selectedFacilityId?: string | null;
    onFacilityMove: (
        facilityId: string,
        newStartCoord: string,
        newEndCoord: string,
        latitude?: number,
        longitude?: number,
    ) => void;
}

const CELL_SIZE = 40; // 셀 크기
const CIRCLE_RADIUS = 5; // 원 반지름

export function FacilityGridMap({ facilities, selectedFacilityId, onFacilityMove }: Props) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [draggedFacilityId, setDraggedFacilityId] = useState<string | null>(null);
    const [dragOverCoord, setDragOverCoord] = useState<string | null>(null);
    const [hoveredFacility, setHoveredFacility] = useState<{ facility: CommercialFacilityPosition; x: number; y: number; containerW: number; containerH: number } | null>(null);

    // 드래그 시작
    const handleDragStart = (e: React.DragEvent, facilityId: string) => {
        setDraggedFacilityId(facilityId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('facilityId', facilityId);
    };

    // 드래그 중
    const handleDragOver = (e: React.DragEvent, coord: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverCoord(coord);
    };

    // 드롭
    const handleDrop = (e: React.DragEvent, coord: string) => {
        e.preventDefault();

        const facilityId = e.dataTransfer.getData('facilityId');
        if (!facilityId || !coord) return;

        // 픽셀 위치에서 정밀 위도/경도 계산
        let latitude: number | undefined;
        let longitude: number | undefined;

        if (gridRef.current) {
            const rect = gridRef.current.getBoundingClientRect();
            const headerOffset = 40; // 헤더 행/열 크기
            const x = e.clientX - rect.left - headerOffset + gridRef.current.scrollLeft;
            const y = e.clientY - rect.top - headerOffset + gridRef.current.scrollTop;
            const gridWidth = gridRef.current.scrollWidth - headerOffset;
            const gridHeight = gridRef.current.scrollHeight - headerOffset;

            const latLng = pixelToLatLng(x, y, gridWidth, gridHeight);
            if (latLng) {
                latitude = latLng.latitude;
                longitude = latLng.longitude;
            }
        }

        // 다중셀 시설의 크기(span) 보존
        const facility = facilities.find((f) => f.id === facilityId);
        let endCoord = coord;
        if (facility) {
            const startParsed = parseCoordinate(facility.startCoord);
            const endParsed = parseCoordinate(facility.endCoord);
            const newStartParsed = parseCoordinate(coord);
            if (startParsed && endParsed && newStartParsed) {
                const colOffset = endParsed.col - startParsed.col;
                const rowOffset = endParsed.row - startParsed.row;
                const newEndCoord = createCoordinate(
                    newStartParsed.col + colOffset,
                    newStartParsed.row + rowOffset,
                );
                if (newEndCoord) endCoord = newEndCoord;
            }
        }

        onFacilityMove(facilityId, coord, endCoord, latitude, longitude);

        setDraggedFacilityId(null);
        setDragOverCoord(null);
    };

    // 드래그 종료
    const handleDragEnd = () => {
        setDraggedFacilityId(null);
        setDragOverCoord(null);
    };

    // 시설물들의 위치 정보를 계산 (셀 좌표 + 셀 내부 오프셋)
    const facilityPositions = useMemo(() => {
        return facilities.map((facility) => {
            const position = latLngToPixelPosition(
                facility.latitude,
                facility.longitude
            );
            return {
                facility,
                position,
            };
        });
    }, [facilities]);

    // 좌표별 시설 맵 (O(1) 조회)
    const facilitiesByCoord = useMemo(() => {
        const map = new Map<string, typeof facilityPositions>();
        for (const fp of facilityPositions) {
            if (!fp.position) continue;
            const list = map.get(fp.position.coord) ?? [];
            list.push(fp);
            map.set(fp.position.coord, list);
        }
        return map;
    }, [facilityPositions]);

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <h2 className="text-xl font-bold">시설 배치 지도</h2>

                {/* 그리드 컨테이너 */}
                <div ref={gridRef} className="overflow-x-auto w-full relative">
                    <div
                        className="grid border border-gray-300 w-full"
                        style={{
                            gridTemplateColumns: `40px repeat(${GRID_COLUMNS.length}, 1fr)`,
                            gridTemplateRows: `40px repeat(${GRID_ROWS.length}, ${CELL_SIZE}px)`,
                        }}
                    >
                        {/* 좌측 상단 빈 셀 */}
                        <div className="bg-gray-100 border-r border-b border-gray-300" />

                        {/* 열 라벨 (상단) */}
                        {GRID_COLUMNS.map((col) => (
                            <div
                                key={col}
                                className="bg-gray-100 border-r border-b border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700"
                            >
                                {col}
                            </div>
                        ))}

                        {/* 행 생성 */}
                        {GRID_ROWS.map((row, rowIndex) => (
                            <Fragment key={`row-${row}`}>
                                {/* 행 라벨 (좌측) */}
                                <div className="bg-gray-100 border-r border-b border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                                    {row}
                                </div>

                                {/* 셀 생성 */}
                                {GRID_COLUMNS.map((_, colIndex) => {
                                    const coord = createCoordinate(colIndex, rowIndex);
                                    if (!coord) return null;

                                    // 이 셀에 있는 시설들 찾기
                                    const facilitiesInCell = facilitiesByCoord.get(coord) ?? [];
                                    const isHighlighted = dragOverCoord === coord;

                                    return (
                                        <div
                                            key={coord}
                                            className={`border-r border-b border-gray-300 relative transition-colors bg-white ${
                                                isHighlighted ? 'bg-blue-100' : ''
                                            }`}
                                            onDragOver={(e) => handleDragOver(e, coord)}
                                            onDrop={(e) => handleDrop(e, coord)}
                                        >
                                            {/* 이 셀에 있는 모든 시설 원형 마커 렌더링 */}
                                            {facilitiesInCell.map(({ facility, position }) => {
                                                if (!position) return null;

                                                const isDragging = draggedFacilityId === facility.id;
                                                const isSelected = selectedFacilityId === facility.id;
                                                // 셀 내부의 정확한 위치 계산 (0-1 비율을 백분율로 변환)
                                                const leftPercent = position.offsetX * 100;
                                                const topPercent = position.offsetY * 100;

                                                return (
                                                    <div
                                                        key={facility.id}
                                                        draggable
                                                        onDragStart={(e) =>
                                                            handleDragStart(e, facility.id)
                                                        }
                                                        onDragEnd={handleDragEnd}
                                                        onMouseEnter={(e) => {
                                                            const container = gridRef.current;
                                                            if (container) {
                                                                const rect = container.getBoundingClientRect();
                                                                setHoveredFacility({
                                                                    facility,
                                                                    x: e.clientX - rect.left + container.scrollLeft,
                                                                    y: e.clientY - rect.top + container.scrollTop,
                                                                    containerW: container.scrollWidth,
                                                                    containerH: container.scrollHeight,
                                                                });
                                                            }
                                                        }}
                                                        onMouseLeave={() => setHoveredFacility(null)}
                                                        className={`absolute rounded-full cursor-move transition-all ${
                                                            isDragging ? 'opacity-50 scale-110' : ''
                                                        }`}
                                                        style={{
                                                            left: `${leftPercent}%`,
                                                            top: `${topPercent}%`,
                                                            transform: 'translate(-50%, -50%)',
                                                            width: isSelected ? `${CIRCLE_RADIUS * 4}px` : `${CIRCLE_RADIUS * 2}px`,
                                                            height: isSelected ? `${CIRCLE_RADIUS * 4}px` : `${CIRCLE_RADIUS * 2}px`,
                                                            backgroundColor: facility.color,
                                                            border: isSelected ? '3px solid #1d4ed8' : `2px solid ${facility.color}`,
                                                            boxShadow: isSelected
                                                                ? '0 0 0 3px rgba(29,78,216,0.3), 0 2px 8px rgba(0,0,0,0.3)'
                                                                : '0 2px 4px rgba(0,0,0,0.2)',
                                                            zIndex: isSelected ? 20 : 1,
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </Fragment>
                        ))}
                    </div>

                    {/* 툴팁 */}
                    {hoveredFacility && (() => {
                        const tooltipH = 100;
                        const gap = 10;
                        const nearRight = hoveredFacility.x + gap + 140 > hoveredFacility.containerW;
                        const nearBottom = hoveredFacility.y + tooltipH > hoveredFacility.containerH;
                        const hStyle: React.CSSProperties = nearRight
                            ? { right: hoveredFacility.containerW - hoveredFacility.x + gap }
                            : { left: hoveredFacility.x + gap };
                        const top = nearBottom ? hoveredFacility.y - tooltipH : hoveredFacility.y;
                        return (
                        <div
                            className="absolute pointer-events-none z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
                            style={{ ...hStyle, top }}
                        >
                            <div className="font-semibold mb-1">{hoveredFacility.facility.name}</div>
                            <div className="text-gray-300 space-y-0.5">
                                <div>유형: {FACILITY_TYPE_LABELS[hoveredFacility.facility.facilityType]}</div>
                                <div>좌표: {hoveredFacility.facility.startCoord}</div>
                                <div>위도: {hoveredFacility.facility.latitude.toFixed(4)}</div>
                                <div>경도: {hoveredFacility.facility.longitude.toFixed(4)}</div>
                            </div>
                        </div>
                        );
                    })()}
                </div>

                {/* 범례 */}
                <div className="flex items-center gap-6 text-sm flex-wrap">
                    {(Object.keys(FACILITY_TYPE_COLORS) as FacilityType[]).map((type) => (
                        <div key={type} className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: FACILITY_TYPE_COLORS[type] }}
                            />
                            <span className="text-gray-600">{FACILITY_TYPE_LABELS[type]}</span>
                        </div>
                    ))}
                    <span className="text-gray-400">
                        | 시설을 드래그하여 위치를 변경할 수 있습니다
                    </span>
                </div>
            </div>
        </Card>
    );
}

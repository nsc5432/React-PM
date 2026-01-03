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
import { createCoordinate, latLngToPixelPosition } from '@/lib/grid-utils';

interface Props {
    facilities: CommercialFacilityPosition[];
    onFacilityMove: (facilityId: string, newStartCoord: string, newEndCoord: string) => void;
}

const CELL_SIZE = 40; // 셀 크기
const CIRCLE_RADIUS = 5; // 원 반지름

export function FacilityGridMap({ facilities, onFacilityMove }: Props) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [draggedFacilityId, setDraggedFacilityId] = useState<string | null>(null);
    const [dragOverCoord, setDragOverCoord] = useState<string | null>(null);

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

        // 드롭된 좌표로 시설 이동
        onFacilityMove(facilityId, coord, coord);

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

    // 특정 좌표에 있는 시설들 찾기
    const getFacilitiesAtCoord = (coord: string) => {
        return facilityPositions
            .filter((fp) => fp.position?.coord === coord)
            .map((fp) => fp);
    };

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <h2 className="text-xl font-bold">시설 배치 지도</h2>

                {/* 그리드 컨테이너 */}
                <div ref={gridRef} className="overflow-auto w-full">
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
                                    const facilitiesInCell = getFacilitiesAtCoord(coord);
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
                                                        className={`absolute rounded-full cursor-move transition-all ${
                                                            isDragging ? 'opacity-50 scale-110' : ''
                                                        }`}
                                                        style={{
                                                            left: `${leftPercent}%`,
                                                            top: `${topPercent}%`,
                                                            transform: 'translate(-50%, -50%)',
                                                            width: `${CIRCLE_RADIUS * 2}px`,
                                                            height: `${CIRCLE_RADIUS * 2}px`,
                                                            backgroundColor: facility.color,
                                                            border: `2px solid ${facility.color}`,
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                        }}
                                                        title={`${facility.name}\n위도: ${facility.latitude.toFixed(4)}\n경도: ${facility.longitude.toFixed(4)}\n좌표: ${coord}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </Fragment>
                        ))}
                    </div>
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

import { useRef, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { GRID_COLUMNS, GRID_ROWS, CommercialFacilityPosition } from '@/types/api.types';
import { parseCoordinate, pixelToGridCoord, gridCoordToPixel, createCoordinate } from '@/lib/grid-utils';

interface Props {
    facilities: CommercialFacilityPosition[];
    onFacilityMove: (facilityId: string, newStartCoord: string, newEndCoord: string) => void;
}

export function FacilityGridMap({ facilities, onFacilityMove }: Props) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [draggedFacilityId, setDraggedFacilityId] = useState<string | null>(null);
    const [dragOverCoord, setDragOverCoord] = useState<string | null>(null);

    // 좌표에서 픽셀 위치 계산
    const getFacilityPosition = useCallback((coord: string) => {
        if (!gridRef.current) return { x: 0, y: 0 };

        const rect = gridRef.current.getBoundingClientRect();
        return gridCoordToPixel(coord, rect.width, rect.height) || { x: 0, y: 0 };
    }, []);

    // 드래그 시작
    const handleDragStart = (e: React.DragEvent, facilityId: string) => {
        setDraggedFacilityId(facilityId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('facilityId', facilityId);
    };

    // 드래그 중
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (!gridRef.current) return;

        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const coord = pixelToGridCoord(x, y, rect.width, rect.height);
        setDragOverCoord(coord);
    };

    // 드롭
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        const facilityId = e.dataTransfer.getData('facilityId');
        if (!facilityId || !dragOverCoord) return;

        const facility = facilities.find((f) => f.id === facilityId);
        if (!facility) return;

        // 시작 좌표와 끝 좌표의 오프셋 계산
        const startParsed = parseCoordinate(facility.startCoord);
        const endParsed = parseCoordinate(facility.endCoord);
        if (!startParsed || !endParsed) return;

        const colOffset = endParsed.col - startParsed.col;
        const rowOffset = endParsed.row - startParsed.row;

        // 새 끝 좌표 계산
        const dropParsed = parseCoordinate(dragOverCoord);
        if (!dropParsed) return;

        const newEndCoord = createCoordinate(dropParsed.col + colOffset, dropParsed.row + rowOffset);

        if (newEndCoord) {
            onFacilityMove(facilityId, dragOverCoord, newEndCoord);
        }

        setDraggedFacilityId(null);
        setDragOverCoord(null);
    };

    // 드래그 종료
    const handleDragEnd = () => {
        setDraggedFacilityId(null);
        setDragOverCoord(null);
    };

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <h2 className="text-xl font-bold">시설 배치 지도</h2>

                {/* 그리드 컨테이너 */}
                <div
                    ref={gridRef}
                    className="relative bg-gray-50 rounded-lg border-2 border-gray-200"
                    style={{ height: '600px' }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {/* 열 라벨 (상단) */}
                    <div className="absolute top-2 left-12 right-2 grid gap-px" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                        {GRID_COLUMNS.map((col) => (
                            <div key={col} className="text-center text-xs font-semibold text-gray-600">
                                {col}
                            </div>
                        ))}
                    </div>

                    {/* 행 라벨 (좌측) */}
                    <div className="absolute left-2 top-12 bottom-2 flex flex-col justify-between">
                        {GRID_ROWS.map((row) => (
                            <div key={row} className="text-center text-xs font-semibold text-gray-600 h-[calc((100%-8px)/17)]">
                                {row}
                            </div>
                        ))}
                    </div>

                    {/* 그리드 셀 */}
                    <div
                        className="absolute top-12 left-12 right-2 bottom-2 gap-px"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(12, 1fr)',
                            gridTemplateRows: 'repeat(17, 1fr)'
                        }}
                    >
                        {Array.from({ length: 204 }, (_, i) => {
                            const col = i % 12;
                            const row = Math.floor(i / 12);
                            const coord = createCoordinate(col, row);
                            const isHighlighted = dragOverCoord === coord;

                            return (
                                <div
                                    key={i}
                                    className={`border border-gray-200 bg-white transition-colors ${
                                        isHighlighted ? 'bg-purple-100' : ''
                                    }`}
                                />
                            );
                        })}
                    </div>

                    {/* 시설 점 */}
                    {facilities.map((facility) => {
                        const pos = getFacilityPosition(facility.startCoord);
                        const isDragging = draggedFacilityId === facility.id;

                        return (
                            <div
                                key={facility.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, facility.id)}
                                onDragEnd={handleDragEnd}
                                className={`absolute cursor-move transition-opacity ${
                                    isDragging ? 'opacity-50' : 'opacity-100'
                                }`}
                                style={{
                                    left: `calc(48px + ${pos.x}px)`,
                                    top: `calc(48px + ${pos.y}px)`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <div
                                    className="w-6 h-6 rounded-full shadow-lg hover:scale-125 transition-transform flex items-center justify-center text-white text-xs font-bold"
                                    style={{ backgroundColor: facility.color }}
                                    title={`${facility.name} (${facility.startCoord} ~ ${facility.endCoord})`}
                                >
                                    {facility.name.charAt(0)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 범례 */}
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-600" />
                        <span className="text-gray-600">상업시설</span>
                    </div>
                    <span className="text-gray-400">
                        | 보라색 점을 드래그하여 시설 위치를 변경할 수 있습니다
                    </span>
                </div>
            </div>
        </Card>
    );
}

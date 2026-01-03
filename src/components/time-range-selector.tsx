import { useState, useRef, useEffect } from 'react';

interface TimeRange {
    start: number;
    end: number;
}

interface TimeRangeSelectorProps {
    /** 선택된 시간 범위 배열 (각 범위는 0-23 시간 인덱스) */
    ranges: TimeRange[];
    /** 시간 범위가 변경될 때 호출되는 콜백 */
    onChange: (ranges: TimeRange[]) => void;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 전체 슬롯 개수 (기본값: 24) */
    totalSlots?: number;
    /** 선택된 영역 색상 (Tailwind 클래스, 기본값: bg-green-500) */
    selectedColor?: string;
    /** 미선택 영역 색상 (Tailwind 클래스, 기본값: bg-gray-200) */
    unselectedColor?: string;
}

export function TimeRangeSelector({
    ranges,
    onChange,
    disabled = false,
    totalSlots = 24,
    selectedColor = 'bg-green-500',
    unselectedColor = 'bg-gray-200',
}: TimeRangeSelectorProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [dragEnd, setDragEnd] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 특정 슬롯이 선택되어 있는지 확인
    const isSlotSelected = (index: number): boolean => {
        return ranges.some((range) => index >= range.start && index < range.end);
    };

    // 슬롯 인덱스 계산 (마우스 위치 기반)
    const getSlotIndex = (clientX: number): number => {
        if (!containerRef.current) return -1;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const slotWidth = rect.width / totalSlots;
        const index = Math.floor(x / slotWidth);

        return Math.max(0, Math.min(totalSlots - 1, index));
    };

    // 범위 병합 및 정규화
    const mergeRanges = (newRange: TimeRange, existingRanges: TimeRange[]): TimeRange[] => {
        // 새 범위와 겹치지 않는 기존 범위만 유지
        const nonOverlapping = existingRanges.filter((range) => {
            return range.end <= newRange.start || range.start >= newRange.end;
        });

        // 새 범위 추가
        const allRanges = [...nonOverlapping, newRange];

        // 인접하거나 겹치는 범위 병합
        const sorted = allRanges.sort((a, b) => a.start - b.start);
        const merged: TimeRange[] = [];

        for (const range of sorted) {
            if (merged.length === 0) {
                merged.push(range);
            } else {
                const last = merged[merged.length - 1];
                if (range.start <= last.end) {
                    // 병합
                    last.end = Math.max(last.end, range.end);
                } else {
                    merged.push(range);
                }
            }
        }

        return merged;
    };

    // 마우스 다운
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;

        const index = getSlotIndex(e.clientX);
        if (index === -1) return;

        setIsDragging(true);
        setDragStart(index);
        setDragEnd(index);
    };

    // 마우스 이동
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || dragStart === null || disabled) return;

        const index = getSlotIndex(e.clientX);
        if (index !== -1) {
            setDragEnd(index);
        }
    };

    // 마우스 업
    const handleMouseUp = () => {
        if (!isDragging || dragStart === null || dragEnd === null || disabled) return;

        const start = Math.min(dragStart, dragEnd);
        const end = Math.max(dragStart, dragEnd) + 1; // end는 exclusive

        const newRange: TimeRange = { start, end };
        const mergedRanges = mergeRanges(newRange, ranges);

        onChange(mergedRanges);

        setIsDragging(false);
        setDragStart(null);
        setDragEnd(null);
    };

    // 전역 마우스 업 이벤트 처리 (드래그 중 마우스가 컴포넌트 밖으로 나갈 경우)
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                handleMouseUp();
            }
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, [isDragging, dragStart, dragEnd]);

    // 드래그 중인 범위 계산
    const getDraggedRange = (): TimeRange | null => {
        if (!isDragging || dragStart === null || dragEnd === null) return null;
        return {
            start: Math.min(dragStart, dragEnd),
            end: Math.max(dragStart, dragEnd) + 1,
        };
    };

    const draggedRange = getDraggedRange();

    // 슬롯이 현재 드래그 중인 범위에 포함되는지 확인
    const isSlotInDragRange = (index: number): boolean => {
        if (!draggedRange) return false;
        return index >= draggedRange.start && index < draggedRange.end;
    };

    return (
        <div
            ref={containerRef}
            className={`h-8 bg-white rounded relative ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-crosshair'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
                // 마우스가 영역을 벗어나도 드래그는 계속 유지
            }}
        >
            <div className="absolute inset-0 flex">
                {Array.from({ length: totalSlots }, (_, i) => {
                    const isSelected = isSlotSelected(i);
                    const isInDrag = isSlotInDragRange(i);

                    // 드래그 중인 경우 드래그 범위를 미리보기로 표시
                    let slotColor = isSelected ? selectedColor : unselectedColor;
                    if (isInDrag) {
                        slotColor = 'bg-blue-400'; // 드래그 중 미리보기 색상
                    }

                    return (
                        <div
                            key={i}
                            className={`flex-1 border-r border-gray-300 transition-colors ${slotColor}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

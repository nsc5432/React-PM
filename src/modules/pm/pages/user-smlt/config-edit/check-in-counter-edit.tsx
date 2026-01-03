import { useState } from 'react';
import { TimeRangePicker } from '@/components/ui/time-range-picker';
import type { TimeRange } from '@/components/ui/time-range-picker';
import { TimelinePlayer } from '@/modules/pm/shared/components/timeline-player';

interface CheckInCounterEditProps {
    expanded: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

// 카운터별 항공사 할당 정의 (이미지 기준)
const COUNTER_AIRLINES = [
    'OZ', 'OZ', 'OZ', 'OZ', 'OZ', 'OZ', 'OZ', 'OZ', 'OZ',
    'OZ', 'OZ', 'OZ', 'KE', 'KE', 'KE', 'KE', 'KE', 'KE'
];

export function CheckInCounterEdit({ expanded, onToggle, disabled = false }: CheckInCounterEditProps) {
    const counters = Array.from({ length: 18 }, (_, i) => i + 1);
    const islands = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

    // 아일랜드 선택 상태
    const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

    // 기본값: 08:00 ~ 20:00
    const defaultStart = new Date();
    defaultStart.setHours(8, 0, 0, 0);
    const defaultEnd = new Date();
    defaultEnd.setHours(20, 0, 0, 0);

    const [timeRange, setTimeRange] = useState<TimeRange>({
        start: defaultStart,
        end: defaultEnd,
    });

    // 타임라인 시간 상태 (분 단위, 04:00 = 240분)
    const [currentTime, setCurrentTime] = useState(240);

    // 상단 항공사 선택 상태 (18개 카운터)
    const [topSelectedCounters, setTopSelectedCounters] = useState<Set<number>>(new Set());

    // 하단 항공사 선택 상태 (18개 카운터)
    const [bottomSelectedCounters, setBottomSelectedCounters] = useState<Set<number>>(new Set([6]));

    const handleTopCounterClick = (counterNum: number) => {
        if (disabled) return;

        setTopSelectedCounters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(counterNum)) {
                newSet.delete(counterNum);
            } else {
                newSet.add(counterNum);
            }
            return newSet;
        });
    };

    const handleBottomCounterClick = (counterNum: number) => {
        if (disabled) return;

        setBottomSelectedCounters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(counterNum)) {
                newSet.delete(counterNum);
            } else {
                newSet.add(counterNum);
            }
            return newSet;
        });
    };

    return (
        <div className="border rounded-lg bg-white">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
                <span className="font-medium">
                    체크인카운터 수정 <span className="text-red-500">(A, B, C, D)</span>
                </span>
                <span>{expanded ? '∧' : '∨'}</span>
            </button>

            {expanded && (
                <div className="p-6 border-t">
                    {/* Stats */}
                    <div className="text-center mb-6">
                        <span className="font-medium text-lg">
                            전체 : 14 <span className="ml-8">운영 : 8</span>
                            {selectedIsland && (
                                <span className="ml-8 text-blue-600">
                                    선택된 아일랜드 : {selectedIsland}
                                </span>
                            )}
                        </span>
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-4 mb-6">
                        <TimeRangePicker
                            value={timeRange}
                            onChange={setTimeRange}
                            disabled={disabled}
                            startPlaceholder="시작 시간"
                            endPlaceholder="종료 시간"
                        />
                        <select className="border rounded px-3 py-1 ml-4" disabled={disabled}>
                            <option>OZ</option>
                            <option>KE</option>
                        </select>
                    </div>

                    {/* Counter Grid */}
                    <div className="border rounded-lg p-6 bg-gray-50 mb-6">
                        <h3 className="text-center font-medium mb-4">체크인카운터 N</h3>
                        <div className="mb-4">
                            {/* 상단 항공사 선택 행 - 클릭 가능 */}
                            <div className="grid grid-cols-19 gap-1 mb-2">
                                <div className="col-span-1 text-center text-xs font-medium">
                                    항공사
                                </div>
                                {counters.map((num) => {
                                    const isSelected = topSelectedCounters.has(num);
                                    const airline = COUNTER_AIRLINES[num - 1];

                                    return (
                                        <button
                                            key={num}
                                            onClick={() => handleTopCounterClick(num)}
                                            disabled={disabled}
                                            className={`col-span-1 h-8 text-xs font-medium transition-colors ${isSelected
                                                ? 'bg-green-400 hover:bg-green-500'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                                        >
                                            {airline}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* 번호 행 */}
                            <div className="grid grid-cols-19 gap-1 mb-2">
                                <div className="col-span-1 text-center text-xs font-medium">
                                    번호
                                </div>
                                {counters.map((num) => (
                                    <div key={num} className="col-span-1 text-center text-xs">
                                        {num}
                                    </div>
                                ))}
                            </div>

                            {/* 하단 항공사 선택 행 - 클릭 가능 */}
                            <div className="grid grid-cols-19 gap-1 mb-2">
                                <div className="col-span-1 text-center text-xs font-medium">
                                    항공사
                                </div>
                                {counters.map((num) => {
                                    const isSelected = bottomSelectedCounters.has(num);
                                    const airline = COUNTER_AIRLINES[num - 1];

                                    return (
                                        <button
                                            key={num}
                                            onClick={() => handleBottomCounterClick(num)}
                                            disabled={disabled}
                                            className={`col-span-1 h-8 text-xs font-medium transition-colors ${isSelected
                                                ? 'bg-green-400 hover:bg-green-500'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                                        >
                                            {airline}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* TimelinePlayer */}
                        <TimelinePlayer time={currentTime} onTimeChange={setCurrentTime} />
                    </div>

                    {/* Island Selection */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {islands.map((island) => (
                            <button
                                key={island}
                                disabled={disabled}
                                onClick={() => setSelectedIsland(selectedIsland === island ? null : island)}
                                className={`w-10 h-10 rounded transition-all ${selectedIsland === island
                                        ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2'
                                        : 'bg-gray-300 text-gray-600'
                                    } hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {island}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>
                            현재상태 저장
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

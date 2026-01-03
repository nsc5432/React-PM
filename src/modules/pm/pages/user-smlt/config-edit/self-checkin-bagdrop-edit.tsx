import { useState } from 'react';
import { TimeRangeSelector } from '@/components/time-range-selector';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface TimeRange {
    start: number;
    end: number;
}

interface SelfCheckInBagDropEditProps {
    expanded: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export function SelfCheckInBagDropEdit({ expanded, onToggle, disabled = false }: SelfCheckInBagDropEditProps) {
    const islands = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

    // 아일랜드 선택 상태
    const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

    // 셀프체크인 키오스크 운영 시간 (초기값: 06:00-18:00)
    const [kioskRanges, setKioskRanges] = useState<TimeRange[]>([{ start: 6, end: 18 }]);
    const [kioskNotOperating, setKioskNotOperating] = useState(false);

    // 셀프백드롭 운영 시간 (초기값: 06:00-18:00)
    const [bagDropRanges, setBagDropRanges] = useState<TimeRange[]>([{ start: 6, end: 18 }]);
    const [bagDropNotOperating, setBagDropNotOperating] = useState(false);

    return (
        <div className="border rounded-lg bg-white">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
                <span className="font-medium">
                    셀프체크인/백드롭 수정 <span className="text-red-500">(셀프체크인 17개)</span>
                </span>
                <span>{expanded ? '∧' : '∨'}</span>
            </button>

            {expanded && (
                <div className="p-6 border-t">
                    {/* Stats */}
                    <div className="text-center mb-6">
                        <span className="font-medium text-lg">
                            전체 : 14 <span className="ml-8">운영 : 4</span>
                            {selectedIsland && (
                                <span className="ml-8 text-blue-600">
                                    선택된 아일랜드 : {selectedIsland}
                                </span>
                            )}
                        </span>
                    </div>

                    {/* Kiosk and Bag Drop Views */}
                    <div className="border rounded-lg p-6 bg-gray-50 mb-6">
                        {/* Self Check-in Kiosk */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium">셀프체크인 키오스크</h3>
                                <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                    <input
                                        type="checkbox"
                                        checked={kioskNotOperating}
                                        onChange={(e) => setKioskNotOperating(e.target.checked)}
                                        disabled={disabled}
                                    />
                                    미운영
                                </label>
                            </div>
                            <TimeRangeSelector
                                ranges={kioskRanges}
                                onChange={setKioskRanges}
                                disabled={disabled || kioskNotOperating}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>04:00</span>
                                <span>10:00</span>
                                <span>20:00</span>
                                <span>02:00</span>
                            </div>
                        </div>

                        {/* Bag Drop */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium">셀프백드롭</h3>
                                <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                    <input
                                        type="checkbox"
                                        checked={bagDropNotOperating}
                                        onChange={(e) => setBagDropNotOperating(e.target.checked)}
                                        disabled={disabled}
                                    />
                                    미운영
                                </label>
                            </div>
                            <TimeRangeSelector
                                ranges={bagDropRanges}
                                onChange={setBagDropRanges}
                                disabled={disabled || bagDropNotOperating}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>04:00</span>
                                <span>10:00</span>
                                <span>20:00</span>
                                <span>02:00</span>
                            </div>
                        </div>
                    </div>

                    {/* Island Selection */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {islands.map((island) => (
                            <button
                                key={island}
                                disabled={disabled}
                                onClick={() => setSelectedIsland(selectedIsland === island ? null : island)}
                                className={`w-10 h-10 rounded transition-all ${
                                    selectedIsland === island
                                        ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2'
                                        : 'bg-gray-300 text-gray-600'
                                } hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {island}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <ConfirmDialog
                            trigger={
                                <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>
                                    현재상태 저장
                                </button>
                            }
                            title="저장 확인"
                            description="현재 상태를 저장하시겠습니까?"
                            confirmText="저장"
                            cancelText="취소"
                            onConfirm={() => {
                                // TODO: 실제 저장 로직 구현
                                console.log('저장됨');
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

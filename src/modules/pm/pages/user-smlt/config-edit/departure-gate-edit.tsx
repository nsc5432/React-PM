import { useState } from 'react';
import { TimeRangeSelector } from '@/components/time-range-selector';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface TimeRange {
    start: number;
    end: number;
}

interface GateData {
    id: number;
    name: string;
    isOperating: boolean;
    ranges: TimeRange[];
}

interface DepartureGateEditProps {
    expanded: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export function DepartureGateEdit({ expanded, onToggle, disabled = false }: DepartureGateEditProps) {
    // 6개의 출국장 상태 관리 (초기값: 06:00-18:00)
    const [gates, setGates] = useState<GateData[]>([
        { id: 1, name: '출국장 1', isOperating: true, ranges: [{ start: 6, end: 18 }] },
        { id: 2, name: '출국장 2', isOperating: false, ranges: [{ start: 6, end: 18 }] },
        { id: 3, name: '출국장 3', isOperating: true, ranges: [{ start: 6, end: 18 }] },
        { id: 4, name: '출국장 4', isOperating: true, ranges: [{ start: 6, end: 18 }] },
        { id: 5, name: '출국장 5', isOperating: true, ranges: [{ start: 6, end: 18 }] },
        { id: 6, name: '출국장 6', isOperating: false, ranges: [{ start: 6, end: 18 }] },
    ]);

    // 특정 게이트의 운영 상태 변경
    const handleGateOperatingChange = (gateId: number, isOperating: boolean) => {
        setGates((prev) =>
            prev.map((gate) => (gate.id === gateId ? { ...gate, isOperating } : gate))
        );
    };

    // 특정 게이트의 시간 범위 변경
    const handleGateRangesChange = (gateId: number, ranges: TimeRange[]) => {
        setGates((prev) =>
            prev.map((gate) => (gate.id === gateId ? { ...gate, ranges } : gate))
        );
    };

    // 운영 중인 게이트 수 계산
    const operatingCount = gates.filter((gate) => gate.isOperating).length;

    return (
        <div className="border rounded-lg bg-white">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
                <span className="font-medium">
                    출국장 수정 <span className="text-red-500">(1, 2, 3)</span>
                </span>
                <span>{expanded ? '∧' : '∨'}</span>
            </button>

            {expanded && (
                <div className="p-6 border-t">
                    {/* Stats */}
                    <div className="text-center mb-6">
                        <span className="font-medium text-lg">
                            전체 : {gates.length} <span className="ml-8">운영 : {operatingCount}</span>
                        </span>
                    </div>

                    {/* Gate Timeline Visualizations */}
                    <div className="border rounded-lg p-6 bg-gray-50 mb-6 space-y-6">
                        {gates.map((gate) => (
                            <div key={gate.id}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium">{gate.name}</h3>
                                    <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                        <input
                                            type="checkbox"
                                            checked={!gate.isOperating}
                                            onChange={(e) =>
                                                handleGateOperatingChange(gate.id, !e.target.checked)
                                            }
                                            disabled={disabled}
                                        />
                                        미운영
                                    </label>
                                </div>
                                <TimeRangeSelector
                                    ranges={gate.ranges}
                                    onChange={(ranges) => handleGateRangesChange(gate.id, ranges)}
                                    disabled={disabled || !gate.isOperating}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>04:00</span>
                                    <span>10:00</span>
                                    <span>20:00</span>
                                    <span>02:00</span>
                                </div>
                            </div>
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
                                console.log('저장됨', gates);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

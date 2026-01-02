import { useState } from 'react';

interface FlightPassengerEditProps {
    expanded: boolean;
    onToggle: () => void;
}

export function FlightPassengerEdit({ expanded, onToggle }: FlightPassengerEditProps) {
    const [editMode, setEditMode] = useState<'ratio' | 'hourly'>('ratio');

    return (
        <div className="border rounded-lg bg-white">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
                <span className="font-medium">
                    운항편수/여객 수 수정 <span className="text-red-500">(운항편 15 개)</span>
                </span>
                <span>{expanded ? '∧' : '∨'}</span>
            </button>

            {expanded && (
                <div className="p-6 border-t">
                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Flight Count Chart */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-center font-medium mb-4">운항편 수</h3>
                            <div className="h-40 bg-gray-50 flex items-end justify-around px-4 pb-4">
                                {[40, 60, 80, 100, 120, 200, 200, 200, 100, 100, 60, 40].map(
                                    (height, idx) => (
                                        <div
                                            key={idx}
                                            className="w-8 bg-blue-500"
                                            style={{ height: `${height}px` }}
                                        />
                                    ),
                                )}
                            </div>
                            <div className="flex justify-around text-xs text-gray-500 mt-2">
                                <span>4:00</span>
                                <span>6:00</span>
                                <span>8:00</span>
                                <span>10:00</span>
                                <span>12:00</span>
                                <span>14:00</span>
                                <span>16:00</span>
                                <span>18:00</span>
                                <span>20:00</span>
                                <span>22:00</span>
                                <span>0:00</span>
                                <span>2:00</span>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-sm">
                                    *운항{' '}
                                    <span className="text-blue-600 font-medium">1,234,567편</span>{' '}
                                    전체(누적)
                                </span>
                                <br />
                                <span className="text-xs text-gray-600">
                                    직전 주 평균일(24-10-11) 대비{' '}
                                    <span className="text-red-500">+ 2편</span>
                                </span>
                            </div>
                        </div>

                        {/* Passenger Count Chart */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-center font-medium mb-4">여객 수</h3>
                            <div className="h-40 bg-gray-50 flex items-end justify-around px-4 pb-4">
                                {[40, 60, 80, 100, 120, 200, 200, 200, 100, 100, 60, 40].map(
                                    (height, idx) => (
                                        <div
                                            key={idx}
                                            className="w-8 bg-blue-500"
                                            style={{ height: `${height}px` }}
                                        />
                                    ),
                                )}
                            </div>
                            <div className="flex justify-around text-xs text-gray-500 mt-2">
                                <span>4:00</span>
                                <span>6:00</span>
                                <span>8:00</span>
                                <span>10:00</span>
                                <span>12:00</span>
                                <span>14:00</span>
                                <span>16:00</span>
                                <span>18:00</span>
                                <span>20:00</span>
                                <span>22:00</span>
                                <span>0:00</span>
                                <span>2:00</span>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-sm">
                                    *여객{' '}
                                    <span className="text-blue-600 font-medium">1,234,567명</span>{' '}
                                    전체(누적)
                                </span>
                                <br />
                                <span className="text-xs text-gray-600">
                                    직전 주 평균일(24-10-11) 대비{' '}
                                    <span className="text-red-500">+268명</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Edit Controls */}
                    <div className="space-y-4">
                        {/* Radio buttons for edit mode */}
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="editMode"
                                    checked={editMode === 'ratio'}
                                    onChange={() => setEditMode('ratio')}
                                    className="w-5 h-5"
                                />
                                <span className="font-medium">운항편 전체 비율로 수정</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <button className="border rounded px-2 py-1">‹</button>
                                <input
                                    type="text"
                                    value="10%"
                                    className="border rounded px-3 py-1 w-20 text-center"
                                    readOnly
                                />
                                <button className="border rounded px-2 py-1">›</button>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="editMode"
                                checked={editMode === 'hourly'}
                                onChange={() => setEditMode('hourly')}
                                className="w-5 h-5"
                            />
                            <span className="font-medium">시간대별 운항편 수정</span>
                        </label>

                        {editMode === 'hourly' && (
                            <div className="grid grid-cols-2 gap-6">
                                {/* Hourly Flight Edit Table */}
                                <div>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-4 py-2">시작시간</th>
                                                <th className="border px-4 py-2">종료시간</th>
                                                <th className="border px-4 py-2">수정</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { start: '04:00', end: '05:00', value: '10%' },
                                                { start: '05:00', end: '06:00', value: '0%' },
                                            ].map((row, idx) => (
                                                <tr key={idx}>
                                                    <td className="border px-4 py-2 text-center">
                                                        {row.start}
                                                    </td>
                                                    <td className="border px-4 py-2 text-center text-red-600">
                                                        {row.end}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button className="border rounded px-2">
                                                                ‹
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={row.value}
                                                                className="border rounded px-2 py-1 w-16 text-center"
                                                                readOnly
                                                            />
                                                            <button className="border rounded px-2">
                                                                ›
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="border px-4 py-2 text-center text-gray-400"
                                                >
                                                    ...
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Hourly Passenger Count Table */}
                                <div>
                                    <h4 className="font-medium mb-2">시간대별 승객 수</h4>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-4 py-2">시작시간</th>
                                                <th className="border px-4 py-2">종료시간</th>
                                                <th className="border px-4 py-2">승객 수</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { start: '04:00', end: '05:00', count: '00,000명' },
                                                { start: '05:00', end: '06:00', count: '00,000명' },
                                            ].map((row, idx) => (
                                                <tr key={idx}>
                                                    <td className="border px-4 py-2 text-center">
                                                        {row.start}
                                                    </td>
                                                    <td className="border px-4 py-2 text-center">
                                                        {row.end}
                                                    </td>
                                                    <td className="border px-4 py-2 text-center">
                                                        {row.count}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="border px-4 py-2 text-center text-gray-400"
                                                >
                                                    ...
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center pt-4">
                            <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700">
                                현재상태 저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

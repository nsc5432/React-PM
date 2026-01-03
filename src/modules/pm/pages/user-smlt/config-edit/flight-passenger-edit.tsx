import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface FlightPassengerEditProps {
    expanded: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export function FlightPassengerEdit({ expanded, onToggle, disabled = false }: FlightPassengerEditProps) {
    const [editMode, setEditMode] = useState<'ratio' | 'hourly'>('ratio');

    // 운항편 수 데이터 (시간대별)
    const flightData = [40, 60, 80, 100, 120, 130, 100, 120, 100, 100, 60, 40];
    const timeLabels = ['4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '0:00', '2:00'];

    // 여객 수 데이터 (시간대별)
    const passengerData = [40, 60, 80, 100, 120, 200, 200, 200, 100, 100, 60, 40];

    // 운항편 수 차트 옵션
    const flightChartOption: EChartsOption = {
        grid: {
            left: 40,
            right: 20,
            top: 20,
            bottom: 30,
        },
        xAxis: {
            type: 'category',
            data: timeLabels,
            axisLabel: {
                fontSize: 11,
                color: '#6B7280',
            },
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const data = params[0];
                return `${data.name}<br/>운항편: ${data.value}편`;
            },
        },
        series: [
            {
                data: flightData,
                type: 'bar',
                itemStyle: {
                    color: '#3B82F6',
                },
                barWidth: '60%',
            },
        ],
    };

    // 여객 수 차트 옵션
    const passengerChartOption: EChartsOption = {
        grid: {
            left: 40,
            right: 20,
            top: 20,
            bottom: 30,
        },
        xAxis: {
            type: 'category',
            data: timeLabels,
            axisLabel: {
                fontSize: 11,
                color: '#6B7280',
            },
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const data = params[0];
                return `${data.name}<br/>여객: ${data.value.toLocaleString()}명`;
            },
        },
        series: [
            {
                data: passengerData,
                type: 'bar',
                itemStyle: {
                    color: '#3B82F6',
                },
                barWidth: '60%',
            },
        ],
    };

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
                            <ReactECharts option={flightChartOption} style={{ height: '200px' }} />
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
                            <ReactECharts option={passengerChartOption} style={{ height: '200px' }} />
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
                            <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                <input
                                    type="radio"
                                    name="editMode"
                                    checked={editMode === 'ratio'}
                                    onChange={() => setEditMode('ratio')}
                                    disabled={disabled}
                                    className="w-5 h-5"
                                />
                                <span className="font-medium">운항편 전체 비율로 수정</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <button className="border rounded px-2 py-1" disabled={disabled}>‹</button>
                                <input
                                    type="text"
                                    value="10%"
                                    className="border rounded px-3 py-1 w-20 text-center"
                                    disabled={disabled}
                                    readOnly
                                />
                                <button className="border rounded px-2 py-1" disabled={disabled}>›</button>
                            </div>
                        </div>

                        <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                            <input
                                type="radio"
                                name="editMode"
                                checked={editMode === 'hourly'}
                                onChange={() => setEditMode('hourly')}
                                disabled={disabled}
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
                                                            <button className="border rounded px-2" disabled={disabled}>
                                                                ‹
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={row.value}
                                                                className="border rounded px-2 py-1 w-16 text-center"
                                                                disabled={disabled}
                                                                readOnly
                                                            />
                                                            <button className="border rounded px-2" disabled={disabled}>
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
                            <ConfirmDialog
                                trigger={
                                    <button
                                        className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={disabled}
                                    >
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
                </div>
            )}
        </div>
    );
}

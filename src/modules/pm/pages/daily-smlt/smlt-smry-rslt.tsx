import { useState } from 'react';
import type { SimulationType } from './daily-smlt-page';
import {
    AirplaneIcon,
    PeopleIcon,
    CheckmarkIcon,
    TableIcon,
    ShieldIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    SearchIcon,
    PlusIcon,
} from '@/components/icons';

// 차트 데이터 타입 정의
interface ChartDataPoint {
    time: string;
    cast: number;
    xoivs: number;
    actual: number;
    hasAlert?: boolean;
}

interface MiniChartData {
    title: string;
    r2Score: number;
    data: ChartDataPoint[];
}

interface SmltSmryRsltProps {
    simulationType?: SimulationType;
}

const SmltSmryRslt = ({ simulationType = 'daily' }: SmltSmryRsltProps) => {
    // 선택된 탭 상태 (0: 터미널 여객수, 1: 체크인카운터, 2: 출국장, 3: 보안검색대)
    const [selectedTab, setSelectedTab] = useState(0);

    // 각 카드의 현재 인덱스를 추적하는 상태
    const [t1CheckinIndex, setT1CheckinIndex] = useState(0);
    const [t1DepartureIndex, setT1DepartureIndex] = useState(0);
    const [t2CheckinIndex, setT2CheckinIndex] = useState(0);
    const [t2DepartureIndex, setT2DepartureIndex] = useState(0);

    // 슬라이드 방향 추적
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

    // Mini Charts Mock 데이터
    const miniChartsData: MiniChartData[] = [
        {
            title: 'CAST/Xovis 비교선 그래프 T1',
            r2Score: 86,
            data: [
                { time: '04:00', cast: 45, xoivs: 40, actual: 30, hasAlert: false },
                { time: '05:00', cast: 50, xoivs: 48, actual: 35, hasAlert: false },
                { time: '06:00', cast: 55, xoivs: 52, actual: 40, hasAlert: false },
                { time: '07:00', cast: 60, xoivs: 58, actual: 45, hasAlert: false },
                { time: '08:00', cast: 70, xoivs: 68, actual: 50, hasAlert: false },
                { time: '09:00', cast: 80, xoivs: 75, actual: 55, hasAlert: false },
                { time: '10:00', cast: 85, xoivs: 82, actual: 60, hasAlert: false },
                { time: '11:00', cast: 90, xoivs: 88, actual: 65, hasAlert: false },
                { time: '12:00', cast: 85, xoivs: 83, actual: 70, hasAlert: false },
                { time: '13:00', cast: 75, xoivs: 73, actual: 75, hasAlert: false },
                { time: '14:00', cast: 70, xoivs: 68, actual: 80, hasAlert: false },
                { time: '15:00', cast: 65, xoivs: 63, actual: 75, hasAlert: false },
                { time: '16:00', cast: 60, xoivs: 58, actual: 70, hasAlert: true },
                { time: '17:00', cast: 55, xoivs: 53, actual: 65, hasAlert: false },
                { time: '18:00', cast: 60, xoivs: 58, actual: 60, hasAlert: false },
                { time: '19:00', cast: 65, xoivs: 62, actual: 55, hasAlert: false },
                { time: '20:00', cast: 70, xoivs: 68, actual: 50, hasAlert: false },
                { time: '21:00', cast: 75, xoivs: 73, actual: 45, hasAlert: false },
                { time: '22:00', cast: 70, xoivs: 68, actual: 40, hasAlert: false },
                { time: '23:00', cast: 65, xoivs: 62, actual: 35, hasAlert: false },
                { time: '00:00', cast: 60, xoivs: 58, actual: 30, hasAlert: false },
                { time: '01:00', cast: 55, xoivs: 52, actual: 25, hasAlert: false },
                { time: '02:00', cast: 50, xoivs: 48, actual: 20, hasAlert: true },
                { time: '03:00', cast: 45, xoivs: 43, actual: 15, hasAlert: false },
            ],
        },
        {
            title: 'CAST/Xovis 비교선 그래프 T2',
            r2Score: 92,
            data: [
                { time: '04:00', cast: 40, xoivs: 38, actual: 25, hasAlert: false },
                { time: '05:00', cast: 45, xoivs: 43, actual: 30, hasAlert: false },
                { time: '06:00', cast: 50, xoivs: 48, actual: 35, hasAlert: false },
                { time: '07:00', cast: 55, xoivs: 53, actual: 40, hasAlert: false },
                { time: '08:00', cast: 65, xoivs: 62, actual: 45, hasAlert: false },
                { time: '09:00', cast: 75, xoivs: 72, actual: 50, hasAlert: false },
                { time: '10:00', cast: 80, xoivs: 78, actual: 55, hasAlert: false },
                { time: '11:00', cast: 85, xoivs: 83, actual: 60, hasAlert: false },
                { time: '12:00', cast: 80, xoivs: 78, actual: 65, hasAlert: false },
                { time: '13:00', cast: 70, xoivs: 68, actual: 70, hasAlert: false },
                { time: '14:00', cast: 65, xoivs: 63, actual: 75, hasAlert: false },
                { time: '15:00', cast: 60, xoivs: 58, actual: 70, hasAlert: false },
                { time: '16:00', cast: 55, xoivs: 53, actual: 65, hasAlert: true },
                { time: '17:00', cast: 50, xoivs: 48, actual: 60, hasAlert: false },
                { time: '18:00', cast: 55, xoivs: 53, actual: 55, hasAlert: false },
                { time: '19:00', cast: 60, xoivs: 58, actual: 50, hasAlert: false },
                { time: '20:00', cast: 65, xoivs: 63, actual: 45, hasAlert: false },
                { time: '21:00', cast: 70, xoivs: 68, actual: 40, hasAlert: false },
                { time: '22:00', cast: 65, xoivs: 63, actual: 35, hasAlert: false },
                { time: '23:00', cast: 60, xoivs: 58, actual: 30, hasAlert: false },
                { time: '00:00', cast: 55, xoivs: 53, actual: 25, hasAlert: false },
                { time: '01:00', cast: 50, xoivs: 48, actual: 20, hasAlert: false },
                { time: '02:00', cast: 45, xoivs: 43, actual: 15, hasAlert: true },
                { time: '03:00', cast: 40, xoivs: 38, actual: 10, hasAlert: false },
            ],
        },
    ];

    // 각 탭별 색상 테마 정의
    const themeColors = {
        0: {
            // 터미널에 여객수가 가장 많을때 - 파란색
            primary: 'blue',
            gradient: 'from-blue-600 to-cyan-400',
            headerBg: 'bg-linear-to-r from-[#003366] to-[#004d99]',
            chartGradient: 'from-blue-500 to-cyan-300',
            accentText: 'text-blue-600',
            terminalIcon: ['bg-blue-600', 'bg-teal-500'],
            simulationHeaderBg: [
                'bg-linear-to-r from-cyan-500 to-teal-400',
                'bg-linear-to-r from-teal-500 to-emerald-400',
            ],
        },
        1: {
            // 체크인카운터가 가장 혼잡할 때 - 주황색
            primary: 'orange',
            gradient: 'from-orange-600 to-amber-400',
            headerBg: 'bg-linear-to-r from-orange-900 to-orange-700',
            chartGradient: 'from-orange-500 to-amber-300',
            accentText: 'text-orange-600',
            terminalIcon: ['bg-orange-500', 'bg-amber-500'],
            simulationHeaderBg: [
                'bg-linear-to-r from-orange-500 to-amber-400',
                'bg-linear-to-r from-amber-500 to-orange-400',
            ],
        },
        2: {
            // 셀프체크인/백드롭이 가장 혼잡할 때 - 초록색
            primary: 'green',
            gradient: 'from-green-600 to-emerald-400',
            headerBg: 'bg-linear-to-r from-green-900 to-green-700',
            chartGradient: 'from-green-500 to-emerald-300',
            accentText: 'text-green-600',
            terminalIcon: ['bg-green-500', 'bg-emerald-500'],
            simulationHeaderBg: [
                'bg-linear-to-r from-green-500 to-emerald-400',
                'bg-linear-to-r from-emerald-500 to-green-400',
            ],
        },
        3: {
            // 출국장이 가장 혼잡할 때 - 보라색
            primary: 'purple',
            gradient: 'from-purple-600 to-violet-400',
            headerBg: 'bg-linear-to-r from-purple-900 to-purple-700',
            chartGradient: 'from-purple-500 to-violet-300',
            accentText: 'text-purple-600',
            terminalIcon: ['bg-purple-500', 'bg-violet-500'],
            simulationHeaderBg: [
                'bg-linear-to-r from-purple-500 to-violet-400',
                'bg-linear-to-r from-violet-500 to-purple-400',
            ],
        },
    };

    const currentTheme = themeColors[selectedTab as keyof typeof themeColors];

    // 탭 목록
    const tabs = [
        '터미널에 여객수가 가장 많을때',
        '체크인카운터가 가장 혼잡할 때',
        '출국장이 가장 혼잡할 때',
        '보안검색대가 가장 혼잡할 때',
    ];

    // 체크인카운터 옵션들 (여러 아일랜드)
    const checkinOptions = [
        {
            name: '아일랜드',
            code: 'B2',
            stats: '전체 14 | 운영 12 | 대기열 640',
            status: '추천',
            circles: [
                { value: '00', label: 'Pcs/Min' },
                { value: '11:00', label: '여유' },
            ],
            blocks: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
            blockColors: [
                'red',
                'red',
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
                'green',
                'orange',
                'orange',
            ],
        },
        {
            name: '아일랜드',
            code: 'A3',
            stats: '전체 10 | 운영 8 | 대기열 320',
            status: '보통',
            circles: [
                { value: '15', label: 'Pcs/Min' },
                { value: '11:30', label: '보통' },
            ],
            blocks: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            blockColors: [
                'green',
                'green',
                'green',
                'orange',
                'orange',
                'orange',
                'red',
                'red',
                'green',
                'green',
            ],
        },
        {
            name: '아일랜드',
            code: 'C1',
            stats: '전체 12 | 운영 10 | 대기열 480',
            status: '혼잡',
            circles: [
                { value: '25', label: 'Pcs/Min' },
                { value: '12:00', label: '혼잡' },
            ],
            blocks: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
            blockColors: [
                'red',
                'red',
                'red',
                'orange',
                'orange',
                'green',
                'green',
                'green',
                'orange',
                'red',
                'red',
                'red',
            ],
        },
    ];

    // 출국장 옵션들
    const departureOptions = [
        {
            name: '출국장 번호',
            code: '3번',
            stats: '예상인원 640',
            status: '추천',
            circles: [
                { value: '00', label: 'Pcs/Min' },
                { value: '11:00', label: '혼잡' },
            ],
            blocks: ['1', '2', '3', '4', '5'],
            blockColors: ['darkgreen', 'green', 'green', 'red', 'red'],
        },
        {
            name: '출국장 번호',
            code: '1번',
            stats: '예상인원 420',
            status: '보통',
            circles: [
                { value: '12', label: 'Pcs/Min' },
                { value: '11:15', label: '보통' },
            ],
            blocks: ['1', '2', '3', '4', '5'],
            blockColors: ['green', 'green', 'orange', 'orange', 'red'],
        },
        {
            name: '출국장 번호',
            code: '2번',
            stats: '예상인원 580',
            status: '여유',
            circles: [
                { value: '08', label: 'Pcs/Min' },
                { value: '10:45', label: '여유' },
            ],
            blocks: ['1', '2', '3', '4', '5'],
            blockColors: ['darkgreen', 'darkgreen', 'green', 'green', 'green'],
        },
    ];

    return (
        <>
            <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
            <div className="min-w-358 max-w-450 mx-auto p-2 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
                {/* Header */}
                <header className="bg-white p-5 rounded-2xl mb-6 shadow-lg border border-gray-200">
                    <div className="flex justify-between items-center whitespace-nowrap gap-4">
                        {/* 1. 운항계획 버튼 with Simulation Type Badge */}
                        <div className="flex flex-col gap-1 flex-0">
                            <div
                                className={`${currentTheme.headerBg} text-white px-8 rounded-xl text-base font-bold shadow-md flex items-center gap-2 h-16 w-37.75`}
                            >
                                <AirplaneIcon className="w-5 h-5" />
                                운항계획
                            </div>
                            {simulationType === 'user' && (
                                <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded text-center shadow-sm">
                                    사용자 시뮬레이션
                                </div>
                            )}
                            {simulationType === 'daily' && (
                                <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded text-center shadow-sm">
                                    기준 시뮬레이션
                                </div>
                            )}
                        </div>

                        {/* 2. 통계 박스: 총 운항편 + 총여객수 */}
                        <div className="flex bg-white border-2 border-blue-300 rounded-xl px-6 shadow-sm gap-6 h-16 flex-1">
                            {/* 총 운항편 */}
                            <div className="flex items-center gap-2.5 flex-1">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                    <AirplaneIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex justify-center items-baseline gap-2">
                                    <span className="text-[11px] text-gray-500 font-medium leading-tight relative -top-0.5">
                                        총운항편
                                    </span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-blue-600 text-lg font-bold">
                                            1,354
                                        </span>
                                        <span className="text-[11px] text-gray-600 font-medium">
                                            편
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* 총여객수 */}
                            <div className="flex items-center gap-2.5 flex-1">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                    <PeopleIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex justify-center items-baseline gap-2">
                                    <span className="text-[11px] text-gray-500 font-medium leading-tight relative -top-0.5">
                                        총여객수
                                    </span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-green-600 text-lg font-bold">
                                            223,582
                                        </span>
                                        <span className="text-[11px] text-gray-600 font-medium">
                                            명
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. 검색 영역 */}
                        <div className="flex items-center gap-2.5 bg-white border-2 border-blue-300 rounded-xl px-4 shadow-sm h-16 flex-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="font-semibold">기준일자</span>
                            </div>
                            <input
                                type="date"
                                defaultValue="2025-06-02"
                                className="bg-white px-3 py-1.5 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select className="bg-white px-2.5 py-1.5 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>10</option>
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                            <span className="text-xs text-gray-600 font-semibold">시</span>
                            <select className="bg-white px-2.5 py-1.5 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>20</option>
                                {Array.from({ length: 60 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                            <span className="text-xs text-gray-600 font-semibold">분</span>
                            <div className="flex-1" />
                            <button
                                className={`bg-linear-to-r ${currentTheme.gradient} text-white px-4 lg:px-6 py-1.5 rounded-md font-bold text-xs shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1.5 shrink-0`}
                            >
                                <SearchIcon className="w-3.5 h-3.5" />
                                SEARCH
                            </button>
                        </div>

                        {/* 4. 시각 정보 */}
                        <div className="flex flex-col justify-center text-right text-[11px] leading-relaxed px-4 rounded-xl h-16 border-2 border-blue-300 flex-0">
                            <div className="text-gray-600">
                                <span className="font-semibold">마지막 계산 시각</span>
                                <span className="ml-2 px-1 bg-gray-200">2021-10-18 10:17:00</span>
                            </div>
                            <div className="text-red-600 my-0.5">
                                <span className="font-semibold">재계산 예정 시각</span>
                                <span className="ml-2 px-1 bg-gray-200">2025-06-18 11:00:00</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Navigation Tabs */}
                <nav className="grid grid-cols-4 gap-3 mb-6">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedTab(index)}
                            className={`rounded-xl text-center py-4 font-semibold shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 ${selectedTab === index
                                ? `bg-linear-to-r ${currentTheme.gradient} text-white shadow-lg`
                                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-lg'
                                }`}
                        >
                            {index === 0 && <CheckmarkIcon className="w-5 h-5" />}
                            {index === 1 && <TableIcon className="w-5 h-5" />}
                            {index === 2 && <AirplaneIcon className="w-5 h-5" />}
                            {index === 3 && <ShieldIcon className="w-5 h-5" />}
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Main Content */}
                <main className="grid grid-cols-2 gap-6">
                    {/* T1 영역 (왼쪽) */}
                    <div className="space-y-6">
                        {/* T1 Mini Chart */}
                        {miniChartsData.slice(0, 1).map((chartData, idx) => {
                            const maxValue = Math.max(
                                ...chartData.data.map((d) => Math.max(d.cast, d.xoivs, d.actual)),
                            );
                            const chartWidth = 100;
                            const chartHeight = 80;
                            const padding = 10;

                            // 데이터를 SVG 좌표로 변환하는 함수
                            const getY = (value: number) =>
                                chartHeight -
                                padding -
                                (value / maxValue) * (chartHeight - 2 * padding);
                            const getX = (index: number) =>
                                (index / (chartData.data.length - 1)) * (chartWidth - 2 * padding) +
                                padding;

                            // 선 그래프 포인트 생성
                            const castPoints = chartData.data
                                .map((d, i) => `${getX(i)},${getY(d.cast)}`)
                                .join(' ');
                            const xoivsPoints = chartData.data
                                .map((d, i) => `${getX(i)},${getY(d.xoivs)}`)
                                .join(' ');

                            return (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-sm font-bold text-gray-700">
                                            {chartData.title}
                                        </h3>
                                        <div className="text-center border-2 border-gray-200 px-4 py-2 rounded-xl bg-linear-to-br from-gray-50 to-white shadow-sm">
                                            <div className="text-gray-500 text-[10px] font-medium">
                                                모델설명
                                            </div>
                                            <div className="text-[10px] text-gray-400">
                                                (R² Square)
                                            </div>
                                            <h3
                                                className={`text-2xl font-bold ${currentTheme.accentText}`}
                                            >
                                                {chartData.r2Score}%
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3 gap-4 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-1 rounded-full bg-[#FF5733]"></div>
                                            <span className="text-gray-700 font-medium">Cast</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-1 rounded-full bg-[#2980B9]"></div>
                                            <span className="text-gray-700 font-medium">Xoivs</span>
                                        </div>
                                    </div>
                                    <div className="h-24 relative">
                                        <svg
                                            width="100%"
                                            height="100%"
                                            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                                            preserveAspectRatio="none"
                                            className="border-b-2 border-gray-200"
                                        >
                                            {/* 막대그래프 */}
                                            {chartData.data.map((d, i) => {
                                                const barHeight =
                                                    (d.actual / maxValue) *
                                                    (chartHeight - 2 * padding);
                                                const barWidth =
                                                    ((chartWidth - 2 * padding) /
                                                        chartData.data.length) *
                                                    0.5;
                                                return (
                                                    <rect
                                                        key={`bar-${i}`}
                                                        x={getX(i) - barWidth / 2}
                                                        y={chartHeight - padding - barHeight}
                                                        width={barWidth}
                                                        height={barHeight}
                                                        fill="url(#barGradient)"
                                                        opacity="0.3"
                                                    />
                                                );
                                            })}

                                            {/* 그라데이션 정의 */}
                                            <defs>
                                                <linearGradient
                                                    id="barGradient"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="0%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#d1d5db"
                                                        stopOpacity="0.8"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#e5e7eb"
                                                        stopOpacity="0.4"
                                                    />
                                                </linearGradient>
                                            </defs>

                                            {/* Cast 선 */}
                                            <polyline
                                                points={castPoints}
                                                fill="none"
                                                stroke="#FF5733"
                                                strokeWidth="0.8"
                                            />

                                            {/* Xoivs 선 */}
                                            <polyline
                                                points={xoivsPoints}
                                                fill="none"
                                                stroke="#2980B9"
                                                strokeWidth="0.8"
                                            />
                                        </svg>

                                        {/* 알림 포인트 */}
                                        {chartData.data.map(
                                            (d, i) =>
                                                d.hasAlert && (
                                                    <div
                                                        key={`alert-${i}`}
                                                        className="absolute bottom-0 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg animate-pulse"
                                                        style={{
                                                            left: `${padding + (i / (chartData.data.length - 1)) * (chartWidth - 2 * padding)}%`,
                                                            transform: 'translate(-50%, 0)',
                                                        }}
                                                    />
                                                ),
                                        )}
                                        {/* 시간 레이블 */}
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-2 font-medium">
                                            <span>{chartData.data[0].time}</span>
                                            <span>
                                                {
                                                    chartData.data[
                                                        Math.floor(chartData.data.length / 2)
                                                    ].time
                                                }
                                            </span>
                                            <span>
                                                {chartData.data[chartData.data.length - 1].time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* T1 Terminal Card */}
                        {[
                            {
                                id: 'T1',
                                title: 'T1 출국장 예측',
                                flightCount: 270,
                                passengerCount: 12423,
                                flightDiff: '+2 편',
                                passengerDiff: '+268 명',
                                chartData: [30, 40, 50, 80, 70, 60, 55, 40, 30, 20],
                            },
                        ]
                            .slice(0, 1)
                            .map((terminal, tIdx) => (
                                <article
                                    key={terminal.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div
                                        className={`${currentTheme.simulationHeaderBg[tIdx]} flex justify-between items-center px-6 py-4 font-bold shadow-md`}
                                    >
                                        <div className="flex items-center gap-2 text-white">
                                            <AirplaneIcon className="w-5 h-5" />
                                            <span className="text-lg">시뮬레이션 요약</span>
                                        </div>
                                        <button className="w-8 h-8 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center justify-center">
                                            <PlusIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-[1fr_2fr] gap-4 mb-6">
                                            {/* 왼쪽: 운항편수/여객수 */}
                                            <div className="space-y-4">
                                                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border-2 border-blue-200 shadow-sm">
                                                    <div className="flex items-center justify-center gap-2 mb-3">
                                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <AirplaneIcon className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div className="text-xs text-gray-600 font-medium">
                                                            운항편수
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${currentTheme.accentText} text-2xl font-bold mb-2`}
                                                    >
                                                        {terminal.flightCount}{' '}
                                                        <span className="text-sm">편</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        지난주 대비{' '}
                                                        <span className="text-red-600 font-semibold">
                                                            {terminal.flightDiff}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl text-center border-2 border-green-200 shadow-sm">
                                                    <div className="flex items-center justify-center gap-2 mb-3">
                                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                            <PeopleIcon className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div className="text-xs text-gray-600 font-medium">
                                                            여객수
                                                        </div>
                                                    </div>
                                                    <div className="text-green-600 text-2xl font-bold mb-2">
                                                        {terminal.passengerCount.toLocaleString()}{' '}
                                                        <span className="text-sm">명</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        지난주 대비{' '}
                                                        <span className="text-blue-600 font-semibold">
                                                            {terminal.passengerDiff}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 오른쪽: 차트 */}
                                            <div className="relative bg-white border-2 border-gray-200 rounded-xl p-4 shadow-inner flex flex-col">
                                                {/* 제목 - 그래프 내부 상단 */}
                                                <div className="text-center text-base font-bold text-gray-700 mb-3">
                                                    {terminal.title}
                                                </div>

                                                {/* 차트 영역 */}
                                                <div className="flex gap-2 flex-1">
                                                    {/* Y축 좌측 라벨 (대기인원 수) */}
                                                    <div className="flex flex-col text-[10px] text-gray-500 pr-1">
                                                        <span className="text-[9px] mb-1 whitespace-nowrap">
                                                            대기인원 수
                                                        </span>
                                                        <div className="flex-1 flex flex-col justify-between">
                                                            <span>500</span>
                                                            <span>400</span>
                                                            <span>300</span>
                                                            <span>200</span>
                                                            <span>100</span>
                                                            <span>0</span>
                                                        </div>
                                                    </div>

                                                    {/* 막대 그래프 영역 */}
                                                    <div className="flex-1 flex items-end justify-between gap-1 border-l border-b border-gray-300 pl-2 pb-2">
                                                        {terminal.chartData.map((value, idx) => {
                                                            const timeLabels = [
                                                                '04',
                                                                '09',
                                                                '12',
                                                                '15',
                                                                '21',
                                                                '02',
                                                                '04',
                                                                '09',
                                                                '12',
                                                                '15',
                                                                '21',
                                                            ];
                                                            const waitingCount = Math.floor(
                                                                Math.random() * 400 + 100,
                                                            ); // 임시 데이터
                                                            const waitingTime = value;
                                                            const maxWaitingTime = 500; // 대기시간 최대값

                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="flex-1 flex flex-col items-center"
                                                                >
                                                                    <div
                                                                        className="w-full flex items-end justify-center gap-0.5"
                                                                        style={{ height: '160px' }}
                                                                    >
                                                                        {/* 대기인원 수 막대 (파란색) */}
                                                                        <div
                                                                            className="w-[45%] bg-blue-500 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                                                                            style={{
                                                                                height: `${(waitingCount / 500) * 100}%`,
                                                                            }}
                                                                        ></div>
                                                                        {/* 대기시간 막대 (민트색) */}
                                                                        <div
                                                                            className="w-[45%] bg-emerald-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                                                                            style={{
                                                                                height: `${(waitingTime / maxWaitingTime) * 100}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    {/* X축 라벨 */}
                                                                    <span className="text-[10px] text-gray-500 mt-1">
                                                                        {timeLabels[idx]}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Y축 우측 라벨 (대기시간) */}
                                                    <div className="flex flex-col text-[10px] text-gray-500 pl-1">
                                                        <span className="text-[9px] mb-1 text-right whitespace-nowrap">
                                                            대기시간
                                                        </span>
                                                        <div className="flex-1 flex flex-col justify-between">
                                                            <span className="text-right">500</span>
                                                            <span className="text-right">400</span>
                                                            <span className="text-right">300</span>
                                                            <span className="text-right">200</span>
                                                            <span className="text-right">100</span>
                                                            <span className="text-right">0</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 범례 */}
                                                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                                        <span>대기인원 수</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3 h-3 bg-emerald-400 rounded"></div>
                                                        <span>대기시간</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`flex items-center justify-between bg-linear-to-r ${currentTheme.gradient} text-white font-bold text-center py-3 rounded-xl mb-6 shadow-md px-4`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span>2025-11-08 FRI</span>
                                                <span>10</span>
                                                <span>:</span>
                                                <span>00</span>
                                                <span>:</span>
                                                <span>AM</span>
                                            </div>
                                        </div>

                                        {/* Detail Rows - T1 */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* T1 체크인카운터 카드 */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => {
                                                        setSlideDirection('left');
                                                        setT1CheckinIndex(
                                                            (prev) =>
                                                                (prev - 1 + checkinOptions.length) %
                                                                checkinOptions.length,
                                                        );
                                                    }}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                                >
                                                    <ArrowLeftIcon className="w-3 h-3 text-blue-500" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSlideDirection('right');
                                                        setT1CheckinIndex(
                                                            (prev) =>
                                                                (prev + 1) % checkinOptions.length,
                                                        );
                                                    }}
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                                >
                                                    <ArrowRightIcon className="w-3 h-3 text-blue-500" />
                                                </button>

                                                <div className="overflow-hidden">
                                                    <div
                                                        key={`t1-checkin-${t1CheckinIndex}`}
                                                        className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                                        style={{
                                                            animation:
                                                                slideDirection === 'right'
                                                                    ? 'slideInRight 0.3s ease-out'
                                                                    : 'slideInLeft 0.3s ease-out',
                                                        }}
                                                    >
                                                        <div className="flex justify-between px-4 py-3 font-bold text-sm border-b-2 bg-blue-50 border-blue-200">
                                                            <span className="text-blue-600">
                                                                체크인카운터
                                                            </span>
                                                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs">
                                                                혼잡 4개 or 원활
                                                            </span>
                                                        </div>
                                                        <div className="px-1 py-5 text-center bg-white">
                                                            <div className="text-gray-600 font-semibold text-sm mb-1">
                                                                {
                                                                    checkinOptions[t1CheckinIndex]
                                                                        .name
                                                                }
                                                            </div>
                                                            <div className="text-3xl font-bold text-red-600 mb-2">
                                                                {
                                                                    checkinOptions[t1CheckinIndex]
                                                                        .code
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-600 mb-3">
                                                                {
                                                                    checkinOptions[t1CheckinIndex]
                                                                        .stats
                                                                }
                                                            </div>
                                                            <span className="inline-block bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                                                                {
                                                                    checkinOptions[t1CheckinIndex]
                                                                        .status
                                                                }
                                                            </span>

                                                            <div className="flex justify-around mt-4 mb-4">
                                                                {checkinOptions[
                                                                    t1CheckinIndex
                                                                ].circles.map((c, cIdx) => (
                                                                    <div
                                                                        key={cIdx}
                                                                        className="w-16 h-16 rounded-full border-3 border-gray-300 flex flex-col items-center justify-center text-xs bg-linear-to-br from-gray-50 to-white shadow-sm"
                                                                    >
                                                                        <span className="font-bold text-gray-700">
                                                                            {c.value}
                                                                        </span>
                                                                        <span className="text-gray-500 text-[10px]">
                                                                            {c.label}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="flex justify-center gap-1 flex-wrap">
                                                                {checkinOptions[
                                                                    t1CheckinIndex
                                                                ].blocks.map((b, bIdx) => (
                                                                    <div
                                                                        key={bIdx}
                                                                        className={`w-5 h-5 text-white text-[10px] flex items-center justify-center rounded font-bold shadow-sm ${checkinOptions[
                                                                            t1CheckinIndex
                                                                        ].blockColors[bIdx] ===
                                                                            'darkgreen'
                                                                            ? 'bg-green-800'
                                                                            : checkinOptions[
                                                                                t1CheckinIndex
                                                                            ].blockColors[
                                                                                bIdx
                                                                            ] === 'green'
                                                                                ? 'bg-green-600'
                                                                                : checkinOptions[
                                                                                    t1CheckinIndex
                                                                                ].blockColors[
                                                                                    bIdx
                                                                                ] === 'red'
                                                                                    ? 'bg-red-600'
                                                                                    : 'bg-orange-600'
                                                                            }`}
                                                                    >
                                                                        {b}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* T1 출국장 카드 */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => {
                                                        setSlideDirection('left');
                                                        setT1DepartureIndex(
                                                            (prev) =>
                                                                (prev -
                                                                    1 +
                                                                    departureOptions.length) %
                                                                departureOptions.length,
                                                        );
                                                    }}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                                >
                                                    <ArrowLeftIcon className="w-3 h-3 text-blue-500" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSlideDirection('right');
                                                        setT1DepartureIndex(
                                                            (prev) =>
                                                                (prev + 1) %
                                                                departureOptions.length,
                                                        );
                                                    }}
                                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                                >
                                                    <ArrowRightIcon className="w-3 h-3 text-blue-500" />
                                                </button>

                                                <div className="overflow-hidden">
                                                    <div
                                                        key={`t1-departure-${t1DepartureIndex}`}
                                                        className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                                        style={{
                                                            animation:
                                                                slideDirection === 'right'
                                                                    ? 'slideInRight 0.3s ease-out'
                                                                    : 'slideInLeft 0.3s ease-out',
                                                        }}
                                                    >
                                                        <div className="flex justify-between px-4 py-3 font-bold text-sm border-b-2 bg-green-50 border-green-200">
                                                            <span className="text-green-600">
                                                                출국장
                                                            </span>
                                                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs">
                                                                혼잡 4개 or 원활
                                                            </span>
                                                        </div>
                                                        <div className="p-5 text-center bg-white">
                                                            <div className="text-gray-600 font-semibold text-sm mb-1">
                                                                {
                                                                    departureOptions[
                                                                        t1DepartureIndex
                                                                    ].name
                                                                }
                                                            </div>
                                                            <div className="text-3xl font-bold text-red-600 mb-2">
                                                                {
                                                                    departureOptions[
                                                                        t1DepartureIndex
                                                                    ].code
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-600 mb-3">
                                                                {
                                                                    departureOptions[
                                                                        t1DepartureIndex
                                                                    ].stats
                                                                }
                                                            </div>
                                                            <span className="inline-block bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                                                                {
                                                                    departureOptions[
                                                                        t1DepartureIndex
                                                                    ].status
                                                                }
                                                            </span>

                                                            <div className="flex justify-around mt-4 mb-4">
                                                                {departureOptions[
                                                                    t1DepartureIndex
                                                                ].circles.map((c, cIdx) => (
                                                                    <div
                                                                        key={cIdx}
                                                                        className="w-16 h-16 rounded-full border-3 border-gray-300 flex flex-col items-center justify-center text-xs bg-linear-to-br from-gray-50 to-white shadow-sm"
                                                                    >
                                                                        <span className="font-bold text-gray-700">
                                                                            {c.value}
                                                                        </span>
                                                                        <span className="text-gray-500 text-[10px]">
                                                                            {c.label}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="flex justify-center gap-1 flex-wrap">
                                                                {departureOptions[
                                                                    t1DepartureIndex
                                                                ].blocks.map((b, bIdx) => (
                                                                    <div
                                                                        key={bIdx}
                                                                        className={`w-5 h-5 text-white text-[10px] flex items-center justify-center rounded font-bold shadow-sm ${departureOptions[
                                                                            t1DepartureIndex
                                                                        ].blockColors[bIdx] ===
                                                                            'darkgreen'
                                                                            ? 'bg-green-800'
                                                                            : departureOptions[
                                                                                t1DepartureIndex
                                                                            ].blockColors[
                                                                                bIdx
                                                                            ] === 'green'
                                                                                ? 'bg-green-600'
                                                                                : departureOptions[
                                                                                    t1DepartureIndex
                                                                                ].blockColors[
                                                                                    bIdx
                                                                                ] === 'red'
                                                                                    ? 'bg-red-600'
                                                                                    : 'bg-orange-600'
                                                                            }`}
                                                                    >
                                                                        {b}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                    </div>

                    {/* T2 영역 (오른쪽) */}
                    <div className="space-y-6">
                        {/* T2 Mini Chart */}
                        {miniChartsData.slice(1, 2).map((chartData, idx) => {
                            const maxValue = Math.max(
                                ...chartData.data.map((d) => Math.max(d.cast, d.xoivs, d.actual)),
                            );
                            const chartWidth = 100;
                            const chartHeight = 80;
                            const padding = 10;

                            // 데이터를 SVG 좌표로 변환하는 함수
                            const getY = (value: number) =>
                                chartHeight -
                                padding -
                                (value / maxValue) * (chartHeight - 2 * padding);
                            const getX = (index: number) =>
                                (index / (chartData.data.length - 1)) * (chartWidth - 2 * padding) +
                                padding;

                            // 선 그래프 포인트 생성
                            const castPoints = chartData.data
                                .map((d, i) => `${getX(i)},${getY(d.cast)}`)
                                .join(' ');
                            const xoivsPoints = chartData.data
                                .map((d, i) => `${getX(i)},${getY(d.xoivs)}`)
                                .join(' ');

                            return (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-sm font-bold text-gray-700">
                                            {chartData.title}
                                        </h3>
                                        <div className="text-center border-2 border-gray-200 px-4 py-2 rounded-xl bg-linear-to-br from-gray-50 to-white shadow-sm">
                                            <div className="text-gray-500 text-[10px] font-medium">
                                                모델설명력
                                            </div>
                                            <div className="text-[10px] text-gray-400">
                                                (R² Square)
                                            </div>
                                            <h3
                                                className={`text-2xl font-bold ${currentTheme.accentText}`}
                                            >
                                                {chartData.r2Score}%
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mb-3 gap-4 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-1 rounded-full bg-[#FF5733]"></div>
                                            <span className="text-gray-700 font-medium">Cast</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-1 rounded-full bg-[#2980B9]"></div>
                                            <span className="text-gray-700 font-medium">Xoivs</span>
                                        </div>
                                    </div>
                                    <div className="h-24 relative">
                                        <svg
                                            width="100%"
                                            height="100%"
                                            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                                            preserveAspectRatio="none"
                                            className="border-b-2 border-gray-200"
                                        >
                                            {/* 막대그래프 */}
                                            {chartData.data.map((d, i) => {
                                                const barHeight =
                                                    (d.actual / maxValue) *
                                                    (chartHeight - 2 * padding);
                                                const barWidth =
                                                    ((chartWidth - 2 * padding) /
                                                        chartData.data.length) *
                                                    0.5;
                                                return (
                                                    <rect
                                                        key={`bar-${i}`}
                                                        x={getX(i) - barWidth / 2}
                                                        y={chartHeight - padding - barHeight}
                                                        width={barWidth}
                                                        height={barHeight}
                                                        fill="url(#barGradient2)"
                                                        opacity="0.3"
                                                    />
                                                );
                                            })}

                                            {/* 그라데이션 정의 */}
                                            <defs>
                                                <linearGradient
                                                    id="barGradient2"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="0%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#d1d5db"
                                                        stopOpacity="0.8"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#e5e7eb"
                                                        stopOpacity="0.4"
                                                    />
                                                </linearGradient>
                                            </defs>

                                            {/* Cast 선 */}
                                            <polyline
                                                points={castPoints}
                                                fill="none"
                                                stroke="#FF5733"
                                                strokeWidth="0.8"
                                            />

                                            {/* Xoivs 선 */}
                                            <polyline
                                                points={xoivsPoints}
                                                fill="none"
                                                stroke="#2980B9"
                                                strokeWidth="0.8"
                                            />
                                        </svg>

                                        {/* 알림 포인트 */}
                                        {chartData.data.map(
                                            (d, i) =>
                                                d.hasAlert && (
                                                    <div
                                                        key={`alert-${i}`}
                                                        className="absolute bottom-0 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg animate-pulse"
                                                        style={{
                                                            left: `${padding + (i / (chartData.data.length - 1)) * (chartWidth - 2 * padding)}%`,
                                                            transform: 'translate(-50%, 0)',
                                                        }}
                                                    />
                                                ),
                                        )}
                                        {/* 시간 레이블 */}
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-2 font-medium">
                                            <span>{chartData.data[0].time}</span>
                                            <span>
                                                {
                                                    chartData.data[
                                                        Math.floor(chartData.data.length / 2)
                                                    ].time
                                                }
                                            </span>
                                            <span>
                                                {chartData.data[chartData.data.length - 1].time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* T2 Terminal Card */}
                        {[
                            {
                                id: 'T2',
                                title: 'T2 출국장 예측',
                                flightCount: 270,
                                passengerCount: 12423,
                                flightDiff: '-4 편',
                                passengerDiff: '-268 명',
                                chartData: [20, 35, 45, 90, 85, 60, 50, 35, 25, 20],
                            },
                        ].map((terminal) => (
                            <article
                                key={terminal.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div
                                    className={`${currentTheme.simulationHeaderBg[1]} flex justify-between items-center px-6 py-4 font-bold shadow-md`}
                                >
                                    <div className="flex items-center gap-2 text-white">
                                        <AirplaneIcon className="w-5 h-5" />
                                        <span className="text-lg">시뮬레이션 요약</span>
                                    </div>
                                    <button className="w-8 h-8 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center justify-center">
                                        <PlusIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-[1fr_2fr] gap-4 mb-6">
                                        {/* 왼쪽: 운항편수/여객수 */}
                                        <div className="space-y-4">
                                            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border-2 border-blue-200 shadow-sm">
                                                <div className="flex items-center justify-center gap-2 mb-3">
                                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <AirplaneIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium">
                                                        운항편수
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${currentTheme.accentText} text-2xl font-bold mb-2`}
                                                >
                                                    {terminal.flightCount}{' '}
                                                    <span className="text-sm">편</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    지난주 대비{' '}
                                                    <span className="text-red-600 font-semibold">
                                                        {terminal.flightDiff}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl text-center border-2 border-green-200 shadow-sm">
                                                <div className="flex items-center justify-center gap-2 mb-3">
                                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                        <PeopleIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium">
                                                        여객수
                                                    </div>
                                                </div>
                                                <div className="text-green-600 text-2xl font-bold mb-2">
                                                    {terminal.passengerCount.toLocaleString()}{' '}
                                                    <span className="text-sm">명</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    지난주 대비{' '}
                                                    <span className="text-blue-600 font-semibold">
                                                        {terminal.passengerDiff}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 오른쪽: 차트 */}
                                        <div className="relative bg-white border-2 border-gray-200 rounded-xl p-4 shadow-inner flex flex-col">
                                            {/* 제목 - 그래프 내부 상단 */}
                                            <div className="text-center text-base font-bold text-gray-700 mb-3">
                                                {terminal.title}
                                            </div>

                                            {/* 차트 영역 */}
                                            <div className="flex gap-2 flex-1">
                                                {/* Y축 좌측 라벨 (대기인원 수) */}
                                                <div className="flex flex-col text-[10px] text-gray-500 pr-1">
                                                    <span className="text-[9px] mb-1 whitespace-nowrap">
                                                        대기인원 수
                                                    </span>
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <span>500</span>
                                                        <span>400</span>
                                                        <span>300</span>
                                                        <span>200</span>
                                                        <span>100</span>
                                                        <span>0</span>
                                                    </div>
                                                </div>

                                                {/* 막대 그래프 영역 */}
                                                <div className="flex-1 flex items-end justify-between gap-1 border-l border-b border-gray-300 pl-2 pb-2">
                                                    {terminal.chartData.map((value, idx) => {
                                                        const timeLabels = [
                                                            '04',
                                                            '09',
                                                            '12',
                                                            '15',
                                                            '21',
                                                            '02',
                                                            '04',
                                                            '09',
                                                            '12',
                                                            '15',
                                                            '21',
                                                        ];
                                                        const waitingCount = Math.floor(
                                                            Math.random() * 400 + 100,
                                                        ); // 임시 데이터
                                                        const waitingTime = value;
                                                        const maxWaitingTime = 500; // 대기시간 최대값

                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="flex-1 flex flex-col items-center"
                                                            >
                                                                <div
                                                                    className="w-full flex items-end justify-center gap-0.5"
                                                                    style={{ height: '160px' }}
                                                                >
                                                                    {/* 대기인원 수 막대 (파란색) */}
                                                                    <div
                                                                        className="w-[45%] bg-blue-500 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                                                                        style={{
                                                                            height: `${(waitingCount / 500) * 100}%`,
                                                                        }}
                                                                    ></div>
                                                                    {/* 대기시간 막대 (민트색) */}
                                                                    <div
                                                                        className="w-[45%] bg-emerald-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                                                                        style={{
                                                                            height: `${(waitingTime / maxWaitingTime) * 100}%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                                {/* X축 라벨 */}
                                                                <span className="text-[10px] text-gray-500 mt-1">
                                                                    {timeLabels[idx]}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Y축 우측 라벨 (대기시간) */}
                                                <div className="flex flex-col text-[10px] text-gray-500 pl-1">
                                                    <span className="text-[9px] mb-1 text-right whitespace-nowrap">
                                                        대기시간
                                                    </span>
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <span className="text-right">500</span>
                                                        <span className="text-right">400</span>
                                                        <span className="text-right">300</span>
                                                        <span className="text-right">200</span>
                                                        <span className="text-right">100</span>
                                                        <span className="text-right">0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 범례 */}
                                            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-600">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                                    <span>대기인원 수</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-3 h-3 bg-emerald-400 rounded"></div>
                                                    <span>대기시간</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-center justify-between bg-linear-to-r ${currentTheme.gradient} text-white font-bold text-center py-3 rounded-xl mb-6 shadow-md px-4`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>2025-11-08 FRI</span>
                                            <span>10</span>
                                            <span>:</span>
                                            <span>00</span>
                                            <span>:</span>
                                            <span>AM</span>
                                        </div>
                                    </div>

                                    {/* Detail Rows - T2 */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* T2 체크인카운터 카드 */}
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setSlideDirection('left');
                                                    setT2CheckinIndex(
                                                        (prev) =>
                                                            (prev - 1 + checkinOptions.length) %
                                                            checkinOptions.length,
                                                    );
                                                }}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                            >
                                                <ArrowLeftIcon className="w-3 h-3 text-blue-500" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSlideDirection('right');
                                                    setT2CheckinIndex(
                                                        (prev) =>
                                                            (prev + 1) % checkinOptions.length,
                                                    );
                                                }}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                            >
                                                <ArrowRightIcon className="w-3 h-3 text-blue-500" />
                                            </button>

                                            <div className="overflow-hidden">
                                                <div
                                                    key={`t2-checkin-${t2CheckinIndex}`}
                                                    className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                                    style={{
                                                        animation:
                                                            slideDirection === 'right'
                                                                ? 'slideInRight 0.3s ease-out'
                                                                : 'slideInLeft 0.3s ease-out',
                                                    }}
                                                >
                                                    <div className="flex justify-between px-4 py-3 font-bold text-sm border-b-2 bg-blue-50 border-blue-200">
                                                        <span className="text-blue-600">
                                                            체크인카운터
                                                        </span>
                                                        <span className="text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs">
                                                            혼잡 4개 or 원활
                                                        </span>
                                                    </div>
                                                    <div className="p-5 text-center bg-white">
                                                        <div className="text-gray-600 font-semibold text-sm mb-1">
                                                            {checkinOptions[t2CheckinIndex].name}
                                                        </div>
                                                        <div className="text-3xl font-bold text-red-600 mb-2">
                                                            {checkinOptions[t2CheckinIndex].code}
                                                        </div>
                                                        <div className="text-xs text-gray-600 mb-3">
                                                            {checkinOptions[t2CheckinIndex].stats}
                                                        </div>
                                                        <span className="inline-block bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                                                            {checkinOptions[t2CheckinIndex].status}
                                                        </span>

                                                        <div className="flex justify-around mt-4 mb-4">
                                                            {checkinOptions[
                                                                t2CheckinIndex
                                                            ].circles.map((c, cIdx) => (
                                                                <div
                                                                    key={cIdx}
                                                                    className="w-16 h-16 rounded-full border-3 border-gray-300 flex flex-col items-center justify-center text-xs bg-linear-to-br from-gray-50 to-white shadow-sm"
                                                                >
                                                                    <span className="font-bold text-gray-700">
                                                                        {c.value}
                                                                    </span>
                                                                    <span className="text-gray-500 text-[10px]">
                                                                        {c.label}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="flex justify-center gap-1 flex-wrap">
                                                            {checkinOptions[
                                                                t2CheckinIndex
                                                            ].blocks.map((b, bIdx) => (
                                                                <div
                                                                    key={bIdx}
                                                                    className={`w-5 h-5 text-white text-[10px] flex items-center justify-center rounded font-bold shadow-sm ${checkinOptions[
                                                                        t2CheckinIndex
                                                                    ].blockColors[bIdx] ===
                                                                        'darkgreen'
                                                                        ? 'bg-green-800'
                                                                        : checkinOptions[
                                                                            t2CheckinIndex
                                                                        ].blockColors[
                                                                            bIdx
                                                                        ] === 'green'
                                                                            ? 'bg-green-600'
                                                                            : checkinOptions[
                                                                                t2CheckinIndex
                                                                            ].blockColors[
                                                                                bIdx
                                                                            ] === 'red'
                                                                                ? 'bg-red-600'
                                                                                : 'bg-orange-600'
                                                                        }`}
                                                                >
                                                                    {b}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* T2 출국장 카드 */}
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setSlideDirection('left');
                                                    setT2DepartureIndex(
                                                        (prev) =>
                                                            (prev - 1 + departureOptions.length) %
                                                            departureOptions.length,
                                                    );
                                                }}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                            >
                                                <ArrowLeftIcon className="w-3 h-3 text-blue-500" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSlideDirection('right');
                                                    setT2DepartureIndex(
                                                        (prev) =>
                                                            (prev + 1) % departureOptions.length,
                                                    );
                                                }}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 z-20 w-6 h-6 bg-white rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                                            >
                                                <ArrowRightIcon className="w-3 h-3 text-blue-500" />
                                            </button>

                                            <div className="overflow-hidden">
                                                <div
                                                    key={`t2-departure-${t2DepartureIndex}`}
                                                    className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                                    style={{
                                                        animation:
                                                            slideDirection === 'right'
                                                                ? 'slideInRight 0.3s ease-out'
                                                                : 'slideInLeft 0.3s ease-out',
                                                    }}
                                                >
                                                    <div className="flex justify-between px-4 py-3 font-bold text-sm border-b-2 bg-green-50 border-green-200">
                                                        <span className="text-green-600">
                                                            출국장
                                                        </span>
                                                        <span className="text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs">
                                                            혼잡 4개 or 원활
                                                        </span>
                                                    </div>
                                                    <div className="p-5 text-center bg-white">
                                                        <div className="text-gray-600 font-semibold text-sm mb-1">
                                                            {
                                                                departureOptions[t2DepartureIndex]
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-3xl font-bold text-red-600 mb-2">
                                                            {
                                                                departureOptions[t2DepartureIndex]
                                                                    .code
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-600 mb-3">
                                                            {
                                                                departureOptions[t2DepartureIndex]
                                                                    .stats
                                                            }
                                                        </div>
                                                        <span className="inline-block bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                                                            {
                                                                departureOptions[t2DepartureIndex]
                                                                    .status
                                                            }
                                                        </span>

                                                        <div className="flex justify-around mt-4 mb-4">
                                                            {departureOptions[
                                                                t2DepartureIndex
                                                            ].circles.map((c, cIdx) => (
                                                                <div
                                                                    key={cIdx}
                                                                    className="w-16 h-16 rounded-full border-3 border-gray-300 flex flex-col items-center justify-center text-xs bg-linear-to-br from-gray-50 to-white shadow-sm"
                                                                >
                                                                    <span className="font-bold text-gray-700">
                                                                        {c.value}
                                                                    </span>
                                                                    <span className="text-gray-500 text-[10px]">
                                                                        {c.label}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="flex justify-center gap-1 flex-wrap">
                                                            {departureOptions[
                                                                t2DepartureIndex
                                                            ].blocks.map((b, bIdx) => (
                                                                <div
                                                                    key={bIdx}
                                                                    className={`w-5 h-5 text-white text-[10px] flex items-center justify-center rounded font-bold shadow-sm ${departureOptions[
                                                                        t2DepartureIndex
                                                                    ].blockColors[bIdx] ===
                                                                        'darkgreen'
                                                                        ? 'bg-green-800'
                                                                        : departureOptions[
                                                                            t2DepartureIndex
                                                                        ].blockColors[
                                                                            bIdx
                                                                        ] === 'green'
                                                                            ? 'bg-green-600'
                                                                            : departureOptions[
                                                                                t2DepartureIndex
                                                                            ].blockColors[
                                                                                bIdx
                                                                            ] === 'red'
                                                                                ? 'bg-red-600'
                                                                                : 'bg-orange-600'
                                                                        }`}
                                                                >
                                                                    {b}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default SmltSmryRslt;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ComposedChart,
    Line,
    Bar,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useChartData } from '@/hooks/useChartData';
import { ViewModeToggle, type ViewMode } from '../view-mode-toggle';

// 예쁜 컬러 팔레트 정의
const colors = {
    primary: '#6366f1', // Indigo
    secondary: '#ec4899', // Pink
    tertiary: '#14b8a6', // Teal
    quaternary: '#f59e0b', // Amber
    gradient1: '#8b5cf6', // Purple
    gradient2: '#06b6d4', // Cyan
};

// 그라데이션 정의를 위한 컴포넌트
const GradientDefs = () => (
    <defs>
        <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.primary} stopOpacity={0.9} />
            <stop offset="100%" stopColor={colors.gradient1} stopOpacity={0.7} />
        </linearGradient>
        <linearGradient id="colorArea1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.secondary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity={0.05} />
        </linearGradient>
        <linearGradient id="colorArea2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.tertiary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colors.tertiary} stopOpacity={0.05} />
        </linearGradient>
    </defs>
);

// 커스텀 툴팁
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name?: string;
        value?: number | string;
        color?: string;
    }>;
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        <span className="font-medium">{entry.name}:</span> {entry.value}명
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// 커스텀 점 (Dot) 컴포넌트
interface CustomDotProps {
    cx?: number;
    cy?: number;
    fill?: string;
}

const CustomDot = (props: CustomDotProps) => {
    const { cx, cy, fill } = props;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill={fill}
            stroke="#fff"
            strokeWidth={2}
            className="drop-shadow-md"
        />
    );
};

interface ChartViewProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

export function ChartView({ viewMode, onViewModeChange }: ChartViewProps) {
    const { data: chartData, loading } = useChartData();

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <Card className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">체크인카운터 N</h2>
                    <ViewModeToggle
                        viewMode={viewMode}
                        onViewModeChange={onViewModeChange}
                        colorScheme="orange"
                        inline
                    />
                </div>
            </Card>
            {/* 메인 차트 - ComposedChart (Bar + Area + Line) */}
            <Card className="shadow-lg">
                <CardHeader className="bg-linear-to-r from-indigo-50 to-purple-50 border-b">
                    <CardTitle className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        N 19 구역 체크인카운터 현황
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={450}>
                        <ComposedChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <GradientDefs />
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                                vertical={false}
                                opacity={0.5}
                            />
                            <XAxis
                                dataKey="time"
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#d1d5db' }}
                                tickLine={{ stroke: '#d1d5db' }}
                            />
                            <YAxis
                                label={{
                                    value: '인원수',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { fill: '#6b7280', fontWeight: 600 },
                                }}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#d1d5db' }}
                                tickLine={{ stroke: '#d1d5db' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: '30px' }}
                                iconType="circle"
                                formatter={(value) => (
                                    <span className="text-sm font-medium text-gray-700">
                                        {value}
                                    </span>
                                )}
                            />

                            {/* Area 차트로 배경 영역 표시 */}
                            <Area
                                type="monotone"
                                dataKey="waitingCurrent"
                                fill="url(#colorArea1)"
                                stroke="none"
                                name="대기인원(현재) 영역"
                                animationDuration={1500}
                                animationBegin={0}
                            />
                            <Area
                                type="monotone"
                                dataKey="waitingForecast"
                                fill="url(#colorArea2)"
                                stroke="none"
                                name="대기인원(전주) 영역"
                                animationDuration={1500}
                                animationBegin={300}
                            />

                            {/* Bar 차트 - 그라데이션 적용 */}
                            <Bar
                                dataKey="processedPeople"
                                fill="url(#colorBar)"
                                name="처리인원"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                                animationBegin={600}
                            />

                            {/* Line 차트들 - 예쁜 컬러와 애니메이션 */}
                            <Line
                                type="monotone"
                                dataKey="waitingCurrent"
                                stroke={colors.secondary}
                                strokeWidth={3}
                                name="대기인원(현재)"
                                dot={<CustomDot fill={colors.secondary} />}
                                activeDot={{
                                    r: 8,
                                    fill: colors.secondary,
                                    stroke: '#fff',
                                    strokeWidth: 3,
                                }}
                                animationDuration={1500}
                                animationBegin={900}
                            />
                            <Line
                                type="monotone"
                                dataKey="waitingForecast"
                                stroke={colors.tertiary}
                                strokeWidth={3}
                                name="대기인원(전주 동요일)"
                                dot={<CustomDot fill={colors.tertiary} />}
                                activeDot={{
                                    r: 8,
                                    fill: colors.tertiary,
                                    stroke: '#fff',
                                    strokeWidth: 3,
                                }}
                                animationDuration={1500}
                                animationBegin={1200}
                            />
                            <Line
                                type="monotone"
                                dataKey="waitingPrevWeek"
                                stroke={colors.quaternary}
                                strokeWidth={2.5}
                                name="대기인원(전재)"
                                dot={{
                                    r: 4,
                                    fill: colors.quaternary,
                                    stroke: '#fff',
                                    strokeWidth: 2,
                                }}
                                strokeDasharray="8 4"
                                activeDot={{
                                    r: 7,
                                    fill: colors.quaternary,
                                    stroke: '#fff',
                                    strokeWidth: 2,
                                }}
                                animationDuration={1500}
                                animationBegin={1500}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* 서브 차트 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 처리인원 트렌드 */}
                <Card className="shadow-lg">
                    <CardHeader className="bg-linear-to-r from-indigo-50 to-cyan-50 border-b">
                        <CardTitle className="text-lg font-bold bg-linear-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                            처리인원 트렌드
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor={colors.primary}
                                            stopOpacity={0.4}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor={colors.gradient2}
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e5e7eb"
                                    opacity={0.5}
                                />
                                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="processedPeople"
                                    fill="url(#colorProcessed)"
                                    stroke={colors.primary}
                                    strokeWidth={3}
                                    name="처리인원"
                                    dot={{
                                        r: 4,
                                        fill: colors.primary,
                                        stroke: '#fff',
                                        strokeWidth: 2,
                                    }}
                                    animationDuration={1200}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 대기인원 비교 */}
                <Card className="shadow-lg">
                    <CardHeader className="bg-linear-to-r from-pink-50 to-rose-50 border-b">
                        <CardTitle className="text-lg font-bold bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                            대기인원 비교
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e5e7eb"
                                    opacity={0.5}
                                />
                                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType="circle" />
                                <Line
                                    type="monotone"
                                    dataKey="waitingCurrent"
                                    stroke={colors.secondary}
                                    strokeWidth={3}
                                    name="현재"
                                    dot={{ r: 4, fill: colors.secondary }}
                                    animationDuration={1200}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="waitingForecast"
                                    stroke={colors.tertiary}
                                    strokeWidth={3}
                                    name="전주"
                                    dot={{ r: 4, fill: colors.tertiary }}
                                    animationDuration={1200}
                                    animationBegin={300}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

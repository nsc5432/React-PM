import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const chartData = [
    { time: "4:00", processed: 12, waitCurrent: 23, waitForecast: 25, waitPrevWeek: 20 },
    { time: "6:00", processed: 15, waitCurrent: 35, waitForecast: 40, waitPrevWeek: 30 },
    { time: "8:00", processed: 45, waitCurrent: 76, waitForecast: 80, waitPrevWeek: 70 },
    { time: "10:00", processed: 78, waitCurrent: 125, waitForecast: 130, waitPrevWeek: 110 },
    { time: "12:00", processed: 76, waitCurrent: 140, waitForecast: 145, waitPrevWeek: 125 },
    { time: "14:00", processed: 72, waitCurrent: 155, waitForecast: 160, waitPrevWeek: 140 },
    { time: "16:00", processed: 75, waitCurrent: 189, waitForecast: 200, waitPrevWeek: 175 },
    { time: "18:00", processed: 82, waitCurrent: 195, waitForecast: 200, waitPrevWeek: 180 },
    { time: "20:00", processed: 48, waitCurrent: 125, waitForecast: 135, waitPrevWeek: 115 },
    { time: "22:00", processed: 30, waitCurrent: 75, waitForecast: 85, waitPrevWeek: 65 },
    { time: "0:00", processed: 18, waitCurrent: 35, waitForecast: 40, waitPrevWeek: 30 },
    { time: "2:00", processed: 8, waitCurrent: 15, waitForecast: 18, waitPrevWeek: 12 },
]

// Color palette
const colors = {
    primary: "#6366f1", // Indigo
    secondary: "#ec4899", // Pink
    tertiary: "#f59e0b", // Amber
    quaternary: "#3b82f6", // Blue
    line1: "#f59e0b", // Orange for 대기인원(전일)
    line2: "#3b82f6", // Blue for 대기인원(현재)
    line3: "#ef4444", // Red for 대기인원(내일)
}

// Gradient definitions
const GradientDefs = () => (
    <defs>
        <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.quaternary} stopOpacity={0.9} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity={0.7} />
        </linearGradient>
    </defs>
)

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        <span className="font-medium">{entry.name}:</span> {entry.value}명
                    </p>
                ))}
            </div>
        )
    }
    return null
}

// Custom dot component
const CustomDot = (props: any) => {
    const { cx, cy, fill } = props
    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill={fill}
            stroke="#fff"
            strokeWidth={2}
            className="drop-shadow-md"
        />
    )
}

export function ChartView() {
    return (
        <div className="p-6 space-y-6">
            {/* Header Controls */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">N-3구역 셀프체크인/백드롭 현황</h2>
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">현재일자</span>
                        <Select defaultValue="2024-10-18">
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024-10-18">2024-10-18</SelectItem>
                                <SelectItem value="2024-10-17">2024-10-17</SelectItem>
                                <SelectItem value="2024-10-16">2024-10-16</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">비교일자 1</span>
                        <Select defaultValue="2023-10-18">
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2023-10-18">2023-10-18</SelectItem>
                                <SelectItem value="2023-10-17">2023-10-17</SelectItem>
                                <SelectItem value="2023-10-16">2023-10-16</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">비교일자2</span>
                        <Select defaultValue="2023-10-18">
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2023-10-18">2023-10-18</SelectItem>
                                <SelectItem value="2023-10-17">2023-10-17</SelectItem>
                                <SelectItem value="2023-10-16">2023-10-16</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">터미널선택</span>
                        <Select defaultValue="t1">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="t1">T1 터미널</SelectItem>
                                <SelectItem value="t2">T2 터미널</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Select defaultValue="n19">
                        <SelectTrigger className="w-[100px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="n19">N 19</SelectItem>
                            <SelectItem value="n20">N 20</SelectItem>
                            <SelectItem value="n21">N 21</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Chart */}
            <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        인원수
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={500}>
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
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                axisLine={{ stroke: "#d1d5db" }}
                                tickLine={{ stroke: "#d1d5db" }}
                                label={{
                                    value: "시간",
                                    position: "insideBottomRight",
                                    offset: -10,
                                    style: { fill: "#6b7280", fontWeight: 600 }
                                }}
                            />
                            <YAxis
                                label={{
                                    value: "인원수",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { fill: "#6b7280", fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                axisLine={{ stroke: "#d1d5db" }}
                                tickLine={{ stroke: "#d1d5db" }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: "30px" }}
                                iconType="line"
                                formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>}
                            />

                            {/* Bar chart for processed people */}
                            <Bar
                                dataKey="processed"
                                fill="url(#colorBar)"
                                name="처리인원"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1000}
                            />

                            {/* Line charts for waiting people */}
                            <Line
                                type="monotone"
                                dataKey="waitPrevWeek"
                                stroke={colors.line1}
                                strokeWidth={3}
                                name="대기인원(전일)"
                                dot={<CustomDot fill={colors.line1} />}
                                activeDot={{ r: 7, fill: colors.line1, stroke: "#fff", strokeWidth: 2 }}
                                animationDuration={1500}
                                strokeDasharray="5 5"
                            />
                            <Line
                                type="monotone"
                                dataKey="waitCurrent"
                                stroke={colors.line2}
                                strokeWidth={3}
                                name="대기인원(현재)"
                                dot={<CustomDot fill={colors.line2} />}
                                activeDot={{ r: 7, fill: colors.line2, stroke: "#fff", strokeWidth: 2 }}
                                animationDuration={1500}
                                animationBegin={300}
                            />
                            <Line
                                type="monotone"
                                dataKey="waitForecast"
                                stroke={colors.line3}
                                strokeWidth={3}
                                name="대기인원(내일)"
                                dot={<CustomDot fill={colors.line3} />}
                                activeDot={{ r: 7, fill: colors.line3, stroke: "#fff", strokeWidth: 2 }}
                                animationDuration={1500}
                                animationBegin={600}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

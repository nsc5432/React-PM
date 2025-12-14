"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { chartData } from "@/lib/mock-data"

export function ChartView() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>N 19 구역 체크인카운터 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--foreground))" />
              <YAxis
                label={{ value: "인원수", angle: -90, position: "insideLeft" }}
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
              <Bar dataKey="processedPeople" fill="hsl(var(--chart-1))" name="처리인원" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="waitingCurrent"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                name="대기인원(현재)"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="waitingForecast"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="대기인원(전주 동요일)"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="waitingPrevWeek"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                name="대기인원(전재)"
                dot={{ r: 3 }}
                strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

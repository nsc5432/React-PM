"use client"

import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Users, Clock } from "lucide-react"
import { getFacilityDataByTime } from "@/lib/mock-data"
import { TimelinePlayer } from "@/components/timeline-player"
import { useState } from "react"

export function MapView() {
  // 시간 상태 관리 (10:00부터 시작)
  const [currentTime, setCurrentTime] = useState(600)

  // 현재 시간에 해당하는 시설 혼잡도 데이터 가져오기
  const facilityStatusData = getFacilityDataByTime(currentTime)

  const islands = ["N", "M", "L", "K", "E", "F", "G", "H", "I", "J", "K", "C", "B", "A"]
  const islandNumbers = ["6", "5", "4", "3", "2", "1"]

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-4 overflow-auto">
      <Card className="p-4">
        <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-md flex items-center gap-2">
          <span className="text-lg">🏢</span>
          <span className="text-sm font-medium">혼잡</span>
          <span className="text-muted-foreground text-sm ml-4">N 1~7 (공항 開오픈)</span>
        </div>
      </Card>

      <div className="relative bg-muted/20 rounded-lg p-8" style={{ minHeight: "500px" }}>
        {/* Grid layout representing terminal islands */}
        <div className="grid grid-cols-14 gap-2 mb-8">
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <div key={rowIdx} className="col-span-14 grid grid-cols-14 gap-2 h-12">
              {Array.from({ length: 14 }).map((_, colIdx) => (
                <div key={colIdx} className="border border-muted bg-card" />
              ))}
            </div>
          ))}
        </div>

        {/* Island markers */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-around items-end px-8">
          {islandNumbers.map((num, idx) => {
            const facility = facilityStatusData[idx]
            return (
              <Popover key={num}>
                <PopoverTrigger asChild>
                  <button
                    className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all hover:scale-110 ${
                      facility?.status === "busy"
                        ? "bg-blue-300 text-blue-900"
                        : facility?.status === "warning"
                          ? "bg-purple-300 text-purple-900"
                          : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {num}
                  </button>
                </PopoverTrigger>
                {facility && (
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">체크인카운터 N1 시설 혼잡 현황</h3>
                        <button className="text-muted-foreground hover:text-foreground">✕</button>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-destructive" />
                          </div>
                          <div className="text-2xl font-bold text-destructive">{facility.waitPeople}명</div>
                          <div className="text-xs text-muted-foreground">대기인원</div>
                        </div>

                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                            <Clock className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="text-2xl font-bold">{facility.waitTime}분</div>
                          <div className="text-xs text-muted-foreground">대기시간</div>
                        </div>

                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="text-2xl font-bold">3명</div>
                          <div className="text-xs text-muted-foreground">처리인원</div>
                        </div>

                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                            <Clock className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="text-2xl font-bold">2분</div>
                          <div className="text-xs text-muted-foreground">처리시간</div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            )
          })}
        </div>

        {/* Terminal letter labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around px-8 pb-2">
          {islands.map((letter, idx) => (
            <div key={idx} className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded">
              {letter}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* TimelinePlayer - MapView 전용 */}
      <TimelinePlayer time={currentTime} onTimeChange={setCurrentTime} />
    </div>
  )
}

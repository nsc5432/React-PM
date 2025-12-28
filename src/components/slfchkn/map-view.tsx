import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getSelfCheckInDataByTime } from "@/lib/mock-data"
import { TimelinePlayer } from "@/components/timeline-player"
import { useState } from "react"

interface KioskData {
    number: number
    status: "normal" | "warning" | "busy"
    type: "kiosk" | "backdrop"
    waitPeople: number
    waitTime: number
}

export function MapView() {
    // 시간 상태 관리 (10:00부터 시작)
    const [currentTime, setCurrentTime] = useState(600)

    // 현재 시간에 해당하는 셀프체크인 혼잡도 데이터 가져오기
    const selfCheckInData = getSelfCheckInDataByTime(currentTime)

    // 시간별 데이터를 KioskData 형식으로 변환
    const kiosks: KioskData[] = selfCheckInData.map((data) => ({
        number: data.number,
        status: data.status,
        type: "kiosk",
        waitPeople: data.waitPeople,
        waitTime: data.waitTime,
    }))

    // Mock data for backdrops (셀프백드롭 X) - 정적 데이터
    const backdrops: KioskData[] = [
        { number: 1, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 2, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 3, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 4, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 5, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 6, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 7, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
        { number: 8, status: "normal", type: "backdrop", waitPeople: 0, waitTime: 0 },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "busy":
                return "bg-red-500"
            case "warning":
                return "bg-orange-400"
            default:
                return "bg-green-100 border border-green-300"
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-6 space-y-4 overflow-auto">
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
                    <div className="flex items-center">
                        <span className="text-orange-800 font-semibold">⚠ 혼잡</span>
                        <span className="ml-4 text-orange-700">N 1~7 (3개 부스 OPEN)</span>
                    </div>
                </div>

                <Card className="p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-center mb-2">셀프체크인/백드롭 N</h2>
                        <p className="text-sm text-muted-foreground text-right">*키오스크 번호를 선택하세요.</p>
                    </div>

                    {/* Map Layout Grid */}
                    <div className="relative bg-gray-50 p-8 rounded-lg border-2 border-gray-200 min-h-[500px]">
                        {/* Top Row Labels (E1-E4, M1-M4, W1-W4) */}
                        <div className="absolute top-4 left-0 right-0 grid grid-cols-12 gap-2 px-8">
                            {["E1", "E2", "E3", "E4", "M1", "M2", "M3", "M4", "W1", "W2", "W3", "W4"].map((label) => (
                                <div key={label} className="text-center font-semibold text-sm text-gray-600">
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* Left Column Numbers (01-13) */}
                        <div className="absolute left-2 top-20 bottom-20 flex flex-col justify-between">
                            {Array.from({ length: 13 }, (_, i) => (
                                <div key={i} className="text-center font-semibold text-xs text-gray-600">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                            ))}
                        </div>

                        {/* Grid Cells */}
                        <div className="mt-12 ml-8 grid grid-cols-12 gap-2 h-[400px]">
                            {Array.from({ length: 156 }, (_, i) => (
                                <div key={i} className="border border-gray-200 bg-white"></div>
                            ))}
                        </div>

                        {/* Kiosks positioned on the map (numbered 1-6 with uniform spacing) */}
                        <div className="absolute" style={{ top: "180px", left: "8px", right: "8px" }}>
                            <div className="flex justify-evenly">
                                {[1, 2, 3, 4, 5, 6].map((num) => {
                                    const kiosk = kiosks.find((k) => k.number === num)
                                    if (!kiosk) return null
                                    return (
                                        <div
                                            key={num}
                                            className={`w-14 h-14 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center ${getStatusColor(
                                                kiosk.status,
                                            )}`}
                                        >
                                            {num}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Bottom Row Letters (N, M, L, K, E, F, G, H, I, J, K, C, B, A) - Clickable */}
                        <div className="absolute bottom-4 left-8 right-8 grid grid-cols-14 gap-1">
                            {["N", "M", "L", "K", "E", "F", "G", "H", "I", "J", "K", "C", "B", "A"].map((label) => (
                                <Popover key={label}>
                                    <PopoverTrigger asChild>
                                        <button className="h-10 flex items-center justify-center bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded transition-colors cursor-pointer">
                                            {label}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-3">
                                            <h3 className="font-bold text-center border-b pb-2">셀프체크인/백드롭 {label}</h3>

                                            <div className="space-y-2">
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="font-semibold mb-2 text-sm">키오스크</div>
                                                    <div className="grid grid-cols-8 gap-1">
                                                        {kiosks.map((kiosk) => (
                                                            <div
                                                                key={kiosk.number}
                                                                className="h-8 flex items-center justify-center bg-white border rounded text-xs font-medium"
                                                            >
                                                                {kiosk.number}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="font-semibold mb-2 text-sm">셀프백드롭</div>
                                                    <div className="grid grid-cols-8 gap-1">
                                                        {backdrops.map((backdrop) => (
                                                            <div
                                                                key={backdrop.number}
                                                                className="h-8 flex items-center justify-center bg-white border rounded text-xs"
                                                            >
                                                                X
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* TimelinePlayer - 재사용 */}
            <TimelinePlayer time={currentTime} onTimeChange={setCurrentTime} />
        </div>
    )
}

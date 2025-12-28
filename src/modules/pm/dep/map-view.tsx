import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getCheckInCounterDataByTime } from "@/lib/mock-data"
import { TimelinePlayer } from "@/modules/pm/timeline-player"
import { useState } from "react"
import { Users, Clock } from "lucide-react"

interface DepartureGateData {
    number: number
    status: "normal" | "warning" | "busy"
    waitPeople: number
    waitTime: number
    processedPeople: number
    processTime: number
}

export function MapView() {
    const [currentTime, setCurrentTime] = useState(600)

    // 현재 시간에 해당하는 체크인카운터(A~N 아일랜드) 혼잡도 데이터 가져오기
    const checkInCounterData = getCheckInCounterDataByTime(currentTime)

    // 출국장 게이트 데이터 (1~6번 게이트)
    // 시뮬레이션된 혼잡도 데이터
    const departureGates: DepartureGateData[] = [
        {
            number: 1,
            status: checkInCounterData[0]?.status || "normal",
            waitPeople: 15,
            waitTime: 20,
            processedPeople: 3,
            processTime: 25,
        },
        {
            number: 2,
            status: checkInCounterData[1]?.status || "normal",
            waitPeople: 15,
            waitTime: 20,
            processedPeople: 3,
            processTime: 25,
        },
        {
            number: 3,
            status: checkInCounterData[2]?.status || "busy",
            waitPeople: 15,
            waitTime: 20,
            processedPeople: 3,
            processTime: 25,
        },
        {
            number: 4,
            status: checkInCounterData[3]?.status || "normal",
            waitPeople: 15,
            waitTime: 20,
            processedPeople: 3,
            processTime: 25,
        },
        {
            number: 5,
            status: checkInCounterData[4]?.status || "normal",
            waitPeople: 15,
            waitTime: 20,
            processedPeople: 3,
            processTime: 25,
        },
        {
            number: 6,
            status: checkInCounterData[5]?.status || "busy",
            waitPeople: 15,
            waitTime: 20,
            processedPeople: 3,
            processTime: 25,
        },
    ]

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "busy":
                return "혼잡"
            case "warning":
                return "원활"
            default:
                return "원활"
        }
    }

    // 아일랜드별 혼잡도 데이터를 맵으로 변환
    const islandStatusMap = checkInCounterData.reduce(
        (acc, island) => {
            acc[island.island] = island.status
            return acc
        },
        {} as Record<string, string>
    )

    // Gate component renderer
    const renderGate = (gate: DepartureGateData) => (
        <Popover key={gate.number}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <div
                        className={`w-32 h-72 rounded-lg shadow-xl flex flex-col items-center cursor-pointer transition-all hover:scale-105 border-2 ${gate.status === "busy" ? "bg-white border-gray-300" : "bg-white border-gray-300"
                            }`}
                    >
                        {/* Header */}
                        <div className="w-full bg-gray-100 py-2 px-3 rounded-t-lg border-b border-gray-300">
                            <div className="text-sm font-bold text-gray-800 text-center">출국장 {gate.number}</div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-3 mb-2">
                            <div
                                className={`px-4 py-1 rounded text-xs font-bold ${gate.status === "busy" ? "bg-red-500 text-white" : "bg-cyan-400 text-white"
                                    }`}
                            >
                                {getStatusLabel(gate.status)}
                            </div>
                        </div>

                        {/* Stats Grid - 2x2 layout */}
                        <div className="grid grid-cols-2 gap-5 px-3 py-4 w-full">
                            {/* Wait People */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-1">
                                    <Users className="h-5 w-5 text-indigo-400" />
                                </div>
                                <div className="text-lg font-bold text-red-600">{gate.waitPeople}명</div>
                                <div className="text-[9px] text-gray-600">대기인원</div>
                            </div>

                            {/* Wait Time */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-1">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="text-lg font-bold text-red-600">{gate.waitTime}분</div>
                                <div className="text-[9px] text-gray-600">대기시간</div>
                            </div>

                            {/* Processed People */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-1">
                                    <Users className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="text-sm font-bold text-gray-700">{gate.processedPeople}명</div>
                                <div className="text-[9px] text-gray-600">처리인원</div>
                            </div>

                            {/* Process Time */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-1">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="text-sm font-bold text-gray-700">{gate.processTime}분</div>
                                <div className="text-[9px] text-gray-600">처리시간</div>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-3">
                    <h3 className="font-bold text-center border-b pb-2">출국장 {gate.number} 상세 정보</h3>

                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="space-y-2">
                            <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-destructive" />
                            </div>
                            <div className="text-2xl font-bold text-destructive">{gate.waitPeople}명</div>
                            <div className="text-xs text-muted-foreground">대기인원</div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                                <Clock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{gate.waitTime}분</div>
                            <div className="text-xs text-muted-foreground">대기시간</div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                                <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{gate.processedPeople}명</div>
                            <div className="text-xs text-muted-foreground">처리인원</div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                                <Clock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{gate.processTime}분</div>
                            <div className="text-xs text-muted-foreground">처리시간</div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-6 space-y-4 overflow-auto">
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
                    <div className="flex items-center">
                        <span className="text-orange-800 font-semibold">⚠ 혼잡</span>
                        <span className="ml-4 text-orange-700">출국장 3 (2개 부스 OPEN)</span>
                        <span className="ml-8 text-orange-700">출국장 6 (2개 부스 OPEN)</span>
                    </div>
                </div>

                <Card className="p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-center mb-2">출국장 N</h2>
                    </div>

                    {/* Map Layout Grid */}
                    <div className="relative bg-gray-50 p-8 rounded-lg border-2 border-gray-200 min-h-[600px]">
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
                        <div className="mt-12 ml-8 grid grid-cols-12 gap-2 h-[450px]">
                            {Array.from({ length: 156 }, (_, i) => (
                                <div key={i} className="border border-gray-200 bg-white"></div>
                            ))}
                        </div>

                        {/* Departure Gates positioned on the map (1-6) in diagonal staircase */}
                        <div className="absolute top-16 left-8 right-8" style={{ height: "420px" }}>
                            <div className="relative w-full h-full">
                                {/* Gate 6 - E2 area */}
                                <div className="absolute" style={{ left: "8%", top: "150px" }}>
                                    {renderGate(departureGates[5])}
                                </div>

                                {/* Gate 5 - E3 area */}
                                <div className="absolute" style={{ left: "20%", top: "50px" }}>
                                    {renderGate(departureGates[4])}
                                </div>

                                {/* Gate 4 - M1 area */}
                                <div className="absolute" style={{ left: "35%", top: "0px" }}>
                                    {renderGate(departureGates[3])}
                                </div>

                                {/* Gate 3 - M3 area */}
                                <div className="absolute" style={{ left: "52%", top: "0px" }}>
                                    {renderGate(departureGates[2])}
                                </div>

                                {/* Gate 2 - W1 area */}
                                <div className="absolute" style={{ left: "68%", top: "50px" }}>
                                    {renderGate(departureGates[1])}
                                </div>

                                {/* Gate 1 - W3 area */}
                                <div className="absolute" style={{ left: "82%", top: "150px" }}>
                                    {renderGate(departureGates[0])}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row Letters (N, M, L, K, E, F, G, H, I, J, K, C, B, A) */}
                        <div className="absolute bottom-2 left-8 right-8 grid grid-cols-14 gap-1">
                            {["N", "M", "L", "K", "E", "F", "G", "H", "I", "J", "K", "C", "B", "A"].map((label) => {
                                const islandStatus = islandStatusMap[label] || "normal"
                                const buttonColor =
                                    islandStatus === "busy"
                                        ? "bg-red-500"
                                        : islandStatus === "warning"
                                            ? "bg-orange-400"
                                            : "bg-cyan-400"
                                return (
                                    <div
                                        key={label}
                                        className={`h-8 flex items-center justify-center font-bold text-white rounded ${buttonColor}`}
                                    >
                                        {label}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Card>
            </div>

            {/* TimelinePlayer */}
            <TimelinePlayer time={currentTime} onTimeChange={setCurrentTime} />
        </div>
    )
}

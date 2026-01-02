import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimeSlotData {
    processedPeople: number
    processedTime: string
    waitPeople: number
    waitTime: string
}

export function TableView() {
    const times = ["04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "..."]
    const gateNumbers = [8, 7, 6, 5, 4, 3, 2, 1]

    // Mock data generator for each gate and time
    const getSlotData = (): TimeSlotData => {
        // Simulate different congestion levels
        const baseProcessed = Math.floor(Math.random() * 10)
        const baseWait = Math.floor(Math.random() * 10)

        return {
            processedPeople: baseProcessed,
            processedTime: "000초",
            waitPeople: baseWait,
            waitTime: "000초",
        }
    }

    const getCellBgColor = (gateIdx: number, timeIdx: number) => {
        // Highlight specific cells as shown in the image (gates 1, 4, 5 during certain times)
        if ((gateIdx === 7 || gateIdx === 4 || gateIdx === 3) && timeIdx >= 0 && timeIdx <= 5) {
            return "bg-orange-100"
        }
        return ""
    }

    return (
        <div className="p-6">
            <Card className="p-0 overflow-hidden">
                <ScrollArea className="w-full">
                    <div className="min-w-400">
                        {/* Header */}
                        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b bg-gray-100">
                            <div className="p-4 font-bold border-r flex items-center justify-center">번호</div>
                            {times.map((time) => (
                                <div key={time} className="border-r last:border-r-0">
                                    <div className="p-4 text-center font-bold border-b bg-gray-200">{time}</div>
                                    <div className="grid grid-cols-4 text-xs">
                                        <div className="p-2 border-r border-b text-center font-semibold">처리 여객</div>
                                        <div className="p-2 border-r border-b text-center font-semibold">처리 시간</div>
                                        <div className="p-2 border-r border-b text-center font-semibold">대기 여객</div>
                                        <div className="p-2 border-b text-center font-semibold">대기 시간</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        {gateNumbers.map((gateNum, gateIdx) => (
                            <div key={gateNum} className="grid grid-cols-[100px_repeat(7,1fr)] border-b">
                                <div className="p-4 border-r flex items-center justify-center font-bold bg-gray-50">
                                    {gateNum}
                                </div>
                                {times.map((time, timeIdx) => {
                                    const data = getSlotData()
                                    return (
                                        <div key={time} className={`border-r last:border-r-0 ${getCellBgColor(gateIdx, timeIdx)}`}>
                                            <div className="grid grid-cols-4 text-xs">
                                                <div className="p-2 border-r text-center">
                                                    처리 여객 : {data.processedPeople.toString().padStart(2, "0")}명
                                                </div>
                                                <div className="p-2 border-r text-center">처리 시간 : {data.processedTime}</div>
                                                <div className="p-2 border-r text-center">
                                                    대기 여객 : {data.waitPeople.toString().padStart(2, "0")}명
                                                </div>
                                                <div className="p-2 text-center">대기 시간 : {data.waitTime}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Card>
        </div>
    )
}

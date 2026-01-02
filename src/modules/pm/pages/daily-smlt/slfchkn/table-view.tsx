import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TableView() {
    const times = ["04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30"]
    const zones = [
        { number: 8, type: "셀프체크인 키오스크" },
        { number: 8, type: "셀프백드롭" },
        { number: 7, type: "셀프체크인 키오스크" },
        { number: 7, type: "셀프백드롭" },
        { number: 6, type: "셀프체크인 키오스크" },
        { number: 6, type: "셀프백드롭" },
        { number: 5, type: "셀프체크인 키오스크" },
        { number: 5, type: "셀프백드롭" },
        { number: 4, type: "셀프체크인 키오스크" },
        { number: 4, type: "셀프백드롭" },
        { number: 3, type: "셀프체크인 키오스크" },
        { number: 3, type: "셀프백드롭" },
    ]

    const getHighlightClass = (zoneIdx: number, timeIdx: number) => {
        // Highlight specific cells as shown in the image
        if (zoneIdx >= 6 && zoneIdx <= 8 && timeIdx >= 0 && timeIdx <= 4) {
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
                        <div className="grid grid-cols-[100px_repeat(10,1fr)] border-b bg-gray-100">
                            <div className="p-4 font-bold border-r flex items-center justify-center">번호</div>
                            {times.map((time) => (
                                <div key={time} className="border-r last:border-r-0">
                                    <div className="text-center font-bold p-3 border-b bg-gray-50">{time}</div>
                                    <div className="grid grid-cols-2">
                                        <div className="text-xs p-2 text-center border-r bg-gray-50 font-semibold">
                                            셀프체크인 키오스크
                                        </div>
                                        <div className="text-xs p-2 text-center bg-gray-50 font-semibold">셀프백드롭</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Data rows */}
                        {zones.map((zone, zoneIdx) => (
                            <div key={zoneIdx} className="grid grid-cols-[100px_repeat(10,1fr)] border-b hover:bg-gray-50">
                                <div className="p-4 font-semibold border-r flex items-center justify-center bg-gray-50">
                                    {zone.number}
                                </div>
                                {times.map((time, timeIdx) => {
                                    const highlightClass = getHighlightClass(zoneIdx, timeIdx)
                                    const isKiosk = zone.type === "셀프체크인 키오스크"
                                    return (
                                        <div key={time} className="border-r last:border-r-0">
                                            <div className="grid grid-cols-2 h-full min-h-25">
                                                <div
                                                    className={`p-2 border-r text-xs ${
                                                        isKiosk && timeIdx % 2 === 0 ? highlightClass : ""
                                                    }`}
                                                >
                                                    <div className="space-y-1 text-[11px] leading-tight">
                                                        <div>처리 여객 : 00명</div>
                                                        <div>처리 시간 : 000초</div>
                                                        <div>대기 여객 : 00명</div>
                                                        <div>대기 시간 : 000초</div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`p-2 text-xs ${
                                                        !isKiosk && timeIdx % 2 === 0 ? highlightClass : ""
                                                    }`}
                                                >
                                                    <div className="space-y-1 text-[11px] leading-tight">
                                                        <div>처리 여객 : 00명</div>
                                                        <div>처리 시간 : 000초</div>
                                                        <div>대기 여객 : 00명</div>
                                                        <div>대기 시간 : 000초</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 p-4 border-t bg-gray-50">
                    <button className="p-2 hover:bg-gray-200 rounded">◀</button>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-1 rounded ${
                                page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="p-2 hover:bg-gray-200 rounded">▶</button>
                </div>
            </Card>
        </div>
    )
}

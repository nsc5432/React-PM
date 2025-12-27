"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DetailedGridView() {
    const times = ["04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00"]
    const counters = [
        { id: "13 (OZ)", airline: "OZ" },
        { id: "17 (OZ)", airline: "OZ" },
        { id: "1 (OZ)", airline: "OZ" },
        { id: "5 (OZ)", airline: "OZ" },
        { id: "4 (OZ)", airline: "OZ" },
        { id: "13 (OZ)", airline: "OZ" },
    ]

    return (
        <div className="p-6">
            <Card className="p-0 overflow-hidden">
                <ScrollArea className="w-full">
                    <div className="min-w-[1400px]">
                        {/* Header */}
                        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b bg-muted/30">
                            <div className="p-3 font-medium border-r flex items-center justify-center">번호</div>
                            {times.map((time) => (
                                <div key={time} className="border-r last:border-r-0">
                                    <div className="text-center font-medium p-2 border-b">{time}</div>
                                    <div className="grid grid-cols-2">
                                        <div className="text-xs text-muted-foreground p-2 text-center border-r">좌측</div>
                                        <div className="text-xs text-muted-foreground p-2 text-center">우측</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Data rows */}
                        {counters.map((counter, idx) => (
                            <div key={idx} className="grid grid-cols-[100px_repeat(7,1fr)] border-b hover:bg-muted/10">
                                <div className="p-3 font-medium border-r flex items-center justify-center bg-muted/20">
                                    {counter.id}
                                </div>
                                {times.map((time, timeIdx) => {
                                    const isHighlighted = idx === 3 && timeIdx >= 2 && timeIdx <= 4
                                    return (
                                        <div key={time} className="border-r last:border-r-0">
                                            <div className="grid grid-cols-2 h-full">
                                                <div className={`p-2 border-r text-xs ${isHighlighted ? "bg-warning/20" : ""}`}>
                                                    <div className="space-y-0.5 text-[10px] leading-tight">
                                                        <div>처리 여객 : 00명</div>
                                                        <div>처리 시간 : 000초</div>
                                                        <div>대기 여객 : 00명</div>
                                                        <div>대기 시간 : 000초</div>
                                                    </div>
                                                </div>
                                                <div className={`p-2 text-xs ${isHighlighted ? "bg-warning/20" : ""}`}>
                                                    <div className="space-y-0.5 text-[10px] leading-tight">
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
            </Card>
        </div>
    )
}

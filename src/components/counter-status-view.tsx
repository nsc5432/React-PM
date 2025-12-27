import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCounterStatus } from "@/hooks/useCounterStatus"
import { Users, Clock } from "lucide-react"

export function CounterStatusView() {
    const { data: counterStatusData, loading } = useCounterStatus()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "busy":
            case "closed":
                return "bg-destructive text-destructive-foreground"
            case "warning":
                return "bg-warning text-warning-foreground"
            default:
                return "bg-card text-card-foreground border"
        }
    }

    if (loading) {
        return <div className="p-6">Loading...</div>
    }

    //   const airlines = counterStatusData.map((c) => c.airline).filter((v, i, a) => a.indexOf(v) === i)

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">체크인카운터 N</h2>

            <Card className="p-6">
                {/* Airline row */}
                <div className="grid grid-cols-19 gap-1 mb-2">
                    <div className="font-medium text-sm flex items-center justify-center">항공사</div>
                    {counterStatusData.map((counter) => (
                        <Popover key={counter.counter}>
                            <PopoverTrigger asChild>
                                <button
                                    className={`h-16 text-sm font-medium rounded transition-all hover:opacity-80 ${getStatusColor(
                                        counter.status,
                                    )}`}
                                >
                                    {counter.airline}
                                </button>
                            </PopoverTrigger>
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
                                            <div className="text-2xl font-bold text-destructive">{counter.waitPeople}명</div>
                                            <div className="text-xs text-muted-foreground">대기인원</div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                                                <Clock className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                            <div className="text-2xl font-bold">{counter.waitTime}분</div>
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

                                    <div className="bg-muted/50 p-3 rounded text-sm">
                                        <p className="text-muted-foreground mb-1">혼잡도 매출</p>
                                        <p className="font-mono">111,234,567,890원</p>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span>예상시간 증감 3개</span>
                                        <span className="text-primary">▲ 2% vs 2023</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>

                {/* Counter numbers row */}
                <div className="grid grid-cols-19 gap-1 mb-2">
                    <div className="font-medium text-sm flex items-center justify-center">부스</div>
                    {counterStatusData.map((counter) => (
                        <div
                            key={counter.counter}
                            className="h-12 flex items-center justify-center text-sm font-medium border rounded"
                        >
                            {counter.counter}
                        </div>
                    ))}
                </div>

                {/* Status row */}
                <div className="grid grid-cols-19 gap-1">
                    <div className="font-medium text-sm flex items-center justify-center">항공사</div>
                    {counterStatusData.map((counter) => (
                        <div
                            key={`status-${counter.counter}`}
                            className={`h-12 flex items-center justify-center text-sm font-medium rounded ${getStatusColor(
                                counter.status,
                            )}`}
                        >
                            {counter.airline}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

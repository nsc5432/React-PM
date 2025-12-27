import { Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

export function DashboardHeader() {
    const [date, setDate] = useState<Date | undefined>(new Date(2024, 9, 18))

    return (
        <div className="bg-gradient-to-r from-teal-500 to-emerald-400 text-primary-foreground px-6 py-4 mt-2">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-lg font-semibold">기준 시뮬레이션 결과 체크인카운터 혼잡도 조회</h1>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">기준일자</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[140px] justify-start text-left font-normal bg-primary-foreground text-foreground"
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {date ? format(date, "yyyy-MM-dd") : "날짜 선택"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm">터미널선택</span>
                        <Select defaultValue="t1">
                            <SelectTrigger className="w-[120px] bg-primary-foreground text-foreground">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="t1">T1 터미널</SelectItem>
                                <SelectItem value="t2">T2 터미널</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Select defaultValue="n19">
                        <SelectTrigger className="w-[100px] bg-primary-foreground text-foreground">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="n19">N 19</SelectItem>
                            <SelectItem value="n20">N 20</SelectItem>
                            <SelectItem value="n21">N 21</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button size="sm" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                        <Search className="h-4 w-4 mr-2" />
                        검색
                    </Button>
                </div>
            </div>
        </div>
    )
}

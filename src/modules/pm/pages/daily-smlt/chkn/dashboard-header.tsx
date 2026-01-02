import { Calendar, Search, MapPin, Table2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

type ViewMode = "map" | "table" | "chart"

interface DashboardHeaderProps {
    viewMode?: ViewMode
    onViewModeChange?: (mode: ViewMode) => void
}

export function DashboardHeader({ viewMode = "map", onViewModeChange }: DashboardHeaderProps) {
    const [date, setDate] = useState<Date | undefined>(new Date(2024, 9, 18))

    return (
        <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 shadow-lg mt-2">
            <div className="px-8 py-6">
                <div className="flex items-start justify-between gap-6">
                    {/* Title Section */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                            체크인 카운터 혼잡도 조회
                        </h1>
                        <p className="text-white/80 text-sm mt-1 font-medium">
                            기준 시뮬레이션 결과
                        </p>
                    </div>

                    {/* Controls Section */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                            <span className="text-sm font-medium text-white/90">기준일자</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-[150px] justify-start text-left font-medium bg-white text-gray-700 hover:bg-white/95 border-0 shadow-sm"
                                    >
                                        <Calendar className="mr-2 h-4 w-4 text-teal-600" />
                                        {date ? format(date, "yyyy-MM-dd") : "날짜 선택"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                            <span className="text-sm font-medium text-white/90">터미널</span>
                            <Select defaultValue="t1">
                                <SelectTrigger className="w-[130px] bg-white text-gray-700 border-0 font-medium shadow-sm hover:bg-white/95">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="t1">T1 터미널</SelectItem>
                                    <SelectItem value="t2">T2 터미널</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                            <span className="text-sm font-medium text-white/90">구역</span>
                            <Select defaultValue="n19">
                                <SelectTrigger className="w-[100px] bg-white text-gray-700 border-0 font-medium shadow-sm hover:bg-white/95">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="n19">N 19</SelectItem>
                                    <SelectItem value="n20">N 20</SelectItem>
                                    <SelectItem value="n21">N 21</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            size="default"
                            className="bg-white text-teal-700 hover:bg-white/95 font-semibold shadow-md px-6 py-2.5 h-auto"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            검색
                        </Button>
                    </div>
                </div>

                {/* View Mode Toggle Buttons */}
                {onViewModeChange && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 -mx-8 -mb-6 mt-5 px-8 py-4 rounded-b-lg">
                        <div className="flex justify-end gap-3">
                            <Button
                                size="sm"
                                variant={viewMode === "map" ? "default" : "outline"}
                                onClick={() => onViewModeChange("map")}
                                className={
                                    viewMode === "map"
                                        ? "bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-md px-5 border-0"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 font-medium px-5 shadow-sm"
                                }
                            >
                                <MapPin className="h-4 w-4 mr-1.5" />
                                맵보기
                            </Button>
                            <Button
                                size="sm"
                                variant={viewMode === "table" ? "default" : "outline"}
                                onClick={() => onViewModeChange("table")}
                                className={
                                    viewMode === "table"
                                        ? "bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-md px-5 border-0"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 font-medium px-5 shadow-sm"
                                }
                            >
                                <Table2 className="h-4 w-4 mr-1.5" />
                                표보기
                            </Button>
                            <Button
                                size="sm"
                                variant={viewMode === "chart" ? "default" : "outline"}
                                onClick={() => onViewModeChange("chart")}
                                className={
                                    viewMode === "chart"
                                        ? "bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-md px-5 border-0"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 font-medium px-5 shadow-sm"
                                }
                            >
                                <BarChart3 className="h-4 w-4 mr-1.5" />
                                차트보기
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

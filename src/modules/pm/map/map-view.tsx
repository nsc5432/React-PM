import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Users, Clock } from "lucide-react"
import { getFacilityDataByTime, getSecurityDataByTime, getCheckInCounterDataByTime } from "@/lib/mock-data"
import { TimelinePlayer } from "@/modules/pm/timeline-player"
import { useState } from "react"

export function MapView() {
    // 시간 상태 관리 (10:00부터 시작)
    const [currentTime, setCurrentTime] = useState(600)

    // 현재 시간에 해당하는 시설 혼잡도 데이터 가져오기
    const facilityStatusData = getFacilityDataByTime(currentTime)
    const securityStatusData = getSecurityDataByTime(currentTime)
    const checkInCounterData = getCheckInCounterDataByTime(currentTime)

    const islands = ["N", "M", "L", "K", "E", "F", "G", "H", "I", "J", "K", "C", "B", "A"]
    const departureNumbers = ["6", "5", "4", "3", "2", "1"] // 출국장
    const securityNumbers = ["6", "5", "4", "3", "2", "1"] // 보안검색대

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

                <div className="relative bg-muted/20 rounded-lg p-8" style={{ minHeight: "600px" }}>
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

                    {/* 보안검색대 구역 - 상단 */}
                    <div className="absolute top-8 left-0 right-0 px-8">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-foreground">보안검색대</span>
                        </div>
                        <div className="flex justify-around items-center">
                            {securityNumbers.map((num, idx) => {
                                const security = securityStatusData[idx]
                                return (
                                    <Popover key={`security-${num}`}>
                                        <PopoverTrigger asChild>
                                            <button
                                                className={`w-14 h-14 rounded-lg font-bold text-xl transition-all hover:scale-110 ${security?.status === "busy"
                                                    ? "bg-red-300 text-red-900"
                                                    : security?.status === "warning"
                                                        ? "bg-yellow-300 text-yellow-900"
                                                        : "bg-green-200 text-green-800"
                                                    }`}
                                            >
                                                {num}
                                            </button>
                                        </PopoverTrigger>
                                        {security && (
                                            <PopoverContent className="w-80">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold">보안검색대 {num}번 혼잡 현황</h3>
                                                        <button className="text-muted-foreground hover:text-foreground">✕</button>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 text-center">
                                                        <div className="space-y-2">
                                                            <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                                                                <Users className="h-6 w-6 text-destructive" />
                                                            </div>
                                                            <div className="text-2xl font-bold text-destructive">{security.waitPeople}명</div>
                                                            <div className="text-xs text-muted-foreground">대기인원</div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                                                                <Clock className="h-6 w-6 text-muted-foreground" />
                                                            </div>
                                                            <div className="text-2xl font-bold">{security.waitTime}분</div>
                                                            <div className="text-xs text-muted-foreground">대기시간</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        )}
                                    </Popover>
                                )
                            })}
                        </div>
                    </div>

                    {/* 출국장 구역 - 중간 */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-8">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-foreground">출국장</span>
                        </div>
                        <div className="flex justify-around items-center">
                            {departureNumbers.map((num, idx) => {
                                const facility = facilityStatusData[idx]
                                return (
                                    <Popover key={`departure-${num}`}>
                                        <PopoverTrigger asChild>
                                            <button
                                                className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all hover:scale-110 ${facility?.status === "busy"
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
                                                        <h3 className="font-semibold">출국장 {num}번 혼잡 현황</h3>
                                                        <button className="text-muted-foreground hover:text-foreground">✕</button>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 text-center">
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
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        )}
                                    </Popover>
                                )
                            })}
                        </div>
                    </div>

                    {/* 체크인카운터 구역 - 하단 */}
                    <div className="absolute bottom-8 left-0 right-0 px-8">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-foreground">체크인카운터</span>
                        </div>
                        <div className="flex justify-around items-center">
                            {islands.map((letter, idx) => {
                                const counter = checkInCounterData[idx]
                                return (
                                    <Popover key={`counter-${letter}-${idx}`}>
                                        <PopoverTrigger asChild>
                                            <button
                                                className={`w-12 h-12 rounded-lg font-bold text-lg transition-all hover:scale-110 ${counter?.status === "busy"
                                                    ? "bg-orange-300 text-orange-900"
                                                    : counter?.status === "warning"
                                                        ? "bg-amber-300 text-amber-900"
                                                        : "bg-emerald-200 text-emerald-800"
                                                    }`}
                                            >
                                                {letter}
                                            </button>
                                        </PopoverTrigger>
                                        {counter && (
                                            <PopoverContent className="w-[600px] max-h-[700px] overflow-y-auto">
                                                <div className="space-y-4">
                                                    {/* 헤더 */}
                                                    <div className="flex items-center justify-between border-b pb-3">
                                                        <h3 className="font-bold text-lg">
                                                            {letter}아일랜드 {counter.facilityCode ? `(${counter.facilityCode})` : ''}
                                                        </h3>
                                                        <button className="text-muted-foreground hover:text-foreground text-xl">✕</button>
                                                    </div>

                                                    {/* 상단 3개 시설 카드 */}
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {/* 체크인카운터 */}
                                                        <div className="border rounded-lg p-3 text-center space-y-2">
                                                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                                                                <div className="text-3xl">✈️</div>
                                                            </div>
                                                            <div className="text-sm font-medium">체크인카운터</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                (처리율 : {counter.checkInRate || 90}%)
                                                            </div>
                                                        </div>

                                                        {/* 셀프체크인 */}
                                                        <div className="border rounded-lg p-3 text-center space-y-2">
                                                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                                                                <div className="text-3xl">🖥️</div>
                                                            </div>
                                                            <div className="text-sm font-medium">셀프체크인</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                (처리율 : {counter.selfCheckInRate || 100}%)
                                                            </div>
                                                        </div>

                                                        {/* 상업시설 */}
                                                        <div className="border rounded-lg p-3 text-center space-y-2">
                                                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                                                                <div className="text-3xl">🏪</div>
                                                            </div>
                                                            <div className="text-sm font-medium">상업시설</div>
                                                            <div className="text-xs text-muted-foreground">&nbsp;</div>
                                                        </div>
                                                    </div>

                                                    {/* 시설 혼잡 현황 */}
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-base">시설 혼잡 현황</h4>
                                                            {counter.status === "busy" && (
                                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">혼잡</span>
                                                            )}
                                                        </div>

                                                        <div className="grid grid-cols-4 gap-3 text-center">
                                                            {/* 대기인원 */}
                                                            <div className="space-y-2">
                                                                <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                                                                    <Users className="h-6 w-6 text-purple-600" />
                                                                </div>
                                                                <div className="text-2xl font-bold text-red-600">{counter.waitPeople}명</div>
                                                                <div className="text-xs text-muted-foreground">대기인원</div>
                                                            </div>

                                                            {/* 대기시간 */}
                                                            <div className="space-y-2">
                                                                <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                                                                    <Clock className="h-6 w-6 text-gray-600" />
                                                                </div>
                                                                <div className="text-2xl font-bold text-red-600">{counter.waitTime}분</div>
                                                                <div className="text-xs text-muted-foreground">대기시간</div>
                                                            </div>

                                                            {/* 처리인원 */}
                                                            <div className="space-y-2">
                                                                <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                                                                    <Users className="h-6 w-6 text-purple-600" />
                                                                </div>
                                                                <div className="text-2xl font-bold">{counter.processedPeople || 0}명</div>
                                                                <div className="text-xs text-muted-foreground">처리인원</div>
                                                            </div>

                                                            {/* 처리시간 */}
                                                            <div className="space-y-2">
                                                                <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                                                                    <Clock className="h-6 w-6 text-gray-600" />
                                                                </div>
                                                                <div className="text-2xl font-bold">{counter.processTime || 0}분</div>
                                                                <div className="text-xs text-muted-foreground">처리시간</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 재정 정보 */}
                                                    <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                                            <div className="flex items-center justify-between border-r pr-3">
                                                                <span className="text-blue-600 border border-blue-600 rounded px-2 py-1 text-xs">총 매출</span>
                                                                <span className="font-medium">
                                                                    {counter.totalRevenue?.toLocaleString() || counter.revenue.toLocaleString()}원
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between pl-3">
                                                                <span className="text-blue-600 border border-blue-600 rounded px-2 py-1 text-xs">상업시설 수</span>
                                                                <span className="font-medium">{counter.commercialCount || 0}개</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between text-sm border-t pt-3">
                                                            <span className="text-blue-600 border border-blue-600 rounded px-2 py-1 text-xs">인원대비 매출</span>
                                                            <span className="font-medium">
                                                                {counter.revenuePerPerson?.toLocaleString() || counter.revenue.toLocaleString()}원
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between text-sm border-t pt-3">
                                                            <span className="text-blue-600 border border-blue-600 rounded px-2 py-1 text-xs">매출 인원 증감</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">{counter.peopleChange || 0}명</span>
                                                                <span className="text-blue-600 flex items-center">
                                                                    ▲ {counter.changeRate || 0}% vs 2023
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 상세보기 버튼 */}
                                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                                        <span>+</span>
                                                        <span>상세보기</span>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        )}
                                    </Popover>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* TimelinePlayer - MapView 전용 */}
            <TimelinePlayer time={currentTime} onTimeChange={setCurrentTime} />
        </div>
    )
}

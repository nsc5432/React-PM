import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Users, Clock } from 'lucide-react';
import { TimelinePlayer } from '@/modules/pm/shared/components/timeline-player';
import { useState } from 'react';
import { getCheckInCounterDataByTime } from '@/lib/mock-data';
import { ViewModeToggle, type ViewMode } from '../view-mode-toggle';

interface CounterData {
    counter: number;
    airline: string;
    status: string;
    waitPeople: number;
    waitTime: number;
    processedPeople: number;
}

interface CounterRowProps {
    label: string;
    data: CounterData[];
    getStatusColor: (status: string) => string;
}

function CounterRow({ label, data, getStatusColor }: CounterRowProps) {
    return (
        <div
            className="grid gap-1 mb-2 w-full"
            style={{ gridTemplateColumns: `auto repeat(18, 1fr)` }}
        >
            <div className="font-medium text-sm flex items-center justify-center px-2">{label}</div>
            {data.map((counter) => (
                <Popover key={counter.counter}>
                    <PopoverTrigger asChild>
                        <button
                            className={`h-12 text-sm font-medium rounded transition-all hover:opacity-80 ${getStatusColor(
                                counter.status,
                            )}`}
                        >
                            {counter.airline}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="space-y-3">
                            <h3 className="font-bold text-center border-b pb-2">
                                체크인카운터 N{counter.counter} 시설 혼잡 현황
                            </h3>

                            <div className="grid grid-cols-4 gap-4 text-center">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                                        <Users className="h-6 w-6 text-destructive" />
                                    </div>
                                    <div className="text-2xl font-bold text-destructive">
                                        {counter.waitPeople}명
                                    </div>
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
                                    <div className="text-2xl font-bold">
                                        {counter.processedPeople}명
                                    </div>
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
                </Popover>
            ))}
        </div>
    );
}

interface MapViewProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

export function MapView({ viewMode, onViewModeChange }: MapViewProps) {
    // 시간 상태 관리 (10:00부터 시작)
    const [currentTime, setCurrentTime] = useState(600);

    // 현재 시간에 해당하는 체크인카운터 혼잡도 데이터 가져오기
    const checkInCounterData = getCheckInCounterDataByTime(currentTime);

    // 기존 형식으로 변환 (14개 아일랜드 데이터를 18개 카운터로 패딩)
    const counterStatusData = Array.from({ length: 18 }, (_, index) => {
        const island = checkInCounterData[index];
        return {
            counter: index + 1,
            airline: 'OZ',
            status: island?.status ?? 'normal',
            waitPeople: island?.waitPeople ?? 10 + index,
            waitTime: island?.waitTime ?? 5,
            processedPeople: island?.processedPeople ?? 30,
        };
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'busy':
            case 'closed':
                return 'bg-destructive text-destructive-foreground';
            case 'warning':
                return 'bg-warning text-warning-foreground';
            default:
                return 'bg-card text-card-foreground border';
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-6">
                <Card className="p-8">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-orange-100 border-l-4 border-orange-500 px-4 py-2 rounded">
                            <div className="flex items-center">
                                <span className="text-orange-800 font-semibold">⚠ 혼잡</span>
                                <span className="ml-4 text-orange-700">N 1~7 (3개 부스 OPEN)</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold -ml-20">체크인카운터 N</h2>

                        <ViewModeToggle
                            viewMode={viewMode}
                            onViewModeChange={onViewModeChange}
                            colorScheme="orange"
                            inline
                        />
                    </div>

                    {/* Map Layout Grid */}
                    <div className="relative bg-gray-50 px-4 py-8 rounded-lg border-2 border-gray-200 min-h-125">
                        {/* Counter Grid Content */}
                        <div className="mt-8 ml-8 mr-4 space-y-2">
                            {/* Airline row with Popover */}
                            <CounterRow
                                label="항공사"
                                data={counterStatusData}
                                getStatusColor={getStatusColor}
                            />

                            {/* Counter numbers row */}
                            <div
                                className="grid gap-1 mb-2 w-full"
                                style={{ gridTemplateColumns: `auto repeat(18, 1fr)` }}
                            >
                                <div className="font-medium text-sm flex items-center justify-center px-3.5">
                                    <span>부스</span>
                                </div>
                                {Array.from({ length: 18 }, (_, i) => (
                                    <div
                                        key={i + 1}
                                        className="h-12 flex items-center justify-center text-sm font-medium border rounded bg-white"
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>

                            {/* Status row */}
                            <CounterRow
                                label="항공사"
                                data={counterStatusData}
                                getStatusColor={getStatusColor}
                            />
                        </div>
                    </div>
                </Card>
            </div>

            {/* TimelinePlayer */}
            <TimelinePlayer time={currentTime} onTimeChange={setCurrentTime} />
        </div>
    );
}

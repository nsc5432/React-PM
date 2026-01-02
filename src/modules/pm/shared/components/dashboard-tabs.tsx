import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardTabsProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function DashboardTabs({ value, onValueChange }: DashboardTabsProps) {
    return (
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
            <TabsList className="w-full justify-start h-12 bg-muted/30 rounded-none border-b">
                <TabsTrigger value="summary" className="px-6">
                    요약보기
                </TabsTrigger>
                <TabsTrigger value="map" className="px-6">
                    맵형태보기
                </TabsTrigger>
                <TabsTrigger value="counter" className="px-6">
                    체크인카운터
                </TabsTrigger>
                <TabsTrigger value="self-checkin" className="px-6">
                    셀프체크인/백드롭
                </TabsTrigger>
                <TabsTrigger value="departure" className="px-6">
                    출국장
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

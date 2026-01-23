import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Map, Monitor, Smartphone, DoorOpen } from 'lucide-react';

interface DashboardTabsProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function DashboardTabs({ value, onValueChange }: DashboardTabsProps) {
    return (
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
            <TabsList className="w-full justify-start h-14 bg-background/80 backdrop-blur-md rounded-none border-b border-border/50 px-4 gap-1">
                <TabsTrigger value="summary" className="px-5 py-2.5 data-state-active:bg-primary data-state-active:text-primary-foreground data-state-active:shadow-md data-state-active:shadow-primary/20">
                    <LayoutDashboard className="size-4" />
                    요약보기
                </TabsTrigger>
                <TabsTrigger value="map" className="px-5 py-2.5 data-state-active:bg-primary data-state-active:text-primary-foreground data-state-active:shadow-md data-state-active:shadow-primary/20">
                    <Map className="size-4" />
                    맵형태보기
                </TabsTrigger>
                <TabsTrigger value="counter" className="px-5 py-2.5 data-state-active:bg-primary data-state-active:text-primary-foreground data-state-active:shadow-md data-state-active:shadow-primary/20">
                    <Monitor className="size-4" />
                    체크인카운터
                </TabsTrigger>
                <TabsTrigger value="self-checkin" className="px-5 py-2.5 data-state-active:bg-primary data-state-active:text-primary-foreground data-state-active:shadow-md data-state-active:shadow-primary/20">
                    <Smartphone className="size-4" />
                    셀프체크인/백드롭
                </TabsTrigger>
                <TabsTrigger value="departure" className="px-5 py-2.5 data-state-active:bg-primary data-state-active:text-primary-foreground data-state-active:shadow-md data-state-active:shadow-primary/20">
                    <DoorOpen className="size-4" />
                    출국장
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

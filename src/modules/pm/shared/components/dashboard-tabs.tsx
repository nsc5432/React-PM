import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Map } from 'lucide-react';

interface DashboardTabsProps {
    value: string;
    onValueChange: (value: string) => void;
}

interface TabIconProps {
    src: string;
    activeSrc: string;
    isActive: boolean;
    alt: string;
}

function TabIcon({ src, activeSrc, isActive, alt }: TabIconProps) {
    return (
        <img
            src={isActive ? activeSrc : src}
            alt={alt}
            className="size-5"
        />
    );
}

export function DashboardTabs({ value, onValueChange }: DashboardTabsProps) {
    return (
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
            <TabsList className="w-full justify-start h-14 bg-background/80 backdrop-blur-md rounded-none border-b border-border/50 px-4 gap-1">
                <TabsTrigger value="summary" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <LayoutDashboard className="size-4" />
                    요약보기
                </TabsTrigger>
                <TabsTrigger value="map" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <Map className="size-4" />
                    맵형태보기
                </TabsTrigger>
                <TabsTrigger value="counter" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src="/svg/counter_con.svg"
                        activeSrc="/svg/counter_con_ov.svg"
                        isActive={value === 'counter'}
                        alt="체크인카운터"
                    />
                    체크인카운터
                </TabsTrigger>
                <TabsTrigger value="self-checkin" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src="/svg/police.svg"
                        activeSrc="/svg/police_on.svg"
                        isActive={value === 'self-checkin'}
                        alt="셀프체크인/백드롭"
                    />
                    셀프체크인/백드롭
                </TabsTrigger>
                <TabsTrigger value="departure" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src="/svg/Departure.svg"
                        activeSrc="/svg/Departure_on.svg"
                        isActive={value === 'departure'}
                        alt="출국장"
                    />
                    출국장
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

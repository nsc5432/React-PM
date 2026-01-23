import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TerminalPassengerIcon from '@/assets/svg/terminal-passenger-icon.svg';
import TerminalPassengerIconOn from '@/assets/svg/terminal-passenger-on-icon.svg';
import MapIcon from '@/assets/svg/map-icon.svg';
import MapOnIcon from '@/assets/svg/map-on-icon.svg';
import CounterConIcon from '@/assets/svg/counter-con-icon.svg';
import CounterConOnIcon from '@/assets/svg/counter-con-on-icon.svg';
import SelfCheckinIcon from '@/assets/svg/self-checkin-icon.svg';
import SelfCheckinOnIcon from '@/assets/svg/self-checkin-on-icon.svg';
import DepartureIcon from '@/assets/svg/departure-icon.svg';
import DepartureOnIcon from '@/assets/svg/departure-on-icon.svg';


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
                    <TabIcon
                        src={TerminalPassengerIcon}
                        activeSrc={TerminalPassengerIconOn}
                        isActive={value === 'summary'}
                        alt="요약보기"
                    />
                    요약보기
                </TabsTrigger>
                <TabsTrigger value="map" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src={MapIcon}
                        activeSrc={MapOnIcon}
                        isActive={value === 'map'}
                        alt="맵형태보기"
                    />
                    맵형태보기
                </TabsTrigger>
                <TabsTrigger value="counter" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src={CounterConIcon}
                        activeSrc={CounterConOnIcon}
                        isActive={value === 'counter'}
                        alt="체크인카운터"
                    />
                    체크인카운터
                </TabsTrigger>
                <TabsTrigger value="self-checkin" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src={SelfCheckinIcon}
                        activeSrc={SelfCheckinOnIcon}
                        isActive={value === 'self-checkin'}
                        alt="셀프체크인/백드롭"
                    />
                    셀프체크인/백드롭
                </TabsTrigger>
                <TabsTrigger value="departure" className="px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20">
                    <TabIcon
                        src={DepartureIcon}
                        activeSrc={DepartureOnIcon}
                        isActive={value === 'departure'}
                        alt="출국장"
                    />
                    출국장
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

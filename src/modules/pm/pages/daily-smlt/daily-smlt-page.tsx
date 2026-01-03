import { useState } from 'react';
import { DashboardHeader } from '@/modules/pm/pages/daily-smlt/chkn/dashboard-header';
import { DashboardTabs } from '@/modules/pm/shared/components/dashboard-tabs';
import { MapView } from '@/modules/pm/pages/daily-smlt/map/map-view';
import { CounterStatusView } from '@/modules/pm/pages/daily-smlt/map/counter-status-view';
import { DetailedGridView } from '@/modules/pm/pages/daily-smlt/chkn/detailed-grid-view';
import { ChartView } from '@/modules/pm/pages/daily-smlt/chkn/chart-view';
import { DashboardHeader as SlfChknDashboardHeader } from '@/modules/pm/pages/daily-smlt/slfchkn/dashboard-header';
import { MapView as SlfChknMapView } from '@/modules/pm/pages/daily-smlt/slfchkn/map-view';
import { TableView as SlfChknTableView } from '@/modules/pm/pages/daily-smlt/slfchkn/table-view';
import { ChartView as SlfChknChartView } from '@/modules/pm/pages/daily-smlt/slfchkn/chart-view';
import { DashboardHeader as DepDashboardHeader } from '@/modules/pm/pages/daily-smlt/dep/dashboard-header';
import { MapView as DepMapView } from '@/modules/pm/pages/daily-smlt/dep/map-view';
import { TableView as DepTableView } from '@/modules/pm/pages/daily-smlt/dep/table-view';
import { ChartView as DepChartView } from '@/modules/pm/pages/daily-smlt/dep/chart-view';
import SmltSmryRslt from './smlt-smry-rslt';

type ViewMode = 'map' | 'table' | 'chart';
export type SimulationType = 'daily' | 'user';

interface AirportDashboardProps {
    simulationType?: SimulationType;
    simulationKey?: string;
}

export default function AirportDashboard({ simulationType = 'daily' }: AirportDashboardProps) {
    // simulationKey는 특정 시뮬레이션 결과를 조회할 때 사용됩니다
    // 추후 API 연동 시 이 값을 사용하여 해당 시뮬레이션의 결과를 불러올 수 있습니다
    const [activeTab, setActiveTab] = useState('summary');
    const [viewMode, setViewMode] = useState<ViewMode>('map');
    const [slfChknViewMode, setSlfChknViewMode] = useState<ViewMode>('map');
    const [depViewMode, setDepViewMode] = useState<ViewMode>('map');

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <DashboardTabs value={activeTab} onValueChange={setActiveTab} />
            </div>
            <main className="flex-1 overflow-auto">
                {activeTab === 'summary' && <SmltSmryRslt simulationType={simulationType} />}
                {activeTab === 'map' && <MapView />}
                {activeTab === 'counter' && (
                    <div className="flex flex-col h-full">
                        <DashboardHeader viewMode={viewMode} onViewModeChange={setViewMode} />
                        {viewMode === 'map' && <CounterStatusView />}
                        {viewMode === 'table' && <DetailedGridView />}
                        {viewMode === 'chart' && <ChartView />}
                    </div>
                )}
                {activeTab === 'self-checkin' && (
                    <div className="flex flex-col h-full">
                        <SlfChknDashboardHeader
                            viewMode={slfChknViewMode}
                            onViewModeChange={setSlfChknViewMode}
                        />
                        {slfChknViewMode === 'map' && <SlfChknMapView />}
                        {slfChknViewMode === 'table' && <SlfChknTableView />}
                        {slfChknViewMode === 'chart' && <SlfChknChartView />}
                    </div>
                )}
                {activeTab === 'departure' && (
                    <div className="flex flex-col h-full">
                        <DepDashboardHeader
                            viewMode={depViewMode}
                            onViewModeChange={setDepViewMode}
                        />
                        {depViewMode === 'map' && <DepMapView />}
                        {depViewMode === 'table' && <DepTableView />}
                        {depViewMode === 'chart' && <DepChartView />}
                    </div>
                )}
            </main>
        </div>
    );
}

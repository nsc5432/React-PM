import { useState } from 'react';
import { DashboardHeader as ChknDashboardHeader } from '@/modules/pm/shared/components/dashboard/chkn/dashboard-header';
import { DashboardTabs } from '@/modules/pm/shared/components/dashboard/dashboard-tabs';
import { MapView } from '@/modules/pm/shared/components/dashboard/map/map-view';
import { MapView as ChknMapView } from '@/modules/pm/shared/components/dashboard/chkn/map-view';
import { TableView as ChknTableView } from '@/modules/pm/shared/components/dashboard/chkn/table-view';
import { ChartView } from '@/modules/pm/shared/components/dashboard/chkn/chart-view';
import { DashboardHeader as SlfChknDashboardHeader } from '@/modules/pm/shared/components/dashboard/slfchkn/dashboard-header';
import { MapView as SlfChknMapView } from '@/modules/pm/shared/components/dashboard/slfchkn/map-view';
import { TableView as SlfChknTableView } from '@/modules/pm/shared/components/dashboard/slfchkn/table-view';
import { ChartView as SlfChknChartView } from '@/modules/pm/shared/components/dashboard/slfchkn/chart-view';
import { DashboardHeader as DepDashboardHeader } from '@/modules/pm/shared/components/dashboard/dep/dashboard-header';
import { MapView as DepMapView } from '@/modules/pm/shared/components/dashboard/dep/map-view';
import { TableView as DepTableView } from '@/modules/pm/shared/components/dashboard/dep/table-view';
import { ChartView as DepChartView } from '@/modules/pm/shared/components/dashboard/dep/chart-view';
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
        <div className="h-screen flex flex-col">
            <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-background border-b border-border/50">
                <DashboardTabs value={activeTab} onValueChange={setActiveTab} />
            </div>
            <main className="flex-1 overflow-y-auto">
                {activeTab === 'summary' && <SmltSmryRslt simulationType={simulationType} />}
                {activeTab === 'map' && <MapView />}
                {activeTab === 'counter' && (
                    <div className="flex flex-col h-full">
                        <ChknDashboardHeader />
                        {viewMode === 'map' && <ChknMapView viewMode={viewMode} onViewModeChange={setViewMode} />}
                        {viewMode === 'table' && <ChknTableView viewMode={viewMode} onViewModeChange={setViewMode} />}
                        {viewMode === 'chart' && <ChartView viewMode={viewMode} onViewModeChange={setViewMode} />}
                    </div>
                )}
                {activeTab === 'self-checkin' && (
                    <div className="flex flex-col h-full">
                        <SlfChknDashboardHeader />
                        {slfChknViewMode === 'map' && <SlfChknMapView viewMode={slfChknViewMode} onViewModeChange={setSlfChknViewMode} />}
                        {slfChknViewMode === 'table' && <SlfChknTableView viewMode={slfChknViewMode} onViewModeChange={setSlfChknViewMode} />}
                        {slfChknViewMode === 'chart' && <SlfChknChartView viewMode={slfChknViewMode} onViewModeChange={setSlfChknViewMode} />}
                    </div>
                )}
                {activeTab === 'departure' && (
                    <div className="flex flex-col h-full">
                        <DepDashboardHeader />
                        {depViewMode === 'map' && <DepMapView viewMode={depViewMode} onViewModeChange={setDepViewMode} />}
                        {depViewMode === 'table' && <DepTableView viewMode={depViewMode} onViewModeChange={setDepViewMode} />}
                        {depViewMode === 'chart' && <DepChartView viewMode={depViewMode} onViewModeChange={setDepViewMode} />}
                    </div>
                )}
            </main>
        </div>
    );
}

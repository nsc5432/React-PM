import { useState } from "react"
import { DashboardHeader } from "@/modules/pm/daily-smlt/chkn/dashboard-header"
import { DashboardTabs } from "@/modules/pm/dashboard-tabs"
import { MapView } from "@/modules/pm/daily-smlt/map/map-view"
import { CounterStatusView } from "@/modules/pm/daily-smlt/map/counter-status-view"
import { DetailedGridView } from "@/modules/pm/daily-smlt/chkn/detailed-grid-view"
import { ChartView } from "@/modules/pm/daily-smlt/chkn/chart-view"
import { DashboardHeader as SlfChknDashboardHeader } from "@/modules/pm/daily-smlt/slfchkn/dashboard-header"
import { MapView as SlfChknMapView } from "@/modules/pm/daily-smlt/slfchkn/map-view"
import { TableView as SlfChknTableView } from "@/modules/pm/daily-smlt/slfchkn/table-view"
import { ChartView as SlfChknChartView } from "@/modules/pm/daily-smlt/slfchkn/chart-view"
import { DashboardHeader as DepDashboardHeader } from "@/modules/pm/daily-smlt/dep/dashboard-header"
import { MapView as DepMapView } from "@/modules/pm/daily-smlt/dep/map-view"
import { TableView as DepTableView } from "@/modules/pm/daily-smlt/dep/table-view"
import { ChartView as DepChartView } from "@/modules/pm/daily-smlt/dep/chart-view"
import SmltSmryRslt from "./smlt-smry-rslt"

type ViewMode = "map" | "table" | "chart"

export default function AirportDashboard() {
    const [activeTab, setActiveTab] = useState("summary")
    const [viewMode, setViewMode] = useState<ViewMode>("map")
    const [slfChknViewMode, setSlfChknViewMode] = useState<ViewMode>("map")
    const [depViewMode, setDepViewMode] = useState<ViewMode>("map")

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardTabs value={activeTab} onValueChange={setActiveTab} />

            <main className="flex-1 overflow-auto">
                {activeTab === "summary" && (
                    <SmltSmryRslt />
                )}
                {activeTab === "map" && <MapView />}
                {activeTab === "counter" && (
                    <div className="flex flex-col h-full">
                        <DashboardHeader viewMode={viewMode} onViewModeChange={setViewMode} />
                        {viewMode === "map" && <CounterStatusView />}
                        {viewMode === "table" && <DetailedGridView />}
                        {viewMode === "chart" && <ChartView />}
                    </div>
                )}
                {activeTab === "self-checkin" && (
                    <div className="flex flex-col h-full">
                        <SlfChknDashboardHeader viewMode={slfChknViewMode} onViewModeChange={setSlfChknViewMode} />
                        {slfChknViewMode === "map" && <SlfChknMapView />}
                        {slfChknViewMode === "table" && <SlfChknTableView />}
                        {slfChknViewMode === "chart" && <SlfChknChartView />}
                    </div>
                )}
                {activeTab === "departure" && (
                    <div className="flex flex-col h-full">
                        <DepDashboardHeader viewMode={depViewMode} onViewModeChange={setDepViewMode} />
                        {depViewMode === "map" && <DepMapView />}
                        {depViewMode === "table" && <DepTableView />}
                        {depViewMode === "chart" && <DepChartView />}
                    </div>
                )}
            </main>
        </div>
    )
}

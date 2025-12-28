import { useState } from "react"
import { DashboardHeader } from "@/components/chkn/dashboard-header"
import { DashboardTabs } from "@/components/dashboard-tabs"
import { MapView } from "@/components/map/map-view"
import { CounterStatusView } from "@/components/map/counter-status-view"
import { DetailedGridView } from "@/components/chkn/detailed-grid-view"
import { ChartView } from "@/components/chkn/chart-view"
import { DashboardHeader as SlfChknDashboardHeader } from "@/components/slfchkn/dashboard-header"
import { MapView as SlfChknMapView } from "@/components/slfchkn/map-view"
import { TableView as SlfChknTableView } from "@/components/slfchkn/table-view"
import { ChartView as SlfChknChartView } from "@/components/slfchkn/chart-view"
import { DashboardHeader as DepDashboardHeader } from "@/components/dep/dashboard-header"
import { MapView as DepMapView } from "@/components/dep/map-view"
import { TableView as DepTableView } from "@/components/dep/table-view"
import { ChartView as DepChartView } from "@/components/dep/chart-view"
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

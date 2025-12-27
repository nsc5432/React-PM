import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardTabs } from "@/components/dashboard-tabs"
import { MapView } from "@/components/map-view"
import { CounterStatusView } from "@/components/counter-status-view"
import { DetailedGridView } from "@/components/detailed-grid-view"
import { ChartView } from "@/components/chart-view"
import SmltSmryRslt from "./smlt-smry-rslt"

export default function AirportDashboard() {
    const [activeTab, setActiveTab] = useState("summary")

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardTabs value={activeTab} onValueChange={setActiveTab} />

            <main className="flex-1 overflow-auto">
                {activeTab === "summary" && (
                    <SmltSmryRslt />
                )}
                {activeTab === "map" && <MapView />}
                {activeTab === "counter" && (
                    <div className="space-y-0">
                        <DashboardHeader />
                        <CounterStatusView />
                        <DetailedGridView />
                        <ChartView />
                    </div>
                )}
                {activeTab === "self-checkin" && (
                    <div className="p-6">
                        <div className="text-center text-muted-foreground py-20">Self Check-in View - Coming Soon</div>
                    </div>
                )}
                {activeTab === "departure" && (
                    <div className="p-6">
                        <div className="text-center text-muted-foreground py-20">Departure View - Coming Soon</div>
                    </div>
                )}
            </main>
        </div>
    )
}

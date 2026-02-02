import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DailySmltPage from './modules/pm/shared/components/dashboard/airport-dashboard';
import UserSmltConfigPage from './modules/pm/pages/user-smlt/user-smlt-config-page';
import UserSmltResultPage from './modules/pm/pages/user-smlt/user-smlt-result-page';
import MonitoringPage from './modules/pm/pages/monitoring/monitoring-page';
import { Lnb } from './components/layout/lnb';
import FacilityConfigPage from './modules/pm/pages/facility-config/facility-config-page';

function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden select-none">
                <Lnb />
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/rui/pm" element={<UserSmltConfigPage />} />
                        <Route path="/rui/pm/daily-smlt/result" element={<DailySmltPage />} />
                        <Route path="/rui/pm/user-smlt/config" element={<UserSmltConfigPage />} />
                        <Route path="/rui/pm/user-smlt/config/:key" element={<UserSmltConfigPage />} />
                        <Route path="/rui/pm/user-smlt/result" element={<UserSmltResultPage />} />
                        <Route path="/rui/pm/user-smlt/result/:key" element={<UserSmltResultPage />} />
                        <Route path="/rui/pm/monitoring" element={<MonitoringPage />} />
                        <Route path="/rui/pm/facility-config" element={<FacilityConfigPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

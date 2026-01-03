import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DailySmltPage from './modules/pm/shared/components/airport-dashboard';
import UserSmltConfigPage from './modules/pm/pages/user-smlt/user-smlt-config-page';
import UserSmltResultPage from './modules/pm/pages/user-smlt/user-smlt-result-page';
import MonitoringPage from './modules/pm/pages/monitoring/monitoring-page';
import { Lnb } from './components/layout/lnb';

function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden">
                <Lnb />
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<UserSmltConfigPage />} />
                        <Route path="/pm/daily-smlt/result" element={<DailySmltPage />} />
                        <Route path="/pm/user-smlt/config" element={<UserSmltConfigPage />} />
                        <Route path="/pm/user-smlt/config/:key" element={<UserSmltConfigPage />} />
                        <Route path="/pm/user-smlt/result" element={<UserSmltResultPage />} />
                        <Route path="/pm/user-smlt/result/:key" element={<UserSmltResultPage />} />
                        <Route path="/pm/monitoring" element={<MonitoringPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DailySmltPage from './modules/pm/pages/daily-smlt/daily-smlt-page';
import UserSmltPage from './modules/pm/pages/user-smlt/user-smlt-page';
import UserSmltResultPage from './modules/pm/pages/user-smlt/user-smlt-result-page';
import { Lnb } from './components/layout/lnb';

function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden">
                <Lnb />
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<UserSmltPage />} />
                        <Route path="/pm/daily-smlt" element={<DailySmltPage />} />
                        <Route path="/pm/user-smlt" element={<UserSmltPage />} />
                        <Route path="/pm/user-smlt/result" element={<UserSmltResultPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

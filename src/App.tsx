import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DailySmltPage from './modules/pm/pages/daily-smlt/daily-smlt-page';
import UserSmltPage from './modules/pm/pages/user-smlt/user-smlt-page';
import UserSmltResultPage from './modules/pm/pages/user-smlt/user-smlt-result-page';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserSmltPage />} />
                <Route path="/pm/daily-smlt" element={<DailySmltPage />} />
                <Route path="/pm/user-smlt" element={<UserSmltPage />} />
                <Route path="/pm/user-smlt/result" element={<UserSmltResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

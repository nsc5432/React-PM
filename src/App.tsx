import { BrowserRouter, Route, Routes } from "react-router-dom";
import DailySmltPage from "./modules/pm/daily-smlt/daily-smlt-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DailySmltPage />} />
                <Route path="/pm" element={<DailySmltPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

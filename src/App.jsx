import {
    HashRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import PlaygroundPage from "./pages/PlaygroundPage";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="playground" element={<PlaygroundPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

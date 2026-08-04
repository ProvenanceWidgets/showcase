import {
    HashRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import DataDistributionPage from "./pages/DataDistributionPage";
import DynamicQueryWidgetsPage from "./pages/DynamicQueryWidgetsPage";
import HomePage from "./pages/HomePage";
import PhosphorObjectsPage from "./pages/PhosphorObjectsPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import ScentedWidgetsPage from "./pages/ScentedWidgetsPage";
import VegaIntegrationPage from "./pages/VegaIntegrationPage";
import VisualizationToWidgetsPage from "./pages/VisualizationToWidgetsPage";
import WidgetsToVisualizationPage from "./pages/WidgetsToVisualizationPage";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="playground" element={<PlaygroundPage />} />
                    <Route
                        path="scented-widgets"
                        element={<ScentedWidgetsPage />}
                    />
                    <Route
                        path="phosphor-objects"
                        element={<PhosphorObjectsPage />}
                    />
                    <Route
                        path="data-distribution"
                        element={<DataDistributionPage />}
                    />
                    <Route
                        path="vega-example"
                        element={<VegaIntegrationPage />}
                    />
                    <Route
                        path="dynamic-query-widgets-homefinder"
                        element={<DynamicQueryWidgetsPage />}
                    />
                    <Route
                        path="widgets-to-vis-one-way"
                        element={<WidgetsToVisualizationPage />}
                    />
                    <Route
                        path="vis-to-widgets-one-way"
                        element={<VisualizationToWidgetsPage />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

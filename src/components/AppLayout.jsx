import { Outlet } from "react-router-dom";

import DemoPageControls from "./DemoPageControls";
import SiteHeader from "./SiteHeader";

export default function AppLayout() {
    return (
        <div className="app-shell">
            <SiteHeader />
            <DemoPageControls />
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
}

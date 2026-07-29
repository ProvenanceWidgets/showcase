import { Outlet } from "react-router-dom";

import DemoPageControls from "./DemoPageControls";

export default function AppLayout() {
    return (
        <div className="app-shell">
            <DemoPageControls />
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
}

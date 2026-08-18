import { Outlet } from "react-router-dom";

import SiteHeader from "./SiteHeader";

export default function AppLayout() {
    return (
        <div className="app-shell">
            <SiteHeader />
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
}

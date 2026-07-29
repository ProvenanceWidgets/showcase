import { Outlet } from "react-router-dom";

import Navigation from "./Navigation";

export default function AppLayout() {
    return (
        <div className="app-shell">
            <Navigation />
            <main className="app-main">
                <Outlet />
            </main>
            <footer className="app-footer">
                ProvenanceWidgets · Georgia Tech and ETH Zürich
            </footer>
        </div>
    );
}

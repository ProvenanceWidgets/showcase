import { Link, useLocation } from "react-router-dom";

export default function DemoPageControls() {
    const location = useLocation();

    if (location.pathname === "/") {
        return null;
    }

    return (
        <div className="demo-page-controls">
            <Link className="demo-page-controls__back" to="/">
                ← Back to Showcase
            </Link>
        </div>
    );
}

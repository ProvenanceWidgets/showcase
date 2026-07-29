import { Link, useLocation, useSearchParams } from "react-router-dom";

import { useSuperProvenanceEnabled } from "./SuperProvenanceBoundary";

export default function DemoPageControls() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const superProvenanceEnabled = useSuperProvenanceEnabled();

    if (location.pathname === "/") {
        return null;
    }

    const toggleSuperProvenance = () => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set(
            "superprovenance",
            String(!superProvenanceEnabled),
        );
        setSearchParams(nextSearchParams, { replace: true });
    };

    return (
        <div className="demo-page-controls">
            <Link className="demo-page-controls__back" to="/">
                ← Back to Showcase
            </Link>
            <button
                aria-pressed={superProvenanceEnabled}
                className={`demo-page-controls__toggle${
                    superProvenanceEnabled ? " is-enabled" : ""
                }`}
                onClick={toggleSuperProvenance}
                type="button"
            >
                <span
                    aria-hidden="true"
                    className="demo-page-controls__status"
                />
                SuperProvenance:{" "}
                {superProvenanceEnabled ? "On" : "Off"}
            </button>
        </div>
    );
}

import { ProvenanceButton } from "provenance-widgets";

import { keepOpenProvenanceView } from "./provenanceViewInteraction";

export function CaseStudyLayout({ title, controls, visualization }) {
    return (
        <section className="case-study-page">
            <h1>{title}</h1>
            <div className="case-study-layout">
                <aside className="case-study-panel">
                    <h2>Control Panel</h2>
                    <div className="case-study-panel__content">
                        {controls}
                    </div>
                </aside>
                <section className="case-study-visualization">
                    <h2>Visualization</h2>
                    <div className="case-study-visualization__canvas">
                        {visualization}
                    </div>
                </section>
            </div>
        </section>
    );
}

export function ControlWidget({ id, label, children }) {
    return (
        <div
            className="case-control"
            onMouseDown={keepOpenProvenanceView}
        >
            <label>{label}</label>
            <div className="case-control__body">
                <div className="case-control__footprint">
                    <ProvenanceButton target={id} />
                </div>
                <div className="case-control__widget">{children}</div>
            </div>
        </div>
    );
}

export function LoadingVisualization({ error }) {
    return (
        <div className="visualization-status" role="status">
            {error
                ? `Unable to load the PW1.0 dataset: ${error.message}`
                : "Loading the PW1.0 dataset…"}
        </div>
    );
}

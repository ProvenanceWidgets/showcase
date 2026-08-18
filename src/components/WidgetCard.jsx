import { ProvenanceButton } from "provenance-widgets";

import { keepOpenProvenanceView } from "./provenanceViewInteraction";

export default function WidgetCard({ id, title, children, className = "" }) {
    return (
        <section
            className={`playground-widget ${id} ${className}`.trim()}
            onMouseDown={keepOpenProvenanceView}
        >
            <div className="playground-widget__heading">
                <ProvenanceButton target={id} />
                <h2>{title}</h2>
            </div>
            {children}
        </section>
    );
}

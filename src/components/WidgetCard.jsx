import { ProvenanceButton } from "provenance-widgets";

export default function WidgetCard({ id, title, children, className = "" }) {
    return (
        <section className={`playground-widget ${id} ${className}`.trim()}>
            <div className="playground-widget__heading">
                <ProvenanceButton target={id} />
                <h2>{title}</h2>
            </div>
            {children}
        </section>
    );
}

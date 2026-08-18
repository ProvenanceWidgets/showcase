import { SuperProvenanceWidget } from "provenance-widgets";

export function SuperProvenanceBoundary({
    id,
    components,
    children,
}) {
    return (
        <SuperProvenanceWidget
            id={id}
            components={components}
            default
        >
            {children}
        </SuperProvenanceWidget>
    );
}

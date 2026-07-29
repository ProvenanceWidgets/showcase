import { useSearchParams } from "react-router-dom";
import { SuperProvenanceWidget } from "provenance-widgets";

export function useSuperProvenanceEnabled() {
    const [searchParams] = useSearchParams();

    return searchParams.get("superprovenance") !== "false";
}

export function SuperProvenanceBoundary({
    id,
    enabled,
    components,
    children,
}) {
    if (!enabled) {
        return children;
    }

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

import { useEffect, useRef, useState } from "react";
import embed from "vega-embed";

export default function VegaEmbedChart({
    spec,
    signals = {},
    dataUrls = {},
    onView,
}) {
    const containerRef = useRef(null);
    const viewRef = useRef(null);
    const [error, setError] = useState(null);
    const signalsRef = useRef(signals);
    signalsRef.current = signals;

    // 1. Embed the Vega chart instance once when spec/dataUrls change
    useEffect(() => {
        let active = true;
        const preparedSpec = structuredClone(spec);
        preparedSpec.width = 900;
        preparedSpec.height = 540;

        for (const dataSource of preparedSpec.data ?? []) {
            if (dataUrls[dataSource.name]) {
                dataSource.url = dataUrls[dataSource.name];
            }
        }
        for (const signal of preparedSpec.signals ?? []) {
            if (Object.prototype.hasOwnProperty.call(signalsRef.current, signal.name)) {
                signal.value = signalsRef.current[signal.name];
            }
        }

        setError(null);
        embed(containerRef.current, preparedSpec, {
            renderer: "svg",
            actions: false,
        })
            .then(result => {
                if (!active) {
                    result.view.finalize();
                    return;
                }
                viewRef.current = result.view;
                onView?.(result.view);
            })
            .catch(setError);

        return () => {
            active = false;
            if (viewRef.current) {
                viewRef.current.finalize();
                viewRef.current = null;
            }
        };
    }, [spec, dataUrls, onView]);

    // 2. Update signals in-place without re-creating the entire Vega chart
    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        let changed = false;
        for (const [name, value] of Object.entries(signals)) {
            try {
                if (view.signal(name) !== value) {
                    view.signal(name, value);
                    changed = true;
                }
            } catch {
                // Signal might not exist in the spec
            }
        }

        if (changed) {
            view.runAsync().catch(console.error);
        }
    }, [signals]);

    if (error) {
        return (
            <div className="visualization-status" role="alert">
                Vega could not render this PW1.0 example: {error.message}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="vega-embed-chart"
            aria-label="PW1.0 Vega occupation visualization"
        />
    );
}

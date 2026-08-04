import { useCallback, useState } from "react";

import ShowcaseWidgetsGrid, {
    cityOptions,
    createWidgetValues,
} from "../components/ShowcaseWidgetsGrid";

const pwOneCityOptions = cityOptions.slice(0, 3);

const trimToTwoRecords = provenance => ({
    ...provenance,
    data: provenance.data.slice(-2),
});

export default function PhosphorObjectsPage() {
    const [values, setValues] = useState(() => createWidgetValues());
    const [provenances, setProvenances] = useState({});
    const updateValue = useCallback((key, value) => {
        setValues(current => ({ ...current, [key]: value }));
    }, []);
    const retainRecentHistory = useCallback((key, provenance) => {
        setProvenances(current => ({
            ...current,
            [key]: trimToTwoRecords(provenance),
        }));
    }, []);

    return (
        <section className="legacy-gallery-page">
            <header>
                <h1>Phosphor Objects</h1>
            </header>
            <ShowcaseWidgetsGrid
                idPrefix="phosphor"
                values={values}
                onValueChange={updateValue}
                provenances={provenances}
                onProvenanceChange={retainRecentHistory}
                mode="interaction"
                cities={pwOneCityOptions}
            />
        </section>
    );
}

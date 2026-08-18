import { useCallback, useState } from "react";

import ShowcaseWidgetsGrid, {
    createWidgetValues,
} from "../components/ShowcaseWidgetsGrid";
import { distributionProvenance } from "../data/provenanceFixtures";

export default function DataDistributionPage() {
    const [values, setValues] = useState(() =>
        createWidgetValues({
            rangeSlider: [75, 180],
            singleSelectDropdown: "LDN",
            multiSelectDropdown: ["NY", "RM"],
            checkboxGroup: ["NY", "LDN", "RM"],
            inputText: "Atlanta",
        }),
    );
    const updateValue = useCallback((key, value) => {
        setValues(current => ({ ...current, [key]: value }));
    }, []);

    return (
        <section className="legacy-gallery-page data-distribution-page">
            <header>
                <h1>Data Distribution</h1>
            </header>
            <ShowcaseWidgetsGrid
                idPrefix="distribution"
                values={values}
                onValueChange={updateValue}
                provenances={distributionProvenance}
                freeze
                mode="time"
            />
        </section>
    );
}

import { useCallback, useState } from "react";

import ShowcaseWidgetsGrid, {
    cityOptions,
    createWidgetValues,
} from "../components/ShowcaseWidgetsGrid";
import { scentedProvenance } from "../data/provenanceFixtures";

const pwOneCityOptions = cityOptions.slice(0, 3);

export default function ScentedWidgetsPage() {
    const [values, setValues] = useState(() =>
        createWidgetValues({
            singleSlider: 25,
            rangeSlider: [75, 180],
            radioButtonGroup: "NY",
            checkboxGroup: ["NY"],
            singleSelectDropdown: "LDN",
            multiSelectDropdown: ["LDN"],
            inputText: "New York",
        }),
    );
    const updateValue = useCallback((key, value) => {
        setValues(current => ({ ...current, [key]: value }));
    }, []);

    return (
        <section className="legacy-gallery-page">
            <header>
                <h1>Scented Widgets</h1>
            </header>
            <ShowcaseWidgetsGrid
                idPrefix="scented"
                values={values}
                onValueChange={updateValue}
                provenances={scentedProvenance}
                freeze
                mode="interaction"
                cities={pwOneCityOptions}
            />
        </section>
    );
}

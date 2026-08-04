import { useMemo, useState } from "react";
import { Rangeslider, Singleslider } from "provenance-widgets";

import {
    CaseStudyLayout,
    ControlWidget,
    LoadingVisualization,
} from "../components/CaseStudyLayout";
import ScatterPlot from "../components/ScatterPlot";
import useJsonData from "../hooks/useJsonData";

const yearSliderOptions = {
    floor: 1955,
    ceil: 2000,
    showTicks: true,
    step: 5,
};

const lifeExpectancySliderOptions = {
    floor: 40,
    ceil: 80,
    showTicks: true,
    step: 0.1,
    ticksArray: [40, 80],
};

// PW 1.0 keeps this filter active even though its Fertility range control is
// commented out in the template.
const fertilityRange = [2, 8];

export default function WidgetsToVisualizationPage() {
    const { data: countries, error } = useJsonData("countries.json");
    const [year, setYear] = useState(1970);
    const [lifeExpectancy, setLifeExpectancy] = useState([40, 80]);
    const filteredCountries = useMemo(() => {
        if (!countries) return null;
        return countries.filter(country =>
            Number(country.year) === year &&
            Number(country.fertility) >= fertilityRange[0] &&
            Number(country.fertility) <= fertilityRange[1] &&
            Number(country.life_expect) >= lifeExpectancy[0] &&
            Number(country.life_expect) <= lifeExpectancy[1]
        );
    }, [countries, year, lifeExpectancy]);

    const controls = (
        <>
            <ControlWidget id="countries-year" label="Year">
                <Singleslider
                    id="countries-year"
                    value={year}
                    onChange={setYear}
                    options={yearSliderOptions}
                    dataLabel="Year"
                    mode="interaction"
                    visualize
                    freeze={false}
                />
            </ControlWidget>
            <ControlWidget
                id="countries-life-expectancy"
                label="Life Expectancy"
            >
                <Rangeslider
                    id="countries-life-expectancy"
                    value={lifeExpectancy}
                    onChange={setLifeExpectancy}
                    options={lifeExpectancySliderOptions}
                    dataLabel="Life Expectancy"
                    mode="interaction"
                    visualize
                    freeze={false}
                />
            </ControlWidget>
        </>
    );

    const visualization = filteredCountries ? (
        <ScatterPlot
            data={filteredCountries}
            xField="fertility"
            yField="life_expect"
            labelField="country"
        />
    ) : (
        <LoadingVisualization error={error} />
    );

    return (
        <CaseStudyLayout
            title="Widget to Visualization one-way Interaction"
            controls={controls}
            visualization={visualization}
        />
    );
}

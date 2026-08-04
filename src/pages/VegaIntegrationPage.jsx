import { useMemo, useState } from "react";
import { RadioGroup, Rangeslider } from "provenance-widgets";

import {
    CaseStudyLayout,
    ControlWidget,
} from "../components/CaseStudyLayout";
import VegaEmbedChart from "../components/VegaEmbedChart";
import jobvoyagerVegaSpec from "../data/jobvoyager-vega-spec.json";

const sexOptions = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "All", value: "all" },
];

const dataUrls = {
    jobs: `${import.meta.env.BASE_URL}assets/data/jobs.json`,
};

const yearSliderOptions = {
    floor: 1850,
    ceil: 2000,
    showTicks: true,
    tickStep: 25,
};

export default function VegaIntegrationPage() {
    const [sex, setSex] = useState("all");
    const [yearRange, setYearRange] = useState([1850, 2000]);
    const [visualizedYearRange, setVisualizedYearRange] =
        useState([1850, 2000]);
    const sexId = "vega-sex";
    const yearId = "vega-year";
    const signals = useMemo(
        () => ({
            sex,
            customExtent: visualizedYearRange,
        }),
        [sex, visualizedYearRange],
    );

    const controls = (
        <>
            <ControlWidget id={sexId} label="Sex">
                <RadioGroup
                    id={sexId}
                    data={sexOptions}
                    optionLabel="label"
                    optionValue="value"
                    selected={sex}
                    onSelectedChange={setSex}
                    dataLabel="Sex"
                    mode="interaction"
                />
            </ControlWidget>
            <ControlWidget id={yearId} label="Year">
                <Rangeslider
                    id={yearId}
                    value={yearRange}
                    onChange={setYearRange}
                    onSelectedChange={value => {
                        setYearRange(value);
                        setVisualizedYearRange(value);
                    }}
                    options={yearSliderOptions}
                    dataLabel="Year"
                    mode="interaction"
                />
            </ControlWidget>
        </>
    );

    return (
        <CaseStudyLayout
            title="Vega Integration"
            controls={controls}
            visualization={
                <VegaEmbedChart
                    spec={jobvoyagerVegaSpec}
                    signals={signals}
                    dataUrls={dataUrls}
                />
            }
        />
    );
}

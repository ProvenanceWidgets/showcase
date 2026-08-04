import { useCallback, useState } from "react";
import { Rangeslider } from "provenance-widgets";

import {
    CaseStudyLayout,
    ControlWidget,
    LoadingVisualization,
} from "../components/CaseStudyLayout";
import ScatterPlot from "../components/ScatterPlot";
import useJsonData from "../hooks/useJsonData";

const accelerationSliderOptions = {
    floor: 0,
    ceil: 26,
    showTicks: true,
    step: 0.1,
    ticksArray: [0, 26],
};

const horsepowerSliderOptions = {
    floor: 0,
    ceil: 240,
    showTicks: true,
    step: 0.1,
    ticksArray: [0, 240],
};

const horsepowerDomain = [0, 240];
const accelerationDomain = [0, 26];

const baseline = value => ({
    revalidate: true,
    data: [{
        value,
        timestamp: "2024-03-05T00:00:00.000Z",
    }],
});

const appendExternalRecord = (provenance, value) => {
    const timestamp = new Date().toISOString();
    if (provenance?.schemaVersion === 2) {
        return {
            ...provenance,
            data: [
                ...provenance.data,
                {
                    value,
                    timestamp,
                    source: "external",
                    kind: "interaction",
                    caller: "visualization-brush",
                },
            ],
        };
    }
    return {
        revalidate: true,
        data: [
            ...(provenance?.data ?? []),
            { value, timestamp },
        ],
    };
};

const roundRange = ([low, high], min, max) => [
    Math.max(min, Math.round(low * 10) / 10),
    Math.min(max, Math.round(high * 10) / 10),
];

export default function VisualizationToWidgetsPage() {
    const { data: cars, error } = useJsonData("cars.json");
    const [acceleration, setAcceleration] = useState([0, 26]);
    const [horsepower, setHorsepower] = useState([0, 240]);
    const [accelerationProvenance, setAccelerationProvenance] =
        useState(() => baseline([0, 26]));
    const [horsepowerProvenance, setHorsepowerProvenance] =
        useState(() => baseline([0, 240]));

    const handleBrushChange = useCallback((xRange, yRange) => {
        setHorsepower(roundRange(xRange, 0, 240));
        setAcceleration(roundRange(yRange, 0, 26));
    }, []);

    const handleBrushSelection = useCallback((xRange, yRange) => {
        const nextHorsepower = roundRange(xRange, 0, 240);
        const nextAcceleration = roundRange(yRange, 0, 26);
        setHorsepower(nextHorsepower);
        setAcceleration(nextAcceleration);
        setHorsepowerProvenance(current =>
            appendExternalRecord(current, nextHorsepower),
        );
        setAccelerationProvenance(current =>
            appendExternalRecord(current, nextAcceleration),
        );
    }, []);

    const controls = (
        <>
            <ControlWidget
                id="cars-acceleration"
                label="Acceleration"
            >
                <Rangeslider
                    id="cars-acceleration"
                    value={acceleration}
                    onChange={setAcceleration}
                    provenance={accelerationProvenance}
                    onProvenanceChange={setAccelerationProvenance}
                    options={accelerationSliderOptions}
                    recordExternalChanges={false}
                    dataLabel="Acceleration"
                    mode="interaction"
                    visualize
                    freeze={false}
                />
            </ControlWidget>
            <ControlWidget id="cars-horsepower" label="Horsepower">
                <Rangeslider
                    id="cars-horsepower"
                    value={horsepower}
                    onChange={setHorsepower}
                    provenance={horsepowerProvenance}
                    onProvenanceChange={setHorsepowerProvenance}
                    options={horsepowerSliderOptions}
                    recordExternalChanges={false}
                    dataLabel="Horsepower"
                    mode="interaction"
                    visualize
                    freeze={false}
                />
            </ControlWidget>
        </>
    );

    const visualization = cars ? (
        <ScatterPlot
            data={cars}
            xField="Horsepower"
            yField="Acceleration"
            xDomain={horsepowerDomain}
            yDomain={accelerationDomain}
            brush
            onBrushChange={handleBrushChange}
            onBrushSelection={handleBrushSelection}
            pointStyle="outline"
            pointRadius={3.2}
        />
    ) : (
        <LoadingVisualization error={error} />
    );

    return (
        <CaseStudyLayout
            title="Visualization to Widget one-way Interaction"
            controls={controls}
            visualization={visualization}
        />
    );
}

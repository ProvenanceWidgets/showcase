import { useMemo, useState } from "react";
import {
    MultiSelectDropdown,
    RadioGroup,
    Rangeslider,
    Singleslider,
} from "provenance-widgets";

import {
    CaseStudyLayout,
    ControlWidget,
    LoadingVisualization,
} from "../components/CaseStudyLayout";
import ScatterPlot from "../components/ScatterPlot";
import useJsonData from "../hooks/useJsonData";

const roomsSliderOptions = {
    floor: 2,
    ceil: 14,
    showTicks: true,
    step: 1,
};

const priceSliderOptions = {
    floor: 34900,
    ceil: 755000,
    showTicks: true,
    step: 100000,
};

const getDistinctOptions = (data, field) => Array.from(
    new Set((data ?? []).map(item => item[field]))
).map(value => ({ label: value, value }));

export default function DynamicQueryWidgetsPage() {
    const { data: housing, error } = useJsonData("housing.json");
    const [rooms, setRooms] = useState(10);
    const [price, setPrice] = useState([34900, 755000]);
    const [lotConfig, setLotConfig] = useState("Corner");
    // PW 1.0 stores the selected option objects, not only their string keys.
    // `null` means the asynchronously loaded initial selection is still "all";
    // an empty array remains a deliberate user selection of no heating types.
    const [heating, setHeating] = useState(null);
    const heatingOptions = useMemo(
        () => getDistinctOptions(housing, "Heating Type"),
        [housing]
    );
    const lotOptions = useMemo(
        () => getDistinctOptions(housing, "Lot Config"),
        [housing]
    );
    const selectedHeating = heating ?? heatingOptions;
    const filteredHousing = useMemo(() => {
        if (!housing) return null;
        return housing.filter(home =>
            Number(home.Rooms) === rooms &&
            Number(home.Price) >= price[0] &&
            Number(home.Price) <= price[1] &&
            selectedHeating.some(
                model => model.value === home["Heating Type"]
            ) &&
            home["Lot Config"] === lotConfig
        );
    }, [housing, rooms, price, selectedHeating, lotConfig]);

    const controls = (
        <>
            <ControlWidget id="homefinder-rooms" label="Rooms">
                <Singleslider
                    id="homefinder-rooms"
                    value={rooms}
                    onChange={setRooms}
                    options={roomsSliderOptions}
                    dataLabel="Room"
                    mode="interaction"
                    visualize={false}
                    freeze
                />
            </ControlWidget>
            <ControlWidget id="homefinder-price" label="Price">
                <Rangeslider
                    id="homefinder-price"
                    value={price}
                    onChange={setPrice}
                    options={priceSliderOptions}
                    dataLabel="Price"
                    mode="interaction"
                    visualize={false}
                    freeze
                />
            </ControlWidget>
            <ControlWidget id="homefinder-lot" label="Lot Config">
                <RadioGroup
                    id="homefinder-lot"
                    data={lotOptions}
                    optionLabel="label"
                    optionValue="value"
                    selected={lotConfig}
                    onSelectedChange={setLotConfig}
                    dataLabel="Lot Config"
                    mode="interaction"
                    visualize={false}
                    freeze
                />
            </ControlWidget>
            <ControlWidget id="homefinder-heating" label="Heating Type">
                <MultiSelectDropdown
                    id="homefinder-heating"
                    options={heatingOptions}
                    optionLabel="label"
                    dataKey="value"
                    selected={selectedHeating}
                    onSelectedChange={setHeating}
                    placeholder="Select heating types"
                    maxSelectedLabels={1}
                    selectedItemsLabel="{0} Selected"
                    filter={false}
                    showClear={false}
                    dataLabel="Heating Type"
                    mode="interaction"
                    visualize={false}
                    freeze
                />
            </ControlWidget>
        </>
    );

    const visualization = filteredHousing ? (
        <ScatterPlot
            data={filteredHousing}
            xField="Basement Area"
            yField="Lot Area"
            colorField="Home Type"
        />
    ) : (
        <LoadingVisualization error={error} />
    );

    return (
        <CaseStudyLayout
            title="Dynamic Query Widgets (HomeFinder)"
            controls={controls}
            visualization={visualization}
        />
    );
}

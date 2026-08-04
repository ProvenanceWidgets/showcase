import { useState } from "react";

import {
    CheckboxGroup,
    InputText,
    MultiSelectDropdown,
    RadioGroup,
    Rangeslider,
    SingleSelectDropdown,
    Singleslider,
} from "provenance-widgets";

import { SuperProvenanceBoundary } from "../components/SuperProvenanceBoundary";
import WidgetCard from "../components/WidgetCard";

const cityOptions = [
    { label: "New York", value: "New York" },
    { label: "London", value: "London" },
    { label: "Paris", value: "Paris" },
    { label: "Mumbai", value: "Mumbai" },
];

const toppingOptions = [
    { label: "Cheese", value: "Cheese" },
    { label: "Mushroom", value: "Mushroom" },
    { label: "Peppers", value: "Peppers" },
];

const meatOptions = [
    { label: "Chicken", value: "Chicken" },
    { label: "Beef", value: "Beef" },
    { label: "Lamb", value: "Lamb" },
];

const singleSliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: true,
    tickStep: 5,
};

const rangeSliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: true,
    tickStep: 15,
};

const provenanceComponents = [
    "single-slider",
    "range-slider",
    "input-text",
    "checkbox-group",
    "radiobutton-group",
    "single-select-dropdown",
    "multi-select-dropdown",
];

export default function PlaygroundPage() {
    const [checkboxSelection, setCheckboxSelection] = useState([
        "Chicken",
        "Beef",
    ]);
    const [inputValue, setInputValue] = useState("");
    const [ingredient, setIngredient] = useState("Cheese");
    const [singleSliderValue, setSingleSliderValue] = useState(25);
    const [rangeSliderValue, setRangeSliderValue] = useState([0, 100]);
    const [city, setCity] = useState(cityOptions[0]);
    const [cities, setCities] = useState(cityOptions.slice(0, 2));

    return (
        <div className="playground-page">
            <header className="playground-page__header">
                <h1>Provenance Widgets Playground</h1>
            </header>

            <SuperProvenanceBoundary
                id="playground-superprovenance"
                components={provenanceComponents}
            >
                <div className="playground-grid">
                    <WidgetCard
                        id="checkbox-group"
                        title="Checkbox Group"
                    >
                        <CheckboxGroup
                            id="checkbox-group"
                            data={meatOptions}
                            optionLabel="label"
                            optionValue="value"
                            selected={checkboxSelection}
                            onSelectedChange={setCheckboxSelection}
                            dataLabel="Meat"
                        />
                    </WidgetCard>

                    <WidgetCard id="input-text" title="Input Text">
                        <InputText
                            id="input-text"
                            placeholder="Search and press Enter"
                            value={inputValue}
                            onChange={setInputValue}
                            dataLabel="Search"
                        />
                    </WidgetCard>

                    <WidgetCard
                        id="radiobutton-group"
                        title="Radiobutton Group"
                    >
                        <RadioGroup
                            id="radiobutton-group"
                            data={toppingOptions}
                            optionLabel="label"
                            optionValue="value"
                            selected={ingredient}
                            onSelectedChange={setIngredient}
                            dataLabel="Pizza topping"
                        />
                    </WidgetCard>

                    <WidgetCard
                        id="single-slider"
                        title="Single Slider"
                    >
                        <Singleslider
                            id="single-slider"
                            value={singleSliderValue}
                            onChange={setSingleSliderValue}
                            options={singleSliderOptions}
                            dataLabel="Single value"
                        />
                    </WidgetCard>

                    <WidgetCard
                        id="single-select-dropdown"
                        title="Single Select Dropdown"
                    >
                        <SingleSelectDropdown
                            id="single-select-dropdown"
                            options={cityOptions}
                            optionLabel="label"
                            dataKey="value"
                            selected={city}
                            onSelectedChange={setCity}
                            filter
                            showClear
                            dataLabel="City"
                        />
                    </WidgetCard>

                    <WidgetCard
                        id="multi-select-dropdown"
                        title="Multi Select Dropdown"
                    >
                        <MultiSelectDropdown
                            id="multi-select-dropdown"
                            options={cityOptions}
                            optionLabel="label"
                            dataKey="value"
                            selected={cities}
                            onSelectedChange={setCities}
                            filter
                            showClear
                            dataLabel="Cities"
                        />
                    </WidgetCard>

                    <WidgetCard id="range-slider" title="Range Slider">
                        <Rangeslider
                            id="range-slider"
                            value={rangeSliderValue}
                            onChange={setRangeSliderValue}
                            options={rangeSliderOptions}
                            dataLabel="Range"
                        />
                    </WidgetCard>
                </div>
            </SuperProvenanceBoundary>
        </div>
    );
}

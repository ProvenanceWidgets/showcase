import { useState } from "react";

import {
    CheckboxGroup,
    InputText,
    MultiSelectDropdown,
    ProvenanceButton,
    RadioGroup,
    Rangeslider,
    SingleSelectDropdown,
    Singleslider,
} from "provenance-widgets";

import { SuperProvenanceBoundary } from "../components/SuperProvenanceBoundary";

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

const provenanceComponents = [
    "single-slider",
    "range-slider",
    "input-text",
    "checkbox-group",
    "radiobutton-group",
    "single-select-dropdown",
    "multi-select-dropdown",
];

function WidgetCard({ id, title, children }) {
    return (
        <section className={`playground-widget ${id}`}>
            <div className="playground-widget__heading">
                <ProvenanceButton target={id} />
                <h2>{title}</h2>
            </div>
            {children}
        </section>
    );
}

export default function PlaygroundPage() {
    const [checkboxSelection, setCheckboxSelection] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [ingredient, setIngredient] = useState();
    const [singleSliderValue, setSingleSliderValue] = useState(0);
    const [rangeSliderValue, setRangeSliderValue] = useState([0, 100]);
    const [city, setCity] = useState();
    const [cities, setCities] = useState([]);

    return (
        <div className="playground-page">
            <header className="playground-page__header">
                <h1>Provenance Widgets Playground</h1>
                <p>Seven PW1.0-compatible widgets.</p>
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
                            max={100}
                            step={10}
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
                            selected={city}
                            onSelectedChange={setCity}
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
                            selected={cities}
                            onSelectedChange={setCities}
                            dataLabel="Cities"
                        />
                    </WidgetCard>

                    <WidgetCard id="range-slider" title="Range Slider">
                        <Rangeslider
                            id="range-slider"
                            value={rangeSliderValue}
                            onChange={setRangeSliderValue}
                            max={100}
                            step={10}
                            dataLabel="Range"
                        />
                    </WidgetCard>
                </div>
            </SuperProvenanceBoundary>
        </div>
    );
}

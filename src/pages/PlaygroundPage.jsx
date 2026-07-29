import { useEffect, useState } from "react";

import {
    Checkbox,
    CheckboxGroup,
    InputText,
    MultiSelectDropdown,
    ProvenanceButton,
    Radiobutton,
    RadioGroup,
    Rangeslider,
    SingleSelectDropdown,
    Singleslider,
    useRevertedValue,
} from "provenance-widgets";

import {
    SuperProvenanceBoundary,
    useSuperProvenanceEnabled,
} from "../components/SuperProvenanceBoundary";

const componentStyle = {
    width: "250px",
    marginBottom: "0.5rem",
};

const cityOptions = [
    { label: "New York", value: "New York" },
    { label: "London", value: "London" },
    { label: "Paris", value: "Paris" },
    { label: "Mumbai", value: "Mumbai" },
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

export default function PlaygroundPage() {
    const superProvenanceEnabled = useSuperProvenanceEnabled();
    const [ingredient, setIngredient] = useState();
    const [rangeVal, setRangeVal] = useState(0);
    const [rangeVals, setRangeVals] = useState([0, 100]);
    const [revertedSingleSlider] = useRevertedValue("single-slider");
    const [revertedRangeSlider] = useRevertedValue("range-slider");
    const [revertedRadioGroup] = useRevertedValue("radiobutton-group");

    useEffect(() => {
        if (revertedSingleSlider !== undefined) {
            setRangeVal(revertedSingleSlider);
        }
    }, [revertedSingleSlider]);

    useEffect(() => {
        if (revertedRangeSlider !== undefined) {
            setRangeVals(revertedRangeSlider);
        }
    }, [revertedRangeSlider]);

    useEffect(() => {
        if (revertedRadioGroup !== undefined) {
            setIngredient(revertedRadioGroup);
        }
    }, [revertedRadioGroup]);

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Showcase</h1>
            <SuperProvenanceBoundary
                id="playground-superprovenance"
                enabled={superProvenanceEnabled}
                components={provenanceComponents}
            >
                <div style={{ padding: "1rem" }}>
                    <div
                        style={{
                            marginTop: "0",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                        }}
                    >
                        <div className="checkbox-group" style={componentStyle}>
                            <div>
                                <p style={{ color: "gray" }}>Checkbox Group</p>
                                <ProvenanceButton target="checkbox-group" />
                            </div>
                            <CheckboxGroup id="checkbox-group">
                                <Checkbox id="checkbox" label="Chicken" />
                                <Checkbox id="checkbox" label="Beef" />
                                <Checkbox id="checkbox" label="Lamb" />
                            </CheckboxGroup>
                        </div>
                        <div className="input-text" style={componentStyle}>
                            <p style={{ color: "gray" }}>Input Text</p>
                            <ProvenanceButton target="input-text" />
                            <InputText id="input-text" placeholder="Search" />
                        </div>
                        <div
                            className="radiobutton-group"
                            style={componentStyle}
                        >
                            <div>
                                <p style={{ color: "gray" }}>
                                    Radiobutton Group
                                </p>
                                <ProvenanceButton target="radiobutton-group" />
                            </div>
                            <RadioGroup id="radiobutton-group">
                                <Radiobutton
                                    value="Cheese"
                                    label="pizza"
                                    stateItem={ingredient}
                                    setStateItem={setIngredient}
                                />
                                <Radiobutton
                                    value="Mushroom"
                                    label="pizza"
                                    stateItem={ingredient}
                                    setStateItem={setIngredient}
                                />
                                <Radiobutton
                                    value="Peppers"
                                    label="pizza"
                                    stateItem={ingredient}
                                    setStateItem={setIngredient}
                                />
                            </RadioGroup>
                        </div>
                        <div className="single-slider" style={componentStyle}>
                            <div>
                                <p style={{ color: "gray" }}>Single Slider</p>
                                <ProvenanceButton target="single-slider" />
                            </div>
                            <Singleslider
                                id="single-slider"
                                value={rangeVal}
                                onChange={(value) => setRangeVal(value)}
                                max={100}
                                step={10}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: "0",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                        }}
                    >
                        <div
                            className="single-select-dropdown"
                            style={componentStyle}
                        >
                            <div>
                                <p style={{ color: "gray" }}>
                                    Single Select Dropdown
                                </p>
                                <ProvenanceButton target="single-select-dropdown" />
                            </div>
                            <SingleSelectDropdown
                                id="single-select-dropdown"
                                options={cityOptions}
                            />
                        </div>
                        <div
                            className="multi-select-dropdown"
                            style={componentStyle}
                        >
                            <div>
                                <p style={{ color: "gray" }}>
                                    Multi Select Dropdown
                                </p>
                                <ProvenanceButton target="multi-select-dropdown" />
                            </div>
                            <MultiSelectDropdown
                                id="multi-select-dropdown"
                                options={cityOptions}
                            />
                        </div>
                        <div className="range-slider" style={componentStyle}>
                            <div>
                                <p style={{ color: "gray" }}>Range Slider</p>
                                <ProvenanceButton target="range-slider" />
                            </div>
                            <Rangeslider
                                id="range-slider"
                                value={rangeVals}
                                onChange={(value) => setRangeVals(value)}
                                max={100}
                                step={10}
                            />
                        </div>
                    </div>
                </div>
            </SuperProvenanceBoundary>
        </div>
    );
}

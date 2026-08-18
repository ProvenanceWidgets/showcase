import {
    CheckboxGroup,
    InputText,
    MultiSelectDropdown,
    RadioGroup,
    Rangeslider,
    SingleSelectDropdown,
    Singleslider,
} from "provenance-widgets";

import WidgetCard from "./WidgetCard";

export const cityOptions = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
];

const getSetting = (setting, key, fallback) => {
    if (setting && typeof setting === "object") {
        return setting[key] ?? fallback;
    }
    return setting ?? fallback;
};

const idSuffix = {
    singleSlider: "single-slider",
    rangeSlider: "range-slider",
    radioButtonGroup: "radiobutton-group",
    checkboxGroup: "checkbox-group",
    singleSelectDropdown: "single-select-dropdown",
    multiSelectDropdown: "multi-select-dropdown",
    inputText: "input-text",
};

export const createWidgetValues = (overrides = {}) => ({
    singleSlider: 25,
    rangeSlider: [75, 180],
    radioButtonGroup: undefined,
    checkboxGroup: [],
    singleSelectDropdown: undefined,
    multiSelectDropdown: [],
    inputText: "",
    ...overrides,
});

export default function ShowcaseWidgetsGrid({
    idPrefix,
    values,
    onValueChange,
    provenances = {},
    onProvenanceChange,
    freeze = false,
    mode = "interaction",
    visualize = true,
    cities = cityOptions,
    singleSliderOptions = {
        floor: 0,
        ceil: 100,
        showTicks: true,
        tickStep: 5,
    },
    rangeSliderOptions = {
        floor: 0,
        ceil: 250,
        showTicks: true,
        tickStep: 15,
    },
}) {
    const id = key => `${idPrefix}-${key}`;
    const setValue = (key, value) => onValueChange(key, value);
    const common = key => ({
        id: id(idSuffix[key]),
        provenance: provenances[key],
        onProvenanceChange: (provenance, meta) =>
            onProvenanceChange?.(key, provenance, meta),
        freeze: getSetting(freeze, key, false),
        mode: getSetting(mode, key, "interaction"),
        visualize: getSetting(visualize, key, true),
    });

    return (
        <div className="legacy-widget-grid">
            <WidgetCard
                id={id("single-slider")}
                title="Single Slider"
            >
                <Singleslider
                    {...common("singleSlider")}
                    value={values.singleSlider}
                    onChange={value => setValue("singleSlider", value)}
                    options={singleSliderOptions}
                    dataLabel="Single Slider"
                />
            </WidgetCard>

            <WidgetCard
                id={id("range-slider")}
                title="Range Slider"
            >
                <Rangeslider
                    {...common("rangeSlider")}
                    value={values.rangeSlider}
                    onChange={value => setValue("rangeSlider", value)}
                    options={rangeSliderOptions}
                    dataLabel="Range Slider"
                />
            </WidgetCard>

            <WidgetCard
                id={id("radiobutton-group")}
                title="Radiobutton Group"
            >
                <RadioGroup
                    {...common("radioButtonGroup")}
                    data={cities}
                    optionLabel="label"
                    optionValue="value"
                    selected={values.radioButtonGroup}
                    onSelectedChange={value =>
                        setValue("radioButtonGroup", value)
                    }
                    dataLabel="City"
                />
            </WidgetCard>

            <WidgetCard
                id={id("checkbox-group")}
                title="Checkbox Group"
            >
                <CheckboxGroup
                    {...common("checkboxGroup")}
                    data={cities}
                    optionLabel="label"
                    optionValue="value"
                    selected={values.checkboxGroup}
                    onSelectedChange={value =>
                        setValue("checkboxGroup", value)
                    }
                    dataLabel="Cities"
                />
            </WidgetCard>

            <WidgetCard
                id={id("single-select-dropdown")}
                title="Single Select Dropdown"
            >
                <SingleSelectDropdown
                    {...common("singleSelectDropdown")}
                    options={cities}
                    selected={values.singleSelectDropdown}
                    onSelectedChange={value =>
                        setValue("singleSelectDropdown", value)
                    }
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select one option"
                    dataLabel="City"
                />
            </WidgetCard>

            <WidgetCard
                id={id("multi-select-dropdown")}
                title="Multi Select Dropdown"
            >
                <MultiSelectDropdown
                    {...common("multiSelectDropdown")}
                    options={cities}
                    selected={values.multiSelectDropdown}
                    onSelectedChange={value =>
                        setValue("multiSelectDropdown", value)
                    }
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select option(s)"
                    dataLabel="Cities"
                />
            </WidgetCard>

            <WidgetCard
                id={id("input-text")}
                title="Input Text"
            >
                <InputText
                    {...common("inputText")}
                    value={values.inputText}
                    onChange={value => setValue("inputText", value)}
                    placeholder="Search and press Enter"
                    dataLabel="Search"
                />
            </WidgetCard>
        </div>
    );
}

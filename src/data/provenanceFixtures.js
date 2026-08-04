const baseTime = Date.parse("2024-03-05T03:44:00.000Z");

const records = values =>
    values.map((value, index) => ({
        value,
        timestamp: new Date(baseTime + index * 1100).toISOString(),
    }));

const simultaneousRecords = values =>
    values.map(value => ({
        value,
        timestamp: "2024-03-05T00:00:00.000Z",
    }));

export const scentedProvenance = {
    singleSlider: {
        revalidate: true,
        data: records([
            [25], [20], [35], [45], [40], [50], [45],
            [40], [30], [40], [10], [20], [25], [35],
            [30], [30], [30], [35], [25], [20], [65],
        ]),
    },
    rangeSlider: {
        revalidate: true,
        data: records([[105, 180], [135, 180], [135, 210]]),
    },
    singleSelectDropdown: {
        revalidate: true,
        selections: records([
            ["NY"], ["RM"], ["NY"], ["RM"], ["RM"],
        ]),
    },
    multiSelectDropdown: {
        revalidate: true,
        selections: records([["RM"], ["NY"]]),
    },
    checkboxGroup: {
        revalidate: true,
        selections: records([
            ["NY", "RM"], ["NY"], ["NY"], ["NY", "RM"],
        ]),
    },
    radioButtonGroup: {
        revalidate: true,
        selections: records([["NY"], ["RM"], ["NY"]]),
    },
    inputText: {
        revalidate: true,
        data: records(["London", "New York", "London", "New York"]),
    },
};

export const distributionProvenance = {
    singleSlider: {
        revalidate: true,
        data: simultaneousRecords([
            [25], [14], [24], [34], [44], [49], [54], [20],
            [35], [45], [40], [50], [45], [40], [30], [40],
            [10], [20], [25], [35], [30], [30], [30], [35],
            [25], [20], [65], [100], [0], [19], [11], [29],
            [39], [80],
        ]),
    },
    rangeSlider: {
        revalidate: true,
        data: simultaneousRecords([
            [105, 180],
            [135, 180],
            [0, 180],
            [135, 210],
            [135, 210],
            [210, 250],
            [45, 125],
        ]),
    },
    singleSelectDropdown: {
        revalidate: true,
        selections: simultaneousRecords([
            ["NY"], ["RM"], ["LDN"], ["RM"], ["LDN"], ["IST"], ["LDN"],
        ]),
    },
    multiSelectDropdown: {
        revalidate: true,
        selections: simultaneousRecords([
            ["NY", "RM"],
            ["NY"],
            ["NY", "LDN"],
            ["PRS"],
            ["NY"],
            ["IST", "PRS"],
            ["NY", "RM"],
        ]),
    },
    checkboxGroup: {
        revalidate: true,
        selections: simultaneousRecords([
            ["NY", "RM"],
            ["NY"],
            ["NY", "LDN"],
            ["NY", "LDN", "RM"],
        ]),
    },
    radioButtonGroup: {
        revalidate: true,
        selections: simultaneousRecords([
            ["PRS"], ["NY"], ["RM"], ["LDN"],
            ["RM"], ["LDN"], ["IST"], ["LDN"],
        ]),
    },
    inputText: {
        revalidate: true,
        data: simultaneousRecords([
            "Rome",
            "New York",
            "Rome",
            "Atlanta",
        ]),
    },
};

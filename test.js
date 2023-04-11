let createData = [
    { L0: "ABC", L1: "123", L2: "XYZ" },
    { L0: "ABC", L1: "123", L2: "qwe" },
    { L0: "ABC", L1: "456", L2: "asd", L3: "poi" },
    { L0: "ABC", L1: "456", L2: "asd", L3: "ytr" },
    { L0: "ABC", L1: "456", L2: "fgh", L3: "lkj" },
    { L0: "ABC", L1: "456", L2: "fgh", L3: "mnb" },
    { L0: "DEF", L1: "789", L2: "rty", L3: "mnb" },
    { L0: "DEF", L1: "789", L2: "yui", L3: "iou" },
    { L0: "DEF", L1: "789", L2: "yui", L3: "tyu" },
    { L0: "DEF", L1: "986", L2: "yhb", L3: "rty" },
    { L0: "DEF", L1: "986", L2: "ghj", L3: "lkj" },
];

SampleData = [
    {
        objective: "ABC",
        children: [
            {
                objective: "123",
                children: [
                    { objective: "XYZ", children: [] },
                    { objective: "QWE", children: [] },
                ],
            },
            {
                objective: "456",
                children: [
                    { objective: "asd", children: [] },
                    { objective: "fgh", children: [] },
                ],
            },
        ],
    },
];

createData.reduce((previousValue, currentValue) => {
    console.log('previousValue', previousValue);
    console.log('currentValue', currentValue);
    if(previousValue) {
        for(let key in currentValue) {
            if(currentValue[key] === previousValue[key]) {
                let children = [];
                children.push({[key]: previousValue[key]})
                currentValue = {...currentValue, children };
            }

        }
    }
    return currentValue;
}, {})
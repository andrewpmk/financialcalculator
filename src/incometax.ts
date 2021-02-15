// 2020
// Part A - Federal tax on taxable income

interface taxrate {
    min: number,
    max: number,
    fixed?: number,
    subtract?: number,
    multiplier: number
}

const federaltaxrates = {
    "2020": [
            {
                "min": 0,
                "max": 48535,
                "subtract": 0,
                "fixed": 0,
                "multiplier": 0.15
            },
            {
                "min": 48535.01,
                "max": 97069,
                "subtract": 48535,
                "fixed": 7280.25,
                "multiplier": 0.205
            },
            {
                "min": 97069.01,
                "max": 150473,
                "subtract": 97069,
                "fixed": 17229.72,
                "multiplier": 0.26
            },
            {
                "min": 150473.01,
                "max": 214368,
                "subtract": 150473,
                "fixed": 31114.76,
                "multiplier": 0.29
            },
            {
                "min": 214368.01,
                "max": null,
                "subtract": 214368,
                "fixed": 49644.31,
                "multiplier": 0.33
            }
        ],
};

const ontariotaxrates = {
    "2020": [
        {
            "min": 0,
            "max": 44740,
            "subtract": 0,
            "fixed": 0,
            "multiplier": 0.0505
        },
        {
            "min": 44740.01,
            "max": 89482,
            "subtract": 44740,
            "fixed": 2259,
            "multiplier": 0.0915
        },
        {
            "min": 89482.01,
            "max": 150000,
            "subtract": 89482,
            "fixed": 6353,
            "multiplier": 0.1116
        },
        {
            "min": 150000.01,
            "max": 220000,
            "subtract": 150000,
            "fixed": 13107,
            "multiplier": 0.1216
        },
        {
            "min": 220000.01,
            "max": null,
            "subtract": 220000,
            "fixed": 21619,
            "multiplier": 0.1316
        }
    ]
};

const ontariohealthpremiumrates = {
    "2020": [
        {
            "min": 0,
            "max": 20000,
            "subtract": 0,
            "fixed": 0,
            "multiplier": 0
        },
        {
            "min": 20000.01,
            "max": 25000,
            "subtract": 20000,
            "fixed": 0,
            "multiplier": 0.06
        },
        {
            "min": 25000.01,
            "max": 36000,
            "subtract": 0,
            "fixed": 300,
            "multiplier": 0
        },
        {
            "min": 36000.01,
            "max": 38500,
            "subtract": 36000,
            "fixed": 300,
            "multiplier": 0.06
        },
        {
            "min": 38500.01,
            "max": 48000,
            "subtract": 0,
            "fixed": 450,
            "multiplier": 0
        },
        {
            "min": 48000.01,
            "max": 48600,
            "subtract": 48000,
            "fixed": 450,
            "multiplier": 0.25    
        },
        {
            "min": 48600.01,
            "max": 72000,
            "subtract": 0,
            "fixed": 600,
            "multiplier": 0
        },
        {
            "min": 72000.01,
            "max": 72600,
            "subtract": 72000,
            "fixed": 600,
            "multiplier": 0.25
        },
        {
            "min": 72600.01,
            "max": 200000,
            "subtract": 0,
            "fixed": 750,
            "multiplier": 0
        },
        {
            "min": 200000.01,
            "max": 200600,
            "subtract": 200000,
            "fixed": 750,
            "multiplier": 0.25
        },
        {
            "min": 200600.01,
            "max": null,
            "subtract": 0,
            "fixed": 900,
            "multiplier": 0
        }
    ]
};

function calculatetax(income : number, taxjson : Array<taxrate>) {
    let hits = 0; // Number of matches, should be one
    let tax = 0; // Output of tax function
    taxjson.forEach(function (item) {
        if ("min" in item && "max" in item) {
            if ((income >= item.min && income <= item.max) || (income >= item.min && item.max === null)) {
                if (!("fixed" in item) && !("multiplier" in item) && !("subtract" in item)) {
                    throw "One or more of fixed, multiplier or subtract must be defined.";
                }
                hits++;
                tax = 0;
                if ("multiplier" in item) {
                    if ("subtract" in item) {
                        tax += (income - item.subtract) * item.multiplier;
                    } else {
                        tax += income * item.multiplier;
                    }
                }
                if ("fixed" in item) {
                    tax += item.fixed;
                }
            }
        } else {
            throw "min or max missing.";
        }
    });
    if (hits == 0) {
        throw "No tax rate defined.";
    } else if (hits > 1) {
        throw "Multiple tax rates defined.";
    } else {
        return tax;
    }
}

export function calculatefederaltax(income: number) : number {
    return calculatetax(income, federaltaxrates[2020]);
}

export function calculateontariotax(income: number) : number {
    return calculatetax(income, ontariotaxrates[2020]);
}

export function calculateontariohealthpremium(income: number) : number {
    return calculatetax(income, ontariohealthpremiumrates[2020]);
}
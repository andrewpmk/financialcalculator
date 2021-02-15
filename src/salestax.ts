import { Province } from "./provinces";

function getsalestaxratebyprovince(province: Province) : number {
    switch (province) {
        case Province.AB:
            return 0.05;
        case Province.BC:
            return 0.12;
        case Province.MB:
            return 0.12;
        case Province.NB:
            return 0.15;
        case Province.NL:
            return 0.15;
        case Province.NT:
            return 0.05;
        case Province.NS:
            return 0.15;
        case Province.NU:
            return 0.05;
        case Province.ON:
            return 0.13;
        case Province.PE:
            return 0.15;
        case Province.QC:
            return 0.14975;
        case Province.SK:
            return 0.11;
        case Province.YT:
            return 0.05;
    }
}

export function calculatesalestaxbyprovince(subtotal: number, province: Province) {
    let taxrate : number = getsalestaxratebyprovince(province);
    return calculatesalestax(subtotal, taxrate);
}

export function calculatesalestax(subtotal : number, taxrate : number) : number {
    return subtotal * (1 + taxrate);
}
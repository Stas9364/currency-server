import CurrencyData from "./currencyDataModel.js";

export default function absolutData(data) {
    const arr = [];

    data[0].branches.branch.forEach((element) => {
        const ratesArr = [];
        for (let i = 0; i < element.rate.length - 6; i++) {
            ratesArr.push(new AbsolutRateData(element.rate[i]['$'].currency, element.rate[i]['buy'][0], element.rate[i]['sell'][0], 1));
        }
        arr.push(new CurrencyData(element['$'].id, element['$'].name, element['$'].name, ratesArr));
    });

    return arr;
}

class AbsolutRateData {
    constructor(iso, buy, sell, scale) {
        this.iso = iso;
        this.buy = buy;
        this.sell = sell;
        this.scale = scale;
    }
}
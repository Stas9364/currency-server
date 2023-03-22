import CurrencyData from "../models/currencyDataModel.js";
import RateData from "../models/rateDataModel.js";

export default function absolutData(data, city) {
    const arr = [];

    data.branches.branch.forEach((element) => {
        const ratesArr = [];

        for (let i = 0; i < element.rate.length - 6; i++) {
            ratesArr.push(new RateData(element.rate[i]['$'].currency, element.rate[i]['buy'][0], element.rate[i]['sell'][0], 1));
        }
        arr.push(new CurrencyData(element['$'].id, 'Минск', element['$'].name, ratesArr));
    });

    return arr.filter(el => el.city === city);
}

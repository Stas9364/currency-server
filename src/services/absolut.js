import CurrencyData from "../bank-data-stucture/currency-data-model.js";
import RateData from "../bank-data-stucture/rate-data-model.js";

export default function absolutData(data, city) {
    const arr = [];

    data.branches.branch.forEach((element) => {
        const ratesArr = [];

        for (let i = 0; i < element.rate.length - 6; i++) {
            ratesArr.push(new RateData(element.rate[i]['$'].currency, element.rate[i]['buy'][0], element.rate[i]['sell'][0], 1));
        }
        arr.push(new CurrencyData('ОптиКурс НКФО', element['$'].id, 'Минск', element['$'].name, ratesArr));
    });

    return arr.filter(el => el.city === city);
}

import CurrencyData from "../../bank-data-stucture/currency-data-model.js";
import RateData from "../../bank-data-stucture/rate-data-model.js";

export default function technoData(data) {
    const arr = [];

    data.root.filials[0].filial.forEach(el => {
        const ratesObj = {};

        arr.push(new CurrencyData(
            'Технобанк',
            el.id[0],
            el.city[0][0] + el.city[0]
                                    .split('')
                                    .splice(1, el.city[0].length - 1)
                                    .join('')
                                    .toLowerCase(), //leave the first character in uppercase
            el.address[0],
            ratesObj
        ));

        el.rates[0].value.forEach(el => {
            if (el['$'].scale) {
                ratesObj[el['$'].iso] = new RateData(
                    el['$'].iso,
                    el['$'].buy,
                    el['$'].sale,
                    el['$'].scale
                );
            }
        });
    });

    return arr;
}
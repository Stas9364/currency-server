import CurrencyData from "../../bank-data-stucture/currency-data-model.js";
import { CrossData } from "../../bank-data-stucture/rate-data-model.js";

export default function technoCrossData(data) {
    const arr = [];

    data.root.filials[0].filial.forEach(el => {
        const crossObj = {};

        arr.push(new CurrencyData(
            'Технобанк',
            el.id[0],
            el.city[0][0] + el.city[0]
                .split('')
                .splice(1, el.city[0].length - 1)
                .join('')
                .toLowerCase(), //leave the first character in uppercase
            el.address[0],
            crossObj
        ));

        el.rates[0].value.forEach(el => {
            if (!el['$'].scale) {
                crossObj[`${el['$'].iso1}_${el['$'].iso2}`] = new CrossData(
                    el['$'].iso1,
                    el['$'].iso2,
                    el['$'].buy,
                    el['$'].sale
                );
            }
        });
    });

    return arr;
}
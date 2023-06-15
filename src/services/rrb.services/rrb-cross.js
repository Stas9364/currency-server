import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import CurrencyData from "../../bank-data-stucture/currency-data-model.js";

export default function rrbCrossData(data) {
    const arr = [];

    data.currency.filials[0].filial.forEach((element) => {
        const ratesObj = {};
        const bankData = element.rates_conversion[0].value;

        for (let k = 1; k <= bankData.length - 1; k = k + 2) {

            const iso1 = bankData[k + 1]['$'].iso;
            const iso2 = bankData[k]['$'].iso;
            const buy = bankData[k + 1]['$'].val;
            const sale = bankData[k]['$'].val;

            ratesObj[`${iso1}_${iso2}`] = new CrossData(
                iso1,
                iso2,
                buy,
                sale
            );
        }

        arr.push(new CurrencyData(
            'РРБ-Банк',
            element.id[0],
            element.city[0],
            element.address[0],
            ratesObj
        ));
    });

    return arr;
}
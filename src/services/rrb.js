import CurrencyData from "../bank-data-stucture/currency-data-model.js";

export default function rrbData(data) {
    const arr = [];

    data.currency.filials[0].filial.forEach((element) => {
        const ratesObj = {};

        for (let k = 0; k < element.rates[0].value.length; k++) {
            if (element.rates[0].value[k]['$'].iso === 'date') {
                continue;
            }
            ratesObj[element.rates[0].value[k]['$'].iso] = {
                ...element.rates[0].value[k]['$'],
                sale: element.rates[0].value[k]['$'].sell
            };

            delete ratesObj[element.rates[0].value[k]['$'].iso].sell
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
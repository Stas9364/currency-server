import CurrencyData from "../models/currencyDataModel.js";

export default function rrbData(data) {
    const arr = [];

    data.currency.filials[0].filial.forEach((element) => {
        const ratesArray = [];
        const ratesObj = {};

        for (let k = 0; k < element.rates[0].value.length; k++) {
            if (element.rates[0].value[k]['$'].iso === 'date') {
                continue;
            }
            ratesObj[element.rates[0].value[k]['$'].iso] = element.rates[0].value[k]['$'];
        }

        arr.push(new CurrencyData(
            element.id[0],
            element.city[0],
            element.address[0],
            ratesObj
        ));
    });

    return arr;
}
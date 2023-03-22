import CurrencyData from "../models/currencyDataModel.js";

export default function rrbData(data, city) {
    const arr = [];

    data.currency.filials[0].filial.forEach((element) => {
        const ratesArray = [];

        for (let k = 0; k < element.rates[0].value.length; k++) {
            ratesArray.push(element.rates[0].value[k]['$']);
        }

        arr.push(new CurrencyData(
            element.id[0],
            element.city[0],
            element.address[0],
            ratesArray
        ));
    });

    return arr;
    // return arr.filter(el => el.city === 'Могилев');
}
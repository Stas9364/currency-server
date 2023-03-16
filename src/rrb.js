import CurrencyData from "./currencyDataModel.js";

export default function rrbData(data) {
    const arr = [];

    data[0].currency.filials[0].filial.forEach(element => {
        for (let i = 0; i < 1; i++) {
            const ratesArray = [];
            for (let k = 0; k < element.rates[i].value.length; k++) {
                ratesArray.push(element.rates[i].value[k]['$']);
                arr.push(new CurrencyData(element.id[i], element.city[i], element.address[i], ratesArray));
            }
        }
    });

    return arr;
}
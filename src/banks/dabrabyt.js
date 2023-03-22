import CurrencyData from "../models/currencyDataModel.js";

export default function dabrabytData(data, city) {
    const arr = [];

    const filial = data.root.filials[0].filial;

    for (let i = 0; i < filial.length - 1; i++) {
        const ratesArray = [];
        for (let k = 0; k < filial[i].rates[0].value.length; k++) {
            ratesArray.push(filial[i].rates[0].value[k]['$']);
        }
        arr.push(new CurrencyData(
            filial[i].id[0],
            filial[i].city[0],
            filial[i].address[0],
            ratesArray
        ));
    }

    return arr;
    // return arr.filter(el => el.city.replace(/ё/g, 'е') === 'Могилев');
}
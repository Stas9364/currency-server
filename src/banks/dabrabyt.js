import CurrencyData from "../models/currencyDataModel.js";

export default function dabrabytData(data) {
    const arr = [];

    const filial = data.root.filials[0].filial;

    for (let i = 0; i < filial.length - 1; i++) {
        const ratesArray = [];
        for (let k = 0; k < filial[i].rates[0].value.length; k++) {
            ratesArray.push(
                {
                    ...filial[i].rates[0].value[k]['$'],
                    buy:
                        filial[i].rates[0].value[k]['$'].iso === 'RUB' || 
                        filial[i].rates[0].value[k]['$'].iso === 'UAH'
                            ? (filial[i].rates[0].value[k]['$'].buy * 100).toFixed(4)
                            : filial[i].rates[0].value[k]['$'].buy,
                    sale:
                        filial[i].rates[0].value[k]['$'].iso === 'RUB' || 
                        filial[i].rates[0].value[k]['$'].iso === 'UAH'
                            ? (filial[i].rates[0].value[k]['$'].sale * 100).toFixed(4)
                            : filial[i].rates[0].value[k]['$'].sale,
                    scale:
                        filial[i].rates[0].value[k]['$'].iso === 'RUB' || 
                        filial[i].rates[0].value[k]['$'].iso === 'UAH'
                            ? 100
                            : 1
                });
        }

        arr.push(new CurrencyData(
            filial[i].id[0],
            filial[i].city[0],
            filial[i].address[0],
            ratesArray
        ));
    }

    return arr;
}
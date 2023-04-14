import CurrencyData from "../models/currencyDataModel.js";

export default function dabrabytData(data) {
    const arr = [];

    const filial = data.root.filials[0].filial;

    for (let i = 0; i < filial.length - 1; i++) {
        const ratesArray = [];
        const ratesObj = {};
        for (let k = 0; k < filial[i].rates[0].value.length; k++) {

            const currencyAbbreviation = filial[i].rates[0].value[k]['$'].iso;
            const buyRate = filial[i].rates[0].value[k]['$'].buy;
            const saleRate = filial[i].rates[0].value[k]['$'].sale;  

            if (currencyAbbreviation === 'USD'
                || currencyAbbreviation === 'EUR'
                || currencyAbbreviation === 'RUB'
                || currencyAbbreviation === 'UAH'
            ) {
                ratesObj[currencyAbbreviation] = {
                    ...filial[i].rates[0].value[k]['$'],
                    buy:
                        currencyAbbreviation === 'RUB'
                            || currencyAbbreviation === 'UAH'
                            ? (buyRate * 100).toFixed(4)
                            : buyRate,
                    sale:
                        currencyAbbreviation === 'RUB'
                            || currencyAbbreviation === 'UAH'
                            ? (saleRate * 100).toFixed(4)
                            : saleRate,
                    scale:
                        currencyAbbreviation === 'RUB'
                            || currencyAbbreviation === 'UAH'
                            ? 100
                            : 1
                }
            }
        }

        arr.push(new CurrencyData(
            'Банк Дабрабыт',
            filial[i].id[0],
            filial[i].city[0],
            filial[i].address[0],
            ratesObj
        ));
    }

    return arr;
}
import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import CurrencyData from "../../bank-data-stucture/currency-data-model.js";

const currArr = [
    { key: 'USD_EUR', iso1: 'USD', iso2: 'EUR', code: 'USD/EUR' },
    { key: 'USD_RUB', iso1: 'USD', iso2: 'RUB', code: 'USD/RUB' },
    { key: 'EUR_RUB', iso1: 'EUR', iso2: 'RUB', code: 'EUR/RUB' }
]

export default function dabrabytCrossData(data) {
    const arr = [];

    const filial = data.root.filials[0].filial;

    for (let i = 0; i < filial.length - 1; i++) {
        const ratesObj = {};

        for (let k = 0; k < filial[i].rates[0].value.length; k++) {

            currArr.forEach(({ key, iso1, iso2, code }) => {
                const buyRate = filial[i].rates[0].value[k]['$'].buy;
                const saleRate = filial[i].rates[0].value[k]['$'].sale;
                const currencyAbbreviation = filial[i].rates[0].value[k]['$'].iso;

                if (currencyAbbreviation === code) {
                    ratesObj[key] = new CrossData(
                        iso1,
                        iso2,
                        buyRate,
                        saleRate
                    )
                }
            })
        }

        arr.push(
            new CurrencyData(
                'Банк Дабрабыт',
                filial[i].id[0],
                filial[i].city[0],
                filial[i].address[0],
                ratesObj
            ));
    }

    return arr;
}
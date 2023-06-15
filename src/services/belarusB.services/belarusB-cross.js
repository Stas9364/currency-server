import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import CurrencyData from "../../bank-data-stucture/currency-data-model.js";

const currArr = [
    { key: 'USD_EUR', iso1: 'USD', iso2: 'EUR' },
    { key: 'USD_RUB', iso1: 'USD', iso2: 'RUB' },
    { key: 'RUB_EUR', iso1: 'RUB', iso2: 'EUR' },
    { key: 'CNY_EUR', iso1: 'CNY', iso2: 'EUR' },
    { key: 'CNY_USD', iso1: 'CNY', iso2: 'USD' },
    { key: 'CNY_RUB', iso1: 'CNY', iso2: 'RUB' },
]

export default function belarusBCrossData(data) {
    const arr = [];

    data.result.forEach(el => {
            const address = `${el.street_type} ${el.street}, ${el.home_number}`;

            let ratesObj = {};
            for (let i = 0; i < currArr.length; i++) {
                const curr = currArr[i].key;
                const iso1 = currArr[i].iso1;
                const iso2 = currArr[i].iso2;

                if (el[`${curr}_in`] != 0 && el[`${curr}_out`] != 0) {
                    ratesObj[curr] = new CrossData(
                        iso1,
                        iso2,
                        el[`${curr}_in`],
                        el[`${curr}_out`]
                    );
                }
            }

            arr.push(new CurrencyData('Беларусбанк', el.filial_id, el.name, address, ratesObj));
        });

    return arr;
}
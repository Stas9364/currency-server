import CurrencyData from "../../bank-data-stucture/currency-data-model.js";
import RateData from "../../bank-data-stucture/rate-data-model.js";

const currArr = [
    { iso: 'USD', rate: 1 }, { iso: 'EUR', rate: 1 }, { iso: 'RUB', rate: 100 },
    { iso: 'CNY', rate: 10 }, { iso: 'PLN', rate: 10 }, { iso: 'GBP', rate: 1 },
    { iso: 'CAD', rate: 1 }, { iso: 'CZK', rate: 100 }, { iso: 'JPY', rate: 100 },
    { iso: 'SEK', rate: 10 }, { iso: 'CHF', rate: 1 },
];

export default function belarusBData(data) {
    const arr = [];

    data.result.forEach(el => {
        const address = `${el.street_type} ${el.street}, ${el.home_number}`;

        let ratesObj = {};
        for (let i = 0; i < currArr.length; i++) {
            const curr = currArr[i].iso;

            if (el[`${curr}_in`] != 0 && el[`${curr}_out`] != 0) {
                ratesObj[curr] = new RateData(curr, el[`${curr}_in`], el[`${curr}_out`], curr.rate)
            }

        }

        arr.push(new CurrencyData('Беларусбанк', el.filial_id, el.name, address, ratesObj));
    });

    return arr;
}

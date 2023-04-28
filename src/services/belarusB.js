import CurrencyData from "../bank-data-stucture/currency-data-model.js";
import RateData from "../bank-data-stucture/rate-data-model.js";

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

    // const ratesObj = {
    //     'USD': new RateData('USD', el.USD_in, el.USD_out, 1),
    //     'EUR': new RateData('EUR', el.EUR_in, el.EUR_out, 1),
    //     'RUB': new RateData('RUB', el.RUB_in, el.RUB_out, 100),
    //     'CNY': new RateData('CNY', el.CNY_in, el.CNY_out, 10),
    //     'PLN': new RateData('PLN', el.PLN_in, el.PLN_out, 10),
    //     'GBP': new RateData('GBP', el.GBP_in, el.GPB_out, 1),
    //     'CAD': new RateData('CAD', el.CAD_in, el.CAD_out, 1),
    //     'CZK': new RateData('CZK', el.CZK_in, el.CZK_out, 100),
    //     'JPY': new RateData('JPY', el.JPY_in, el.JPY_out, 100),
    //     'SEK': new RateData('SEK', el.SEK_in, el.SEK_out, 10),
    //     'CHF': new RateData('CHF', el.CHF_in, el.CHF_out, 1),
    // }

    arr.push(new CurrencyData('Беларусбанк', el.filial_id, el.name, address, ratesObj));
});

return arr;
}

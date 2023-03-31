import CurrencyData from "../models/currencyDataModel.js";
import RateData from "../models/rateDataModel.js";

export default function belarusBData(data) {
    const arr = [];

    data.result.forEach(el => {
        const address = `${el.street_type} ${el.street}, ${el.home_number}`;

        const ratesObj = {
            'USD': new RateData('USD', el.USD_in, el.USD_out, 1),
            'EUR': new RateData('EUR', el.EUR_in, el.EUR_out, 1),
            'RUB': new RateData('RUB', el.RUB_in, el.RUB_out, 100),
            'CNY': new RateData('CNY', el.CNY_in, el.CNY_out, 10),
            'PLN': new RateData('PLN', el.PLN_in, el.PLN_out, 10),
            'GBP': new RateData('GBP', el.GBP_in, el.GPB_out, 1),
            'CAD': new RateData('CAD', el.CAD_in, el.CAD_out, 1),
            'CZK':  new RateData('CZK', el.CZK_in, el.CZK_out, 100),
            'JPY': new RateData('JPY', el.JPY_in, el.JPY_out, 100),
            'SEK': new RateData('SEK', el.SEK_in, el.SEK_out, 10),
            'CHF': new RateData('CHF', el.CHF_in, el.CHF_out, 1),
        }

        arr.push(new CurrencyData(el.filial_id, el.name, address, ratesObj));
    });

    return arr;
}

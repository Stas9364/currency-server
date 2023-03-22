import CurrencyData from "../models/currencyDataModel.js";
import RateData from "../models/rateDataModel.js";

export default function belarusBData(data) {
    const arr = [];

    data.result.forEach(el => {
        const address = `${el.street_type} ${el.street}, ${el.home_number}`;

        const rates = [
            new RateData('USD', el.USD_in, el.USD_out, 1),
            new RateData('EUR', el.EUR_in, el.EUR_out, 1),
            new RateData('RUB', el.RUB_in, el.RUB_out, 100),
            new RateData('CNY', el.CNY_in, el.CNY_out, 1),
            new RateData('PLN', el.PLN_in, el.PLN_out, 1),
            new RateData('GBP', el.GBP_in, el.GPB_out, 1),
            new RateData('CAD', el.CAD_in, el.CAD_out, 1),
            new RateData('CZK', el.CZK_in, el.CZK_out, 1),
            new RateData('JPY', el.JPY_in, el.JPY_out, 1),
            new RateData('SEK', el.SEK_in, el.SEK_out, 1),
            new RateData('CHF', el.CHF_in, el.CHF_out, 1),
        ];

        arr.push(new CurrencyData(el.filial_id, el.name, address, rates));
    });

    return arr;
}

class BelarusBRateData {
    constructor(iso, buy, sell, scale) {
        this.iso = iso;
        this.buy = buy;
        this.sesll = sell;
        this.scale = scale;
    }
}
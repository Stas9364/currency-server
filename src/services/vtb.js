import CurrencyData from "../bank-data-stucture/currency-data-model.js";
import RateData from "../bank-data-stucture/rate-data-model.js";

export default function vtbData(data) {
    const rates = [];

    data.rates.main[0].rate.forEach(el => {
        rates.push(new RateData(el.code[0].toUpperCase(), el.buy[0], el.sell[0], 1));
    });

    return [new CurrencyData('Банк ВТБ', '1', 'Минск', 'ул. Московская, 14', rates)];
}

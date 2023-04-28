import CurrencyData from "../bank-data-stucture/currency-data-model.js";
import RateData from "../bank-data-stucture/rate-data-model.js";

export default function alfaData(data, city) {
    const rates = [];
    
    data.rates.forEach(el => {
        if (el.buyIso === 'BYN') {
            rates.push(new RateData(el.sellIso, el.buyRate, el.sellRate, el.quantity));
        }
    });


    return [new CurrencyData('Альфа Банк', '1', 'Минск', 'ул. Сурганова, 43', rates)];

}

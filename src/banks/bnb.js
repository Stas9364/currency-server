import CurrencyData from "../models/currencyDataModel.js";
import RateData from "../models/rateDataModel.js";

export default function bnbData(data) {
    const arr = [];

    for (let key in data) {
        const ratesObj = {};
        const info = data[key].info;
        const currenciesData = data[key].currency;

        if (info.id !== '373' && info.id !== '170') {
            arr.push(new CurrencyData(info.id, info.city, info.address, ratesObj));

            currenciesData.forEach(el => {
                if (el.type_code === '00' && el.count_in === 'BYN')
                    ratesObj[el.iso] = new RateData(el.iso, el.buy, el.sell, el.scale)
            })
        }
    }
    return arr;

}
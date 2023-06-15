import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import CurrencyData from "../../bank-data-stucture/currency-data-model.js";

const crossArr = [
    { iso: 'USD', count_in: 'RUB' },
    { iso: 'EUR', count_in: 'USD' },
    { iso: 'EUR', count_in: 'RUB' },
]

export default function bnbCrossData(data) {
    const arr = [];

    for (let key in data) {
        const ratesObj = {};
        const info = data[key].info;
        const currenciesData = data[key].currency;

        if (info.id !== '373' && info.id !== '170') {
            arr.push(new CurrencyData('БНБ-Банк', info.id, info.city, info.address, ratesObj));

            crossArr.forEach(({ iso, count_in }) => {
                currenciesData.forEach(el => {
                    if (el.type_code === '00' && el.count_in === count_in && el.iso === iso)
                        ratesObj[`${iso}_${count_in}`] = new CrossData(
                            iso,
                            count_in,
                            el.buy,
                            el.sell
                        )
                })
            })
        }
    }

    return arr;
}
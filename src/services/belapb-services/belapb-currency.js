import RateData from "../../bank-data-stucture/rate-data-model.js";
import { bindDepartments } from "./helper/bindDepatrments.js";

export default function belapbData(data) {
    if (!data.currencies.DailyExRates.Currency) return {};

    const bankId = new Set();
    const rates = {};
    data.currencies.DailyExRates.Currency.forEach(el => bankId.add(el.BankId[0]));

    [...bankId].forEach(id => {
        const currencyRateObj = {};

        data.currencies.DailyExRates.Currency.forEach(el => {
            if (id === el.BankId[0]) {
                currencyRateObj[el.CharCode[0]] = new RateData(
                    el.CharCode[0],
                    el.RateBuy[0],
                    el.RateSell[0],
                    el.Scale[0]
                );
            }
        })

        rates[id] = currencyRateObj;
    })

    return bindDepartments(rates, data.filteredDepartments)
}

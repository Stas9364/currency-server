import CurrencyData from "../bank-data-stucture/currency-data-model.js";
import RateData from "../bank-data-stucture/rate-data-model.js";

export default function belapbData(data) {
    const arr = [];
    const bankId = new Set();
    const rates = {}
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

    return bindtDepartmentsToCurrency(rates, data.filteredDepartments)
}

function bindtDepartmentsToCurrency(rates, departments) {
    const arr = [];

    for (let key in rates) {
        departments.forEach(dep => {
            if (key === dep['$'].Id) {
                arr.push(
                    new CurrencyData(
                        'Белагропромбанк',
                        dep['$'].Id,
                        dep['CityTitleRu'][0],
                        dep['BankAddressRu'][0],
                        rates[key]
                    )
                )
            }
        })
    }

    return arr;
}

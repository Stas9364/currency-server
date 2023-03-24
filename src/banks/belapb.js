import CurrencyData from "../models/currencyDataModel.js";
import RateData from "../models/rateDataModel.js";

export default function belapbData(data, departments) {
    const arr = [];
    const bankId = new Set();
    const rates = {}
    data.DailyExRates.Currency.forEach(el => bankId.add(el.BankId[0]));

    [...bankId].forEach(id => {
        const departmentCurrency = {};
        const currencyRate = [];

        data.DailyExRates.Currency.forEach(el => {
            if (id === el.BankId[0]) {
                currencyRate.push(
                    new RateData(
                        el.CharCode[0],
                        el.RateBuy[0],
                        el.RateSell[0],
                        el.Scale[0]
                    ));
            }
        })

        rates[id] = currencyRate;
    })

    return bindtDepartmentsToCurrency(rates, departments)
}

function bindtDepartmentsToCurrency(rates, departments) {
    const arr = [];

    for (let key in rates) {
        departments.forEach(dep => {
            if (key === dep['$'].Id) {
                arr.push(
                    new CurrencyData(
                        dep['$'].Id,
                        dep['CityTitleRu'][0],
                        dep['BankAddressRu'][0],
                        rates[key]
                    )
                )
            }
        })
    }
    console.log('done ')
    return arr;
}


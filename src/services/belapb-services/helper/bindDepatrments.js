import CurrencyData from "../../../bank-data-stucture/currency-data-model.js";

export function bindDepartments(rates, departments) {
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
import CurrencyData from "../bank-data-stucture/currency-data-model.js";
import RateData from "../bank-data-stucture/rate-data-model.js";

export default function belinvestData(data) {
    const elements = data['IFX']['BankSvcRs'][0]['ForExRateInqRs'];

    const arr = [];
    const rates = [];

    for (let k = 0; k < elements.length; k++) {
        const units = elements[k]['Units'][0]['Unit'];
        const element = elements[k];
        for (let i = 0; i < units.length; i++) {
            arr.push(units[i]);
        }
        if (element['BaseCurCode'][0] === 'BYN') {
            rates.push({
                iso: element['CurCode'][0],
                scale: element['CurAmnt'][0],
                [element['ForExRateDealType']]: element['ForExRateRec'][0]['ForExRateInfo'][0]['CurRate'][0]
            });
        }
    }

    //create one object from sale and buy objects
    const combineCurrencies = [];
    for (let i = 0; i <= rates.length; i = i + 2) {
        combineCurrencies.push({ ...rates[i], ...rates[i + 1] });
    }

    //remove duplicate departments
    const depTable = {};
    const resultDepartments = arr.filter(({ Name }) => (!depTable[Name] && (depTable[Name] = 1)));

    //remove duplicate currency rates
    const table = {};
    const resultCurrencies = combineCurrencies.filter(({ iso }) => (!table[iso] && (table[iso] = 1)));
    resultCurrencies.splice(-1, 1); //remove last empty object

    const result = [];

    resultDepartments.forEach((department, i) => {
        const ratesObj = {};

        result.push(new CurrencyData(
            'Белинвестбанк',
            i,
            department['City'][0],
            department['Address'][0],
            ratesObj
        ));

        resultCurrencies.forEach((currencyRate) => {
            ratesObj[currencyRate['iso']] = new RateData(
                currencyRate['iso'],
                currencyRate['Buy'],
                currencyRate['Sell'],
                currencyRate['scale'],
            )
        });
    });

    return result;
}

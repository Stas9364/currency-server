import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import CurrencyData from "../../bank-data-stucture/currency-data-model.js";

const crossArr = [
    { CurCode: 'USD', BaseCurCode: 'EUR' },
    { CurCode: 'USD', BaseCurCode: 'RUB' },
    { CurCode: 'EUR', BaseCurCode: 'RUB' },
    { CurCode: 'EUR', BaseCurCode: 'USD' },
    { CurCode: 'RUB', BaseCurCode: 'USD' },
    { CurCode: 'RUB', BaseCurCode: 'EUR' },
]

export default function belinvestCrossData(data) {
    const elements = data['IFX']['BankSvcRs'][0]['ForExRateInqRs'];

    const arr = [];
    const rates = [];

    for (let k = 0; k < elements.length; k++) {
        const units = elements[k]['Units'][0]['Unit'];
        const element = elements[k];

        crossArr.forEach(({ CurCode, BaseCurCode }) => {
            for (let i = 0; i < units.length; i++) {
                arr.push(units[i]);
            }
            if (element['BaseCurCode'][0] === BaseCurCode && element['CurCode'][0] === CurCode) {
                rates.push({
                    iso1: CurCode,
                    iso2: BaseCurCode,
                    [element['ForExRateDealType']]: element['ForExRateRec'][0]['ForExRateInfo'][0]['CurRate'][0]
                });
            }
        })
    }
    //create one object from sale and buy objects
    const combineCurrencies = [];
    for (let i = 0; i <= rates.length; i = i + 2) {
        combineCurrencies.push({ ...rates[i], ...rates[i + 1] });
    }


    // //remove duplicate departments
    const depTable = {};
    const resultDepartments = arr.filter(({ Name }) => (!depTable[Name] && (depTable[Name] = 1)));

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

        combineCurrencies.length = 3;
        combineCurrencies.forEach((currencyRate) => {
            ratesObj[`${currencyRate['iso1']}_${currencyRate['iso2']}`] = new CrossData(
                currencyRate['iso1'],
                currencyRate['iso2'],
                currencyRate['Buy'],
                currencyRate['Sell'],
            )
        });
    });

    return result;
}
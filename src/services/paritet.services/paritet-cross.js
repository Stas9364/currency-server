import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import CurrencyData from "../../bank-data-stucture/currency-data-model.js";

const crossArr = [
    { SourceCurrency: 'USD', TargetCurrency: 'RUB' },
    { SourceCurrency: 'EUR', TargetCurrency: 'RUB' },
    { SourceCurrency: 'EUR', TargetCurrency: 'USD' },
]

export default function paritetCrossData(data) {
    const arr = [];

    data.list.forEach(el => {
        const rates = [];
        const ratesObj = {};

        const address = el.PostalAddress;

        if (el.Type === 'office') {
            arr.push(new CurrencyData(
                'Паритетбанк',
                el.Id,
                address.TownName,
                address.StreetName + ' ' + address.BuildingNumber,
                ratesObj
            ));

            crossArr.forEach(({ SourceCurrency, TargetCurrency }) => {
                el.Services.CurrencyExchange.forEach(el => {
                    const term = el.Terms.Term;
                    if (
                        el.ExchangeType === 'Cash' &&
                        term.TargetCurrency === TargetCurrency &&
                        term.SourceCurrency === SourceCurrency
                    ) {
                        ratesObj[`${SourceCurrency}_${TargetCurrency}`] = new CrossData(
                            SourceCurrency,
                            TargetCurrency,
                            term.Direction.buy,
                            term.Direction.sell,
                        );
                    }
                });
            })

        }
    });

    return arr;
}
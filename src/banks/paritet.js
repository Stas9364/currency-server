import CurrencyData from "../models/currencyDataModel.js";
import RateData from "../models/rateDataModel.js";

export default function paritetData(data) {
    const arr = [];

    data.list.forEach(el => {
        const rates = [];
        arr.push(new CurrencyData(
            el.Id,
            el.PostalAddress.TownName,
            el.PostalAddress.StreetName + ' ' + el.PostalAddress.BuildingNumber,
            rates
        ));

        el.Services.CurrencyExchange.forEach(el => {
            if (el.ExchangeType === 'Cash' && el.Terms.Term.TargetCurrency === 'BYN') {
                rates.push(new RateData(
                    el.Terms.Term.SourceCurrency,
                    el.Terms.Term.Direction.buy,
                    el.Terms.Term.Direction.sell,
                    el.Terms.Term.Scale
                ));
            }
        });
    });

    return arr;
}
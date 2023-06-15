import { CrossData } from "../../bank-data-stucture/rate-data-model.js";
import { bindDepartments } from "./helper/bindDepatrments.js";

const crossArr = [
    { CurrSrc: 'USD', CurrTrg: 'RUB' },
    { CurrSrc: 'EUR', CurrTrg: 'RUB' },
    { CurrSrc: 'EUR', CurrTrg: 'USD' },
]

export default function belapbCrossData({ cross, filteredDepartments }) {
    const crossRates = cross.DailyExRates.Currency;

    if (!crossRates) return {};

    const bankId = new Set();
    const rates = {};

    crossRates.forEach(el => bankId.add(el.BankId[0]));

    [...bankId].forEach(id => {
        const currencyRateObj = {};

        crossArr.forEach(({ CurrSrc, CurrTrg }) => {
            for (let i = 0; i < crossRates.length - 1; i = i + 1) {
                const crossBuy = {
                    CurrSrc: crossRates[i].CurrSrc[0],
                    CurrTrg: crossRates[i].CurrTrg[0],
                    ConvRate: crossRates[i].ConvRate[0]
                };
                const crossSale = {
                    CurrSrc: crossRates[i + 1].CurrSrc[0],
                    CurrTrg: crossRates[i + 1].CurrTrg[0],
                    ConvRate: crossRates[i + 1].ConvRate[0]
                }

                if (id === crossRates[i].BankId[0]) {
                    if (crossBuy.CurrSrc === CurrSrc && crossBuy.CurrTrg === CurrTrg) {
                        currencyRateObj[`${crossBuy.CurrSrc}_${crossBuy.CurrTrg}`] = new CrossData(
                            crossBuy.CurrSrc,
                            crossBuy.CurrTrg,
                            crossBuy.ConvRate,
                            crossSale.ConvRate
                        );
                    }
                }
            }
        })

        rates[id] = currencyRateObj;
    })

    return bindDepartments(rates, filteredDepartments);
}

import getMiniMaxCurrencyRate from "./get-min-max-currency-rate.js";

export default function getCurrencyByCity(data, city) {
    const { banks, updateDate } = data;

    const banksData = JSON.parse(banks);

    const obj = {};

    for (let key in banksData) {
        if (!Object.keys(banksData[key]).length) continue;

        obj[key] = banksData[key]
            .filter(el => el.city.toLowerCase()
                .replace(/ё/g, 'е') === city.toLowerCase());
    }

    return {
        ...obj,
        ...JSON.parse(updateDate),
        minMaxRate: getMiniMaxCurrencyRate(obj),
    };
}

import getMiniMaxCurrencyRate from "./getMinMaxCurrencyRate.js";

export default function getCurrencyByCity(data, city) {
    const banks = JSON.parse(data);

    const obj = {};

    for (let key in banks) {
        obj[key] = banks[key]
            .filter(el => el.city.toLowerCase().replace(/ё/g, 'е') === city.toLowerCase());
    }

    return { ...obj, minMaxRate: getMiniMaxCurrencyRate(obj) };
}

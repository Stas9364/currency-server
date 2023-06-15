import getMiniMaxCrossRate from "./get-min-max-cross-rate.js";

export default function getCrossRateByCity(data, city) {
    const { cross, updateDate } = data;

    const crossData = JSON.parse(cross);

    const obj = {};

    for (let key in crossData) {
        if (!Object.keys(crossData[key]).length) continue;

        obj[key] = crossData[key]
            .filter(el => el.city.toLowerCase()
                .replace(/ё/g, 'е') === city.toLowerCase());
    }

    return {
        ...obj,
        ...JSON.parse(updateDate),
        minMaxCrossRate: getMiniMaxCrossRate(obj),
    };
}

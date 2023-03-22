export default function getCurrencyByCity(data, city) {
    const banks = JSON.parse(data);

    const obj = {};

    for(let key in banks) {
       obj[key] =  banks[key].filter(el => el.city.replace(/ё/g, 'е') === city)
    }

    return obj;
}
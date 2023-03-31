export default function getMiniMaxabbreviationencyRate(data) {

    return {
        ...usdData(data)
    }
}

function usdData(data) {

    const minMaxRates = {
        'USD': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'EUR': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'RUB': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'CNY': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'PLN': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'GBP': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'CAD': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'CZK': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'JPY': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'SEK': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'CHF': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'UAH': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
        'GEL': {
            maxBuy: 0,
            minSale: 100,
            maxRates: [],
            minRates: [],
        },
    };

    ((data) => {
        for (let key in data) {
            data[key].forEach((el) => {
                for (let abbreviation in el.rates) {

                    const buyRate = el.rates[abbreviation].buy;
                    let maxBuyRate = minMaxRates[abbreviation].maxBuy;
                    const maxRatesArr = minMaxRates[abbreviation].maxRates;

                    if (Number(buyRate) >= Number(maxBuyRate)) {
                        minMaxRates[abbreviation].maxBuy = buyRate;
                        maxRatesArr.push({ ...el, bank: key });

                        if (Number(maxRatesArr[0].rates[abbreviation].buy) < Number(buyRate)) {
                            maxRatesArr.splice(0, maxRatesArr.length - 1);
                        }
                    }
                }
            });
        }
    })(data); //get max buy rate

    ((data) => {
        for (let key in data) {
            data[key].forEach((el) => {
                for (let abbreviation in el.rates) {

                    const saleRate = el.rates[abbreviation].sale;
                    const minSaleRate = minMaxRates[abbreviation].minSale;
                    const minRatesArr = minMaxRates[abbreviation].minRates;

                    if (Number(saleRate) <= Number(minSaleRate) && Number(saleRate) > 0) {
                        minMaxRates[abbreviation].minSale = saleRate;
                        minRatesArr.push({ ...el, bank: key });

                        if (Number(minRatesArr[0].rates[abbreviation].sale) > Number(saleRate)) {
                            minRatesArr.splice(0, minRatesArr.length - 1);
                        }
                    }
                }
            });
        }
    })(data); //get min sale rate

    return minMaxRates;
}

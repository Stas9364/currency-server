export default function getMiniMaxabbreviationencyRate(data) {

    return {
        ...usdData(data)
        //  eurFunction(data),
        //  rubFunction(data)
        //  ...
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
        }
    };

    ((data) => {
        for (let key in data) {
            data[key].forEach((el) => {
                for( let abbreviation in el.rates ) {

                    const buyRate = el.rates[abbreviation].buy;
                    let maxBuyRate = minMaxRates[abbreviation].maxBuy;
                    const minMaxRatesArr = minMaxRates[abbreviation].maxRates;

                    if ( Number(buyRate) >= Number(maxBuyRate) ) {
                        minMaxRates[abbreviation].maxBuy = buyRate;
                        minMaxRatesArr.push({ ...el, bank: key });
    
                        if ( Number(minMaxRatesArr[0].rates[abbreviation].buy) < Number(buyRate) ) {
                            minMaxRatesArr.splice(0, minMaxRatesArr.length - 1);
                        }
                    }
                }
            });
        }
    })(data); //get max buy rate

    ((data) => {
        for (let key in data) {
            data[key].forEach((el) => {
                for( let abbreviation in el.rates ) {

                    const saleRate = el.rates[abbreviation].sale;
                    const minSaleRate = minMaxRates[abbreviation].minSale;
                    const minMaxRatesArr = minMaxRates[abbreviation].minRates;

                    if ( Number(saleRate) <= Number(minSaleRate) && Number(saleRate) > 0 ) {
                        minMaxRates[abbreviation].minSale = saleRate;
                        minMaxRates[abbreviation].minRates.push({ ...el, bank: key });
    
                        if ( Number(minMaxRatesArr[0].rates[abbreviation].sale) > Number(saleRate) ) {
                            minMaxRatesArr.splice(0, minMaxRatesArr.length - 1);
                        }
                    }
                }
            });
        }
    })(data); //get min sale rate

    return minMaxRates;
}

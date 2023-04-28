export default function getMiniMaxcurrencyencyRate(data) {

    return {
        ...usdData(data)
    }
}

const banks = [
    'belapb', 'belarus', 'bnb',
    'dabrabyt', 'paritet', 'rrb',
    'techno'
];

function usdData(data) {
    const currArr = [
        'USD', 'EUR', 'RUB',
        'CNY', 'PLN', 'GBP',
        'CAD', 'CZK', 'JPY',
        'SEK', 'CHF', 'UAH',
        'GEL'
    ];

    const minMaxRates = {};
    currArr.forEach((c) => minMaxRates[c] = {
        maxBuy: 0,
        minSale: 100,
        maxRates: [],
        minRates: [],
        maxArr: [],
        minArr: []
    });

    ((data) => {
        for (let bankName in data) {
            data[bankName].forEach((departrment) => {

                for (let currency in departrment.rates) {

                    const buyRate = departrment.rates[currency].buy;
                    const maxBuyRate = minMaxRates[currency].maxBuy;
                    const maxRatesArr = minMaxRates[currency].maxArr;

                    if ((Number(buyRate) >= Number(maxBuyRate)) && (Number(buyRate) !== 0)) {
                        minMaxRates[currency].maxBuy = buyRate;
                        maxRatesArr.push({ ...departrment, bank: bankName });

                        if (Number(maxRatesArr[0].rates[currency].buy) < Number(buyRate)) {
                            maxRatesArr.splice(0, maxRatesArr.length - 1);
                        }
                    }
                }
            });
        }
    })(data); //get max buy rate

    ((data) => {
        for (let bankName in data) {
            data[bankName].forEach((departrment) => {
                for (let currency in departrment.rates) {

                    const saleRate = departrment.rates[currency].sale;
                    const minSaleRate = minMaxRates[currency].minSale;
                    const minRatesArr = minMaxRates[currency].minArr;

                    if (Number(saleRate) <= Number(minSaleRate) && Number(saleRate) > 0) {
                        minMaxRates[currency].minSale = saleRate;
                        minRatesArr.push({ ...departrment, bank: bankName });

                        if (Number(minRatesArr[0].rates[currency].sale) > Number(saleRate)) {
                            minRatesArr.splice(0, minRatesArr.length - 1);
                        }
                    }
                }
            });
        }
    })(data); //get min sale rate


    banks.forEach((bankName) => {
        currArr.forEach((currency) => {
            const arrMax = [];

            minMaxRates[currency].maxArr.forEach((department) => {
                if (department.bank === bankName) {
                    arrMax.push(department);
                }
            })
            if (arrMax.length) {
                minMaxRates[currency].maxRates.push(arrMax);
            }
        })
    })

    banks.forEach((bankName) => {
        currArr.forEach((currency) => {
            const arrMin= [];

            minMaxRates[currency].minArr.forEach((department) => {
                if (department.bank === bankName) {
                    arrMin.push(department);
                }
            })
            if (arrMin.length) {
                minMaxRates[currency].minRates.push(arrMin);
            }
        })
    })

    for(let curr in minMaxRates) {
        delete minMaxRates[curr].maxArr;
        delete minMaxRates[curr].minArr;
    }


    return minMaxRates;
}

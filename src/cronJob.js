import cron from "node-cron";

import { redisSetter } from "./redis/redisDB.js";
import rrbData from "./banks/rrb.js";
import absolutData from "./banks/absolut.js";
import dabrabytData from "./banks/dabrabyt.js";
import belarusBData from "./banks/belarusB.js";
import vtbData from "./banks/vtb.js";
import alfaData from "./banks/alfa.js";
import belapbData from "./banks/belapb.js";
import paritetData from "./banks/paritet.js";
import bnbData from "./banks/bnb.js";
import technoData from "./banks/techno.js";

import * as request from "./requests.js";

function getAllCurrency() {
    currencyRequest().then(res => redisSetter(res))
}

// cron.schedule("*/2 * * * * ", () => {
//     console.log(999)
//     currencyRequest()
// })

export default async function currencyRequest() {

    const requests = [
        request.belapbCurrency(),
        request.rrbCurrency(),
        request.dabrabytCurrency(),
        request.belarusBCurrency(),
        request.paritetCurrency(),
        request.bnbCurrency(),
        request.technoCurrency()
    ];

    Promise.all(requests)
        .then(([belapb, rrb, dabrabyt, belarusB, paritet, bnb, techno, vtb, absolut, alfa]) => {

            const result = {
                belapb: belapbData(belapb),
                rrb: rrbData(rrb),
                belarus: belarusBData(belarusB),
                dabrabyt: dabrabytData(dabrabyt),
                paritet: paritetData(paritet),
                bnb: bnbData(bnb),
                techno: technoData(techno)
            };

            redisSetter(result)
        });
}
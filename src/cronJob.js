import cron from "node-cron";

import { redisSetter } from "./redis/redisDB.js";
import rrbData from "./banks/rrb.js";
import absolutData from "./banks/absolut.js";
import dabrabytData from "./banks/dabrabyt.js";
import belarusBData from "./banks/belarusB.js";
import vtbData from "./banks/vtb.js";
import alfaData from "./banks/alfa.js";
import belapbData from "./banks/belapb.js";

import * as request from "./requests.js";

function getAllCurrency() {
    // const requests = [request.rrbCurrency(), request.dabrabytCurrency(), request.belarusBCurrency()];

    // Promise.all(requests)
    //     .then(([rrb, dabrabyt, belarusB, vtb, absolut, alfa]) => {
    //         const result = {
    //             rrb: rrbData(rrb),
    //             belarus: belarusBData(belarusB),
    //             dabrabyt: dabrabytData(dabrabyt)
    //         };
    currencyRequest().then(res => redisSetter(res))
    // redisSetter();
    //     });
}

// cron.schedule("*/1 * * * * * ", () => {
//     console.log(999)
// getAllCurrency()
// })

export default async function currencyRequest(departments) {
    
    const requests = [request.belapbCurrency(), request.rrbCurrency(), request.dabrabytCurrency(), request.belarusBCurrency()];

    return Promise.all(requests)
        .then(([belapb, rrb, dabrabyt, belarusB, vtb, absolut, alfa]) => {
            const result = {
                belapb: belapbData(belapb, departments),
                // rrb: rrbData(rrb),
                // belarus: belarusBData(belarusB),
                // dabrabyt: dabrabytData(dabrabyt)
            };
            redisSetter(result)
        });
}
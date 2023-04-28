import cron from "node-cron";

import { redisSetter } from "../state/redis-db.js";
import rrbData from "../services/rrb.js";
import absolutData from "../services/absolut.js";
import dabrabytData from "../services/dabrabyt.js";
import belarusBData from "../services/belarusB.js";
import vtbData from "../services/vtb.js";
import alfaData from "../services/alfa.js";
import belapbData from "../services/belapb.js";
import paritetData from "../services/paritet.js";
import bnbData from "../services/bnb.js";
import technoData from "../services/techno.js";

import * as request from "../bank-data-requests.js";

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
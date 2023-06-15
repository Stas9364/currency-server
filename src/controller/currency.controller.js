import cron from "node-cron";

import { redisSetter } from "../state/redis-db.js";

import rrbData from "../services/rrb.services/rrb-curency.js";
import dabrabytData from "../services/dabrabyt.services/dabrabyt-currency.js";
import belarusBData from "../services/belarusB.services/belarusB-currency.js";
import belapbData from "../services/belapb-services/belapb-currency.js";
import paritetData from "../services/paritet.services/paritet-currency.js";
import bnbData from "../services/bnb.services/bnb-currency.js";
import technoData from "../services/techno.services/techno-currency.js";
import absolutData from "../services/absolut.js";
import vtbData from "../services/vtb.js";
import alfaData from "../services/alfa.js";

import technoCrossData from "../services/techno.services/techno-cross.js";
import belarusBCrossData from "../services/belarusB.services/belarusB-cross.js";
import dabrabytCrossData from "../services/dabrabyt.services/dabrabyt-cross.js";
import bnbCrossData from "../services/bnb.services/bnb-cross.js";
import belinvestCrossData from "../services/belinvest.services/belinvest-cross.js";
import paritetCrossData from "../services/paritet.services/paritet-cross.js";
import belapbCrossData from "../services/belapb-services/belapb-cross.js";

import * as request from "../bank-data-requests.js";
import belinvestData from "../services/belinvest.services/belinvest-currency.js";
import rrbCrossData from "../services/rrb.services/rrb-cross.js";

// cron.schedule("*/5 * * * * ", () => {
//     console.log('Cron worked out')
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
        request.technoCurrency(),
        request.belinvestCurrency()
    ];

    Promise.all(requests)
        .then(([belapb, rrb, dabrabyt, belarusB, paritet, bnb, techno, belinvest, vtb, absolut, alfa]) => {

            const currencyRates = {
                belapb: belapbData(belapb),
                rrb: rrbData(rrb),
                belarus: belarusBData(belarusB),
                dabrabyt: dabrabytData(dabrabyt),
                paritet: paritetData(paritet),
                bnb: bnbData(bnb),
                techno: technoData(techno),
                belinvest: belinvestData(belinvest)
            };

            const crossCourses = {
                techno: technoCrossData(techno),
                belarus: belarusBCrossData(belarusB),
                dabrabyt: dabrabytCrossData(dabrabyt),
                rrb: rrbCrossData(rrb),
                bnb: bnbCrossData(bnb),
                belinvest: belinvestCrossData(belinvest),
                paritet: paritetCrossData(paritet),
                belapb: belapbCrossData(belapb)
            };

            redisSetter({currencyRates, crossCourses});
        });
}
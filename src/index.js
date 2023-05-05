import express from "express";
import cors from "cors";

import * as dotenv from 'dotenv';
dotenv.config();

import fetch from "node-fetch";
import xml2js from "xml2js";
const parser = new xml2js.Parser();
import iconv from "iconv-lite";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import './controller/currency.controller.js';
import currencyRequest from "./controller/currency.controller.js";
import { redisGetter } from "./state/redis-db.js";
import getCurrencyByCity from "./helper/get-currency-by-city.js";
import CurrencyData from "./bank-data-stucture/currency-data-model.js";
import RateData from "./bank-data-stucture/rate-data-model.js";
import paritetData from "./services/paritet.js";

import * as requests from "./bank-data-requests.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const city = req.query.city;

    const value = await redisGetter();

    if (Object.keys(value).length !== 0) {
        res
            .status(202)
            .send(getCurrencyByCity(value, city));
    } else {
        res
            .status(500)
            .json({ error: { message: 'Courses have not been received yet!' } });
    }

    // currencyRequest()


    // const request = await fetch('https://ibank.belinvestbank.by/api/groupCourses.php');
    // const exchangeRatesXML = await request.arrayBuffer();

    // const decodedData = iconv.decode(Buffer.from(exchangeRatesXML), 'cp1251').toString();

    // const o = await parser.parseStringPromise(decodedData);

    // const elements = o['IFX']['BankSvcRs'][0]['ForExRateInqRs'];

    // let arr = [];
    // const rates = [];

    // for (let k = 0; k < elements.length; k++) {
    //     const units = elements[k]['Units'][0]['Unit'];
    //     const element = elements[k]; 
    //     for (let i = 0; i < units.length; i++) {
    //         arr.push(units[i]);
    //     }
    //     if (element['BaseCurCode'][0] === 'BYN') {
    //         rates.push({
    //             iso: element['CurCode'][0],
    //             scale: element['CurAmnt'][0],
    //             [element['ForExRateDealType']]: element['ForExRateRec'][0]['ForExRateInfo'][0]['CurRate'][0]
    //         })
    //     }
    // }

    // const combineCurrencies = [];
    // for (let i = 0; i <= rates.length; i = i + 2) {
    //     combineCurrencies.push({ ...rates[i], ...rates[i + 1] });
    // }

    // const depTable = {};
    // const resultDepartments = arr.filter(({ Name }) => (!depTable[Name] && (depTable[Name] = 1)));

    // const table = {};
    // const resultCurrencies = combineCurrencies.filter(({ iso }) => (!table[iso] && (table[iso] = 1)));
    // resultCurrencies.splice(-1, 1);

    // const result = [];
    // resultDepartments.forEach((department, i) => {
    //     const ratesObj = {};

    //     result.push(new CurrencyData(
    //         'Белинвестбанк',
    //         i,
    //         department['City'][0],
    //         department['Address'][0],
    //         ratesObj
    //     ));

    //     resultCurrencies.forEach((currencyRate) => {
    //         ratesObj[currencyRate['iso']] = new RateData(
    //             currencyRate['iso'],
    //             currencyRate['Buy'],
    //             currencyRate['Sell'],
    //             currencyRate['scale'],
    //         )
    //     })
    // })

    // res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});



if (!await redisGetter()) {
    console.log('Send request for courses')
    currencyRequest();
}
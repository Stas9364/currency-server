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
import getCrossRateByCity from "./helper/get-cross-rate-by-city.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const city = req.query.city || 'Минск';

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



    // res.send(value);
    // currencyRequest()

});


app.get('/cross', async (req, res) => {
    const city = req.query.city || 'Минск';

    const value = await redisGetter();

    res.send(getCrossRateByCity(value, city));
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});


if (!(await redisGetter()).banks) {
    console.log('Send request for courses')
    currencyRequest();
}

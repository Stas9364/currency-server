import express from "express";
import cors from "cors";

import * as dotenv from 'dotenv';
dotenv.config();

import fetch from "node-fetch";
import xml2js from "xml2js";
const parser = new xml2js.Parser();

import './cronJob.js';
import currencyRequest from "./cronJob.js";
import { redisGetter } from "./redis/redisDB.js";
import getCurrencyByCity from "./helper/getCurrencyByCity.js";
import CurrencyData from "./models/currencyDataModel.js";
import RateData from "./models/rateDataModel.js";
import paritetData from "./banks/paritet.js";

import * as requests from "./requests.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const city = req.query.city;

    const value = await redisGetter();

    res.send(getCurrencyByCity(value, 'Минск'));

    // initialRequest()
});


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});


function initialRequest() {
    currencyRequest();
}

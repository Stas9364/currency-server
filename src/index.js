import express from "express";
import cors from "cors";

import * as dotenv from 'dotenv';
dotenv.config();

import './cronJob.js';
import currencyRequest from "./cronJob.js";
import { redisGetter } from "./redis/redisDB.js";
import getCurrencyByCity from "./helper/getCurrencyByCity.js";

import * as requests from "./requests.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const city = req.query.city;

    const value = await redisGetter();

    const b = await requests.belapbCurrency()
    const sellPoints = b.ExBanksList.Bank.filter(el => el.BankType[0] === 'Точки продаж')
    res.send(sellPoints);
    // console.log(sellPoints.length);
    // res.send(getCurrencyByCity(value, 'Могилев'));
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

import fetch from "node-fetch";
import xml2js from "xml2js";
const parser = new xml2js.Parser();

export async function belapbDepartments() {
    try {
        const req = await fetch('https://belapb.by/ExBanks.php');
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

function initialRequest() {
    belapbDepartments()
        .then(departments => {
            const filteredDepartmentsByType =
                departments.ExBanksList.Bank.filter(el => {
                    return el.BankType[0] === 'Точки продаж';
                });

            currencyRequest(filteredDepartmentsByType);
        });
}
// initialRequest()
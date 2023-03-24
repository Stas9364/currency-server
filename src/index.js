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

import * as requests from "./requests.js";

import RateData from "./models/rateDataModel.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const city = req.query.city;

    const value = await redisGetter();

    // try {
    //     const req = await fetch('https://developerhub.alfabank.by:8273/partner/1.0.0/public/rates');
    //     const exchangeRatesXML = await req.text();
    //     const result = await parser.parseStringPromise(exchangeRatesXML);
    //    res.send(result)
    // } catch (e) {
    //     console.log(e);
    // }
    // const b = await requests.belapbCurrency()
    // const sellPoints = b.ExBanksList.Bank.filter(el => el.BankType[0] === 'Точки продаж')
    // res.send(sellPoints);
    // console.log(sellPoints.length);
    // res.send(getCurrencyByCity(value, 'Могилев'));

    // belapbData().then(resp => res.send(resp))
    // initialRequest().then(resp => res.send(resp))
    // initialRequest()
    // res.send(value)


});

async function belapbData(data) {
    const arr = [];
    const bankId = new Set();
    const rates = {}
    const belapbData = await requests.belapbCurrency();

    belapbData.DailyExRates.Currency.forEach(el => bankId.add(el.BankId[0]));

    [...bankId].forEach(id => {
        const departmentCurrency = {};
        const currencyRate = [];

        belapbData.DailyExRates.Currency.forEach(el => {
            if (id === el.BankId[0]) {
                currencyRate.push(
                    new RateData(
                        el.CharCode[0],
                        el.RateBuy[0],
                        el.RateSell[0],
                        el.Scale[0]
                    ));
            }
        })

        rates[id] = currencyRate;
        // arr.push(departmentCurrency);
    })

    return rates;
    // const r = {}
    // return {currency: arr};
}

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});



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
    //if will many request for departments use Promise.All 
    return belapbDepartments()
        .then(departments => {
            const filteredDepartmentsByType =
                departments.ExBanksList.Bank.filter(el => {
                    return el.BankType[0] === 'Точки продаж';
                });

            // return filteredDepartmentsByType[0]
            currencyRequest(filteredDepartmentsByType);
        });
}

// initialRequest()
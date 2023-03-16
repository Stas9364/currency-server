import express from "express";
import xml2js from "xml2js";
import fetch from "node-fetch";
import cors from "cors";

import rrbData from "./rrb.js";
import absolutData from "./absolut.js";
import CurrencyData from "./currencyDataModel.js";


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const parser = new xml2js.Parser();

app.get('/', (req, res) => {
    const requests = [rrbCurrency()];
    const arr = [];
    Promise.all(requests).then((rrb) => {
        rrb[0].currency.filials[0].filial.forEach((element, i) => {
            // for (let i = 0; i < 1; i++) {
                // const ratesArray = [];
                // for (let k = 0; k < element.rates[i].value.length; k++) {
                //     ratesArray.push(element.rates[i].value[k]['$']);
                //     arr.push(new CurrencyData(
                //         element.id[0],
                //         element.city[0],
                //         element.address[0],
                //         ratesArray
                //     ));
                // }
            // }

       console.log(element.rates[i])
        });

        // res.send(arr);
    });
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

const rrb = 'https://www.rrb.by/export/get-currency?date=2023-03-05';
const vtb = 'https://www.vtb.by/sites/default/files/rates.xml';
const absolut = 'https://absolutbank.by/exchange-rates.xml';
const dabrabyt = 'https://bankdabrabyt.by/export_courses.php';
const belarusB = 'https://belarusbank.by/api/kursExchange?city=Бобруйск';
const alfa = 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/rates';

async function rrbCurrency() {
    try {
        const req = await fetch(rrb);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

async function vtbCurrency() {
    try {
        const req = await fetch(vtb);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

async function absolutCurrency() {
    try {
        const req = await fetch(absolut);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

async function dabrabytCurrency() {
    try {
        const req = await fetch(dabrabyt);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

async function belarusBCurrency() {
    try {
        const req = await fetch(belarusB);
        const result = await req.json();
        return await { data: { ...result } };
    } catch (e) {
        console.log(e);
    }
}

async function alfaCurrency() {
    try {
        const req = await fetch(alfa);
        return await req.json();
    } catch (e) {
        console.log(e);
    }
}
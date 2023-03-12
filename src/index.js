import express from "express";
import xml2js from "xml2js";
import fetch from "node-fetch";

const PORT = process.env.PORT || 3000;

const app = express();

const parser = new xml2js.Parser();

app.get('/', (req, res) => {
    get().then(resp => res.send(resp))
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

const url = 'https://www.rrb.by/export/get-currency?date=2023-03-10';

async function get () {
    try {
        const req = await fetch(url);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}
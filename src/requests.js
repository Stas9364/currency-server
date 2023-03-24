import fetch from "node-fetch";

import xml2js from "xml2js";
const parser = new xml2js.Parser();

const rrb = 'https://www.rrb.by/export/get-currency';
const vtb = 'https://www.vtb.by/sites/default/files/rates.xml';
const absolut = 'https://absolutbank.by/exchange-rates.xml';
const dabrabyt = 'https://bankdabrabyt.by/export_courses.php';
const belarusB = 'https://belarusbank.by/api/kursExchange';
const alfa = 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/rates';
const belapb = 'https://belapb.by/CashExRatesDaily.php';

export async function rrbCurrency() {
    try {
        const req = await fetch(rrb);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

export async function vtbCurrency() {
    try {
        const req = await fetch(vtb);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

export async function absolutCurrency() {
    try {
        const req = await fetch(absolut);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

export async function dabrabytCurrency() {
    try {
        const req = await fetch(dabrabyt);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

export async function belarusBCurrency(city) {
    try {
        const req = await fetch(belarusB);
        const result = await req.json();
        return await { result };
    } catch (e) {
        console.log(e);
    }
}

export async function alfaCurrency() {
    try {
        const req = await fetch(alfa);
        return await req.json();
    } catch (e) {
        console.log(e);
    }
}

export async function belapbCurrency() {
    try {
        const req = await fetch(belapb);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}
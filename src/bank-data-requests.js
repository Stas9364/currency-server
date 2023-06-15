import fetch from "node-fetch";

import xml2js from "xml2js";
const parser = new xml2js.Parser();

import iconv from "iconv-lite";

const rrb = 'https://www.rrb.by/export/get-currency';
const vtb = 'https://www.vtb.by/sites/default/files/rates.xml';
const absolut = 'https://absolutbank.by/exchange-rates.xml';
const dabrabyt = 'https://bankdabrabyt.by/export_courses.php';
const belarusB = 'https://belarusbank.by/api/kursExchange';
const alfa = 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/rates';
const belapb = {
    currency: 'https://belapb.by/CashExRatesDaily.php',
    departments: 'https://belapb.by/ExBanks.php',
    cross: 'https://belapb.by/CashConvRatesDaily.php?ondate'
};
const paitet = 'https://www.paritetbank.by/api/v3/branches/';
const bnb = 'https://bnb-api.bnb.by/api/v1/info/full/';
const techno = 'https://tb.by/mob_courses.php';
const belinvest = 'https://ibank.belinvestbank.by/api/groupCourses.php';

export async function technoCurrency() {
    try {
        const req = await fetch(techno);
        const exchangeRatesXML = await req.text();
        return await parser.parseStringPromise(exchangeRatesXML);
    } catch (e) {
        console.log(e);
    }
}

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
        return { result };
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
        const reqCurr = await fetch(belapb.currency);
        const exchangeRatesXMLCurr = await reqCurr.text();
        const currencies = await parser.parseStringPromise(exchangeRatesXMLCurr); //currency JSON

        const reqCross= await fetch(belapb.cross);
        const exchangeRatesXMLCross = await reqCross.text();
        const cross = await parser.parseStringPromise(exchangeRatesXMLCross); //cross JSON

        const reqDep = await fetch(belapb.departments);
        const exchangeRatesXMLDep = await reqDep.text();
        const departments = await parser.parseStringPromise(exchangeRatesXMLDep); //departments JSON

        const filteredDepartments =
            departments.ExBanksList.Bank.filter(el => {
                return el.BankType[0] === 'Точки продаж';
            });

        return { currencies, filteredDepartments, cross };
    } catch (e) {
        console.log(e);
    }
}

export async function paritetCurrency() {
    try {
        const req = await fetch(paitet);
        return await req.json();
    } catch (e) {
        console.log(e);
    }
}

export async function bnbCurrency() {
    try {
        const req = await fetch(bnb);
        return await req.json();
    } catch (e) {
        console.log(e);
    }
}

export async function belinvestCurrency() {
    try {
        const req = await fetch(belinvest);
        const exchangeRatesXML = await req.arrayBuffer();

        const decodedData = iconv.decode(Buffer.from(exchangeRatesXML), 'cp1251').toString();
        
        return await parser.parseStringPromise(decodedData);
    } catch (e) {
        console.log(e);
    }
}
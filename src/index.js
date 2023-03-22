import express from "express";
import cors from "cors";

import * as dotenv from 'dotenv';
dotenv.config();

import './cronJob.js';
import {redisGetter} from "./redis/redisDB.js";
import getCurrencyByCity from "./helper/getCurrencyByCity.js";

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    const city = req.query.city;

    const value = await redisGetter();
    
    res.send(getCurrencyByCity(value, 'Могилев'));
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

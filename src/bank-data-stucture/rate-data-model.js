export default class RateData {
    constructor(iso, buy, sale, scale) {
        this.iso = iso;
        this.buy = buy;
        this.sale = sale;
        this.scale = scale;
    }
}

export class CrossData {
    constructor(iso1, iso2, buy, sale) {
        this.iso1 = iso1;
        this.iso2 = iso2;
        this.buy = buy;
        this.sale = sale;
    }
}
export const ANY = "_*_";

export class MockResponse {
    constructor(payload, status = 200, ok = status == 200) {
        this.json = () => payload;
        this.ok = ok;
        this.status = status;
    }
    clone() {
        return this;
    }
}

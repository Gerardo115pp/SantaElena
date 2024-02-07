export class HttpResponse {
    constructor(response, data) {
        this.status = response.status;
        this.data = data;
        this.headers = response.headers;
    }

    /**
     * Returns true if the response status larger than or equal to 200 and less than 300
     * @returns {boolean}
     */
    get Ok() {
        return this.status >= 200 && this.status < 300;
    }
}

export function attributesToJson() {
    const json_data = {};
    Object.entries(this).forEach(([key, value]) => {
        if (!(this[key] instanceof Function) && key[0] !== '_') {
            json_data[key] = value;
        }
    });
    return JSON.stringify(json_data);
}

export function attributesToJsonExclusive() {
    const json_data = {};
    Object.entries(this).forEach(([key, value]) => {
        if (!(this[key] instanceof Function) && key[0] !== '_' && value !== null) {
            json_data[key] = value;   
        }
    });

    return JSON.stringify(json_data);
}

export class HttpResponse {
    constructor(response, data) {
        this.status = response.status;
        this.data = data;
        this.headers = response.headers;
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

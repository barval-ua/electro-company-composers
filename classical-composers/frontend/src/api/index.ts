import { HttpError } from "./HttpError";

enum Endpoint {
    COMPOSERS = '/composers'
}

class HttpApi {
    constructor(private readonly apiUrl: string) {}

    private async get(path: Endpoint) {
        const response = await fetch(this.apiUrl + path, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new HttpError(response.status);
        }

        return await response.json();
    }

    async getComposers() {
        return this.get(Endpoint.COMPOSERS);
    }
}

const httpApi = new HttpApi(window.location.origin + '/api');

export default httpApi;

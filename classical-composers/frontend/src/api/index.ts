import { HttpError } from "./HttpError";
import type { Composer, Contact } from "./types";

enum Endpoint {
    COMPOSERS = '/composers',
    CONTACT_DETAILS = '/contacts/:id'
}

class HttpApi {
    constructor(private readonly apiUrl: string) {}

    private async get<T>(endpoint: Endpoint, pathParameters?: Record<string, string|number>): Promise<T> {
        let path = endpoint as string;
        if (pathParameters) {
            for (const [name, value] of Object.entries(pathParameters)) {
                path = path.replace(`:${name}`, value.toString());
            }
        }

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
        return this.get<Composer[]>(Endpoint.COMPOSERS);
    }

    async getContactDetails(id: number) {
        return this.get<Contact>(Endpoint.CONTACT_DETAILS, { id });
    }
}

const httpApi = new HttpApi(window.location.origin + '/api');

export default httpApi;

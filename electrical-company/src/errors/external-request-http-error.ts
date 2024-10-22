type ResponseErrorData = {
    statusCode: number;
    statusMessage: string;
    unrecoverable: boolean;
}

export class ExternalRequestHttpError extends Error {
    readonly responseErrorData: ResponseErrorData;
    readonly responseBody?: any;

    constructor(statusCode: number, responseBody?: any) {
        super(`Request failed with status code ${statusCode}`);
        this.responseErrorData = this.getResponseErrorData(statusCode);
        this.responseBody = responseBody;
    }

    private getResponseErrorData(statusCode: number): ResponseErrorData {
        const unrecoverable = statusCode === 401;
        let statusMessage;

        switch (statusCode) {
            case 400:
                statusMessage = 'Bad Request';
                break;
            case 401:
                statusMessage = 'Authentication Error';
                break;
            case 403:
                statusMessage = 'Authorization Error';
                break;
            case 404:
                statusMessage = 'Not Found';
                break;
            case 409:
                statusMessage = 'Conflict';
                break;
            default:
                statusMessage = 'Request Error';
                break;
        }

        return {
            statusCode,
            statusMessage,
            unrecoverable,
        };
    }
}
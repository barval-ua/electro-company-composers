export class HttpError extends Error {
    constructor(private readonly code: number) {
        super(`HTTP Request failed with status ${code}`);
    }
}
import { traceparent } from 'tctx';
import { ExternalRequestHttpError } from '../errors/external-request-http-error';
import { MessageProcessError } from './message-process-error';
import { config } from './config';

export type Email = {
    from: string;
    to: string[];
    messageBody: string;
}

export class ExternalMailer {
    static async sendEmail(payload: Email) {
        const traceId = traceparent.make().toString();

        let response: Response;
        try {
            response = await fetch(config.emailApiUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json, */*",
                    "Content-Type": "application/json",
                    Traceparent: traceId,
                    Authorization: "Bearer " + config.mailerApiKey,
                },
                body: JSON.stringify(payload)
            });
        } catch (e) {
            console.error(e);
            throw new MessageProcessError('Failed to call extenal mailer API');
        }
    
        if (response.ok === true) {
            return;
        }
    
        console.warn(`External mailer API returned non-success status: ${response.status}`);
    
        if (response.status === 401) {
            throw new ExternalRequestHttpError(response.status);
        }
    
        const responseBody = await response.json();
    
        throw new ExternalRequestHttpError(response.status, responseBody);
    }
}
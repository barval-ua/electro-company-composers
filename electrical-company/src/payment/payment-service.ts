import { traceparent } from 'tctx';
import { config } from './config';
import { PaymentMethod } from './payment-method.type';
import { PaymentProcessError } from './payment-process-error';
import { ExternalRequestHttpError } from '../errors/external-request-http-error';
import { FailedPaymentError } from './failed-payment-error';

export type Payment = {
    customerId: number;
    paymentMethod: PaymentMethod;
    amount: string;
}

export class PaymentService {

    static async makePayment(payload: Payment) {
        const traceId = traceparent.make().toString();

        let response: Response;
        try {
            response = await fetch(config.paymentApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Traceparent: traceId,
                    Authorization: 'Bearer ' + config.stripeApiKey,
                },
                body: JSON.stringify(payload)
            });
        } catch (e) {
            console.error(e);
            throw new PaymentProcessError('Failed to call Stripe payment API');
        }

        if (response.ok === true) {
            return;
        }

        console.warn(`External payment API returned non-success status: ${response.status}`);

        if (response.status === 403) {
            throw new ExternalRequestHttpError(response.status);
        }

        const responseBody = await response.json();

        // probably expecting some object, but technically JSON.parse() can return a string
        if (responseBody === 'Payment Failed') {
            throw new FailedPaymentError();
        }

        throw new ExternalRequestHttpError(response.status, responseBody);
    }
}
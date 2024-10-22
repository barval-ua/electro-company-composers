import { PaymentMessageFactory } from './payment-message-factory';
import { Customer } from '../customer/customer.type';
import { PaymentMethod } from '../payment/payment-method.type';
import { config } from './config';
import { MessageProcessError } from './message-process-error';
import { Email, ExternalMailer } from './external-mailer';


function generateMessageBody(customerName: string, paymentMethod: PaymentMethod) {
    switch (paymentMethod.type) {
        case 'card':
            return PaymentMessageFactory.cardPaymentFailed(customerName, paymentMethod.brand, paymentMethod.last4digits);
        case 'euBankAccount':
            return PaymentMessageFactory.euBankPaymentFailed(customerName, paymentMethod.bankName, paymentMethod.last4digits);
        case 'usBankAccount':
            return PaymentMessageFactory.usBankPaymentFailed(customerName, paymentMethod.bankName, paymentMethod.last4digits);
        default:
            throw new MessageProcessError(`Cannot generate message for unsupported type of PaymentMethod: '${paymentMethod}'`);
    }
}

function generateMessageRecipients(customer: Customer) {
    if (customer.email) {
        return [customer.email];
    }
    if (!customer.phone?.number) {
        return [];
    }

    // An SMS message may be sent to any phone number from an email via the carrier's gateway email address
    const mobileCarrier = customer.phone.mobileCarrier;
    if (mobileCarrier && !config.smsGatewayEmailTemplates[mobileCarrier]) {
        throw new MessageProcessError(`Unsupported mobile carrier: '${mobileCarrier}'`);
    }

    // If we don't know what carrier is used, we need to send the message to all supported carriers.
    const emailTemplates = mobileCarrier ? [config.smsGatewayEmailTemplates[mobileCarrier]] : Object.values(config.smsGatewayEmailTemplates);

    return emailTemplates.map((template) => template.replace('{{number}}', customer.phone.number));
}

export async function sendMessage(customer: Customer, paymentMethod: PaymentMethod) {
    const messageRecipients = generateMessageRecipients(customer);
    if (!messageRecipients.length) {
        return;
    }

    const messageBody = generateMessageBody(customer.name, paymentMethod);

    const emailPayload: Email = {
        from: config.emailFromAddress,
        to: messageRecipients,
        messageBody,
    };

    await ExternalMailer.sendEmail(emailPayload);
}

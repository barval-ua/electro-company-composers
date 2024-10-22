import customers from '../customer-list.json';
import { Customer } from '../customer/customer.type';
import { getDefaultPaymentMethod } from '../customer/customer-helper';
import { sendMessage } from '../message/message-service';
import { FailedPaymentError } from './failed-payment-error';
import { PaymentProcessError } from './payment-process-error';
import { Payment, PaymentService } from './payment-service';


const CHUNK_SIZE = 5;

(async function() {
    // processing in chunks to benefit from parallel requests
    const chunkNumber = Math.ceil(customers.length / CHUNK_SIZE);

    for (let i = 0; i < chunkNumber; i++) {
        const customersChunk = customers.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE) as Customer[];
        await Promise.all(customersChunk.map((customer) => processCustomer(customer)));
    }
})();

async function processCustomer(customer: Customer) {
    try {
        await makePayment(customer);
        console.log('Successfully processed payment for customer', customer.id);
    } catch (e) {
        console.error('The payment failed to process:', e);
        await handlePaymentFailure(e, customer);
    }
}

async function makePayment(customer: Customer) {
    const paymentMethod = getDefaultPaymentMethod(customer);
    if (!paymentMethod) {
        throw new PaymentProcessError(`Cannot proceed with payment. Customer ${customer.id} has no default payment method.`);
    }

    const paymentPayload: Payment = {
        customerId: customer.id,
        paymentMethod,
        amount: getCustomerPaymentAmount(customer.id)
    };

    await PaymentService.makePayment(paymentPayload);
}

async function handlePaymentFailure(error: Error, customer: Customer) {
    if (!(error instanceof FailedPaymentError)) {
        return;
    }

    const paymentMethod = getDefaultPaymentMethod(customer);

    try {
        await sendMessage(customer, paymentMethod);
    } catch (e) {
        // Do not interrupt processing customers if notification system fails
        console.error(`Failed to notify customer on payment failure`, e);
    }
}

function getCustomerPaymentAmount(customerId: number) {
    const amount = Math.floor(Math.random() * (100 - 50 + 1) + 50) + Math.random();
    return amount.toFixed(2);
}
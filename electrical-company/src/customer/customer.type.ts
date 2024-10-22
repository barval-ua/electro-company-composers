import { PaymentMethod } from '../payment/payment-method.type';

export type Customer = {
    id: number;
    name: string;
    email?: string;
    phone?: {
        mobileCarrier?: string;
        number: string;
    };
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod: string;
}

import { Customer } from './customer.type';

export const getDefaultPaymentMethod = (customer: Customer) =>
    customer.defaultPaymentMethod && customer.paymentMethods.find((pm) => pm.id === customer.defaultPaymentMethod);
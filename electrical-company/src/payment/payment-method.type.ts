type PaymentMethodType = 'card' | 'usBankAccount' | 'euBankAccount';

interface BasePaymentMethod {
    id: string;
    type: PaymentMethodType;
    last4digits: string; // since last digits may include leading zeroes use type string
}

interface Card extends BasePaymentMethod {
    type: 'card';
    brand: string;
}

interface UsBankAccount extends BasePaymentMethod {
    type: 'usBankAccount',
    bankName: string;
    accountType: string;
}

interface EuBankAccount extends BasePaymentMethod {
    type: 'euBankAccount'
    bankName: string;
    countryCode: string;
}

export type PaymentMethod = Card | UsBankAccount | EuBankAccount;

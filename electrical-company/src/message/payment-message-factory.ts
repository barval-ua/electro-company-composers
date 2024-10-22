export class PaymentMessageFactory {

    static cardPaymentFailed(customerName: string, cardBrand: string, cardNumberLast4Digits: string) {
        return `Hello, ${customerName},
        The scheduled payment for your electrical bill ending from your ${cardBrand} credit card ending in ${cardNumberLast4Digits} failed.
        Please verify your payment details and try again.`;
    }

    static euBankPaymentFailed(customerName: string, bankName: string, accountNumberLast4Digits: string) {
        return `Hello, ${customerName},
        The scheduled payment for your electrical bill ending from your ${bankName} bank in ${accountNumberLast4Digits} failed.
        Please verify your payment details and try again.`;
    }

    static usBankPaymentFailed(customerName: string, bankName: string, accountNumberLast4Digits) {
        return `Hello, ${customerName},
        The scheduled payment for your electrical bill ending from your ${bankName} account ending in ${accountNumberLast4Digits} failed.
        Please verify your payment details and try again.`;
    }
}
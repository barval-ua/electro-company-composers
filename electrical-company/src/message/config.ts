export const config = {
    mailerApiKey: process.env.API_KEY,
    emailApiUrl: 'https://some-email-api',
    emailFromAddress: 'paymentprocessing@aep.com',
    smsGatewayEmailTemplates: {
        'at&t': '{{number}}@text.att.net',
        'tmobile': '{{number}}@tmomail.net',
        'verizon': '{{number}}@vtext.com',
    },
    paymentApiUrl: 'https://api.stripe.com/some-payment-endpoint',
};

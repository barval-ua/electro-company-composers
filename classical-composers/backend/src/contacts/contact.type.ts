export type Contact = {
    id: number;
    email: string;
    phone: string;
    address: {
        streetAddr: string;
        city: string;
        stateCode: string;
        postalcode: string;
    }
}

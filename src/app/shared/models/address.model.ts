export class Address {
    name: string;
    mob_number: string;
    pincode: string;
    address: string;
    city: string;
    state: string;
    addressId: number;
    userId: number

    constructor(addr?: Partial<Address>) {
        // assigns the product to all the above attributes
        Object.assign(this, addr);
    }
}
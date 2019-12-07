export class CartItem {
    title: string;
    imagePath: string;
    price: number;
    productId: number;
    quantity: number;

    constructor(init?: Partial<CartItem>) {
        // assigns the product to all the above attributes
        Object.assign(this, init);
    }

    // total price of the item (according to its quantity)
    get totalPrice() { return this.price * this.quantity; }

}
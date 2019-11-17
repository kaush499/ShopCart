export class CartItem {
    title: string;
    imagePath: string;
    price: number;
    productId: number;
    quantity: number;

    constructor(init?: Partial<CartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() { return this.price * this.quantity; }
}
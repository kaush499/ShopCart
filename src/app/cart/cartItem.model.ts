export class CartItem{
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(id: string, title: string, imageUrl: string, price: number, quantity: number){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.quantity = quantity;
    }
}
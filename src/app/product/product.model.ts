export class Product {
    id: string;
    category: string;
    title: string;
    imageUrl: string;
    price: number;
    addedToCart: boolean;

    constructor(id: string, category: string, title: string, imageUrl: string, price: number, addedToCart: boolean){
        this.id = id;
        this.category = category;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.addedToCart = addedToCart;
    }
  }
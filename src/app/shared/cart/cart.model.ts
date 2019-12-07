import { CartItem } from './cart-item.model';

export class Cart {
    items: CartItem[] = [];

    constructor(private itemsMap: CartItem[]) {
        this.itemsMap = itemsMap || [];
        
        itemsMap.forEach(item => {
            this.items.push(new CartItem(item));
        });
    };

    // getting quantity of specific item in the cart
    getQuantity(productId: number) {
        let item = this.items.find(x => x.productId === productId);
        return item ? item.quantity : 0;
      }
     
    // getting the price of all items in cart and summing it
    get totalPrice() {
        let sum = 0;
        this.items.forEach(x => {
            sum += x.totalPrice;
        });
        return sum;
    }
    
    // getting the total number of items in cart
    get totalItemsCount() {
        return this.items.length;
    }

}
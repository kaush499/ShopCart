import { CartItem } from './cart-item.model';

export class Cart {
    items: CartItem[] = [];

    constructor(private itemsMap: CartItem[]) {
        this.itemsMap = itemsMap || [];

        itemsMap.forEach(item => {
            this.items.push(new CartItem(item));
        });
    };

    getQuantity(productId: number) {
        let item = this.items.find(x => x.productId === productId);
        return item ? item.quantity : 0;
      }
      
    get totalPrice() {
        let sum = 0;
        this.items.forEach(x => {
            sum += x.totalPrice;
        });
        return sum;
    }
    
    get totalItemsCount() {
        return this.items.length;
    }

}
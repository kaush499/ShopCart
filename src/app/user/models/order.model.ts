export interface Order {
    shipDate: Date,
    billDate: Date,
    orderId: number,
    productId: number,
    quantity: number,
    title: string,
    imagePath: string,
    deliveryStatus: boolean,
    price: number
}
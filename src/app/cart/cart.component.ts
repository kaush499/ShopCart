import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
    // isCartEmpty: boolean;
    // private suscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // this.isCartEmpty = this.cartService.getCartEmptyValue();
    // this.suscription = this.cartService.getUpdatedCartEmptyValue()
    //   .subscribe((isEmpty: boolean) => {
    //     this.isCartEmpty = isEmpty;
    //   })
  }

  ngOnDestroy() {
    // this.suscription.unsubscribe();
  }

}
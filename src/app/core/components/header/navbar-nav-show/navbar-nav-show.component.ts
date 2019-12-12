import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';
import { Cart } from 'src/app/shared/models/cart/cart.model';
import { CartService } from 'src/app/shopping/services/cart.service';

@Component({
  selector: 'app-navbar-nav-show',
  templateUrl: './navbar-nav-show.component.html',
  styleUrls: ['./navbar-nav-show.component.css']
})
export class NavbarNavShowComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false;
  userName: string;
  isAdmin: boolean;
  private authListenerSubs: Subscription;
  cart: Cart;

  constructor(private authService: AuthService,
              private userService: UserService,
              private cartService: CartService) {}

  // initiates user and authentication and sets the value of the cart
  // sets up the auth observable listener
  async ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userName = this.userService.getUserName();
    this.isAdmin = this.userService.getIsAdmin();

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(async isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.cart = await this.cartService.getCart();
    });

    this.cart = await this.cartService.getCart()
  }

  onLogout() {
      this.authService.logout();
  }

  ngOnDestroy() {
      this.authListenerSubs.unsubscribe();
  }

}

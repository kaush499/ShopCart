import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user/user.service';
import { Cart } from 'src/app/shared/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';

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
  private userSubs: Subscription;
  cart: Cart;

  constructor(private authService: AuthService,
              private userService: UserService,
              private cartService: CartService) {}

  async ngOnInit() {
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.userName = this.userService.getUserName();
      this.isAdmin = this.userService.getIsAdmin();

    //   this.userSubs = this.userService
    //   .getUserStatus()
    //   .subscribe(userName => {
    //       console.log(userName);
    //       this.userName = userName;
    //       this.isAdmin = this.userService.getIsAdmin();
    //   });

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
    //   this.userSubs.unsubscribe();
  }

}

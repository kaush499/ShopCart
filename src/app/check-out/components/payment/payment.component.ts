import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckOutService } from '../../services/check-out.service';
import { PaymentMethodModel } from '../../models/payment-methods.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  methods: PaymentMethodModel[] = null;
  private methodSubs: Subscription;

  constructor(private checkOutService: CheckOutService) { }

  async ngOnInit() {
    this.methodSubs = this.checkOutService.getPaymentMethods()
      .subscribe(response => {
        this.methods = response.methods;
      })
  }

  onPayment(form: NgForm) {
    const paymentId = form.value.paymentMethod;
    const payment = this.methods.find(m => m.methodId == paymentId)
    this.checkOutService.setPayment(payment);
  }

  ngOnDestroy() {
    this.methodSubs.unsubscribe();
  }

}

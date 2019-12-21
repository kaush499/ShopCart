import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckOutService } from '../../services/check-out.service';
import { PaymentMethodModel } from '../../models/payment-methods.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-paymet-method',
  templateUrl: './paymet-method.component.html',
  styleUrls: ['./paymet-method.component.css']
})
export class PaymetMethodComponent implements OnInit {
  methods: PaymentMethodModel[] = null;
  private methodSubs: Subscription;

  constructor(private checkOutService: CheckOutService) { }

  async ngOnInit() {
    this.methodSubs = this.checkOutService.getPaymentMethods()
      .subscribe(response => {
        console.log("kgj");
        console.log(response);
        this.methods = response.methods;
      })
  }

  onPayment(form: NgForm) {
    const paymentId = form.value.paymentMethod;
    const payment = this.methods.find(m => m.methodId == paymentId)
    this.checkOutService.setPayment(payment);
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'app-paymet-method',
  templateUrl: './paymet-method.component.html',
  styleUrls: ['./paymet-method.component.css']
})
export class PaymetMethodComponent implements OnInit {

  constructor(private checkOutService: CheckOutService) { }

  ngOnInit() {
  }

  onPayment(form: NgForm) {
    const payment = form.value.paymentMethod;
    this.checkOutService.setPayment(payment);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Input() public errorMessage: string;
  message: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.message = this.errorMessage;
  }

}

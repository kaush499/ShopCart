import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';



@NgModule({
  declarations: [
    ErrorModalComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    NgbActiveModal, 
    NgbModal
  ]
})
export class ErrorModule { }

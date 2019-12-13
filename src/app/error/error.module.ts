import { NgModule } from '@angular/core';

import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ErrorModalComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ErrorModalComponent
  ]
})
export class ErrorModule { }

import { NgModule } from '@angular/core';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarNavHideComponent } from '../core/components/header/navbar-nav-hide/navbar-nav-hide.component';
import { NavbarNavShowComponent } from '../core/components/header/navbar-nav-show/navbar-nav-show.component';

@NgModule({
    declarations: [
        OrderSummaryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        RouterModule.forChild([])
    ],
    exports: [
        OrderSummaryComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        RouterModule.forChild([]).ngModule
    ]
})
export class SharedModule {}
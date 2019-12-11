import { NgModule } from '@angular/core';
import { HideNavbarComponent } from './components/page-navbar/hide-navbar/hide-navbar.component';
import { NavbarNavHideComponent } from './components/header/navbar-nav-hide/navbar-nav-hide.component';
import { ShowNavbarComponent } from './components/page-navbar/show-navbar/show-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarNavShowComponent } from './components/header/navbar-nav-show/navbar-nav-show.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HideNavbarComponent,
        ShowNavbarComponent,
        HomeComponent,
        NavbarNavHideComponent,
        NavbarNavShowComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([])
    ],
    exports: [
        NavbarNavHideComponent,
        NavbarNavShowComponent 
    ]
})
export class CoreModule {}
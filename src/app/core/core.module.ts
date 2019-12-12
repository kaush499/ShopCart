import { NgModule } from '@angular/core';
import { NavbarNavHideComponent } from './components/header/navbar-nav-hide/navbar-nav-hide.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarNavShowComponent } from './components/header/navbar-nav-show/navbar-nav-show.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HideNavbarComponent } from './components/page-navbar/hide-navbar/hide-navbar.component';
import { ShowNavbarComponent } from './components/page-navbar/show-navbar/show-navbar.component';

@NgModule({
    declarations: [
        HomeComponent,
        NavbarNavHideComponent,
        NavbarNavShowComponent,
        HideNavbarComponent,
        ShowNavbarComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        NavbarNavHideComponent,
        NavbarNavShowComponent 
    ]
})
export class CoreModule {}
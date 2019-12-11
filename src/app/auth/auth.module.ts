import { NgModule } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
       SharedModule,
       RouterModule.forChild([])
    ]
})
export class AuthModule {}
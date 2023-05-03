import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class LoginModule {}

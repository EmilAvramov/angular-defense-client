import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
	providers: [FormBuilder],
})
export class AuthModule {}

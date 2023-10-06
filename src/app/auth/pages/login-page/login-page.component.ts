import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public fb: FormBuilder = inject( FormBuilder );
  public authSerivice = inject( AuthService );
  public router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  get password() {
    return this.myForm.controls['password'];
  }

  get email() {
    return this.myForm.controls['email'];
  }

  login(): void {
    if( !this.myForm.valid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;
    this.authSerivice.login( email, password )
    .subscribe({
      next: () => this.router.navigateByUrl( '/dashboard' ),
      error: ( message ) => Swal.fire( 'Error', message, 'error' )
    })
  }

}

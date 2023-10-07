import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { fieldsEquals } from '../../validators/fields-equals.validator';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public fb: FormBuilder = inject( FormBuilder );
  public authSerivice = inject( AuthService );
  public router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ],],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength( 6 )]],
    passwordRepeated: ['', [ Validators.required, Validators.minLength( 6 )]]
  }, {
    validators: fieldsEquals( "password", "passwordRepeated" ),
  });

  get password() {
    return this.myForm.controls['password'];
  }

  get email() {
    return this.myForm.controls['email'];
  }

  get name() {
    return this.myForm.controls['name'];
  }

  get passwordRepeated() {
    return this.myForm.controls['passwordRepeated'];
  }

  register():void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

}

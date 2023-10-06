import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[formErrors]'
})
export class FormErrorsDirective implements OnInit {

  private elementHtml: ElementRef<HTMLElement> = inject( ElementRef<HTMLElement> );
  private _error?: ValidationErrors|null;
  private _touched?: boolean|null;
  private _nameInput?: string|null;

  @Input() set error ( value: ValidationErrors|null ) {
    this._error = value;
    //console.log( this._error )
    this.throwHtmlError();
    this.removeHtmlError();
  }

  @Input() set touched ( value: boolean|null ) {
    this._touched = value;
    //console.log( this._touched )
    this.throwHtmlError();
  }

  // constructor() { }
  ngOnInit(): void {
    if ( !this.elementHtml ) return;
    if ( !this.elementHtml.nativeElement.querySelector('input') ) return;

    this._nameInput = this.elementHtml.nativeElement.querySelector('input')!.getAttribute('formControlName');
  }

  throwHtmlError(): void {
    if ( !this.elementHtml || !this._error ) return;


    if ( this._touched ) {
      //this.elementHtml.nativeElement.classList.add('aért-validate')
      const error = Object.keys( this._error )[0];
      let message: string = '';

      const traslatedName = this.traslate( this._nameInput );
      switch ( error ) {
        case 'required':
          message = `${ traslatedName } no puede estar vacio`;
          break;
        case 'minlength':
          const min = this._error["minlength"]["requiredLength"];
          message = `${ traslatedName } debe tener un minimo de ${ min } caracteres`;
          break
        case 'email':
          message = 'El formato del email es incorrecto';
      }

      this.elementHtml.nativeElement.setAttribute( 'data-validate', message );
      this.elementHtml.nativeElement.classList.add( 'alert-validate' )
    }
  }

  removeHtmlError(): void {
    if ( !this._error ) {
      this.elementHtml.nativeElement.classList.remove( 'alert-validate' );
    }
  }

  private traslate( value: string|null|undefined ): string {
    switch( value ) {
      case 'password':
        return 'La contraseña';
      case 'email':
        return 'El email';
      case 'name':
        return 'El nombre';
      case 'lastName':
        return 'El apellido';
      default:
        return 'Este campo'
    }
  }
}



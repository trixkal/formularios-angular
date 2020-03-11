import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHurtado(control: FormControl): {[s: string]: boolean} {
    if (control.value?.toLowerCase() === 'hurtado') {
      return {
        noHurtado: true
      };
    }
    return null;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control === pass2Control) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    };

  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {


    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( (res, rej) => {
      setTimeout(() => {
        if (control.value === 'roco') {
          res({existe: true});

        } else {
          res(null);
        }

      }, 3500);
    });
  }


}

interface ErrorValidate {
  [s: string]: boolean;
}

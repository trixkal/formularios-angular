import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: []
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;
  constructor(private formBuilder: FormBuilder, private validaroresService: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();

   }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pasatiemposArray() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    if (this.forma.get('pass2').invalid && this.forma.get('pass2').touched) {
      return false;
    }
    return (pass1 === pass2 ? false : true);
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  cargarDataFormulario() {
    this.forma.setValue({
        nombre: 'Rocmer',
        apellido: 'Hurtado',
        correo: 'trixkal@gmail.com',
        usuario: '',
        pass1: '',
        pass2: '',
        direccion: {
          distrito: 'Alaju',
          ciudad: 'Alajuela'
        }, pasatiempos: []
      });

    ['Comer', 'Dormir'].forEach(valor => this.pasatiemposArray.push(this.formBuilder.control(valor)));

  }

  resetDataFormulario() {
    this.forma.reset({
      nombre: '',
      apellido: '',
      correo: '',
      usuario: '',
      direccion: {
        distrito: '',
        ciudad: ''
        }
      }
    );
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
// valor por defecto en la primera posicion seguido por el formControl, 2. validadores sync, 3. validadores async
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required, Validators.minLength(3), this.validaroresService.noHurtado] ],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario: ['', , this.validaroresService.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators: this.validaroresService.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    // this.forma.valueChanges.subscribe(valor => {

    // });

    this.forma.get('nombre').valueChanges.subscribe(valor => {

    });
  }

  agregarPasatiempo() {
    this.pasatiemposArray.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiempo(index: number) {
    this.pasatiemposArray.removeAt(index);
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlesHijos => controlesHijos.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(this.forma);
    // Aqui va el codigo para el Post de la info

    // Ahora el Reset
    this.resetDataFormulario();
  }

}

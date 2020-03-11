import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: []
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();

   }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
// valor por defecto en la primera posicion seguido por el formControl, 2. validadores sync, 3. validadores async
      nombre: ['', Validators.required],
      apellido: [''],
      correo: ['']
    });
  }

  guardar(){
    console.log(this.forma);
  }

}

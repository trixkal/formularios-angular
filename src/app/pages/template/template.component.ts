import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  //para valores por defecto
  usuario = {
    nombre: '',
    correo: '',
    pais: 'CRI'
  };

  paises: any[] = [];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaisesV2()
      .subscribe( paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: '[Seleccione un pais]',
          codigo: ''
        });
      });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        console.log(control);
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);
  }

}

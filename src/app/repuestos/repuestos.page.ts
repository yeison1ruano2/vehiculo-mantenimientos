import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepuestoService } from '../services/repuesto.service';
import { Repuesto } from 'src/interfaces/Repuesto';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  repuestos!: Repuesto[];
  buscarForm!: FormGroup;
  terminoBuscar!: string;
  cargando!: boolean;
  constructor(
    private router: Router,
    private repuestoService: RepuestoService
  ) {}

  ngOnInit() {
    this.traerRepuestos();
    this.buscarForm = new FormGroup({
      terminoBuscar: new FormControl(''),
    });
  }

  traerRepuestos() {
    this.cargando = true;
    this.repuestoService.obtenerRepuestos().subscribe((repuestos) => {
      this.repuestos = repuestos;
      this.cargando = false;
    });
  }

  buscarTermino(event: Event): void {
    if (event instanceof CustomEvent) {
      const termino = event.detail.value;
      if (termino && termino.trim() !== '') {
        this.cargando = true;
        this.repuestoService
          .obtenerRepuestoPorNombre(termino)
          .subscribe((respuesta) => {
            this.repuestos = respuesta;
            this.cargando = false;
          });
      } else {
        this.traerRepuestos();
      }
    }
  }
}

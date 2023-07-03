import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MantenimientoRepuestosComunicacionService } from '../services/mantenimiento-repuestos-comunicacion.service';
import { FormGroup } from '@angular/forms';
import { RepuestoService } from '../services/repuesto.service';
import { Repuesto } from 'src/interfaces/Repuesto';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionarrepuestos',
  templateUrl: './seleccionarrepuestos.page.html',
  styleUrls: ['./seleccionarrepuestos.page.scss'],
})
export class SeleccionarrepuestosPage implements OnInit {
  formulario: FormGroup | null = null;
  cargando!: boolean;
  opcionBuscar!: string;
  repuestos!: Repuesto[];
  repuestosFront: Repuesto[] = [];
  @Output() repuestosActualizados: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  constructor(
    private router: Router,
    private mantenimientoRepuestosComunicacionService: MantenimientoRepuestosComunicacionService,
    private repuestoService: RepuestoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.formulario =
      this.mantenimientoRepuestosComunicacionService.obtenerFormulario();
    this.opcionBuscar = 'nombre';
    this.traerRepuestos();
  }

  // irAtras() {
  //   this.repuestos.push('Cunas');
  //   this.repuestos.push('Aceite');
  //   this.repuestos.push('Farola');
  //   this.mantenimientoRepuestosComunicacionService.guardarRepuestos(
  //     this.repuestos
  //   );
  //   this.repuestosActualizados.emit(this.repuestos);
  //   this.router.navigate(['tabs/nuevomantenimiento'], {
  //     replaceUrl: true,
  //     state: { repuestos: this.repuestos },
  //   });
  // }

  buscarTermino(event: Event): void {
    if (event instanceof CustomEvent) {
      const termino = event.detail.value;
      if (termino && termino.trim() !== '') {
        this.cargando = true;
        this.repuestoService
          .obtenerRepuestoPorTermino(this.opcionBuscar, termino)
          .subscribe((respuesta) => {
            this.repuestos = respuesta;
            this.cargando = false;
          });
      } else {
        this.traerRepuestos();
      }
    }
  }

  traerRepuestos() {
    this.cargando = true;
    this.repuestoService.obtenerRepuestos().subscribe((repuestos) => {
      this.repuestos = repuestos;
      this.cargando = false;
    });
  }

  guardarRepuesto(repuesto: Repuesto) {
    let repuestoExistente = this.repuestosFront.find(
      (repuestoIterable) => repuestoIterable.id === repuesto.id
    );
    if (repuestoExistente) {
      this.mostrarMensaje('El repuesto seleccionado ya esta guardado');
    } else {
      this.repuestosFront.push(repuesto);
      this.mostrarMensaje('Repuesto guardado con éxito');
    }
    console.log(this.repuestosFront);
  }

  mostrarMensaje(mensaje: string) {
    this.toastController
      .create({
        message: mensaje,
        duration: 3000,
      })
      .then((toast) => toast.present());
  }
}

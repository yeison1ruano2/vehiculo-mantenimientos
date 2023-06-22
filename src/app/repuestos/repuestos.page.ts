import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepuestoService } from '../services/repuesto.service';
import { Repuesto } from 'src/interfaces/Repuesto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

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
  opcionBuscar!: string;
  constructor(
    private router: Router,
    private repuestoService: RepuestoService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.traerRepuestos();
    this.opcionBuscar = 'nombre';
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

  async selectRepuesto(repuesto: Repuesto) {
    let actionSheet = await this.actionSheetController.create({
      header: 'Seleccione una opción',
      buttons: [
        {
          text: 'Modificar Repuesto',
          handler: () => {
            this.actualizarRepuesto(repuesto);
          },
        },
        {
          text: 'Borrar Repuesto',
          cssClass: 'danger',
          role: 'destructive',
          handler: () => {
            this.eliminarRepuesto(repuesto.id);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  actualizarRepuesto(repuesto: Repuesto) {
    this.router.navigate(['tabs/editarrepuesto'], {
      state: { repuesto: repuesto },
    });
  }

  async eliminarRepuesto(id: string) {
    let alert = this.alertController.create({
      header: 'Eliminar',
      message: '¿Estas seguro que deseas eliminar este repuesto?',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.mostrarMensaje('Eliminando repuesto');
            this.repuestoService
              .eliminarRepuesto(id)
              .then(() => {
                this.mostrarMensaje('Repuesto eliminado con éxito');
              })
              .catch(() => {
                this.mostrarMensaje('Ocurrio un error, intentalo nuevamente');
              });
          },
        },
      ],
    });
    (await alert).present();
  }

  mostrarMensaje(mensaje: string) {
    this.toastController
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
}

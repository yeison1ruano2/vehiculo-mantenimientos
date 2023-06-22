import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { MantenimientoService } from '../services/mantenimiento.service';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.page.html',
  styleUrls: ['./mantenimientos.page.scss'],
})
export class MantenimientosPage implements OnInit {
  vehiculoSeleccionado!: Vehiculo;
  mantenimientos: Mantenimiento[] = [];

  constructor(
    private router: Router,
    private mantenimientoService: MantenimientoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.recuperarVehiculo();
    this.obtenerMantenimientos();
  }

  obtenerMantenimientos() {
    this.mantenimientoService
      .obtenerMantenimientos(this.vehiculoSeleccionado.placa)
      .subscribe((mantenimientos) => {
        this.mantenimientos = mantenimientos;
      });
  }

  recuperarVehiculo() {
    let navigationExtras = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationExtras && navigationExtras['vehiculo']) {
      this.vehiculoSeleccionado = navigationExtras['vehiculo'];
    }
  }

  regresar(): void {
    this.router.navigateByUrl('tabs/vehiculos');
  }

  nuevoMantenimiento() {
    this.router.navigate(['tabs/nuevomantenimiento'], {
      state: { vehiculoPlaca: this.vehiculoSeleccionado.placa },
    });
  }

  async eliminarMantenimiento(id: any) {
    const alert = this.alertController.create({
      header: 'Confrimación',
      message: '¿Estas seguro que deseas eliminar este mantenimiento?',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          cssClass: 'danger',
        },
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.mantenimientoService
              .eliminarMantenimiento(this.vehiculoSeleccionado.placa, id)
              .then(() => {
                this.mostrarMensaje('Mantenimiento eliminado con éxito');
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

  actualizarMantenimiento(mantenimiento: Mantenimiento) {
    this.router.navigate(['tabs/editarmantenimiento'], {
      state: {
        mantenimiento: mantenimiento,
        placa: this.vehiculoSeleccionado.placa,
      },
    });
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

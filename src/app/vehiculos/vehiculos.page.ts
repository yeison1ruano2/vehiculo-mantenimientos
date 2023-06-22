import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { MantenimientoService } from '../services/mantenimiento.service';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  public vehiculos!: Observable<Vehiculo[]>;
  vehiculoPrueba!: Vehiculo;

  constructor(
    private vehiculoService: VehiculoService,
    private mantenimientoService: MantenimientoService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.listarVehiculos();
  }

  listarVehiculos() {
    this.vehiculos = this.vehiculoService.obtenerVehiculos();
  }

  async selectVehiculo(vehiculo: Vehiculo) {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccione una opcion',
      buttons: [
        {
          text: 'Modificar vehiculo',
          handler: () => {
            this.editarVehiculo(vehiculo);
          },
        },
        {
          text: 'Eliminar vehiculo',
          handler: () => {
            this.eliminarVehiculo(vehiculo.placa);
          },
        },
        {
          text: 'Mantenimientos',
          handler: () => {
            this.verMantenimientos(vehiculo);
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

  verMantenimientos(vehiculo: Vehiculo) {
    this.router.navigate(['tabs/mantenimientos'], {
      state: { vehiculo: vehiculo },
    });
  }

  editarVehiculo(vehiculo: Vehiculo) {
    this.router.navigate(['tabs/editarvehiculo'], {
      state: { vehiculo: vehiculo },
    });
  }

  async eliminarVehiculo(placa: string) {
    let alert = this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estas seguro que deseas eliminar este vehículo?',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.mostrarMensaje('Eliminando vehículo');
            this.vehiculoService
              .eliminarVehiculo(placa)
              .then(() => {
                this.mostrarMensaje('Vehículo eliminado');
              })
              .catch(() => {
                this.mostrarMensaje('Error al eliminar vehículo');
              });
          },
        },
      ],
    });
    (await alert).present();
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
}

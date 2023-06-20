import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { MantenimientoService } from '../services/mantenimiento.service';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.page.html',
  styleUrls: ['./mantenimientos.page.scss'],
})
export class MantenimientosPage implements OnInit {
  vehiculoSeleccionado!: Vehiculo;
  mantenimiento: Mantenimiento = {};
  mantenimientos: Mantenimiento[] = [];

  constructor(
    private router: Router,
    private mantenimientoService: MantenimientoService,
    private toastCtrl: ToastController
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
    let navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      if (state && state['vehiculo']) {
        this.vehiculoSeleccionado = state['vehiculo'];
      }
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

  eliminarMantenimiento(id: any) {
    this.mantenimientoService
      .eliminarMantenimiento(this.vehiculoSeleccionado.placa, id)
      .then(() => {
        this.mostrarMensaje('Mantenimiento eliminado con éxito');
      })
      .catch(() => {
        this.mostrarMensaje('Ocurrio un error, intentalo nuevamente');
      });
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
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
}

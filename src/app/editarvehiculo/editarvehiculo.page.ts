import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { VehiculoService } from '../services/vehiculo.service';

@Component({
  selector: 'app-editarvehiculo',
  templateUrl: './editarvehiculo.page.html',
  styleUrls: ['./editarvehiculo.page.scss'],
})
export class EditarvehiculoPage implements OnInit {
  vehiculoSeleccionado!: Vehiculo;
  editarForm!: FormGroup;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit() {
    this.recuperarVehiculo();
    this.rellenarFormulario();
  }

  editarVehiculo() {
    this.mostrarMensaje('Actualizando');
    this.vehiculoSeleccionado = this.editarForm.value;
    this.vehiculoService
      .actualizarVehiculo(this.vehiculoSeleccionado)
      .then(() => {
        this.mostrarMensaje('Vehículo actualizado con éxito');
        this.limpiarFormulario();
        this.router.navigate(['tabs/vehiculos'], { replaceUrl: true });
      })
      .catch(() => {
        console.log('Error al actualizar el vehículo');
      });
  }

  limpiarFormulario() {
    this.editarForm.reset();
  }

  recuperarVehiculo() {
    let navigationExtras = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationExtras && navigationExtras['vehiculo']) {
      this.vehiculoSeleccionado = navigationExtras['vehiculo'];
    }
  }

  async regresar() {
    const alert = this.alertCtrl.create({
      header: 'Confrimación',
      message: '¿Estas seguro que deseas salir sin guardar tus cambios?',
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
            this.router.navigate(['tabs/vehiculos'], { replaceUrl: true });
          },
        },
      ],
    });
    (await alert).present();
  }

  rellenarFormulario() {
    this.editarForm = this.formBuilder.group({
      nombre: [this.vehiculoSeleccionado.nombre],
      placa: [this.vehiculoSeleccionado.placa],
      anio: [this.vehiculoSeleccionado.anio],
      color: [this.vehiculoSeleccionado.color],
      marca: [this.vehiculoSeleccionado.marca],
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

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
  }

  editarVehiculo() {
    this.mostrarMensaje('Actualizando');
    this.vehiculoSeleccionado = this.editarForm.value;
    this.vehiculoService
      .actualizarVehiculo(this.vehiculoSeleccionado)
      .then(() => {
        this.mostrarMensaje('Vehículo actualizado con éxito');
        this.limpiarFormulario();
        this.router.navigate(['tabs/vehiculos']);
      })
      .catch(() => {
        console.log('Error al actualizar el vehículo');
      });
  }

  limpiarFormulario() {
    this.editarForm = this.formBuilder.group({
      nombre: [''],
      placa: [''],
      tipoVehiculo: [''],
      anio: [''],
      color: [''],
      marca: [''],
    });
  }

  recuperarVehiculo() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      if (state && state['vehiculo']) {
        this.vehiculoSeleccionado = state['vehiculo'];
        this.rellenarFormulario(this.vehiculoSeleccionado);
      }
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
          handler: (blah) => {
            console.log(`Cancelado confirmado: ${blah}`);
          },
        },
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('tabs/vehiculos');
          },
        },
      ],
    });
    (await alert).present();
  }

  rellenarFormulario(vehiculoSeleccionado: any) {
    this.editarForm = this.formBuilder.group({
      nombre: [vehiculoSeleccionado.nombre],
      placa: [vehiculoSeleccionado.placa],
      tipoVehiculo: [vehiculoSeleccionado.tipoVehiculo],
      anio: [vehiculoSeleccionado.anio],
      color: [vehiculoSeleccionado.color],
      marca: [vehiculoSeleccionado.marca],
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

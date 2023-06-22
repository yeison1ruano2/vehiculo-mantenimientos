import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from 'src/interfaces/Vehiculo';

@Component({
  selector: 'app-nuevovehiculo',
  templateUrl: './nuevovehiculo.page.html',
  styleUrls: ['./nuevovehiculo.page.scss'],
})
export class NuevovehiculoPage implements OnInit {
  nuevoForm!: FormGroup;
  tipoVehiculo: string = '';
  nuevoVehiculo!: Vehiculo;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) {
    this.nuevoForm = this.formBuilder.group({
      nombre: [''],
      placa: [''],
      anio: [''],
      color: [''],
      marca: [''],
    });
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['tabs/vehiculos'], { replaceUrl: true });
  }

  crearNuevoVehiculo() {
    this.mostrarMensaje('Guardando...');
    this.nuevoVehiculo = this.nuevoForm.value;
    this.nuevoVehiculo.activo = true;
    this.vehiculoService.crearVehiculo(this.nuevoVehiculo).then(
      () => {
        this.mostrarMensaje('Vehículo registrado con éxito');
        this.router.navigate(['tabs/vehiculos'], { replaceUrl: true });
        this.limpiarFormulario();
      },
      (err) => {
        this.mostrarMensaje('Hubo un error al crear el vehículo');
      }
    );
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  limpiarFormulario() {
    this.nuevoForm.reset();
  }
}

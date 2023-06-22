import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Repuesto } from 'src/interfaces/Repuesto';
import { RepuestoService } from '../services/repuesto.service';

@Component({
  selector: 'app-editarrepuesto',
  templateUrl: './editarrepuesto.page.html',
  styleUrls: ['./editarrepuesto.page.scss'],
})
export class EditarrepuestoPage implements OnInit {
  repuestoSeleccionado!: Repuesto;
  editarForm!: FormGroup;
  id!: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private repuestoService: RepuestoService,
    private toastController: ToastController
  ) {
    this.recuperRepuesto();
  }

  ngOnInit() {
    this.recuperRepuesto();
    this.rellenarFormulario();
    this.id = this.repuestoSeleccionado.id;
  }

  async regresar() {
    const alert = this.alertController.create({
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
            this.router.navigate(['tabs/repuestos'], { replaceUrl: true });
          },
        },
      ],
    });
    (await alert).present();
  }

  recuperRepuesto() {
    let navigationExtras = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationExtras && navigationExtras['repuesto']) {
      this.repuestoSeleccionado = navigationExtras['repuesto'];
    }
  }

  rellenarFormulario() {
    this.editarForm = this.formBuilder.group({
      nombre: [this.repuestoSeleccionado.nombre],
      marca: [this.repuestoSeleccionado.marca],
      modelo: [this.repuestoSeleccionado.modelo],
      proveedor: [this.repuestoSeleccionado.proveedor],
    });
  }

  editarRepuesto() {
    this.repuestoSeleccionado = this.editarForm.value;
    this.repuestoService
      .actualizarRepuesto(this.id, this.repuestoSeleccionado)
      .then(() => {
        this.mostrarMensaje('Repuesto actualizado con éxito');
        this.limpiarFormulario();
        this.router.navigate(['tabs/repuestos'], { replaceUrl: true });
      })
      .catch(() => {
        this.mostrarMensaje('Ocurrio un error inesperado, intentelo de nuevo');
      });
  }

  limpiarFormulario() {
    this.editarForm.reset();
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

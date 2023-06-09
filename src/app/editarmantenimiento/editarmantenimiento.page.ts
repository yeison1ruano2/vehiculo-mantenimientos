import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';
import { MantenimientoService } from '../services/mantenimiento.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editarmantenimiento',
  templateUrl: './editarmantenimiento.page.html',
  styleUrls: ['./editarmantenimiento.page.scss'],
})
export class EditarmantenimientoPage implements OnInit {
  id: any;
  mantenimiento!: Mantenimiento;
  vehiculoPlaca!: string;
  repuestos: string[] = [];
  editarForm!: FormGroup;
  constructor(
    private router: Router,
    private mantenimientoService: MantenimientoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.recuperarMantenimiento();
    this.id = this.mantenimiento.id;
    if (this.mantenimiento.repuestos) {
      this.repuestos = this.mantenimiento.repuestos;
    }
    this.recuperarPlacaVehiculo();
    this.rellenarFormulario();
  }

  rellenarFormulario() {
    this.editarForm = this.formBuilder.group({
      fecha: [this.mantenimiento.fecha],
      descripcion: [this.mantenimiento.descripcion],
      repuestos: new FormControl(''),
      valorTotal: [this.mantenimiento.valorTotal],
      mecanico: [this.mantenimiento.mecanico],
      numMecanico: [this.mantenimiento.numMecanico],
    });
  }

  recuperarMantenimiento() {
    let navigationExtras = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationExtras && navigationExtras['mantenimiento']) {
      this.mantenimiento = navigationExtras['mantenimiento'];
    }
  }

  recuperarPlacaVehiculo() {
    let navigationExtras = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationExtras && navigationExtras['placa']) {
      this.vehiculoPlaca = navigationExtras['placa'];
    }
  }

  actualizarMantenimiento() {
    this.mantenimiento = this.editarForm.value;
    this.mantenimiento.id = this.id;
    this.mantenimiento.repuestos = this.repuestos;
    this.mantenimientoService
      .actualizarMantenimiento(this.mantenimiento, this.vehiculoPlaca)
      .then(() => {
        this.mostrarMensaje('Mantenimiento actualizado con éxito');
        this.limpiarFormulario();
        this.limpiarListaRepuestos();
        this.router.navigate(['tabs/mantenimientos'], { replaceUrl: true });
      })
      .catch(() => {
        this.mostrarMensaje(
          'Problema al actualizar el mantenimiento, intentelo nuevamente'
        );
      });
  }

  async regresar() {
    const alert = this.alertCtrl.create({
      header: 'Confirmación',
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
            this.router.navigate(['tabs/mantenimientos'], { replaceUrl: true });
          },
        },
      ],
    });
    (await alert).present();
  }

  guardarRepuesto() {
    let repuesto = this.editarForm.value.repuestos;
    this.repuestos.push(repuesto);
    this.limpiarRepuestoFormulario();
  }

  limpiarRepuestoFormulario() {
    this.editarForm.get('repuestos')?.setValue('');
  }

  eliminarRepuesto(i: number) {
    this.repuestos.splice(i, 1);
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  limpiarListaRepuestos() {
    this.repuestos = [];
  }

  limpiarFormulario() {
    this.editarForm.reset();
    // this.editarForm = this.formBuilder.group({
    //   fecha: [''],
    //   descripcion: [''],
    //   repuestos: [''],
    //   valorTotal: [''],
    //   mecanico: [''],
    //   numMecanico: [''],
    // });
  }
}

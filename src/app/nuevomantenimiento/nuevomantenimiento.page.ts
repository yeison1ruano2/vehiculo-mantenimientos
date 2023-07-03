import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MantenimientoService } from '../services/mantenimiento.service';
import { ToastController } from '@ionic/angular';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';
import { MantenimientoRepuestosComunicacionService } from '../services/mantenimiento-repuestos-comunicacion.service';

@Component({
  selector: 'app-nuevomantenimiento',
  templateUrl: './nuevomantenimiento.page.html',
  styleUrls: ['./nuevomantenimiento.page.scss'],
})
export class NuevomantenimientoPage implements OnInit {
  repuestos: string[] = [];
  nuevoForm!: FormGroup;
  mantenimiento!: Mantenimiento;
  vehiculoPlaca!: string;
  arregloRepuestos: string[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mantenimientoService: MantenimientoService,
    private toastCtrl: ToastController,
    private mantenimientoRepuestosComunicacionService: MantenimientoRepuestosComunicacionService
  ) {
    this.mantenimientoRepuestosComunicacionService.repuestos$.subscribe(
      (repuestos) => {
        this.repuestos = repuestos;
        console.log(this.repuestos);
      }
    );
  }

  ngOnInit() {
    this.inicializarFormulario();
    this.recuperarPlacaVehiculo();
  }

  actualizarRepuestos(repuestos: string[]) {
    this.mantenimientoRepuestosComunicacionService.guardarRepuestos(repuestos);
  }

  inicializarFormulario() {
    this.nuevoForm = this.formBuilder.group({
      fecha: new FormControl(''),
      descripcion: new FormControl(''),
      repuestos: new FormControl(''),
      valorTotal: new FormControl(''),
      mecanico: new FormControl(''),
      numMecanico: new FormControl(''),
    });
  }

  recuperarPlacaVehiculo() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      if (state && state['vehiculoPlaca']) {
        this.vehiculoPlaca = state['vehiculoPlaca'];
      }
    }
  }

  regresar() {
    this.router.navigate(['tabs/mantenimientos']);
  }

  rellenarFormulario(form: any) {
    this.nuevoForm = this.formBuilder.group({
      fecha: form.fecha,
      descripcion: form.descripcion,
      valorTotal: form.valorTotal,
      mecanico: form.mecanico,
      numMecanico: form.numMecanico,
    });
  }

  guardarRepuesto() {
    let repuesto = this.nuevoForm.value.repuestos;
    this.repuestos.push(repuesto);
    this.nuevoForm.get('repuestos')?.setValue('');
  }

  eliminarRepuesto(i: number) {
    this.repuestos.splice(i, 1);
  }

  crearMantenimiento() {
    this.mantenimiento = this.nuevoForm.value;
    this.mantenimiento.repuestos = this.repuestos;
    this.mantenimiento.activo = true;
    this.mantenimientoService
      .crearMantenimiento(this.mantenimiento, this.vehiculoPlaca)
      .then(() => {
        this.mostrarMensaje('Mantenimiento registrado con éxito');
        this.limpiarFormulario();
        this.mantenimientoRepuestosComunicacionService.reiniciarDatos();
        this.repuestos = [];
        this.router.navigate(['tabs/mantenimientos']);
      })
      .catch(() => {
        this.mostrarMensaje('Ocurrio un error, intentelo nuevamente!');
      });
  }

  seleccionarRepuestos() {
    this.router.navigate(['tabs/seleccionarrepuestos'], { replaceUrl: true });
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
    this.nuevoForm = this.formBuilder.group({
      fecha: [''],
      descripcion: [''],
      repuestos: [''],
      valorTotal: [''],
      mecanico: [''],
      numMecanico: [''],
    });
  }

  miar() {
    this.mantenimientoRepuestosComunicacionService.guardarFormulario(
      this.nuevoForm
    );
    this.router.navigate(['tabs/seleccionarrepuestos']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';
import { MantenimientoService } from '../services/mantenimiento.service';

@Component({
  selector: 'app-editarmantenimiento',
  templateUrl: './editarmantenimiento.page.html',
  styleUrls: ['./editarmantenimiento.page.scss'],
})
export class EditarmantenimientoPage implements OnInit {
  mantenimiento!: Mantenimiento;
  vehiculoPlaca!: string;
  constructor(
    private router: Router,
    private mantenimientoService: MantenimientoService
  ) {}

  ngOnInit() {
    this.recuperarMantenimiento();
    this.recuperarPlacaVehiculo();
    console.log(this.mantenimiento);
    console.log(this.vehiculoPlaca);
  }

  recuperarMantenimiento() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      if (state && state['mantenimiento']) {
        this.mantenimiento = state['mantenimiento'];
      }
    }
  }

  recuperarPlacaVehiculo() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      if (state && state['placa']) {
        this.vehiculoPlaca = state['placa'];
      }
    }
  }

  actualizar() {
    this.mantenimiento.mecanico = 'Yeison Ruano Silva';
    this.mantenimientoService
      .actualizarMantenimiento(this.mantenimiento, this.vehiculoPlaca)
      .then(() => {
        console.log('Actualizado');
        this.router.navigate(['tabs/mantenimientos']);
      })
      .catch(() => {
        console.log('error');
      });
  }
}

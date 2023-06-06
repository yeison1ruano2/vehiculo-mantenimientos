import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  vehiculo!: Vehiculo;
  vehiculos!: Observable<Vehiculo[]>;
  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.vehiculos = this.vehiculoService.obtenerVehiculos();
  }

  enviarMuestra() {
    this.vehiculo = {
      nombre: 'RTX 150',
      placa: 'PXC94DS',
      marca: 'Akt',
      tipoVehiculo: 'Moto',
      anio: 2015,
      color: 'Blanca',
    };
    this.vehiculoService
      .guardarVehiculo(this.vehiculo)
      .then(() => {
        console.log('Vehiculo guardado con éxito');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  eliminar() {
    this.vehiculoService
      .eliminarVehiculo('PXC94D')
      .then(() => {
        console.log('Vehiculo eliminado con éxito');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  actualizar() {
    this.vehiculo = {
      nombre: 'RTX 150',
      placa: 'PXC94DS',
      marca: 'Akt',
      tipoVehiculo: 'Carro',
      anio: 2015,
      color: 'Blanca',
    };
    this.vehiculoService
      .actualizarVehiculo(this.vehiculo)
      .then(() => {
        console.log('Vehiculo actualizado con exito');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

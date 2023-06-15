import { Injectable } from '@angular/core';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  constructor(private db: AngularFireDatabase) {}

  crearVehiculo(vehiculo: Vehiculo) {
    return this.db.object(`vehiculos/${vehiculo.placa}`).set(vehiculo);
  }

  obtenerVehiculo(placa: string): Observable<any> {
    return this.db.object<Vehiculo>(`vehiculos/${placa}`).valueChanges();
  }

  obtenerVehiculos(): Observable<Vehiculo[]> {
    return this.db
      .list<Vehiculo>('vehiculos', (ref) =>
        ref.orderByChild('activo').equalTo(true)
      )
      .valueChanges();
  }

  eliminarVehiculo(placa: string): Promise<void> {
    return this.db
      .object<Vehiculo>(`vehiculos/${placa}`)
      .update({ activo: false });
  }

  actualizarVehiculo(vehiculo: Vehiculo): Promise<void> {
    return this.db
      .object<Vehiculo>(`vehiculos/${vehiculo.placa}`)
      .update(vehiculo);
  }
}

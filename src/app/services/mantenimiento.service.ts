import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
  constructor(private db: AngularFireDatabase) {}

  crearMantenimiento(mantenimiento: Mantenimiento, vehiculoPlaca: string) {
    return this.db
      .list<Mantenimiento>(`mantenimientos/${vehiculoPlaca}`)
      .push(mantenimiento);
  }

  obtenerMantenimientos(placa: string): Observable<any> {
    return this.db
      .list<Mantenimiento>(`mantenimientos/${placa}`, (ref) =>
        ref.orderByChild('activo').equalTo(true)
      )
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((snap) => {
            const id = snap.key;
            const data = snap.payload.val();
            return { id, ...data };
          });
        })
      );
  }

  eliminarMantenimiento(placa: string, id: string): Promise<void> {
    return this.db
      .object<Mantenimiento>(`mantenimientos/${placa}/${id}`)
      .update({ activo: false });
  }

  actualizarMantenimiento(
    mantenimiento: Mantenimiento,
    placa: string
  ): Promise<void> {
    return this.db
      .object<Mantenimiento>(`mantenimientos/${placa}/${mantenimiento.id}`)
      .update(mantenimiento);
  }
}

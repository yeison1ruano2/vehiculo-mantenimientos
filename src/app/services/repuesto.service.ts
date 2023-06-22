import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Repuesto } from 'src/interfaces/Repuesto';

@Injectable({
  providedIn: 'root',
})
export class RepuestoService {
  constructor(private db: AngularFireDatabase) {}

  crearRepuesto(repuesto: Repuesto) {
    return this.db.list<Repuesto>('repuestos').push(repuesto);
  }

  obtenerRepuestos(): Observable<any> {
    return this.db
      .list<Repuesto>('repuestos', (ref) =>
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

  eliminarRepuesto(id: string): Promise<void> {
    return this.db
      .object<Repuesto>(`repuestos/${id}`)
      .update({ activo: false });
  }

  actualizarRepuesto(id: string, repuesto: Repuesto): Promise<void> {
    return this.db.object<Repuesto>(`repuestos/${id}`).update(repuesto);
  }

  obtenerRepuestoPorTermino(
    opcionBuscar: string,
    termino: string
  ): Observable<Repuesto[]> {
    return this.db
      .list<Repuesto>('repuestos', (ref) =>
        ref
          .orderByChild(opcionBuscar)
          .startAt(termino)
          .endAt(termino + '\uf8ff')
      )
      .valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoRepuestosComunicacionService {
  formulario: FormGroup | null = null;
  repuestos: string[] = [];
  private repuestosSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private formularioSubject: BehaviorSubject<FormGroup> =
    new BehaviorSubject<FormGroup>(this.formBuilder.group({}));

  constructor(private formBuilder: FormBuilder) {}

  get repuestos$(): Observable<string[]> {
    return this.repuestosSubject.asObservable();
  }

  get formulario$(): Observable<FormGroup> {
    return this.formularioSubject.asObservable();
  }

  guardarFormulario(formulario: FormGroup) {
    this.formularioSubject.next(formulario);
  }

  obtenerFormulario() {
    return this.formularioSubject.getValue();
  }

  guardarRepuestos(repuestos: string[]) {
    this.repuestosSubject.next(repuestos);
  }

  obtenerRepuestos(): string[] {
    return this.repuestos;
  }

  reiniciarDatos() {
    this.formulario?.reset();
    this.formularioSubject.next(this.formBuilder.group({}));
    this.repuestos = [];
    this.repuestosSubject.next([]);
  }
}

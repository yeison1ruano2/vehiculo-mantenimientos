export interface Mantenimiento {
  id?: string;
  fecha?: string;
  descripcion?: string;
  repuestos?: string[];
  valorTotal?: number;
  mecanico?: string;
  numMecanico?: number;
  placaVehiculo?: string;
  activo?: boolean;
}

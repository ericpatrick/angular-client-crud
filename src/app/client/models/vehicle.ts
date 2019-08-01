export class Vehicle {
  public type: string;
  public manufacturer: string;
  public model: string;
}

export interface VehicleAPI {
  nome: string;
  codigo: string;
}

export interface VehicleModelAPI {
  modelos: VehicleAPI[];
  anos: VehicleAPI[];
}

export type VehicleType = "motos" | "carros" | "caminhoes";

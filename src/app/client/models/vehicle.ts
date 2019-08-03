export class Vehicle {
  public type: VehicleType;
  public manufacturer: VehicleInfo;
  public model: VehicleInfo;
}

export interface VehicleAPI {
  nome: string;
  codigo: string;
}

export interface VehicleModelAPI {
  modelos: VehicleAPI[];
  anos: VehicleAPI[];
}

export class VehicleInfo {
  public name: string;
  public cod: string;

  constructor(info: VehicleAPI) {
    this.name = info.nome;
    this.cod = info.codigo;
  }
}

export type VehicleType = "motos" | "carros" | "caminhoes";

import { StorageObject } from "./storage";
import { Vehicle } from "./vehicle";

export class Client implements StorageObject {
  public id: string;
  public name: string;
  public cpf: string;
  public phone: string;
  public birthday: string;
  public address: string;
  public vehicle: Vehicle;

  constructor() {
    this.vehicle = new Vehicle();
  }
}

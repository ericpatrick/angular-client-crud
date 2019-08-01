import { StorageObject } from "./storage";

export class Client implements StorageObject {
  public id: string;
  public name: string;
  public cpf: string;
  public phone: string;
  public birthday: string;
  public address: string;
}

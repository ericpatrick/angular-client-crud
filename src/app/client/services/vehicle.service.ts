import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { VehicleAPI, VehicleType } from "../models";

@Injectable()
export class VehicleService {
  private BASE_URL = environment.baseUrl;

  constructor(public http: HttpClient) {}

  public getManufacturers(type: VehicleType): Observable<VehicleAPI[]> {
    const url = `${this.BASE_URL}/${type}/marcas`;
    return this.http.get<VehicleAPI[]>(url);
  }

  public getModels(type: VehicleType, manufacturerCod: string): Observable<VehicleAPI[]> {
    const url = `${this.BASE_URL}/${type}/marcas/${manufacturerCod}/modelos`;
    return this.http.get<VehicleAPI[]>(url);
  }
}

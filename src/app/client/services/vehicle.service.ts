import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { VehicleAPI, VehicleType, VehicleModelAPI, VehicleInfo } from "../models";
import { map } from "rxjs/operators";

@Injectable()
export class VehicleService {
  private BASE_URL = environment.baseUrl;

  constructor(public http: HttpClient) {}

  public getManufacturers(type: VehicleType): Observable<VehicleInfo[]> {
    const url = `${this.BASE_URL}/${type}/marcas`;
    return this.http
      .get<VehicleAPI[]>(url)
      .pipe(map((response) => response.map((v) => new VehicleInfo(v))));
  }

  public getModels(type: VehicleType, manufacturerCod: string): Observable<VehicleInfo[]> {
    const url = `${this.BASE_URL}/${type}/marcas/${manufacturerCod}/modelos`;
    return this.http
      .get<VehicleModelAPI>(url)
      .pipe(map((response) => response.modelos.map((m) => new VehicleInfo(m))));
  }
}

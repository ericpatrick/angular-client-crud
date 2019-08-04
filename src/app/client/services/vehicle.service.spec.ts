import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { VehicleService } from "./vehicle.service";
import { VehicleInfo, VehicleAPI, VehicleModelAPI } from "../models";
import { environment } from "src/environments/environment.prod";

describe("VehicleService", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test("should be created", () => {
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
  });

  test("should get all manufeturers", fakeAsync(() => {
    const service: VehicleService = TestBed.get(VehicleService);
    const type = "carros";
    const url = `${environment.baseUrl}/${type}/marcas`;
    const testDataExpected: VehicleInfo[] = [
      { name: "Mazda", cod: "123" },
      { name: "Honda", cod: "456" },
      { name: "Jeep", cod: "753" },
      { name: "BMW", cod: "958" },
      { name: "Lexus", cod: "342" }
    ];
    const testDataAPI: VehicleAPI[] = [
      { nome: "Mazda", codigo: "123" },
      { nome: "Honda", codigo: "456" },
      { nome: "Jeep", codigo: "753" },
      { nome: "BMW", codigo: "958" },
      { nome: "Lexus", codigo: "342" }
    ];

    service.getManufacturers(type).subscribe((data) => {
      expect(data).toEqual(testDataExpected);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(testDataAPI);
    tick();
  }));

  test("should get all models", fakeAsync(() => {
    const service: VehicleService = TestBed.get(VehicleService);
    const type = "carros";
    const manufacturerCod = "003";
    const url = `${environment.baseUrl}/${type}/marcas/${manufacturerCod}/modelos`;
    const testDataExpected: VehicleInfo[] = [
      { name: "Gol", cod: "123" },
      { name: "Parati", cod: "456" },
      { name: "Fox", cod: "753" },
      { name: "Jetta", cod: "958" },
      { name: "Up", cod: "342" }
    ];
    const testDataAPI: Partial<VehicleModelAPI> = {
      modelos: [
        { nome: "Gol", codigo: "123" },
        { nome: "Parati", codigo: "456" },
        { nome: "Fox", codigo: "753" },
        { nome: "Jetta", codigo: "958" },
        { nome: "Up", codigo: "342" }
      ]
    };

    service.getModels(type, manufacturerCod).subscribe((data) => {
      expect(data).toEqual(testDataExpected);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(testDataAPI);
    tick();
  }));

  test("should get 404 error with wrong manufecturer code", fakeAsync(() => {
    const service: VehicleService = TestBed.get(VehicleService);
    const type = "carros";
    const manufacturerCod = "unknown";
    const url = `${environment.baseUrl}/${type}/marcas/${manufacturerCod}/modelos`;

    service.getModels(type, manufacturerCod).subscribe(
      (data) => fail("should have failed with the 404 error"),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
      }
    );

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush("", { status: 404, statusText: "Not Found" });
    tick();
  }));
});

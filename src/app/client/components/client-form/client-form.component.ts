import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Client, VehicleAPI, Vehicle, VehicleModelAPI, VehicleInfo } from "../../models";
import { MaskEvent } from "@emerbrito/input-mask";
import * as moment from "moment";
import { FormControl, Validators } from "@angular/forms";
import { Utils } from "src/app/shared/services/utils";
import { MatSelectChange, MatAutocompleteSelectedEvent } from "@angular/material";
import { VehicleService } from "../../services/vehicle.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"]
})
export class ClientFormComponent implements OnInit {
  public client: Client;
  public paramsForm = {
    name: new FormControl("", [Validators.required]),

    cpf: new FormControl("", [Validators.required, this.cpfValidator]),

    phone: new FormControl("", [Validators.required, Validators.minLength(13)]),

    birthday: new FormControl("", [Validators.required]),

    address: new FormControl("", [Validators.required])
  };
  public vehicleTypeOptions = [
    { label: "Moto", value: "motos" },
    { label: "Carro", value: "carros" },
    { label: "Caminhão", value: "caminhoes" }
  ];

  public vehicleSelected: Vehicle;

  public showVehicleManufacturer: boolean;
  public vehicleManufacturers: VehicleInfo[];
  public manufacturersInputControl = new FormControl();
  public filteredVehicleManufecturers: Observable<VehicleInfo[]>;

  public showVehicleModels: boolean;
  public vehicleModels: VehicleInfo[];
  public modelsInputControl = new FormControl();
  public filteredVehicleModels: Observable<VehicleInfo[]>;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private vehicleService: VehicleService
  ) {
    this.route.params.subscribe((res) => {
      this.client = res.id
        ? (this.client = this.clientService.get(res.id))
        : (this.client = new Client());
    });

    this.vehicleSelected = new Vehicle();
  }

  ngOnInit() {
    this.filteredVehicleManufecturers = this.manufacturersInputControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.filterAutoCompleteOpts(value, this.vehicleManufacturers))
    );

    this.filteredVehicleModels = this.modelsInputControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.filterAutoCompleteOpts(value, this.vehicleModels))
    );
  }

  private filterAutoCompleteOpts(value: string, info: VehicleInfo[]): VehicleInfo[] {
    let lowerValue = "";
    if (typeof value === "string") {
      lowerValue = value.toLocaleLowerCase();
    }
    return info.filter((v) => v.name.toLowerCase().indexOf(lowerValue) !== -1);
  }

  public submitForm(): void {
    console.log(this.client);
  }

  public onFormat(event: MaskEvent, key: string): void {
    this.client[key] = event.cleanValue;
  }

  public onBirthdayFormat(event: MaskEvent): void {
    const { value } = event;
    this.client.birthday = event.value;
  }

  public cpfValidator(control: FormControl) {
    // return null;
    const cpf = control.value;
    if (Utils.isValidCPF(cpf)) {
      return null;
    } else {
      return {
        cpf: "CPF inválido!"
      };
    }
  }

  public phoneValidator(control: FormControl) {
    // return null;
    const phone = control.value;
    if (phone.length === 13) {
      return null;
    } else {
      return {
        phone: "Telefone inválido!"
      };
    }
  }

  public isValidForm(): boolean {
    const { name, cpf, phone, birthday, address } = this.client;
    if (!name) {
      return false;
    }

    if (!Utils.isValidCPF(cpf)) {
      return false;
    }

    if (!phone || phone.length !== 9) {
      return false;
    }

    if (!birthday || birthday.length !== 10 || !moment(birthday).isValid()) {
      return false;
    }

    if (!address) {
      return false;
    }

    return true;
  }

  public selectVehicleType(ev: MatSelectChange) {
    this.vehicleSelected.type = ev.value;
    this.vehicleService.getManufacturers(ev.value).subscribe((resp) => {
      this.vehicleManufacturers = resp;
      this.showVehicleManufacturer = true;
    });
  }

  public displayInfo(item: VehicleInfo): string {
    return item ? item.name : undefined;
  }

  public vehicleManufacturerSelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.vehicleSelected.manufacturer = event.option.value as VehicleInfo;
    const { type, manufacturer } = this.vehicleSelected;
    this.vehicleService.getModels(type, manufacturer.cod).subscribe((resp) => {
      this.vehicleModels = resp;
      this.showVehicleModels = true;
    });
  }

  public vehicleModelSelected(event: MatAutocompleteSelectedEvent): void {
    this.vehicleSelected.model = event.option.value as VehicleInfo;
  }
}

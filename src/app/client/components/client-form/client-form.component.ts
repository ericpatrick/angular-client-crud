import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Client, VehicleAPI } from "../../models";
import { MaskEvent } from "@emerbrito/input-mask";
import * as moment from "moment";
import { FormControl, Validators } from "@angular/forms";
import { Utils } from "src/app/shared/services/utils";
import { MatSelectChange } from "@angular/material";
import { VehicleService } from "../../services/vehicle.service";

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
  public showVehicleManufacturer: boolean;
  public vehicleManufacturerOptions: VehicleAPI[];

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
  }

  ngOnInit() {}

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
    this.vehicleService.getManufacturers(ev.value).subscribe((resp) => {
      this.vehicleManufacturerOptions = resp;
      this.showVehicleManufacturer = true;
    });
  }
}

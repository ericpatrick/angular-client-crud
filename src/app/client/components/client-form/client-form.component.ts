import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewChecked
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Client, VehicleInfo } from "../../models";
import { MaskEvent } from "@emerbrito/input-mask";
import * as moment from "moment";
import { FormControl, Validators } from "@angular/forms";
import { Utils } from "src/app/shared/services/utils";
import { MatSelectChange, MatAutocompleteSelectedEvent } from "@angular/material";
import { VehicleService } from "../../services/vehicle.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"]
})
export class ClientFormComponent implements OnInit, AfterViewChecked {
  public title: string;
  public edition: boolean;
  public client: Client;
  public paramsForm = {
    name: new FormControl("", [Validators.required]),

    cpf: new FormControl("", [Validators.required, this.cpfValidator]),

    phone: new FormControl("", [Validators.required, Validators.minLength(13)]),

    birthday: new FormControl("", [Validators.required]),

    address: new FormControl("", [Validators.required])
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.route.params.subscribe((res) => {
      if (res.id) {
        this.title = "Editar Cliente";
        this.client = this.clientService.get(res.id);
        this.edition = true;
      } else {
        this.title = "Adicionar cliente";
        this.client = new Client();
        this.edition = false;
      }
    });
  }

  public ngOnInit(): void {}

  public ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  public submitForm(): void {
    if (this.client.id) {
      this.clientService.update(this.client);
      this.toastr.success("Cliente atualizado com sucesso");
    } else {
      this.clientService.add(this.client);
      this.toastr.success("Cliente cadastrado com sucesso");
    }
    this.router.navigate(["/"]);
  }

  public onFormat(event: MaskEvent, key: string): void {
    this.client[key] = event.cleanValue;
  }

  public onBirthdayFormat(event: MaskEvent): void {
    this.client.birthday = event.value;
  }

  public cpfValidator(control: FormControl): any {
    const cpf = control.value;
    if (Utils.isValidCPF(cpf)) {
      return null;
    } else {
      return {
        cpf: "CPF inválido!"
      };
    }
  }

  public phoneValidator(control: FormControl): any {
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
    const { name, cpf, phone, birthday, address, vehicle } = this.client;
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

    if (!vehicle.model) {
      return false;
    }

    return true;
  }
}

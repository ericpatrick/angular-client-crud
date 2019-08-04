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
  @ViewChild("manufecturerInput") manufecturerInput: ElementRef;
  @ViewChild("modelInput") modelInput: ElementRef;

  public title: string;
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
  public vehicleManufacturers: VehicleInfo[];
  public manufacturersInputControl = new FormControl();
  public filteredVehicleManufecturers: Observable<VehicleInfo[]>;

  public showVehicleModels: boolean;
  public vehicleModels: VehicleInfo[];
  public modelsInputControl = new FormControl();
  public filteredVehicleModels: Observable<VehicleInfo[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.route.params.subscribe((res) => {
      if (res.id) {
        this.title = "Editar Cliente";
        this.client = this.clientService.get(res.id);
        const { type, manufacturer } = this.client.vehicle;
        const manufecturersPromise = this.vehicleService.getManufacturers(type).toPromise();
        const modelsPromise = this.vehicleService.getModels(type, manufacturer.cod).toPromise();
        this.spinner.show();
        Promise.all([manufecturersPromise, modelsPromise]).then((resp) => {
          this.vehicleManufacturers = resp[0];
          this.vehicleModels = resp[1];
          this.showVehicleManufacturer = true;
          this.showVehicleModels = true;
          this.spinner.hide();
        });
      } else {
        this.title = "Adicionar cliente";
        this.client = new Client();
      }
    });
  }

  public ngOnInit(): void {
    this.loadFilteredManufecturer();
    this.loadFilteredModels();
  }

  public ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  private loadFilteredManufecturer(): void {
    this.filteredVehicleManufecturers = this.manufacturersInputControl.valueChanges.pipe(
      startWith(""),
      map((value) => this.filterAutoCompleteOpts(value, this.vehicleManufacturers))
    );
  }

  private loadFilteredModels(): void {
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
    if (this.client.id) {
      this.clientService.update(this.client);
    } else {
      this.clientService.add(this.client);
    }
    this.toastr.success("Cliente cadastrado com sucesso");
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

  public selectVehicleType(ev: MatSelectChange): void {
    this.showVehicleModels = false;
    const { vehicle } = this.client;
    vehicle.type = ev.value;
    vehicle.manufacturer = null;
    vehicle.model = null;
    if (this.manufecturerInput) {
      this.manufecturerInput.nativeElement.value = "";
    }
    if (this.modelInput) {
      this.modelInput.nativeElement.value = "";
    }

    this.spinner.show();
    this.vehicleService.getManufacturers(ev.value).subscribe(
      (resp) => {
        this.vehicleManufacturers = resp;
        this.showVehicleManufacturer = true;
        this.loadFilteredManufecturer();
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        this.toastr.error("Erro ao carregar dados de fabricantes.");
      }
    );
  }

  public displayInfo(
    prop: "manufacturer" | "model"
  ): (a: VehicleInfo, b: ClientFormComponent) => string {
    const self = this;
    const displayFn = (item: VehicleInfo, scope = self) => {
      const { vehicle } = scope.client;
      return item ? item.name : vehicle[prop] ? vehicle[prop].name : undefined;
    };
    return displayFn;
  }

  public vehicleManufacturerSelected(event: MatAutocompleteSelectedEvent): void {
    const { vehicle } = this.client;
    vehicle.manufacturer = event.option.value as VehicleInfo;
    vehicle.model = null;
    if (this.modelInput) {
      this.modelInput.nativeElement.value = "";
    }

    const { type, manufacturer } = vehicle;
    this.spinner.show();
    this.vehicleService.getModels(type, manufacturer.cod).subscribe(
      (resp) => {
        this.vehicleModels = resp;
        this.showVehicleModels = true;
        this.loadFilteredModels();
        this.spinner.hide();
      },
      () => {
        this.toastr.error("Erro ao carregar dados de modelos.");
        this.spinner.hide();
      }
    );
  }

  public vehicleModelSelected(event: MatAutocompleteSelectedEvent): void {
    this.client.vehicle.model = event.option.value as VehicleInfo;
  }
}

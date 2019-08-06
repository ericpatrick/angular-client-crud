import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { VehicleInfo, Vehicle } from "src/app/client/models";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { VehicleService } from "src/app/client/services/vehicle.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { startWith, map } from "rxjs/operators";
import { MatSelectChange, MatAutocompleteSelectedEvent } from "@angular/material";

@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.component.html",
  styleUrls: ["./vehicle.component.scss"]
})
export class VehicleComponent implements OnInit {
  @ViewChild("manufecturerInput") manufecturerInput: ElementRef;
  @ViewChild("modelInput") modelInput: ElementRef;

  @Input()
  public isEdition: boolean;

  @Input()
  get vehicle(): Vehicle {
    return this.vehicleValue;
  }

  set vehicle(vehicle: Vehicle) {
    this.vehicleValue = vehicle;
    this.vehicleChange.emit(this.vehicleValue);
  }

  @Output()
  public vehicleChange = new EventEmitter();

  public vehicleValue: Vehicle;
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
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    if (this.isEdition) {
      const { type, manufacturer } = this.vehicleValue;
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
    }

    this.loadFilteredManufecturer();
    this.loadFilteredModels();
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

  public selectVehicleType(ev: MatSelectChange): void {
    this.showVehicleModels = false;
    this.vehicleValue.type = ev.value;
    this.vehicleValue.manufacturer = null;
    this.vehicleValue.model = null;
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
  ): (a: VehicleInfo, b: VehicleComponent) => string {
    const self = this;
    const displayFn = (item: VehicleInfo, scope = self) => {
      return item
        ? item.name
        : scope.vehicleValue[prop]
        ? scope.vehicleValue[prop].name
        : undefined;
    };
    return displayFn;
  }

  public vehicleManufacturerSelected(event: MatAutocompleteSelectedEvent): void {
    this.vehicleValue.manufacturer = event.option.value as VehicleInfo;
    this.vehicleValue.model = null;
    if (this.modelInput) {
      this.modelInput.nativeElement.value = "";
    }

    const { type, manufacturer } = this.vehicleValue;
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
    this.vehicleValue.model = event.option.value as VehicleInfo;
    this.vehicle = this.vehicleValue;
  }
}

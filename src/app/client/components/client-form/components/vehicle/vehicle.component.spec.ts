import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VehicleComponent } from "./vehicle.component";
import { SharedModule } from "src/app/shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VehicleService } from "src/app/client/services/vehicle.service";
import { ToastrModule } from "ngx-toastr";
import { Vehicle } from "src/app/client/models";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("VehicleComponent", () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: "toast-bottom-center",
          preventDuplicates: true
        }),
        BrowserAnimationsModule
      ],
      providers: [VehicleService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    component.vehicle = new Vehicle();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

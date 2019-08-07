import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientFormComponent } from "./client-form.component";
import { VehicleComponent } from "./components/vehicle/vehicle.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { VehicleService } from "../../services/vehicle.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("ClientFormComponent", () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFormComponent, VehicleComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test("should create", () => {
    expect(component).toBeTruthy();
  });
});

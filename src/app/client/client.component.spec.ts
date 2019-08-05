import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientComponent } from "./client.component";
import { SharedModule } from "../shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";

describe("ClientComponent", () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: "toast-bottom-center",
          preventDuplicates: true
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test("should create", () => {
    expect(component).toBeTruthy();
  });

  // test("should have welcome message", () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   const text = compiled.querySelector("p").textContent;
  //   expect(text).toContain("client works");
  // });
});

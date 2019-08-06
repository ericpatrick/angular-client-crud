import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { SharedModule } from "../shared/shared.module";
import { ClientService } from "./services/client.service";
import { LocalSorageDataManagerService } from "./services/local-sorage-data-manager.service";
import { ClientFormComponent } from "./components/client-form/client-form.component";
import { VehicleService } from "./services/vehicle.service";
import { VehicleComponent } from './components/client-form/components/vehicle/vehicle.component';

@NgModule({
  declarations: [ClientComponent, ClientFormComponent, VehicleComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
  providers: [ClientService, LocalSorageDataManagerService, VehicleService]
})
export class ClientModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { SharedModule } from "../shared/shared.module";
import { ClientService } from "./services/client.service";
import { LocalSorageDataManagerService } from "./services/local-sorage-data-manager.service";

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
  providers: [ClientService, LocalSorageDataManagerService]
})
export class ClientModule {}

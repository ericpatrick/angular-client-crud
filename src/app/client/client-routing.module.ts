import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client.component";
import { ClientFormComponent } from "./components/client-form/client-form.component";

const routes: Routes = [
  { path: "", component: ClientComponent },
  { path: "new", component: ClientFormComponent },
  { path: "edit/:id", component: ClientFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}

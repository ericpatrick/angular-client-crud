import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule, MatTableModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatTableModule, FlexLayoutModule],
  exports: [MatToolbarModule, MatTableModule, FlexLayoutModule]
})
export class SharedModule {}

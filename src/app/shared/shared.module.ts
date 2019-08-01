import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule {}

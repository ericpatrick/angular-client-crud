import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TextMaskModule } from "angular2-text-mask";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputMaskModule } from "@emerbrito/input-mask";

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
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TextMaskModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TextMaskModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class SharedModule {}

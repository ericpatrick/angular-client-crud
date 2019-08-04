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
  MatAutocompleteModule,
  MatDialogModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TextMaskModule } from "angular2-text-mask";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputMaskModule } from "@emerbrito/input-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [ConfirmationDialogComponent],
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
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmationDialogComponent],
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
    MatAutocompleteModule,
    NgxSpinnerModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule {}

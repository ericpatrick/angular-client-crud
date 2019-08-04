import { Component, OnInit, ViewChild } from "@angular/core";
import { Client } from "./models";
import { ClientService } from "./services/client.service";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { ConfirmationData } from "../shared/models";
import { ConfirmationDialogComponent } from "../shared/components/confirmation-dialog/confirmation-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ["name", "actions"];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public clients: Client[];

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.loadClients();
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadClients(): void {
    this.clients = this.clientService.getAll();
    this.dataSource = new MatTableDataSource<Client>(this.clients);
  }

  public deleteClient(client: Client): void {
    const dialogData: ConfirmationData = {
      title: "Atenção",
      message: `Deseja realmente excluir o cliente ${client.name}?`,
      cancelLabel: "Não",
      okLabel: "Sim"
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "250px",
      data: { ...dialogData }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.clientService.delete(client);
        this.toastr.success("Cliente removido com sucesso.");
        this.loadClients();
      }
    });
  }
}

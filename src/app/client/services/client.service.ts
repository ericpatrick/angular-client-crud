import { Injectable } from "@angular/core";
import { LocalSorageDataManagerService } from "./local-sorage-data-manager.service";
import { Client } from "../models";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  constructor(private localStorageManager: LocalSorageDataManagerService<Client>) {}

  public getAll(): Client[] {
    return this.localStorageManager.getAll();
  }

  public get(client: Client): Client {
    return this.localStorageManager.get(client.id);
  }

  public update(client: Client): Client {
    return this.localStorageManager.update(client);
  }

  public delete(client: Client): Client {
    return this.localStorageManager.delete(client);
  }
}

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

  public get(id: string): Client {
    return this.localStorageManager.get(id);
  }

  public add(client: Client): Client {
    return this.localStorageManager.add(client);
  }

  public update(client: Client): Client {
    return this.localStorageManager.update(client);
  }

  public delete(client: Client): Client {
    return this.localStorageManager.delete(client);
  }
}

import { TestBed } from "@angular/core/testing";

import { ClientService } from "./client.service";
import { LocalSorageDataManagerService } from "./local-sorage-data-manager.service";
import { Client } from "../models";

describe("ClientService", () => {
  let service: ClientService;
  const clientFixtures = [
    {
      id: "teipvkx5e",
      name: "Client 01",
      cpf: "37835635003",
      phone: "123456789",
      birthday: "06/06/2011",
      address: "Rua",
      vehicle: {
        type: "motos",
        manufacturer: { name: "YAMAHA", cod: "101" },
        model: { name: "XVS 650 DRAG STAR", cod: "3090" }
      }
    },
    {
      id: "q9ja2s8ca",
      name: "Client 02",
      cpf: "26964426060",
      phone: "987654321",
      birthday: "06/07/1977",
      address: "Avenida",
      vehicle: {
        type: "carros",
        manufacturer: { name: "Cadillac", cod: "10" },
        model: { name: "Deville/Eldorado 4.9", cod: "258" }
      }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalSorageDataManagerService]
    });
    service = TestBed.get(ClientService);
    localStorage.setItem("clients", JSON.stringify(clientFixtures));
  });

  test("should be created", () => {
    expect(service).toBeTruthy();
  });

  test("should get all clients", () => {
    const clients: Client[] = service.getAll();

    expect(clients).toBeTruthy();
    expect(clients).toHaveLength(2);

    const firstClient = clients[0];
    expect(firstClient.id).toBe(clientFixtures[0].id);
    expect(firstClient.name).toBe(clientFixtures[0].name);
    expect(firstClient.cpf).toBe(clientFixtures[0].cpf);
    expect(firstClient.phone).toBe(clientFixtures[0].phone);
    expect(firstClient.birthday).toBe(clientFixtures[0].birthday);
    expect(firstClient.address).toBe(clientFixtures[0].address);
    expect(firstClient.vehicle).toEqual(clientFixtures[0].vehicle);

    const secondClient = clients[1];
    expect(secondClient.id).toBe(clientFixtures[1].id);
    expect(secondClient.name).toBe(clientFixtures[1].name);
    expect(secondClient.cpf).toBe(clientFixtures[1].cpf);
    expect(secondClient.phone).toBe(clientFixtures[1].phone);
    expect(secondClient.birthday).toBe(clientFixtures[1].birthday);
    expect(secondClient.address).toBe(clientFixtures[1].address);
    expect(secondClient.vehicle).toEqual(clientFixtures[1].vehicle);
  });

  test("should get a specific client", () => {
    const client: Client = service.get(clientFixtures[0].id);

    expect(client).toBeTruthy();

    expect(client.id).toBe(clientFixtures[0].id);
    expect(client.name).toBe(clientFixtures[0].name);
    expect(client.cpf).toBe(clientFixtures[0].cpf);
    expect(client.phone).toBe(clientFixtures[0].phone);
    expect(client.birthday).toBe(clientFixtures[0].birthday);
    expect(client.address).toBe(clientFixtures[0].address);
    expect(client.vehicle).toEqual(clientFixtures[0].vehicle);
  });

  test("should get a undefined client with unknown id", () => {
    const client: Client = service.get("unknown");

    expect(client).toBeFalsy();
  });

  test("should add a client", () => {
    const clientToAdd: Client = {
      id: null,
      name: "Client 03",
      cpf: "92561432084",
      phone: "951753852",
      birthday: "12/04/2001",
      address: "Alameda",
      vehicle: {
        type: "motos",
        manufacturer: { name: "YAMAHA", cod: "101" },
        model: { name: "XVS 650 DRAG STAR", cod: "3090" }
      }
    };
    const client: Client = service.add(clientToAdd);

    expect(client).toBeTruthy();

    expect(client.id).toBeTruthy();
    expect(client.name).toBe(clientToAdd.name);
    expect(client.cpf).toBe(clientToAdd.cpf);
    expect(client.phone).toBe(clientToAdd.phone);
    expect(client.birthday).toBe(clientToAdd.birthday);
    expect(client.address).toBe(clientToAdd.address);
    expect(client.vehicle).toEqual(clientToAdd.vehicle);
  });

  test("should update a specific client", () => {
    const clientToUpdate: Client = service.get(clientFixtures[0].id);

    clientToUpdate.name = "Client Updated";
    clientToUpdate.address = "Address updated";

    const clientUpdated: Client = service.update(clientToUpdate);

    expect(clientUpdated).toBeTruthy();

    expect(clientUpdated.id).toBe(clientToUpdate.id);
    expect(clientUpdated.name).toBe(clientToUpdate.name);
    expect(clientUpdated.cpf).toBe(clientToUpdate.cpf);
    expect(clientUpdated.phone).toBe(clientToUpdate.phone);
    expect(clientUpdated.birthday).toBe(clientToUpdate.birthday);
    expect(clientUpdated.address).toBe(clientToUpdate.address);
    expect(clientUpdated.vehicle).toEqual(clientToUpdate.vehicle);
  });

  test("should get error when to try to update a unknown client", () => {
    const unknownClient: Client = {
      id: "123",
      name: "Client Unknown",
      cpf: "92561432084",
      phone: "951753852",
      birthday: "12/04/2001",
      address: "Alameda",
      vehicle: {
        type: "motos",
        manufacturer: { name: "YAMAHA", cod: "101" },
        model: { name: "XVS 650 DRAG STAR", cod: "3090" }
      }
    };

    expect(() => service.update(unknownClient)).toThrow(Error);
  });

  test("should remove a specific client", () => {
    const clientToRemove: Client = service.get(clientFixtures[0].id);
    const clientRemoved: Client = service.delete(clientToRemove);

    expect(clientRemoved).toBeTruthy();

    expect(clientRemoved.id).toBe(clientToRemove.id);
    expect(clientRemoved.name).toBe(clientToRemove.name);
    expect(clientRemoved.cpf).toBe(clientToRemove.cpf);
    expect(clientRemoved.phone).toBe(clientToRemove.phone);
    expect(clientRemoved.birthday).toBe(clientToRemove.birthday);
    expect(clientRemoved.address).toBe(clientToRemove.address);
    expect(clientRemoved.vehicle).toEqual(clientToRemove.vehicle);
  });

  test("should get error when to try to update a unknown client", () => {
    const unknownClient: Client = {
      id: "123",
      name: "Client Unknown",
      cpf: "92561432084",
      phone: "951753852",
      birthday: "12/04/2001",
      address: "Alameda",
      vehicle: {
        type: "motos",
        manufacturer: { name: "YAMAHA", cod: "101" },
        model: { name: "XVS 650 DRAG STAR", cod: "3090" }
      }
    };

    expect(() => service.delete(unknownClient)).toThrow(Error);
  });
});

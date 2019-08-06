import { TestBed } from "@angular/core/testing";

import { LocalSorageDataManagerService } from "./local-sorage-data-manager.service";
import { StorageObject } from "../models";

describe("LocalSorageDataManagerService", () => {
  let service: LocalSorageDataManagerService<StorageObject>;
  const storageKey = "clients";
  const fixtures: StorageObject[] = [
    {
      id: "teipvkx5e"
    },
    {
      id: "q9ja2s8ca"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LocalSorageDataManagerService);
    localStorage.setItem(storageKey, JSON.stringify(fixtures));
  });

  test("should be created", () => {
    expect(service).toBeTruthy();
  });

  test("should get all objects", () => {
    const objs = service.getAll();
    expect(objs).toEqual(fixtures);

    const storageValueStr = localStorage.getItem(storageKey);
    const value = JSON.parse(storageValueStr);
    expect(objs).toEqual(value);
  });

  test("should get an object", () => {
    const obj = service.get(fixtures[0].id);
    expect(obj).toEqual(fixtures[0]);

    const storageValueStr = localStorage.getItem(storageKey);
    const value = JSON.parse(storageValueStr);
    expect(obj).toEqual(value[0]);
  });

  test("should get undefined with unknown id", () => {
    const obj = service.get("unknown");
    expect(obj).toBeFalsy();

    const storageValueStr = localStorage.getItem(storageKey);
    const value = JSON.parse(storageValueStr);
    const objFound = value.find((x) => x.id === "unknown");
    expect(objFound).toBeFalsy();
  });

  test("should update an object", () => {
    const obj = service.get(fixtures[0].id);
    expect(obj).toEqual(fixtures[0]);

    const key = "name";
    obj[key] = "updated";
    const objUpdated = service.update(obj);
    expect(objUpdated).toEqual(obj);

    const storageValueStr = localStorage.getItem(storageKey);
    const value = JSON.parse(storageValueStr);
    expect(value[0]).toEqual(objUpdated);
  });

  test("should get error when to try to update unknown obj", () => {
    const obj = {
      id: "unknown",
      name: "not updated"
    };

    expect(() => service.update(obj)).toThrow(Error);
  });

  test("should remove an object", () => {
    const obj = service.get(fixtures[0].id);
    expect(obj).toEqual(fixtures[0]);

    const objUpdated = service.delete(obj);
    expect(objUpdated).toEqual(obj);

    const storageValueStr = localStorage.getItem(storageKey);
    const value = JSON.parse(storageValueStr);
    expect(value).toHaveLength(1);
    expect(value[0]).toEqual(fixtures[1]);
  });

  test("should get error when to try to remove unknown obj", () => {
    const obj = {
      id: "unknown",
      name: "not updated"
    };

    expect(() => service.delete(obj)).toThrow(Error);
  });
});

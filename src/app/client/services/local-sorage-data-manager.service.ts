import { Injectable } from "@angular/core";
import { StorageObject } from "../models";
import { Utils } from "src/app/shared/services/utils";

@Injectable({
  providedIn: "root"
})
export class LocalSorageDataManagerService<T extends StorageObject> {
  private CLIENT_KEY = "clients";

  constructor() {
    const resultStr = localStorage.getItem(this.CLIENT_KEY);
    if (!resultStr) {
      localStorage.setItem(this.CLIENT_KEY, "[]");
    }
  }

  private changeLocalStorage(logic: (content: T[]) => void): void {
    let resultStr = localStorage.getItem(this.CLIENT_KEY);
    const result = JSON.parse(resultStr) as T[];

    logic(result);

    resultStr = JSON.stringify(result);
    localStorage.setItem(this.CLIENT_KEY, resultStr);
  }

  public getAll(): T[] {
    const resultStr = localStorage.getItem(this.CLIENT_KEY);

    return JSON.parse(resultStr) as T[];
  }

  public get(id: string): T {
    const resultStr = localStorage.getItem(this.CLIENT_KEY);
    const result = JSON.parse(resultStr) as T[];

    return result.find((x) => x.id === id);
  }

  public add(obj: T): T {
    const addObj = (data: T[]) => {
      obj.id = Utils.generateUuid();
      data.push(obj);
    };

    this.changeLocalStorage(addObj);

    return obj;
  }

  public update(obj: T): T {
    const updateObj = (data: T[]) => {
      const index = data.findIndex((x) => x.id === obj.id);
      if (index === -1) {
        throw new Error("Item not found!");
      }
      data[index] = obj;
    };

    this.changeLocalStorage(updateObj);

    return obj;
  }

  public delete(obj: T): T {
    let removed: T;
    const deleteObj = (data: T[]) => {
      const index = data.findIndex((x) => x.id === obj.id);
      if (index === -1) {
        throw new Error("Item not found!");
      }
      removed = data.splice(index, 1)[0];
    };

    this.changeLocalStorage(deleteObj);

    return removed;
  }
}

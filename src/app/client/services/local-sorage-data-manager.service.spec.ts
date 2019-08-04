import { TestBed } from "@angular/core/testing";

import { LocalSorageDataManagerService } from "./local-sorage-data-manager.service";
import { StorageObject } from "../models";

describe("LocalSorageDataManagerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  test("should be created", () => {
    const service: LocalSorageDataManagerService<StorageObject> = TestBed.get(
      LocalSorageDataManagerService
    );
    expect(service).toBeTruthy();
  });
});

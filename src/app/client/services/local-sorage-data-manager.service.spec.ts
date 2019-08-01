import { TestBed } from "@angular/core/testing";

import { LocalSorageDataManagerService } from "./local-sorage-data-manager.service";

describe("LocalSorageDataManagerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  test("should be created", () => {
    const service: LocalSorageDataManagerService = TestBed.get(LocalSorageDataManagerService);
    expect(service).toBeTruthy();
  });
});

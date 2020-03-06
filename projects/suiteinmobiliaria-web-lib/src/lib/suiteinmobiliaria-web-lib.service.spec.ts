import { TestBed } from '@angular/core/testing';

import { SuiteinmobiliariaWebLibService } from './suiteinmobiliaria-web-lib.service';

describe('SuiteinmobiliariaWebLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuiteinmobiliariaWebLibService = TestBed.get(SuiteinmobiliariaWebLibService);
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MineService } from './mine.service';

describe('Service: Mine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MineService]
    });
  });

  it('should ...', inject([MineService], (service: MineService) => {
    expect(service).toBeTruthy();
  }));
});

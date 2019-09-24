import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,

    ],
    providers: [FirebaseService]
  }));
  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});

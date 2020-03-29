import { TestBed, async } from '@angular/core/testing';

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
  it ('obtener informacion', async(() => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    service.getInformation().subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error),
    );
  }));
  it ('insertar informacion', async(() => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    service.setInformation(
      {
        birthdate: 'string',
        firstname: 'string',
        identification: 'string',
        lastname: 'string',
      }
    ).subscribe(
      (response) => expect(response.json()).not.toBeNull(),
      (error) => fail(error),
    );
  }));
});

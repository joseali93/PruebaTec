import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/i.user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private http: HttpClient,
    private env: EnvService,

  ) { }
  /**
   * getInformation
   */
  public getInformation(): Observable<any> {
    // let headerJson = {
    //   'AppKey': 'asfgfkmgfhfd141RTGRNOINEFDSFSASumffe15491LSFQUYTREWPLJHBVafgjjlouyytrRRetyhbnmmvcxxz',
    //   'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    // };
    // let headers = new HttpHeaders(headerJson);
    return this.http.get(this.env.API_URL + this.env.get);
  }
  public setInformation(client: IUser): Observable<any> {
    return this.http.post(this.env.API_URL + this.env.get, client);
  }
}

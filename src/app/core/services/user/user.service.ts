import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../models/interface/user.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser():Observable<IUser[] | null> {
    return this.http.get<{[key: string]: IUser}>(`${environment.API_URL}/users.json`).pipe(
      map(
        (response) => {
          if(!response) return null
          return Object.keys(response).map((k) => ({
            ...response[k],
            id:k
          }))
        }
      )
    )
  }
}

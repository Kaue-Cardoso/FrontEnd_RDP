import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  API = environment.SERVIDOR+"api/rdp/user"

  constructor() { }

  save(user : User) : Observable<string>{
    return this.http.post<string>(this.API+"/save", user, {responseType: 'text' as 'json'});
  }

  update(user: User) : Observable<string>{
    return this.http.put<string>(this.API+"/update"+user.id, user, {responseType: 'text' as 'json'});
  }

  findAll() : Observable<User[]>{
    return this.http.get<User[]>(this.API+"/findAll");
  }

  findById(id:number) : Observable<User>{
    return this.http.get<User>(this.API+"/findById/"+id);
  }
  delete(id:number) : Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id);
  }
}

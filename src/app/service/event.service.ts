import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Evento } from '../model/evento';
import { Game } from '../model/game';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  http = inject(HttpClient)

  API = environment.SERVIDOR+"api/rdp/event"


  constructor() { }

  findAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API + "/findAll")
  }

  findLast5(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API + "/findLast5")
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
  }

  save(evento: Evento): Observable<string> {
    return this.http.post<string>(this.API + "/save", evento, { responseType: 'text' as 'json' });
  }

  update(evento: Evento, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, evento, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Evento> {
    return this.http.get<Evento>(this.API + "/findById/" + id);
  }

  getAllEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API + "/findAll");
  }
  getAllEventsByGames(sigla: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API + "/findAllByGame/"+sigla);
  }


}

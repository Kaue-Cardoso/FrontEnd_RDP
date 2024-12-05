import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Guide } from '../model/guide';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  http = inject(HttpClient)
  API = "http://localhost:8080/api/rdp/guide"

  constructor() { }

  save(guide : Guide) : Observable<string>{
    guide.data_cr = 'data';
    return this.http.post<string>(this.API+"/save", guide, {responseType: 'text' as 'json'});
  }

  update(guide: Guide) : Observable<string>{
    return this.http.put<string>(this.API+"/update"+guide.id, guide, {responseType: 'text' as 'json'});
  }

  findAll() : Observable<Guide[]>{
    return this.http.get<Guide[]>(this.API+"/findAll");
  }

  findById(id:number) : Observable<Guide>{
    return this.http.get<Guide>(this.API+"/findById/"+id);
  }
  findByTitulo(titulo:string) : Observable<Guide>{
    return this.http.get<Guide>(this.API+"/findByTitulo/"+titulo);
  }
  delete(id:number) : Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id);
  }

  getAllGuidesByGames(sigla: string): Observable<Guide[]> {
    return this.http.get<Guide[]>(this.API + "/findAllByGame/"+sigla);
  }
}

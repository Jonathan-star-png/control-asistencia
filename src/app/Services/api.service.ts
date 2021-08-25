import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url_base: string="https://control-asistencia-6f3e4-default-rtdb.firebaseio.com/";
  headers = {
    "Content-Type": "application/json",
  };
  body = {};
  get_sections='sections.json';
  constructor(private http:HttpClient) { }
  getSection(): Observable<any>{
    return this.http.get(this.url_base+this.get_sections,{
      headers: this.headers
    })
  }
}

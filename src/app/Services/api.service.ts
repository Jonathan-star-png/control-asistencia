import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from '../Models/courses';

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
  get_courses='courses.json'
  create_courses='courses/'
  /* --------Actualizar tabla-------- */
  table=new EventEmitter<any>()
/* --------/Actualizar tabla-------- */

  constructor(private http:HttpClient) { }
  getSection(): Observable<any>{
    return this.http.get(this.url_base+this.get_sections,{
      headers: this.headers
    })
  }
  getCourses(): Observable<any>{
    return this.http.get(this.url_base+this.get_courses,{
      headers: this.headers
    })
  }
  createCourses(form:Courses, id:any): Observable<any>{
    let Id=id+".json";
    let direccion=this.url_base+this.create_courses+Id;
    return this.http.put<any>(direccion,form)
  }
}

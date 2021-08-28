import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses} from '../Models/courses';
import { Students } from '../Models/students';
import { Attendance } from '../Models/attendance';
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
  get_courses_by_section='courses.json?orderBy="section"&equalTo='
  create_students='students/'
  get_student='students/'
  get_students='students.json'
  create_attendance='attendance.json'
  get_assistance_by_code_course='attendance.json?orderBy="course_code"&equalTo='
  
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
  getCoursesBySection(param:any): Observable<any>{
    let section="\""+param+"\"";
    return this.http.get(this.url_base+this.get_courses_by_section+section,{
      headers: this.headers
    })
  }

  createStudents(form:Students, id:any): Observable<any>{
    let Id=id+".json";
    let direccion=this.url_base+this.create_students+Id;
    return this.http.put<any>(direccion,form)
  }

  getStudent(id:any): Observable<any>{
    let Id=id+".json";
    return this.http.get(this.url_base+this.get_student+Id,{
      headers: this.headers
    })
  }

  getStudents():Observable<any>{
    return this.http.get(this.url_base+this.get_students,{
      headers: this.headers
    })
  }

  createAttendance(form:Attendance): Observable<any>{
    let direccion=this.url_base+this.create_attendance;
    return this.http.post<any>(direccion,form)
  }

  getAttendanceBycodeCourse(param:any): Observable<any>{
    let section="\""+param+"\"";
    console.log(this.url_base+this.get_assistance_by_code_course+section)
    return this.http.get(this.url_base+this.get_assistance_by_code_course+section,{
      headers: this.headers
    })
  }
}

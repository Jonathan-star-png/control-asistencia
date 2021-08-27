import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Attendance } from 'src/app/Models/attendance';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-form-attendance',
  templateUrl: './form-attendance.component.html',
  styleUrls: ['./form-attendance.component.scss'],
})
export class FormAttendanceComponent implements OnInit {
  status=false;
  name="";
  section="";
  nombre=new FormControl;
  attendanceForm:FormGroup;
  students=[];
  code_courses=[];
  disabled:boolean;
  constructor(private _builder: FormBuilder,private api:ApiService,public toastController: ToastController) { 
    this.attendanceForm=this._builder.group({
      license:[''],
      name:[''],
      section:[''],
      course_code:[''],
      date:[''],
      watched_topics:[''],
      justification:['']
    })
    
  }
  ngOnInit() {
    this.getStudents();
  }
  send(form:Attendance){
    this.api.createAttendance(form).subscribe(data=>{
      this.presentToastSuccess('Asistencia registrada con éxito', 'success');
    })
    this.clearForm();
  }
  changeDate(event){
    var dateFormat = event.detail.value.split('T')[0]; 
    this.attendanceForm.get('date').setValue(dateFormat)
  }
  clearForm(){
    this.attendanceForm.reset();
  }
  compareCard(){
    for(let i in this.students){
      if(this.attendanceForm.get('license').value==this.students[i].card){
        this.name=this.students[i].name;
        this.section=this.students[i].section;
        this.code_courses=this.students[i].listCodeOfCourses;
        this.attendanceForm.get('name').setValue(this.name);
        this.attendanceForm.get('section').setValue(this.section);
        this.disabled=false;
        return true
      }
      else{
        this.disabled=true;
      }
    }
  }
  getStudents(){
    this.api.getStudents().subscribe(data=>{
      for(let i in data){
        this.students.push(data[i]);
      }
    })
  }
  changeSelect(event){
    var select=event.detail.value
    this.attendanceForm.get('course_code').setValue(select);
  }
  async presentToastSuccess(message,color){
    const toast = await this.toastController.create({
      message:message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}

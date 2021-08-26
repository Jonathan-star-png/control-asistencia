import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Attendance } from 'src/app/Models/attendance';

@Component({
  selector: 'app-form-attendance',
  templateUrl: './form-attendance.component.html',
  styleUrls: ['./form-attendance.component.scss'],
})
export class FormAttendanceComponent implements OnInit {
  
  data=[
    {
      "card": "1990-18-16610",
      "name": "Jonathan Eduardo Sequén Patzán",
      "section":"A",
      "ListCodeOfCourses":"Array"
    },
    {
      "card": "1990-17-4654",
      "name": "José Alberto Hernández Elel"
    },
    {
      "card": "1990-18-17008",
      "name": "Juan Antonio Matzul Xiá"
    },
    {
      "card": "1990-18-7181",
      "name": "José Ernesto Izquierdo Miguel"
    }
  ];
  status=false;
  name="";
  nombre=new FormControl;
  attendanceForm:FormGroup
  constructor(private _builder: FormBuilder) { 
    this.attendanceForm=this._builder.group({
      license:[''],
      course_code:[''],
      date:[''],
      watched_topics:[''],
      justification:['']
    })
    
  }
  ngOnInit() {}
  send(form:Attendance){
    console.log(form);
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
    for(let i in this.data){
      if(this.attendanceForm.get('license').value==this.data[i].card){
        this.name=this.data[i].name;
        return true
      }
    }
  }
}

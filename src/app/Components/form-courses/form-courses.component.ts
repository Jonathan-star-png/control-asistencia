import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Courses } from 'src/app/Models/courses';
import { ApiService } from 'src/app/Services/api.service';
@Component({
  selector: 'app-form-courses',
  templateUrl: './form-courses.component.html',
  styleUrls: ['./form-courses.component.scss'],
})
export class FormCoursesComponent implements OnInit {
  courseForm:FormGroup;
  constructor(private _builder:FormBuilder,private api:ApiService) {
    this.courseForm=this._builder.group({
      name_course:[''],
      code_course:[''],
      section:['']
    })
   }
   sections=[];
   courses=[];
   code:any;

  ngOnInit() {
    this.getSections();
    this.getCourses();
  }
  
  send(form:Courses){
    console.log(form);
    this.api.createCourses(form,form.code_course).subscribe(data =>{
      console.log(data)
      this.api.table.emit("change");
    })
    this.clearForm();
    this.getCourses();
  }
  clearForm(){
    this.courseForm.reset();
  }
  getSections(){
    this.api.getSection().subscribe(data =>{
      for(let i in data){
        this.sections.push(data[i]);
      }
    })
  }
  changeSelect(event){
    var select=event.detail.value
    this.courseForm.get('section').setValue(select);
  }
  generateCode(){
    if(this.courses.length==0){
      this.code="001"
    }
    if(this.courses.length>=1 && this.courses.length<9){
      let length=this.courses.length+1;
      this.code="00"+String(length)
    }
    if(this.courses.length>=9 && this.courses.length<99){
      let length=this.courses.length+1;
      this.code="0"+String(length)
    }
    this.courseForm.get('code_course').setValue(this.code+this.courseForm.get('name_course').value);
  }
  getCourses(){
    this.api.getCourses().subscribe(data =>{
      for(let i in data){
        this.courses.push(data[i]);
      }
    })
  }
}

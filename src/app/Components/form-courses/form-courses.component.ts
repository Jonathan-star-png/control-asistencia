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

  ngOnInit() {
    this.getSections();
  }
  
  send(form:Courses){
    console.log(form);
    this.clearForm();
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Students } from 'src/app/Models/students';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-form-students',
  templateUrl: './form-students.component.html',
  styleUrls: ['./form-students.component.scss'],
})
export class FormStudentsComponent implements OnInit {
  studentsForm:FormGroup
  constructor(private _builder:FormBuilder,private api:ApiService,public toastController: ToastController) {
    this.studentsForm=this._builder.group({
      card:[''],
      name:[''],
      section:[''],
      listCodeOfCourses:['']
    })
   }
   sections=[];
   courses=[];
  ngOnInit() {
    this.getSections();
  }
  send(form:Students){
    console.log(form);
    this.api.createStudents(form,form.card).subscribe(data =>{
      console.log(data)
      this.presentToastSuccess('Alumno registrado con éxito', 'success');
    })
    this.clearForm();
  }
  clearForm(){
    this.studentsForm.reset();
  }
  getSections(){
    this.api.getSection().subscribe(data =>{
      for(let i in data){
        this.sections.push(data[i]);
      }
    })
  }
  getCourseBySection(){
    this.courses.length=0;
    this.api.getCoursesBySection(this.studentsForm.get('section').value).subscribe(data =>{
      console.log(data);
      for(let i in data){
        this.courses.push(data[i]);
      }
    })
  }
  changeSelect(event){
    var select=event.detail.value
    this.studentsForm.get('section').setValue(select);
    this.getCourseBySection();
  }

  changeSelectCourses(event){
    var select=event.detail.value
    this.studentsForm.get('listCodeOfCourses').setValue(select);
    console.log(this.studentsForm.get('listCodeOfCourses').value)
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

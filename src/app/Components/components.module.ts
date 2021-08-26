import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCoursesComponent } from './form-courses/form-courses.component';
import { FormAttendanceComponent } from './form-attendance/form-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewCoursesComponent } from './view-courses/view-courses.component';



@NgModule({
  declarations: [
    FormCoursesComponent,
    FormAttendanceComponent,
    ViewCoursesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    FormCoursesComponent,
    FormAttendanceComponent,
    ViewCoursesComponent
  ]
})
export class ComponentsModule { }

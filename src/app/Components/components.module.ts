import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCoursesComponent } from './form-courses/form-courses.component';
import { FormAttendanceComponent } from './form-attendance/form-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { FormStudentsComponent } from './form-students/form-students.component';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    FormCoursesComponent,
    FormAttendanceComponent,
    ViewCoursesComponent,
    FormStudentsComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  exports:[
    FormCoursesComponent,
    FormAttendanceComponent,
    ViewCoursesComponent,
    FormStudentsComponent,
    GraphComponent
  ]
})
export class ComponentsModule { }

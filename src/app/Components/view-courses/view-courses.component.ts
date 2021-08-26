import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss'],
})
export class ViewCoursesComponent implements OnInit {

  constructor(private api:ApiService) { }
  courses=[];
  ngOnInit() {
    this.getCourses();
    this.api.table.subscribe(data=>{
      if(data=='change'){
        this.courses.length=0;
        this.getCourses();
      }
    })
  }
  
  getCourses(){
    this.api.getCourses().subscribe(data =>{
      for(let i in data){
        this.courses.push(data[i]);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = ['Personas que asistieron', 'Personas que no asistieron'];
public pieChartData: number[] = [];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];

students=[];
courses=["001Arquitectura","002Desarrollo web","003Redes de computadoras","004Análisis de sistemas","005Etica"];
dictionaryCourses=[];
arquitectura=0;
desarrolloWeb=0;
redesComputadoras=0;
AnalisisSistemas=0;
etica=0;
attendance=[];
get_attendanceBycodeCourse=[];

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getStudents();
  }
  
  getStudents(){
    this.api.getStudents().subscribe(data=>{
      for(let i in data){
        this.students.push(data[i]);
      }
      for(let student in this.students){
        let listCourses=this.students[student].listCodeOfCourses;
        for(let courses in listCourses){
          let courseName=listCourses[courses];
          if(courseName=="001Arquitectura"){
            this.arquitectura=this.arquitectura+1
          }
          if(courseName=="002Desarrollo web"){
            this.desarrolloWeb=this.desarrolloWeb+1
          }
          if(courseName=="003Redes de computadoras"){
            this.redesComputadoras=this.redesComputadoras+1
          }
          if(courseName=="004Análisis de sistemas"){
            this.AnalisisSistemas=this.AnalisisSistemas+1
          }
          if(courseName=="005Etica"){
            this.etica=this.etica+1
          }
        }
      }
    })
  }

  changeSelectCourses(event){
    var select=event.detail.value
    this.api.getAttendanceBycodeCourse(select).subscribe(data =>{
      if(select=="001Arquitectura"){
        this.get_attendanceBycodeCourse.length=0
        for(let i in data){
          this.get_attendanceBycodeCourse.push(data[i])
        }
        let diferencia = this.arquitectura-this.get_attendanceBycodeCourse.length
        this.pieChartData = [this.get_attendanceBycodeCourse.length,diferencia];
      }
      if(select=="002Desarrollo web"){
        this.get_attendanceBycodeCourse.length=0
        for(let i in data){
          this.get_attendanceBycodeCourse.push(data[i])
        }
        let diferencia = this.desarrolloWeb-this.get_attendanceBycodeCourse.length
        this.pieChartData = [this.get_attendanceBycodeCourse.length,diferencia];
      }
      if(select=="003Redes de computadoras"){
        this.get_attendanceBycodeCourse.length=0
        for(let i in data){
          this.get_attendanceBycodeCourse.push(data[i])
        }
        let diferencia = this.redesComputadoras-this.get_attendanceBycodeCourse.length
        this.pieChartData = [this.get_attendanceBycodeCourse.length,diferencia];
      }
      if(select=="004Análisis de sistemas"){
        this.get_attendanceBycodeCourse.length=0
        for(let i in data){
          this.get_attendanceBycodeCourse.push(data[i])
        }
        let diferencia = this.AnalisisSistemas-this.get_attendanceBycodeCourse.length
        this.pieChartData = [this.get_attendanceBycodeCourse.length,diferencia];
      }
      if(select=="005Etica"){
        this.get_attendanceBycodeCourse.length=0
        for(let i in data){
          this.get_attendanceBycodeCourse.push(data[i])
        }
        let diferencia = this.etica-this.get_attendanceBycodeCourse.length
        this.pieChartData = [this.get_attendanceBycodeCourse.length,diferencia];
      }
    })
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    loadChildren: () => import('./Pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./Pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./Pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
  },  {
    path: 'students',
    loadChildren: () => import('./Pages/students/students.module').then( m => m.StudentsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

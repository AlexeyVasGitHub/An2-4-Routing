import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent, TaskComponent, TaskFormComponent } from './components';

@NgModule({
  declarations: [TaskListComponent, TaskComponent, TaskFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule
  ]
})
export class TasksModule {
}

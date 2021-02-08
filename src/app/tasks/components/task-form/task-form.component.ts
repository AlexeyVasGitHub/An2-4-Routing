import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { TaskArrayService } from '../../services/task-array.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskArrayService: TaskArrayService) {
  }

  ngOnInit(): void {
    this.task = new TaskModel();

    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    const observer = {
      next: (task: TaskModel) => (this.task = {...task}),
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.taskArrayService.getTask(+params.get('taskID'))))
      .subscribe(observer);
  }

  onSaveTask() {
    const task = {...this.task} as TaskModel;
    if (task.id) {
      this.taskArrayService.updateTask(task);
    }
    else {
      this.taskArrayService.createTask(task);
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/classes/task';
import { UpdateTaskService } from 'src/services/update-task.service';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  updateTaskFormGroup!: FormGroup;
  title_text: string = 'Update Task';
  task!: Task;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private updateTaskService: UpdateTaskService
  ) {
    this.initUpdateTaskForm();
  }
  ngOnInit(): void {
    this.readTask();
  }
  initUpdateTaskForm() {
    this.updateTaskFormGroup = this.formBuilder.group({
      taskId: new FormControl('', Validators.required),
      taskTitle: new FormControl('', Validators.required),
      taskDescription: new FormControl('', Validators.required),
      taskStatus: new FormControl('', Validators.required),
    });
  }
  fillUpdateTaskForm(task: Task) {
    this.updateTaskFormGroup = this.formBuilder.group({
      taskId: task.taskId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskStatus: task.taskStatus,
    });
  }
  readTask() {
    var taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.updateTaskService.readTask(taskId).subscribe({
      next: (response: any) => {
        this.task = response;
        this.fillUpdateTaskForm(this.task);
        console.log(this.task);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  updateTask() {
    var taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.updateTaskService
      .updateTask(taskId, this.updateTaskFormGroup.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }
}

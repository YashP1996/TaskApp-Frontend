import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateTaskService } from 'src/services/create-task.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  createTaskFormGroup!: FormGroup;
  title_text: string = 'Create Task';
  constructor(
    private formBuilder: FormBuilder,
    private createTaskService: CreateTaskService
  ) {
    this.initCreateTaskForm();
  }
  ngOnInit(): void {}
  initCreateTaskForm() {
    this.createTaskFormGroup = this.formBuilder.group({
      taskTitle: new FormControl('', Validators.required),
      taskDescription: new FormControl('', Validators.required),
      taskStatus: new FormControl('ToDo', Validators.required),
    });
  }
  createTask() {
    this.createTaskService
      .createTask(this.createTaskFormGroup.value)
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

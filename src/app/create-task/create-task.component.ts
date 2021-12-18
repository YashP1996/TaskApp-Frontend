import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateTaskService } from 'src/services/create-task.service';
declare var $: any;
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  createTaskFormGroup!: FormGroup;
  title_text: string = 'Create Task';
  taskTitleRegex: any = /^([a-zA-Z0-9]{1,40})$/;
  taskTitleValidator: any = false;
  taskDescriptionValidator: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private createTaskService: CreateTaskService
  ) {
    this.initCreateTaskForm();
  }
  ngOnInit(): void {
    this.validateCreateTaskForm();
  }
  trigger_error(error_id: any, error_message: any) {
    $('#' + error_id).fadeIn('slow');
    $('#' + error_id).css({ padding: '0.375rem' });
    $('#' + error_id).text(error_message);
  }
  clear_error() {
    $('.error').fadeOut('slow');
  }
  initCreateTaskForm() {
    this.createTaskFormGroup = this.formBuilder.group({
      taskTitle: new FormControl('', Validators.required),
      taskDescription: new FormControl('', Validators.required),
      taskStatus: new FormControl('ToDo', Validators.required),
    });
  }
  validateCreateTaskForm() {
    $('#taskTitle').blur(() => {
      if ($('#taskTitle').val() == '') {
        this.taskTitleValidator = false;
        this.trigger_error('taskTitleError', 'Please Specify Title.');
        setTimeout(this.clear_error, 3000);
        return false;
      } else if (!$('#taskTitle').val().match(this.taskTitleRegex)) {
        this.taskTitleValidator = false;
        this.trigger_error('taskTitleError', 'Invalid Title.');
        setTimeout(this.clear_error, 3000);
        return false;
      } else {
        this.taskTitleValidator = true;
        return true;
      }
    });
    $('#taskDescription').blur(() => {
      if ($('#taskDescription').val() == '') {
        this.taskDescriptionValidator = false;
        this.trigger_error(
          'taskDescriptionError',
          'Please Specify Description.'
        );
        setTimeout(this.clear_error, 3000);
        return false;
      } else {
        this.taskDescriptionValidator = true;
        return true;
      }
    });
  }
  createTask() {
    if (
      this.taskTitleValidator == false ||
      this.taskDescriptionValidator == false ||
      this.createTaskFormGroup.invalid
    ) {
      this.trigger_error(
        'createTaskFormError',
        'Please Fill All The Fields Correctly.'
      );
      setTimeout(this.clear_error, 3000);
      return;
    } else {
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
}
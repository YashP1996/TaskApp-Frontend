import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/classes/project';
import { CreateTaskService } from 'src/services/create-task.service';
import { ReadProjectService } from 'src/services/read-project.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  createTaskFormGroup!: FormGroup;
  title_text: string = 'Create Task';
  projects!: Project[];
  selectedProject: any;
  taskTitleRegex: any = /^([a-zA-Z0-9 ]{1,40})$/;
  taskTitleValidator: any = false;
  taskDescriptionValidator: any = false;
  projectValidator: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private createTaskService: CreateTaskService,
    private readProjectService: ReadProjectService,
    private router: Router
  ) {
    this.initCreateTaskForm();
  }
  ngOnInit(): void {
    this.validateCreateTaskForm();
    this.readProject();
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
      projectName: new FormControl('', Validators.required),
      taskStatus: new FormControl('ToDo', Validators.required),
      taskCreateDate: new FormControl(new Date(), Validators.required),
      taskUpdateDate: new FormControl(new Date(), Validators.required),
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
    $('#projectName').blur(() => {
      if ($('#projectName option:selected').val() == 'undefined') {
        this.projectValidator = false;
        this.trigger_error('projectError', 'Please Select Project.');
        setTimeout(this.clear_error, 3000);
        return false;
      } else {
        this.projectValidator = true;
        return true;
      }
    });
  }
  readProject() {
    return this.readProjectService.readProject().subscribe({
      next: (response: any) => {
        this.projects = response;
        console.log(this.projects);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Server Offline.',
          text: 'Please start the server.',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['home']);
          } else if (result.isDenied) {
          }
        });
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  createTask() {
    if (
      this.taskTitleValidator == false ||
      this.taskDescriptionValidator == false ||
      this.projectValidator == false ||
      this.createTaskFormGroup.invalid
    ) {
      this.trigger_error(
        'createTaskFormError',
        'Please Fill All The Fields Correctly.'
      );
      setTimeout(this.clear_error, 3000);
      return;
    } else {
      console.log(this.createTaskFormGroup.value);
      this.createTaskService
        .createTask(this.selectedProject, this.createTaskFormGroup.value)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Task Created.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['view']);
              } else if (result.isDenied) {
              }
            });
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Something Went Wrong.',
              text: 'Please try again.',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['home']);
              } else if (result.isDenied) {
              }
            });
          },
          complete: () => {
            console.log('Complete');
          },
        });
    }
  }
  navigateHome() {
    this.router.navigate(['home']);
  }
}

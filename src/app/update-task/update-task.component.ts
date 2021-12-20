import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/classes/task';
import { UpdateTaskService } from 'src/services/update-task.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  updateTaskFormGroup!: FormGroup;
  title_text: string = 'Update Task';
  task!: Task;
  taskId: any;
  taskTitleRegex: any = /^([a-zA-Z0-9]{1,40})$/;
  taskTitleValidator: any = false;
  taskDescriptionValidator: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private updateTaskService: UpdateTaskService,
    private router: Router
  ) {
    this.initUpdateTaskForm();
  }
  ngOnInit(): void {
    this.validateUpdateTaskForm();
    this.readTask();
  }
  trigger_error(error_id: any, error_message: any) {
    $('#' + error_id).fadeIn('slow');
    $('#' + error_id).css({ padding: '0.375rem' });
    $('#' + error_id).text(error_message);
  }
  clear_error() {
    $('.error').fadeOut('slow');
  }
  initUpdateTaskForm() {
    this.updateTaskFormGroup = this.formBuilder.group({
      taskId: new FormControl('', Validators.required),
      taskTitle: new FormControl('', Validators.required),
      taskDescription: new FormControl('', Validators.required),
      taskStatus: new FormControl('', Validators.required),
      taskUpdateDate: new FormControl('', Validators.required),
    });
  }
  validateUpdateTaskForm() {
    // $('#taskTitle').blur(() => {
    //   if ($('#taskTitle').val() == '') {
    //     this.taskTitleValidator = false;
    //     this.trigger_error('taskTitleError', 'Please Specify Title.');
    //     setTimeout(this.clear_error, 3000);
    //     return false;
    //   } else if (!$('#taskTitle').val().match(this.taskTitleRegex)) {
    //     this.taskTitleValidator = false;
    //     this.trigger_error('taskTitleError', 'Invalid Title.');
    //     setTimeout(this.clear_error, 3000);
    //     return false;
    //   } else {
    //     this.taskTitleValidator = true;
    //     return true;
    //   }
    // });
    // $('#taskDescription').blur(() => {
    //   if ($('#taskDescription').val() == '') {
    //     this.taskDescriptionValidator = false;
    //     this.trigger_error(
    //       'taskDescriptionError',
    //       'Please Specify Description.'
    //     );
    //     setTimeout(this.clear_error, 3000);
    //     return false;
    //   } else {
    //     this.taskDescriptionValidator = true;
    //     return true;
    //   }
    // });
  }
  fillUpdateTaskForm(task: Task) {
    this.updateTaskFormGroup = this.formBuilder.group({
      taskId: new FormControl(task.taskId, Validators.required),
      taskTitle: new FormControl(task.taskTitle, Validators.required),
      taskDescription: new FormControl(
        task.taskDescription,
        Validators.required
      ),
      taskStatus: new FormControl(task.taskStatus, Validators.required),
      taskUpdateDate: new Date(),
    });
  }
  readTask() {
    this.taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.updateTaskService.readTask(this.taskId).subscribe({
      next: (response: any) => {
        this.task = response;
        this.fillUpdateTaskForm(this.task);
        console.log(this.task);
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
  updateTask() {
    if (
      // this.taskTitleValidator == false ||
      // this.taskDescriptionValidator == false ||
      this.updateTaskFormGroup.invalid
    ) {
      this.trigger_error(
        'updateTaskFormError',
        'Please Fill All The Fields Correctly.'
      );
      setTimeout(this.clear_error, 3000);
      return;
    } else {
      this.taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.updateTaskService
        .updateTask(this.taskId, this.updateTaskFormGroup.value)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Task Updated.',
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
              text: error,
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
  navigateView() {
    this.router.navigate(['view']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/classes/task';
import { DeleteTaskService } from 'src/services/delete-task.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css'],
})
export class DeleteTaskComponent implements OnInit {
  title_text: string = 'Delete Task';
  task!: Task;
  taskId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private deleteTaskService: DeleteTaskService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.openModal();
    this.readTask();
  }
  openModal() {
    $('#deleteTaskModal').modal('show');
  }
  readTask() {
    this.taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.deleteTaskService.readTask(this.taskId).subscribe({
      next: (response: any) => {
        this.task = response;
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
            $('#deleteTaskModal').modal('hide');
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
  deleteTask() {
    this.taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.deleteTaskService.deleteTask(this.taskId).subscribe({
      next: (response: any) => {
        console.log(response);
        $('#deleteTaskModal').modal('hide');
        this.router.navigate(['view']);
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
            $('#deleteTaskModal').modal('hide');
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
  redirect() {
    $('#deleteTaskModal').modal('hide');
    this.router.navigate(['view']);
  }
}

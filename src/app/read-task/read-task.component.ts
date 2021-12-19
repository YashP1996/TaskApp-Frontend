import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/classes/task';
import { ReadTaskService } from 'src/services/read-task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-read-task',
  templateUrl: './read-task.component.html',
  styleUrls: ['./read-task.component.css'],
})
export class ReadTaskComponent implements OnInit {
  title_text: string = 'Task Dashboard';
  tasks!: Task[];
  filteredTasks!: Task[];
  taskName: string = '';
  constructor(
    private readTaskService: ReadTaskService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.readTask();
  }
  get taskFilter(): string {
    return this.taskName;
  }
  set taskFilter(value: string) {
    this.taskName = value;
    this.filteredTasks = this.filterTask(value);
  }
  filterTask(filterBy: string): Task[] {
    filterBy = filterBy.toLowerCase();
    return this.tasks.filter((task: Task) =>
      task.taskTitle.toLowerCase().includes(filterBy)
    );
  }
  readTask() {
    this.readTaskService.readTask().subscribe({
      next: (response: any) => {
        this.tasks = response;
        this.filteredTasks = this.tasks;
        console.log(this.tasks);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Server Offline.',
          text: 'Please start the server.',
          showConfirmButton: true,
          confirmButtonText: 'Home',
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
  navigateHome() {
    this.router.navigate(['home']);
  }
}

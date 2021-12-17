import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/classes/task';
import { DeleteTaskService } from 'src/services/delete-task.service';
declare var $: any;
@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css'],
})
export class DeleteTaskComponent implements OnInit {
  title_text: string = 'Update Task';
  task!: Task;
  constructor(
    private activatedRoute: ActivatedRoute,
    private deleteTaskService: DeleteTaskService
  ) {}
  ngOnInit(): void {
    this.openModal();
    this.readTask();
  }
  openModal() {
    $('#deleteTaskModal').modal('show');
  }
  readTask() {
    var taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.deleteTaskService.readTask(taskId).subscribe({
      next: (response: any) => {
        this.task = response;
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
  deleteTask() {
    var taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.deleteTaskService.deleteTask(taskId).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { Task } from 'src/classes/task';
import { ReadTaskService } from 'src/services/read-task.service';
@Component({
  selector: 'app-read-task',
  templateUrl: './read-task.component.html',
  styleUrls: ['./read-task.component.css'],
})
export class ReadTaskComponent implements OnInit {
  title_text: string = 'Task Dashboard';
  tasks!: Task[];
  constructor(private readTaskService: ReadTaskService) {}
  ngOnInit(): void {
    this.readTask();
  }
  readTask() {
    this.readTaskService.readTask().subscribe({
      next: (response: any) => {
        this.tasks = response;
        console.log(this.tasks);
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

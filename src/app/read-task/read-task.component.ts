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
  filteredTasks!: Task[];
  taskName: string = '';
  constructor(private readTaskService: ReadTaskService) {}
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
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}

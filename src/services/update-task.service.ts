import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from 'src/classes/task';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UpdateTaskService {
  public updateTaskUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  readTask(taskId: number): Observable<Task> {
    return <Observable<Task>>(
      this.httpClient.get(this.updateTaskUrl + 'task/' + taskId).pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      )
    );
  }
  updateTask(taskId: number, task: Task): Observable<Task> {
    return <Observable<Task>>(
      this.httpClient.put(this.updateTaskUrl + 'task/' + taskId, task).pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      )
    );
  }
}

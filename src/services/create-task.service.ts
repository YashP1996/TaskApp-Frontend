import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Task } from 'src/classes/task';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CreateTaskService {
  public createTaskUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  createTask(task: Task) {
    return this.httpClient.post(this.createTaskUrl + 'task', task).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }
}
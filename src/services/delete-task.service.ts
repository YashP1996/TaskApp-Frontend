import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DeleteTaskService {
  public deleteTaskUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  readTask(taskId: number) {
    return this.httpClient.get(this.deleteTaskUrl + 'task/' + taskId).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }
  deleteTask(taskId: number) {
    return this.httpClient.delete(this.deleteTaskUrl + 'task/' + taskId).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }
}

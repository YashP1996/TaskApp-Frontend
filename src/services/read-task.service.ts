import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ReadTaskService {
  public readTaskUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  readTask(): Observable<Task[]> {
    return <Observable<Task[]>>(
      this.httpClient.get(this.readTaskUrl + 'tasks').pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      )
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ReadTaskService {
  public readTaskUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  readTask() {
    return this.httpClient.get(this.readTaskUrl + 'tasks').pipe(
      map((response) => {
        // console.log(response);
        return response;
      })
    );
  }
}

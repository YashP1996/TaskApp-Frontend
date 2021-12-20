import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from 'src/classes/project';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ReadProjectService {
  public readProjectUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  readProject(): Observable<Project[]> {
    return <Observable<Project[]>>(
      this.httpClient.get(this.readProjectUrl + 'projects').pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      )
    );
  }
}
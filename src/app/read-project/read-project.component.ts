import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/classes/project';
import { ReadProjectService } from 'src/services/read-project.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-read-project',
  templateUrl: './read-project.component.html',
  styleUrls: ['./read-project.component.css'],
})
export class ReadProjectComponent implements OnInit {
  title_text: string = 'Project Details';
  project!: Project;
  projectId!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private readProjectService: ReadProjectService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.openModal();
    this.readProject();
  }
  openModal() {
    $('#readProjectModal').modal('show');
  }
  readProject() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.readProjectService.readProjectById(this.projectId).subscribe({
      next: (response: any) => {
        this.project = response;
        console.log(this.project);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Server Offline.',
          text: 'Please start the server.',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            $('#readProjectModal').modal('hide');
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
  redirect() {
    $('#readProjectModal').modal('hide');
    this.router.navigate(['view']);
  }
}

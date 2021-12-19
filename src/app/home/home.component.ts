import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title_text: string = 'Task App';
  constructor(private router: Router) {}
  ngOnInit(): void {}
  navigateCreate() {
    this.router.navigate(['create']);
  }
  navigateView() {
    this.router.navigate(['view']);
  }
}
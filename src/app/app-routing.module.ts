import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReadTaskComponent } from './read-task/read-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { ReadProjectComponent } from './read-project/read-project.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateTaskComponent },
  { path: 'view', component: ReadTaskComponent },
  { path: 'update/:id', component: UpdateTaskComponent },
  { path: 'delete/:id', component: DeleteTaskComponent },
  { path: 'project/:id', component: ReadProjectComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

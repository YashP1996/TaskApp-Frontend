import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReadTaskComponent } from './read-task/read-task.component';
@NgModule({
  declarations: [CreateTaskComponent, ReadTaskComponent],
  imports: [CommonModule],
  exports: [CreateTaskComponent, ReadTaskComponent],
})
export class TaskModule {}
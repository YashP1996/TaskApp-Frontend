import { Project } from './project';

export class Task {
  taskId!: any;
  taskTitle!: any;
  taskDescription!: any;
  taskStatus!: any;
  taskCreateDate!: Date;
  taskUpdateDate!: Date;
  project!: Project;
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

  constructor( private TasksService: TasksService) {}
    
  @Get()
    GetAllTasks() {
     return this.TasksService.getAllTasks()
  }

  @Post()
 createTask(@Body()newTask: any) {
  console.log(newTask);
  return 'guardando Tarea';
  // this.TasksService.createTask()
  }

}

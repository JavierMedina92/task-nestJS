import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto'

@Controller('tasks')
export class TasksController {

  constructor( private TasksService: TasksService) {}
    
  @Get()
    GetAllTasks() {
     return this.TasksService.getAllTasks()
  }

  @Post()
 createTask(@Body()newTask: CreateTaskDto) {
  return this.TasksService.createTask(newTask.tittle, newTask.description)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.TasksService.deleteTask(id)
  }

  // @Update()
  // UpdateTask() {

  // }

}

import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{


  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  constructor(private crudService: CrudService){}
  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();

  }
  getAllTasks(){
    this.crudService.getTasks().subscribe(res => {
      this.taskArr = res;
    },err =>  alert('unable to get list of tasks')
    )
  }
  addTask(etask: Task){
    this.crudService.addTask(etask).subscribe(res=>{
      this.taskObj = new Task();
      this.taskArr = [];
      this.getAllTasks();
    },err=>{alert(err)})
  }

  editTask() {
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.taskObj = new Task();
      this.taskArr = [];
      this.getAllTasks();
    },err=> alert('Faild to update task'))
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.taskObj = new Task();
      this.getAllTasks();
    },err=>alert('Faild to delet task'))
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  
  @ViewChild('closeModel') input: ElementRef|any;

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService){}
  ngOnInit(): void {
    this.reset();
  }
  reset(){
    this.editTaskValue ='';
    this.addTaskValue = '';
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
  addTask(){
    this.taskObj.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res=>{
      this.reset();
      this.input.nativeElement.click();
    },err=>{alert(err)})
  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.reset();
      this.input.nativeElement.click();
    },err=> alert('Faild to update task'))
  }
  toggleTaskStatus(etask: Task) {
    this.taskObj=etask;
    this.taskObj.status = !etask.status;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.reset();
      this.input.nativeElement.click();
    },err=> alert('Faild to update task'))
  }
  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.reset();
    },err=>alert('Faild to delet task'))
  }
  call(etask: Task){
    this.taskObj = etask;
    this.editTaskValue = etask.taskName
  }
}

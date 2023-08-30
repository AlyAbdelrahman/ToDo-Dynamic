import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/services/crud.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @ViewChild('closeModel') input: ElementRef | any;
  @ViewChild('errorAlert') errorAlert: ElementRef | any;
  @ViewChild('errorAlertMessage') errorAlertMessage: ElementRef | any;


  taskObj: Task = new Task();
  taskArr: Task[] = [];
  taskArrCopy: Task[] = [];


  addTaskValue: string = '';
  editTaskValue: string = '';
  searchText: string = '';
  constructor(private crudService: CrudService ,private translate: TranslateService) { }
  ngOnInit(): void {
    this.reset();
  }
  resetStatus() {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
  }
  reset() {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }
  getAllTasks() {
    this.crudService.getTasks().subscribe(res => {
      this.taskArr = res;
      this.taskArrCopy = res;
      this.searchText && this.onEmitter(this.searchText);
    }, err => {
       this.translate.get('errorLoadingTasks').subscribe((data:any)=>  {this.errorAlertMessage.nativeElement.innerText =data});
      this.errorAlert.nativeElement.hidden = false
    }
    )
  }
  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.reset();
      this.input.nativeElement.click();
    }, err => {
      this.errorAlertMessage.nativeElement.innerText = 'Error Adding Task'
      this.errorAlert.nativeElement.hidden = false
    })
  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.input.nativeElement.click();

    }, err => {
      this.translate.get('errorEditingTask').subscribe((data:any)=>  {this.errorAlertMessage.nativeElement.innerText =data});
      this.errorAlert.nativeElement.hidden = false
    })
  }
  toggleTaskStatus(etask: Task) {
    this.taskObj = etask;
    this.taskObj.status = !etask.status;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.input.nativeElement.click();
    },  err => {
      this.translate.get('errorTogglingTask').subscribe((data:any)=>  {this.errorAlertMessage.nativeElement.innerText =data});
      this.errorAlert.nativeElement.hidden = false
    })
  }
  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.taskArr = this.taskArr.filter(el => el.id != etask.id);
      this.taskArrCopy = this.taskArrCopy.filter(el => el.id != etask.id);
      this.resetStatus();
    },  err => {
      this.translate.get('errorToggerrorDeletingTasklingTask').subscribe((data:any)=>  {this.errorAlertMessage.nativeElement.innerText =data});
      this.errorAlert.nativeElement.hidden = false
    })
  }
  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.taskName
  }
  onEmitter(searchText: string) {
    this.searchText = searchText;
    this.taskArr = this.taskArrCopy.filter(el => el.taskName.includes(searchText))
  }

  closeCardAlert(){
    this.errorAlert.nativeElement.hidden = true
  }
}

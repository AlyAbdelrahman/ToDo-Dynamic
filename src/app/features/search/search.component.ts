import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() emitter = new EventEmitter<string>();
  searchValue: string= '';
  onChange() {
    this.emitter.emit(this.searchValue);
  }
}

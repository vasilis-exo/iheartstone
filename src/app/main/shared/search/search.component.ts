import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // -----------------------------------------------------------------------------------------------------
  // @ Input Variables
  // -----------------------------------------------------------------------------------------------------
  @Input() items: any[] = [];
  @Input() filteredProperty: string;

  // -----------------------------------------------------------------------------------------------------
  // @ Output Variables
  // -----------------------------------------------------------------------------------------------------
  @Output() searchCompletedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleSearch(event: any) {
    const searchText = event.target.value;

    if ( !this.items ) {
      return this.searchCompletedEvent.emit([]);
    }

    if ( !searchText ) {
      return this.searchCompletedEvent.emit(this.items);
    }

    const filteredItems = this.items.filter( (item) => {
      return item[this.filteredProperty].toLowerCase().includes(searchText.toLowerCase());
    });

    this.searchCompletedEvent.emit(filteredItems);

  }

}

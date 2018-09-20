import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  // -----------------------------------------------------------------------------------------------------
  // @ Input Variables
  // -----------------------------------------------------------------------------------------------------
  @Input() items: any[] = [];
  @Input() filteredProperty: string;

  // -----------------------------------------------------------------------------------------------------
  // @ Output Variables
  // -----------------------------------------------------------------------------------------------------
  @Output() searchCompletedEvent = new EventEmitter();
  @Output() searchStartedEvent = new EventEmitter();

  private searchSubject = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit() {}

  handleSearch(event: any) {
    this.searchStartedEvent.emit();
    this.searchSubject.next(event.target.value);
  }

  ngAfterViewInit() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((searchText) => {
        if (!this.items) {
          return this.searchCompletedEvent.emit([]);
        }

        if (!searchText) {
          return this.searchCompletedEvent.emit(this.items);
        }

        const filteredItems = this.items.filter((item) => {
          return item[this.filteredProperty].toLowerCase().includes(searchText.toLowerCase());
        });

        this.searchCompletedEvent.emit(filteredItems);
      });
  }

}

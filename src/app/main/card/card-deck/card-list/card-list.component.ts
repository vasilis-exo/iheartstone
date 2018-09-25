import { Component, OnInit, Input } from '@angular/core';
// @angular/animations
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ]), { optional: true }),

        query(':leave', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 1 })
          ]))
        ]), { optional: true })

      ])
    ])
  ]
})
export class CardListComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() listName: string;
  @Input() navigateTo: () => any;

  constructor() { }

  ngOnInit() {
  }

}

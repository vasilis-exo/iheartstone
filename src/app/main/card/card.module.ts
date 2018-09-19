import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Services
import { CardService } from './../../services/card/card.service';

// Components
import { CardListComponent } from './card-deck/card-list/card-list.component';
import { SearchComponent } from './../shared/search/search.component';

// Pages
import { CardDeckPage } from './card-deck/card-deck.page';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';


const DECLARATIONS = [
  CardDeckPage,
  CardListingPage,
  CardDetailPage,
  CardListComponent,
  SearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    CardService
  ],
  declarations: DECLARATIONS
})
export class CardPageModule {}

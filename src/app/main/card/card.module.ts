import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Services
import { CardService } from './../../services/card/card.service';
import { FavoriteCardStore } from '../../services/storage/card-favorite.store';

// Components
import { CardListComponent } from './card-deck/card-list/card-list.component';
import { SearchComponent } from './../shared/search/search.component';

// Pages
import { CardDeckPage } from './card-deck/card-deck.page';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';
import { CardFavoritePage } from './card-favorite/card-favorite.page';


const DECLARATIONS = [
  CardDeckPage,
  CardListingPage,
  CardDetailPage,
  CardFavoritePage,
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
    CardService,
    FavoriteCardStore
  ],
  declarations: DECLARATIONS
})
export class CardPageModule {}

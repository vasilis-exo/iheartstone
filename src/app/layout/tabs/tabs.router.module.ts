import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ionic Pages
import { TabsPage } from './tabs.page';
import { CardDeckPage } from '../../main/card/card-deck/card-deck.page';
import { CardListingPage } from '../../main/card/card-listing/card-listing.page';
import { CardDetailPage } from '../../main/card/card-detail/card-detail.page';
import { CardFavoritePage } from '../../main/card/card-favorite/card-favorite.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(card:card-deck)',
        pathMatch: 'full',
      },
      {
        path: 'favorite',
        outlet: 'favorite',
        component: CardFavoritePage
      },
      {
        path: 'card',
        outlet: 'card',
        component: CardDeckPage
      },
      {
        path: 'card/:cardDeckGroup/:cardDeck',
        outlet: 'card',
        component: CardListingPage
      },
      {
        path: 'card/:cardId',
        outlet: 'card',
        component: CardDetailPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(card:card)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

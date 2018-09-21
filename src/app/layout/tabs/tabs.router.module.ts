import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ionic Pages
import { TabsPage } from './tabs.page';
<<<<<<< HEAD
import { AboutPage } from '../../main/about/about.page';
import { ContactPage } from '../../main/contact/contact.page';
=======
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
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
<<<<<<< HEAD
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      {
=======
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
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

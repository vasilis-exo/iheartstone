import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AboutPage } from '../../main/about/about.page';
import { ContactPage } from '../../main/contact/contact.page';
import { CardDeckPage } from '../../main/card/card-deck/card-deck.page';
import { CardListingPage } from '../../main/card/card-listing/card-listing.page';

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
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage
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

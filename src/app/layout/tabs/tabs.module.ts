import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
<<<<<<< HEAD
import { AboutPageModule } from '../../main/about/about.module';
import { ContactPageModule } from '../../main/contact/contact.module';
=======
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
import { CardPageModule } from '../../main/card/card.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    TabsPageRoutingModule,
<<<<<<< HEAD
    AboutPageModule,
    ContactPageModule,
=======
>>>>>>> 752bc6d269108ac650cc7d164b3df634f8bd415e
    CardPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

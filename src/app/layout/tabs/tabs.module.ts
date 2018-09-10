import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AboutPageModule } from '../../main/about/about.module';
import { ContactPageModule } from '../../main/contact/contact.module';
import { CardPageModule } from '../../main/card/card.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    TabsPageRoutingModule,
    AboutPageModule,
    ContactPageModule,
    CardPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

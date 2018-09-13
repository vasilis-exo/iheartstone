
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CardDeckPage } from './card-deck/card-deck.page';

import { CardService } from './../../services/card/card.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    CardService
  ],
  declarations: [CardDeckPage]
})
export class CardPageModule {}

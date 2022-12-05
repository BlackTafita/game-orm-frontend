import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { CardService } from './card.service';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { CardFormComponent } from './card-form/card-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CardComponent,
    CardFormComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    CardService,
  ]
})
export class CardModule { }

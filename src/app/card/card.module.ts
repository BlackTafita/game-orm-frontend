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
import { MatSortModule } from "@angular/material/sort";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

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
		MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
	],
  exports: [
    CardComponent,
    CardFormComponent,
  ],
  providers: [
    CardService,
  ]
})
export class CardModule { }

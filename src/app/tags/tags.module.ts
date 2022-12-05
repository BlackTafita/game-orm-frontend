import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { TagsFormComponent } from './tags-form/tags-form.component';
import { TagsService } from '../shared/services/tags.service';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TagsComponent,
    TagsFormComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    TagsService,
  ]
})
export class TagsModule { }

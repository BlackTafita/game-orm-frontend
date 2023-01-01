import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {TagsModule} from "../tags/tags.module";
import {CardModule} from "../card/card.module";
import {RouterModule} from "@angular/router";
import {ThemesModule} from "../themes/themes.module";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    CardModule,
    TagsModule,
    ThemesModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},
    ]),

  ]
})
export class DashboardModule { }

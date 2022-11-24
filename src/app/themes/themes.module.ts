import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';

import {MatTableModule} from '@angular/material/table';
import { ThemesService } from './themes.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { ThemeFormComponent } from './theme-form/theme-form.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    ThemesComponent,
    ThemeFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ThemesRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    ThemesService,
  ],
  exports: [
    ThemeFormComponent
  ]
})
export class ThemesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';

import {MatTableModule} from '@angular/material/table';
import { ThemesService } from './themes.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ThemeFormComponent } from './theme-form/theme-form.component';


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
    //Material
    MatTableModule,
    MatButtonModule,
    MatDialogModule,

  ],
  providers: [
    ThemesService,
  ],
  exports: [
    ThemeFormComponent
  ]
})
export class ThemesModule { }

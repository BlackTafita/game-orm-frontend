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
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ThemeFormComponent } from './theme-form/theme-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    FormsModule,
    ReactiveFormsModule,
    //Material
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [
    ThemesService,
  ],
  exports: [
    ThemeFormComponent
  ]
})
export class ThemesModule { }

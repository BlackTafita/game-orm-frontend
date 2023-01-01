import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';

import { ThemesService } from '../shared/services/themes.service';
import { HttpClientModule } from '@angular/common/http';

import { ThemeFormComponent } from './theme-form/theme-form.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    ThemesComponent,
    ThemeFormComponent
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    ThemesService,
  ],
  exports: [
    ThemeFormComponent,
    ThemesComponent,
  ]
})
export class ThemesModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theme } from './theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  themeAPIUrl: string = `${environment.API_URL}/theme`;

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    return this.http.get(this.themeAPIUrl)
    .pipe(
      map((res: any) => res as Theme[]),
      catchError((err) => EMPTY)
    );
  }

  createTheme(body: {name: string}): Observable<Theme> {
    return this.http.post(this.themeAPIUrl, body)
    .pipe(
      map((res: any) => res as Theme),
      catchError(err => EMPTY)
    );
  }

  editTheme(theme: Theme): Observable<Theme> {
    return this.http.patch(`${this.themeAPIUrl}/${theme.id}`, theme)
    .pipe(
      map((res: any) => res as Theme),
      catchError(err => EMPTY)
    );
  }
}

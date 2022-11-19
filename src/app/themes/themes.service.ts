import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  themeAPIUrl: string = `${environment.API_URL}/theme`;

  constructor(private http: HttpClient) { }

  getThemes(): Observable<any> {
    console.log(this.themeAPIUrl, this.http);
    return this.http.get(this.themeAPIUrl)
    .pipe(
      map((res: any) => res),
      catchError((err) => EMPTY)
    );
  }
}

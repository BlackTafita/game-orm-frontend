import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from '../interfaces/tags.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tagAPIUrl: string = `${environment.API_URL}/tag`;

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get(this.tagAPIUrl)
    .pipe(
      map((res: any) => res as Tag[]),
      catchError((err) => EMPTY)
    );
  }

  createTag(body: {name: string}): Observable<Tag> {
    return this.http.post(this.tagAPIUrl, body)
    .pipe(
      map((res: any) => res as Tag),
      catchError(err => EMPTY)
    );
  }

  editTag(tag: Tag): Observable<Tag> {
    return this.http.patch(`${this.tagAPIUrl}/${tag.id}`, tag)
    .pipe(
      map((res: any) => res as Tag),
      catchError(err => EMPTY)
    );
  }

  deleteTag(tag: Tag): Observable<Tag> {
    return this.http.delete(`${this.tagAPIUrl}/${tag.id}`)
    .pipe(
      map((res: any) => tag),
      catchError(err => EMPTY)
    )
  }
}

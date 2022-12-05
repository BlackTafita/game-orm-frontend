import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../shared/interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cardAPIUrl: string = `${environment.API_URL}/card`;

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get(this.cardAPIUrl)
    .pipe(
      map((res: any) => res as Card[]),
      catchError((err) => EMPTY)
    );
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post(this.cardAPIUrl, card)
    .pipe(
      map((res: any) => res as Card),
      catchError((err) => EMPTY),
    );
  }

  editCard(card: Card): Observable<Card> {
    return this.http.patch(`${this.cardAPIUrl}/${card.id}`, card)
    .pipe(
      map((res) => res as Card),
      catchError(err => EMPTY),
    );
  }

  deleteCard(card: Card): Observable<Card> {
    return this.http.delete(`${this.cardAPIUrl}/${card.id}`)
    .pipe(
      map((res: any) => res as Card),
      catchError(err => EMPTY),
    );
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable, Subject, switchMap, take, map, tap, merge, takeUntil, BehaviorSubject} from 'rxjs';
import { CardFormComponent } from './card-form/card-form.component';
import { Card } from '../shared/interfaces/card.interface';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'title', 'description', 'tags', 'theme', 'actions'];

  cards$!: Observable<Card[]>;

  private destroy$: Subject<void> = new Subject<void>();
  createCardSub$: Subject<Card> = new Subject<Card>();
  editCardSub$: Subject<Card> = new Subject<Card>();
  deleteCardSub$: Subject<Card> = new Subject<Card>();

  constructor(
    private service: CardService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const cardsSub$ = new BehaviorSubject<Card[]>([]);

    const getCards$ = this.service.getCards();

    const createCard$ = this.createCardSub$
    .pipe(
      switchMap(card => this.service.createCard(card)),
      tap((res: Card) => {
        this._snackBar.open(`Card "${res.description}" created successfuly`, 'Close')
      }),
      switchMap((card: Card) => cardsSub$.pipe(
        take(1),
        map((cards) => {
          cards.push(card);
          return cards;
        })
      )),
    );

    const editCard$ = this.editCardSub$.pipe(
      switchMap((card) => this.service.editCard(card)),
      tap(() => this._snackBar.open('Card updated', 'Close')),
      switchMap((card) => cardsSub$.pipe(
        take(1),
        map((cards) => {
          return cards.map(c => {
            if (card.id === c.id) return card;
            return c;
          });
        })
      )),
    );

    const deleteCard$ = this.deleteCardSub$.pipe(
      switchMap(card => this.service.deleteCard(card)),
      tap((card) => this._snackBar.open(`Card "${card.description}" has deleted`, 'Close')),
      switchMap((card) => cardsSub$.pipe(
        take(1),
        map((cards) => {
          const index = cards.findIndex((th: Card) => th.id === card.id);
            if (index > -1) {
              cards.splice(index, 1);
            }
            return cards;
        })
      ))
    );

    merge(getCards$, createCard$, editCard$, deleteCard$)
    .pipe(
      takeUntil(this.destroy$),
    ).subscribe(cards => {
      cardsSub$.next(cards);
    });

    this.cards$ = cardsSub$.asObservable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCardModal(card?: Card): void {
    console.log(card);
    const dialogRef = this.dialog.open(CardFormComponent, {data: { card }});

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(cardData => {
      console.log(cardData);
      if (cardData) {
        cardData.id ? this.editCardSub$.next(cardData) : this.createCardSub$.next(cardData);
      }
    });
  }

  deleteCard(card: Card): void {
    this.deleteCardSub$.next(card);
  }

}


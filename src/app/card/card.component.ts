import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, switchMap, take, map, tap, merge, takeUntil, BehaviorSubject, startWith } from 'rxjs';
import { CardFormComponent } from './card-form/card-form.component';
import { Card } from '../shared/interfaces/card.interface';
import { CardService } from './card.service';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'image', 'description', 'tags', 'theme', 'actions'];

  cards$!: Observable<Card[]>;

  private destroy$: Subject<void> = new Subject<void>();

  getCardsSub$: Subject<string> = new Subject<string>();
  createCardSub$: Subject<Card> = new Subject<Card>();
  editCardSub$: Subject<Card> = new Subject<Card>();
  deleteCardSub$: Subject<Card> = new Subject<Card>();

  cardsFilter = new FormControl('');


  sortString: string = 'sort=id,DESC';
  searchString: string = '';

  get queryString(): string {
    return `${this.searchString}&${this.sortString}`;
  }

  constructor(
    private service: CardService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const cardsSub$ = new BehaviorSubject<Card[]>([]);

    this.cardsFilter.valueChanges
      .pipe(
        map(searchStr => {
          if (searchStr && searchStr.length > 3) {
            this.searchString = `s={"description": {"$cont": "${ searchStr }"}}`;
          } else {
            this.searchString = '';
          }
          return this.searchString;
        }),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.getCardsSub$.next(this.queryString);
    });

    const getCards$ = this.getCardsSub$
      .pipe(
        startWith(this.sortString),
        switchMap((querystring) => this.service.getCards(querystring))
      );

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
      tap((card) => this._snackBar.open(`Card "${card?.description}" has deleted`, 'Close')),
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

  sortCards($event: { active: string, direction: string }) {
    console.log($event);
    this.sortString = `sort=${$event.active},${$event.direction.toUpperCase()}`;
    this.getCardsSub$.next(this.queryString);
  }

}


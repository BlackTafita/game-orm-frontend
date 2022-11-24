import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, ReplaySubject, switchMap, tap, take, map, merge, takeUntil } from 'rxjs';
import { TagsFormComponent } from './tags-form/tags-form.component';
import { Tag } from './tags.interface';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  tags$!: Observable<Tag[]>;

  private destroy$: Subject<void> = new Subject<void>();
  createTagSub$: Subject<{name: string}> = new Subject<{name: string}>();
  editTagSub$: Subject<Tag> = new Subject<Tag>();
  deleteTagSub$: Subject<Tag> = new Subject<Tag>();

  constructor(
    private service: TagsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    const tagsSub$ = new ReplaySubject<Tag[]>();

    const getTags$ = this.service.getTags();

    getTags$.subscribe();

    const createTag$ = this.createTagSub$.pipe(
      switchMap(tag => this.service.createTag(tag)),
      tap((res) => {
        this._snackBar.open(`Tag "${res.name}" created successfuly`, 'Close');
      }),
      switchMap((tag) => tagsSub$.pipe(
        take(1),
        map((tags) => {
          tags.push(tag);
          return tags;
        }
      ),
    ))
    );

    const editTag$ = this.editTagSub$.pipe(
      switchMap((tag) => this.service.editTag(tag)),
      tap(() => this._snackBar.open(`Tag updated`, 'Close')),
      switchMap((tag) => tagsSub$.pipe(
        take(1),
        map((tags) => {
          return tags.map(t => {
            if (t.id === tag.id) return tag;
            return t; 
          });
        }
      ),
    )),
    );

    const deleteTag$ = this.deleteTagSub$.pipe(
      switchMap((tag) => this.service.deleteTag(tag)),
      tap((tag) => this._snackBar.open(`Tag "${tag.name}" has deleted`, 'Close')),
      switchMap((tag) => tagsSub$.pipe(
        take(1),
        map((tags) => {
          const index = tags.findIndex((th: Tag) => th.id === tag.id);
            if (index > -1) { 
              tags.splice(index, 1);
            }
            return tags;
        }),
      )),
    );

    merge(getTags$, createTag$, editTag$, deleteTag$).pipe(
      takeUntil(this.destroy$),
    ).subscribe(tags => {
      tagsSub$.next(tags);
    })

    this.tags$ = tagsSub$.asObservable();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  openTagModal(tag?: Tag): void {
    const dialogRef = this.dialog.open(TagsFormComponent, {data: {tag}});

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((tagData) => {
        console.log(tagData);
        if (tagData) {
          tagData.id ? this.editTagSub$.next(tagData) : this.createTagSub$.next(tagData);
        }
    })
  }

  deleteTag(tag: Tag): void {
    this.deleteTagSub$.next(tag);
  }
}

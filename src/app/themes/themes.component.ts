import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, forkJoin, map, merge, Observable, share, shareReplay, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ThemeFormComponent } from './theme-form/theme-form.component';
import { Theme } from './theme.interface';
import { ThemesService } from './themes.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  themes$!: Observable<Theme[]>;

  private destroy$: Subject<void> = new Subject<void>();
  createThemeSub$: Subject<{name: string}> = new Subject<{name: string}>();
  editThemeSub$: Subject<Theme> = new Subject<Theme>();

  constructor(
    private service: ThemesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    const getThemes$ = this.service.getThemes()
    .pipe(
      shareReplay(),
    );

    const createTheme$ = this.createThemeSub$.pipe(
      switchMap(theme => this.service.createTheme(theme)),
      tap((res) => {
        this._snackBar.open(`Theme "${res.name} created successfuly"`, 'Close');
      }),
      switchMap((theme) => getThemes$.pipe(
        map((themes) => {
          themes.push(theme);
          return themes;
        }
      ),
    ))
    );

    const editTheme$ = this.editThemeSub$.pipe(
      switchMap((theme) => this.service.editTheme(theme)),
      tap(() => this._snackBar.open(`Theme updated`, 'Close')),
      switchMap((theme) => getThemes$.pipe(
        map((themes) => {
          return themes.map(t => {
            if (t.id === theme.id) return theme;
            return t; 
          });
        }
      ),
    ))
    );

    this.themes$ = merge(getThemes$, createTheme$, editTheme$);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  openThemeModal(theme?: Theme): void {
    const dialogRef = this.dialog.open(ThemeFormComponent, {data: {theme}});

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((themeData) => {
        console.log(themeData);
        if (themeData) {
          themeData.id ? this.editThemeSub$.next(themeData) : this.createThemeSub$.next(themeData);
        }
    })
  }
}

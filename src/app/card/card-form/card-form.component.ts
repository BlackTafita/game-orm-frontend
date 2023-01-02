import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable, map, startWith } from 'rxjs';
import { ThemesService } from 'src/app/shared/services/themes.service';
import { Theme } from 'src/app/shared/interfaces/theme.interface';
import { Card } from '../../shared/interfaces/card.interface';
import { Tag } from '../../shared/interfaces/tags.interface';
import { TagsService } from 'src/app/shared/services/tags.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;

  imgPreview!: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
  });

  themes$!: Observable<Theme[]>;
  tags$!: Observable<Tag[]>;

  get themeControl(): FormControl {
    return this.form.get('theme') as FormControl;
  }

  get tagsControl(): FormControl {
    return this.form.get('tags') as FormControl;
  }

  constructor(
    public dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {card?: Card},
    private themesService: ThemesService,
    private tagsService: TagsService,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data?.card?.id) {
      this.form.patchValue(this.data.card);
      this.tags = [...this.data.card.tags];
      this.imgPreview = this.data.card.image;
    }

    this.themes$ = combineLatest([this.themesService.getThemes(), this.themeControl.valueChanges.pipe(startWith(null))])
    .pipe(
      map(([themes, themeSearch]: [Theme[], Theme | string]) => {
        if (themeSearch) {
          const filterVal = (typeof themeSearch === 'string') ? themeSearch.toLowerCase() : themeSearch.name.toLowerCase();

          return themes.filter(((el) => el.name.toLowerCase().includes(filterVal)));
        }

        return themes;
      }),
    );

    this.tags$ = combineLatest([this.tagsService.getTags(), this.tagsControl.valueChanges.pipe(startWith(null))])
    .pipe(
      map(([tags, tagsSearch]: [Tag[], Tag | string]) => {
        if (tagsSearch) {
          const filterVal = (typeof tagsSearch === 'string') ? tagsSearch.toLowerCase() : tagsSearch.name.toLowerCase();

          return tags.filter((el) => el.name.toLowerCase().includes(filterVal));
        }

        return tags;
      })
    );

  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    console.log(this.form.getRawValue(), this.tags);
    this.dialogRef.close({...this.form.getRawValue(), id: this.data?.card?.id, tags: this.tags, image: this.imgPreview});
  }

  getName(option: Theme | Tag): string {
    return option?.name;
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput.clear();

    this.tagsControl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagsInput.nativeElement.value = '';
    this.tagsControl.setValue(null);
  }


  selectImage($event: any) {
    const readed = $event.target.files;
    const parsed: any[] = [];
    const selectedFileNames = [];
    console.log($event.target.files, $event.target.result, $event.target);

    if (readed && readed[0]) {
      const numberOfFiles = readed.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          parsed.push(e.target.result);
          this.imgPreview = e.target.result;
        };

        reader.readAsDataURL(readed[i]);

        selectedFileNames.push(readed[i].name);
      }

      console.log(parsed, selectedFileNames);
    }
  }

}

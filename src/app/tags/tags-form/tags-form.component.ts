import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from '../tags.interface';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss']
})
export class TagsFormComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<TagsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tag?: Tag},
  ) {}

  ngOnInit(): void {
    if (this.data.tag?.id) {
      this.form.patchValue({name: this.data.tag.name});
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close({...this.form.getRawValue(), id: this.data?.tag?.id});
  }
}

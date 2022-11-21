import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
})
export class ThemeFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<ThemeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

}

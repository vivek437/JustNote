import { Component, OnInit, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export function forbiddenNameValidator(set: Set<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = set.has(control.value);
    return forbidden ? { forbiddenLabel: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss'],
})
export class CreateLabelComponent implements OnInit {
  value = '';
  allLabels: string[];
  labelFormControl: FormControl;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<CreateLabelComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string[],
  ) {
    this.allLabels = data;
    const set = new Set(this.allLabels);
    this.labelFormControl = new FormControl('', [
      Validators.required,
      forbiddenNameValidator(set),
    ]);
  }

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.value = this.labelFormControl.value;
    this.dialogRef.close(this.value);
  }
}

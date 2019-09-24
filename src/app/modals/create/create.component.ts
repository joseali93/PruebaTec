import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public minDate = new Date(1900, 0, 1);
  public maxDate = new Date();
  private age = 18;
  public flag = false;


  public formCreate: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,

  ) {
    this.formCreate = this.createForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - this.age);

  }
  ngOnInit() {
  }
  private createForm() {
    return this.formBuilder.group({
      birthdate: ['', Validators.required],
      firstname: ['', Validators.required],
      identification: ['', [Validators.required, Validators.pattern('[0-9]{5,20}')]],
      lastname: ['', Validators.required],
    });
  }
  public onNoClick() {
    this.dialogRef.close();
  }
  public update(form: FormGroup) {
    if (form.status === 'INVALID') {
      this.flag = true;
      this.openSnackBar('Diligencia la información');

    } else {
      this.flag = false;
      this.dialogRef.close(form.value);
    }
  }
  private openSnackBar(message) {
    const durationInSeconds = 5;
    this.snackBar.open(message, 'Cerrar', {
      duration: durationInSeconds * 1000,
    });
  }


}

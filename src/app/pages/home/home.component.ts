import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { IUser } from '../../interfaces/i.user';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../../modals/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public count: number;
  private dataGet: any;
  constructor(
    private service: FirebaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.information();

  }
  public information() {
    this.service.getInformation().subscribe(
      (data: any) => {
        console.log(Object.keys(data).length);
        this.count = Object.keys(data).length;
        this.dataGet = data;
      },
      (error: any) => {
        this.openSnackBar('Se presento un error, intenta nuevamente');
        console.log('error', error);
      }
    );
  }
  public noValidation() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {
        this.insertClient(result);
      }
    });
  }
  public insertClient(data: IUser) {
    let flag = false;
    for (const key in this.dataGet) {
      if (this.dataGet.hasOwnProperty(key)) {
        const element = this.dataGet[key];
        if (element.identification && (element.identification === data.identification ||
          element.identification === parseInt(data.identification, 10))) {
          flag = true;
        }
      }
    }
    if (flag === false) {
      console.log('lanzamos servicio');
      this.service.setInformation(data).subscribe(
        (response: any) => {
          console.log(response);
          this.information();
          this.openSnackBar('Información insertada correctamente');

        },
        (error: any) => {
          console.log('error', error);
        }
      );
    } else {
      this.openSnackBar('La identificación proporcionada ya existe, ya podrias pedir un credito');

    }
  }
  private openSnackBar(message) {
    const durationInSeconds = 5;
    this.snackBar.open(message, 'Cerrar', {
      duration: durationInSeconds * 1000,
    });
  }
}

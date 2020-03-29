import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { IUser } from '../../interfaces/i.user';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../../modals/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public count: number;
  private dataGet: any;
  public displayedColumns: string[] = ['birthday', 'firstname','lastname', 'identification'];
  public data:   MatTableDataSource<any>;
  private items:any=[]
  public resultsLength = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private service: FirebaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
  
    this.information();

  }

  public information() {
    this.service.getInformation()

    .subscribe(
      (data: any) => {

        this.count = Object.keys(data).length;
        this.dataGet = data;
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            this.items.push(element)    
          }
        }
        this.data = new MatTableDataSource(this.items);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      },
      (error: any) => {
        this.openSnackBar('Se presento un error, intenta nuevamente');
        console.log('error', error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
  public noValidation() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {},
      disableClose: true
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

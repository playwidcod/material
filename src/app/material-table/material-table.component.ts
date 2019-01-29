import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableDataSource, MatSort, MatPaginator, fadeInItems } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import {merge, Observable, of as observableOf, empty} from 'rxjs';
import { Materialarray } from './materialarray';
import { Routes, RouterModule,Router } from '@angular/router';
import { asTextData } from '@angular/core/src/view';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogSerService } from './dialog-ser.service';
import { StrigDialogService } from './strig-dialog.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit {
  data: any;
  currentpagenumber;
  pageSize:number;
  length:number;
  filter_val:boolean;
  constructor(private http:HttpClient,private rout:Router,public dialog: MatDialog,private dialogservice:DialogSerService,private stingdialog:StrigDialogService) { }

  @Output() add = new EventEmitter();

  getdatas(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/angpro/mat");
  }

  deleteme(element, currentpagenumber,pageSize,filter_val,search){
    // console.log();return false;
    let msg:string = "do you want to delete ?";
    this.dialogservice.openconfirmDialog(msg).afterClosed().subscribe(res=>{
      if(res){
       
        this.http.delete<any>("http://localhost:8000/api/angpro/"+element.id) 
        .subscribe(
        data =>{
          // console.log(this.data['data'])
          for(let i=0;i<=this.data['data'].length;i++){
            // console.log(i)
            if(this.data['data'][i] == element){
              this.data['data'].splice(i,1);
            }
          }
          // this.data = this.data;
          this.data['filter'] = search; 
            console.group("before calculation");
            console.log("current page bfr :",currentpagenumber);
            console.log("pagesize :",pageSize);
            console.log("data length:",this.data['data'].length);
            console.log("data filterd count :",this.data['filteredData'].length);
            console.log(this.data['filteredData']);
            console.groupEnd();
            
            if(filter_val){
              let cal:number =  Number(currentpagenumber+1) * Number(pageSize - this.data['filteredData'].length);
              // let cal2:number = pageSize - cal; 
              // console.log(cal)
              //   console.log(cal2);
              if(cal == 0){
                this.paginator.pageIndex = currentpagenumber-1;
                this.currentpagenumber = currentpagenumber-1;
                this.data['paginator'] = this.paginator;
                return false;
              
              }else{
                this.pagingfilterfunc(data = this.data['filteredData']);
                return false;
              }
                console.log("Came excpt 0 filter")
                console.log("current page: ",currentpagenumber);
                this.paginator.pageIndex = currentpagenumber-1;
                this.currentpagenumber = currentpagenumber-1;
                this.data['paginator'] = this.paginator;
                return false;
     
              // console.log("Page size :",pageSize);
              // console.log("Current page number",currentpagenumber);
              // console.log("data length :",this.data['data'].length)
              // let cal:number =  (currentpagenumber+1) * pageSize - this.data['data'].length;
              // let cal2:number = pageSize - cal; 
              // console.log(cal2);
              // if(cal2 == 0){
              //   console.log("filter true and cal = 0")
              //   this.paginator.pageIndex = currentpagenumber-1;
              //   this.currentpagenumber = currentpagenumber-1;
              //   this.data['paginator'] = this.paginator;
              //   return false;
              // }
              // console.log("cal2 value :",cal2);
              // this.paginator.pageIndex = 0;
              // this.currentpagenumber = 0;
              // this.data['data'] = this.data['data'];
              // this.data['paginator'] = this.paginator;
              // // this.filter_val = false;
              // return false;
            }else{
              //without filter
              let cal:number =  (currentpagenumber+1) * (pageSize - this.data['data'].length);
            let cal2:number = pageSize - cal; 
              if(cal2 == 0){
                this.paginator.pageIndex = currentpagenumber-1;
                this.currentpagenumber = currentpagenumber-1;
                this.data['paginator'] = this.paginator;
                return false;
              
              }else{
                this.pagingfunc(data = this.data['data']);
                return false;
              }
            }
        },
        error => this.stingdialog.stringalert(msg="error")
      );
      }
    });
  }

  mycolumns: string[] = ['S.No','id','name', 'age', 'email', 'address','city','action'];

  i = ['1','2','3','4','5'];
  pageSizeOptions:string[];
  applyFilter(search,currentpagenumber,data,pageSize) {
    
      search = search.trim().toLocaleLowerCase(); 
      let original = this.currentpagenumber;
      if(search == ""){
        // console.log("empty");
        this.currentpagenumber = original;
        this.filter_val = false;
      }else{
        // console.log("has value")
        this.currentpagenumber = 0;
        this.paginator.pageIndex = 0;
        this.filter_val = true;
      }
      this.data['filter'] = search;
      console.log(this.data);
      this.data['filterPredicate'] = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter);
    };
  }
  
  onPaginateChange(event){
    // console.log(event)
    this.pageSize = event.pageSize;
    this.currentpagenumber = event.pageIndex;
    this.length = event.length;
  }
//   limit:number = 10;
// skip:number = 0;
// totalLength:number = 0;
// pageIndex : number = 0;
// pageLimit:number[] = [5, 10] ;
//   onPaginateChange(event){
//     this.currentpagenumber = event.pageIndex;
//     // console.log(event)
//     if(this.totalLength > this.data.data.length){
//        if(this.pageIndex < event.pageIndex){
//         // next page
//         this.skip = this.skip + this.limit;
//         // this.getComplains(true);     
//       }
//     }
//   }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;  
page = 0;
  pagingfunc(data){
    this.filter_val = false;
    this.data['paginator'] = this.paginator;
    this.data['sort'] = this.sort;
    let multp5 = [];let num_data = Array();
    for(let i=1;i<data.length;i++){
      let mult5 = i*5;
      num_data.push(i);                         
      multp5.push(mult5);
      let pages = Array();let page = 0;
      this.page = Math.ceil(data.length / 5);
        if(i == 1){
          let pagenum = Array();
          for(i=0;i<=this.page;i++){
            if(i != 0){
              pagenum.push(i * 5);
             if(i == this.page){
              // pagenation set here
              this.pageSizeOptions = pagenum;
             }
            }
          }
        }
      }
  }
  pagingfilterfunc(data){
    this.filter_val = false;
    this.data['paginator'] = this.paginator;
    this.data['sort'] = this.sort;
    let multp5 = [];let num_data = Array();
    for(let i=1;i<data.length;i++){
      let mult5 = i*5;
      num_data.push(i);                         
      multp5.push(mult5);
      let pages = Array();let page = 0;
      this.page = Math.ceil(data.length / 5);
        if(i == 1){
          let pagenum = Array();
          for(i=0;i<=this.page;i++){
            if(i != 0){
              pagenum.push(i * 5);
             if(i == this.page){
              // pagenation set here
              this.pageSizeOptions = pagenum;
             }
            }
          }
        }
      }
  }
  ngOnInit() { 
    // this.paginator.pageIndex = 2;
    this.currentpagenumber = 0;
    this.pageSize = 5;

    this.getdatas()
    .subscribe(
      data => {
          let count = 0;
        this.data = new MatTableDataSource<Materialarray>(data);
        this.pagingfunc(data);
        }
    );
  }
}
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {
  protitle = 'My users';
  constructor(private http: HttpClient,private rout:Router) { }
  data = [];

  url1 = "http://localhost:8000/api/angpro/test";
  deleteme(getdata){
    this.http.delete<any>("http://localhost:8000/api/angpro/"+getdata.id) 
    .subscribe(
      data => this.rout.navigate(['/']),
      error => console.log("error")
    );
  }

  getdatas(): Observable<any[]> {
    return this.http.get<any[]>(this.url1);
  }
  ngOnInit() {
    this.getdatas()
    .subscribe(
      data => this.data = data
    );
  }
}

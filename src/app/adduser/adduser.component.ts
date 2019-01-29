import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Samplepro } from '../pro/samplepro';
import { AdduserService } from '../adduser/adduser.service';
import { Routes, RouterModule,Router } from '@angular/router';
import { Statement } from '@angular/compiler';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {
  user = {};
  protitle = 'Add User';
  data = '';
  selectOption = ['Pondicherry','Chennai','Bangalore'];
  constructor(private http:HttpClient,
              private Adduserservice: AdduserService,
              public router: RouterModule,
              public rout:Router) { }
  email = {};
  em = '';
  state = '';
  emailcheck(){
    this.email = {"email":this.user['email']};
    this.http.post<any>("http://localhost:8000/api/newapi/",this.email)
    .toPromise()
    .then((data) => this.em = data);
  }
  searchstate(){
    this.state = this.user['state']; 
    this.http.get<any>("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json")
    .subscribe(
      data =>{  
        let i = 0;
        data.forEach(function(value){
          i++;
          if(i == 1){
            console.log(value)
          }
          
        });
      } 
    );
  }
  onSubmit(){
    this.http.post<Samplepro>("http://localhost:8000/api/angpro/",this.user)
    .subscribe(
      data => this.rout.navigate(['/users']),
      error => console.log("Error")
    );
  }
  ngOnInit() {

  }

}

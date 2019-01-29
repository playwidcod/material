import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Samplepro } from '../pro/samplepro';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  protitle = "Edit User";
  userid = this.router;
  constructor(private router:ActivatedRoute,private rout:Router,private http:HttpClient){ }
  user = {};
  data = {};
  selectOption = ['Pondicherry','Chennai','Bangalore'];
  id = parseInt(this.router.snapshot.paramMap.get('id'));
  url = "http://localhost:8000/api/newapi/"+this.id;
  getdatas(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  onSubmit(){
    this.http.put<Samplepro>("http://localhost:8000/api/newapi/"+this.id,this.data)
    .subscribe( 
      data =>this.rout.navigate(['/users']),
      error => alert("Error in submission")
      );
  }
  ngOnInit() {
    console.log(this.getdatas)
    this.getdatas()
    .subscribe(
      data => this.data = data
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule,Router, ActivatedRoute } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { Samplepro } from '../pro/samplepro';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginatorBase } from '@angular/material';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DialogSerService } from '../material-table/dialog-ser.service';
import { StrigDialogService } from '../material-table/strig-dialog.service';
import { Key } from 'ts-keycode-enum';
@Component({
  selector: 'app-material-table-edit',
  templateUrl: './material-table-edit.component.html',
  styleUrls: ['./material-table-edit.component.css']
})
export class MaterialTableEditComponent implements OnInit {

  register = new FormGroup({
    name : new FormControl('',[Validators.pattern(/^\S*$/),Validators.required, Validators.pattern(/^[\w -]*$/)]),
    age : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.pattern(/^\S*$/),Validators.required,Validators.email]),
    password : new FormControl('',[Validators.pattern(/^\S*$/),Validators.required]),
    address : new FormControl('',[Validators.pattern(/^\S*$/),Validators.required]),
    city : new FormControl('',Validators.required)
  });
  constructor(private http:HttpClient,
            private rout:Router,
            private router:ActivatedRoute,
            private formbuilder:FormBuilder,
            private dialogservice:DialogSerService,
            private stingdialog:StrigDialogService
            ) { }
  your_age;
  id = parseInt(this.router.snapshot.paramMap.get('id'));
  
  test = '';
  url = "http://localhost:8000/api/newapi/"+this.id;
  data :string[] = [];
  alertt;
  em;
  check_email_response :string;

  update(register){
    console.log(register)
    let datevalidate = this.datee(register);
    if((datevalidate < 18) && (!datevalidate == null)){
      this.your_age = "Sorry you are not eligible to Register";
      return false;
     }else{
       this.your_age = datevalidate;
       if(this.your_age == "Sorry you are not eligible to Register"){
         return false;
       }
     }
    let check_email:string = register.email;
    let msg:string = "error";
    if(register.email == ""){
      this.check_email_response = "Please enter a valid email id";
      return false;
    }
    this.http.put("http://localhost:8000/api/updateapi/"+this.id,[{
      email:register.email,
      id:this.id
    }])
    .subscribe( 
      data =>{
        // console.log("data:",data);
        if(data === "accept"){
          // console.log("accept");
          this.check_email_response = "accept";
          this.http.put("http://localhost:8000/api/newapi/"+this.id,[register])
          .subscribe( 
            data =>{
              this.data['data'] = data;
              this.rout.navigate(['/material'])
            },
            error => this.stingdialog.stringalert(msg)
            );
        }else if(data === "allow"){
          // console.log("allow")
         this.check_email_response = "changing new email id";
         this.http.put("http://localhost:8000/api/newapi/"+this.id,[register])
         .subscribe( 
           data =>{
             this.data['data'] = data;
             this.rout.navigate(['/material'])
           },
           error => this.stingdialog.stringalert(msg)
           );
        }else if(data === "not_allow"){
          // console.log("not allow")
          this.check_email_response = "You are not alloweed email exists";
        }else{
          //error on submission
        }
      },
      error => this.stingdialog.stringalert(msg)
      );
     
  }
  testem:Number;
  registernew(register){
    
    let dt =register.age;
    // console.log(dt);
    if(dt == (!"Fri Jan 18 2019 00:00:00 GMT+0530 (India Standard Time)" || null)){
        this.your_age = "Invalid date";
        return false;
    }
    let datevalidate :Number = this.datee(register);
    if((datevalidate < 18) && (!datevalidate == null)){
     this.your_age = "Sorry you are not eligible to Register";
     return false;
    }else{
      this.your_age = datevalidate;
      if(this.your_age == "Sorry you are not eligible to Register"){
        return false;
      }
    }
    // console.log(this.testem)
    this.email = {"email":register.email.trim()};
    this.http.post<any>("http://localhost:8000/api/newapi/",this.email)
    .subscribe(
      data => {
      return this.testem = data;
    });
    
    if(this.testem == 0){                         
      let msg = "Email exists already";
      this.http.post("http://localhost:8000/api/angpro/",register)
      .subscribe( 
          data =>this.rout.navigate(['/material']),
          error => {
            this.stingdialog.stringalert(msg = "error in submission")
          }
        );
    }else if(this.testem > 0){
      let msg = "Email exists already";
      this.stingdialog.stringalert(msg)
      return false;
    }
  }
  email ={};
  
  selectOption = ['Pondicherry','Chennai','Bangalore','Delhi','Kerala'];

  emailcheckc(register){
    this.email = {"email":register.trim()};
    this.http.post<any>("http://localhost:8000/api/newapi/",this.email)
    .subscribe(
      data => {
      // this.em = data;
      // // console.log(this.em);
      if(data > 0){
        // alert("Email Aleady Exists");
        this.alertt = "Email Aleady Exists";
        this.testem = 1;
      }else{
        this.alertt = '';
        this.testem = 0;
      }
    });
  }
  // getdatas(): Observable<Samplepro> {
  //   return this.http.get<Samplepro>(this.url);
  // }
  //date function
  birthday;
  
  registerable_age;
  datee(register){
    if(register == undefined){
      return false;
    }
    let dt = register.age;
    
    if(dt == (null || undefined || "")){
        this.your_age = "Invalid date";
        return false;
    }
    const bDate: Date = new Date(dt);
    let bday =  bDate.toISOString().substring(0, 10);  //Ignore time
    this.birthday = bday.toString();
		var yearThen = parseInt(this.birthday.substring(0,4), 10);
        var monthThen = parseInt(this.birthday.substring(5,7), 10);
        var dayThen = parseInt(this.birthday.substring(8,10), 10);
        var today = new Date();
    var dob = new Date(yearThen, monthThen-1, dayThen);
		var differenceInMilisecond = today.valueOf() - dob.valueOf();
    var year_age = Math.floor(differenceInMilisecond / 31536000000);
        var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        if ((today.getMonth() == dob.getMonth()) && (today.getDate() == dob.getDate())) {
            // alert("Happy B'day!!!");
            let msg = "Happy B'day!!!";
      this.stingdialog.stringalert(msg)
        }
        var month_age = Math.floor(day_age/30);
        
        day_age = day_age % 30;
        if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
          let msg = "Invalid birthday";
      this.stingdialog.stringalert(msg)
            // alert("Invalid birthday");
            return this.registerable_age = "Invalid birthday";
        }
        else {
            // alert("You are<br/><span id=\"age\">" + year_age + " years " + month_age + " months " + day_age + " days</span> old");
            // $(".bday").val(year_age);
            this.your_age = year_age;
            if(this.your_age >= 18){
              return this.registerable_age = this.your_age;
            }else{
              return  this.registerable_age = "Sorry you are not eligible to Register";
            }
        }
  }
  //date function
  ngOnInit() {

    this.your_age;
    this.alertt = '';
      this.http.get<Samplepro>(this.url)
      .subscribe(
        data => {
          if(data[0] == undefined){
            return false;
          }
          let register = data[0];
            this.datee(register)
          this.register.setValue({
            name: data[0].name,
            age : data[0].age,
            email : data[0].email,
            password: data[0].password,
            address: data[0].address,
            city: data[0].city,
          });
        }
      );
  }
}

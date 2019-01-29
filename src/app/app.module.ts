import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, Routingcomponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProComponent } from './pro/pro.component';

import { HttpClientModule } from '@angular/common/http';
import { AdduserComponent } from './adduser/adduser.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialTableComponent } from './material-table/material-table.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {
        MatDatepickerModule, 
        MatNativeDateModule ,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        // MatProgressBarModule,
        // MatProgressSpinnerModule,
        } from '@angular/material';
import { MaterialTableEditComponent } from './material-table-edit/material-table-edit.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
// import {MatDialogModule} from '@angular/material';
import { StrigDialogComponent } from './strig-dialog/strig-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    ProComponent,
    AdduserComponent,
    PageNotFoundComponent,
    EditUserComponent,
    MaterialTableComponent,
    MaterialTableEditComponent,
    DialogBoxComponent,
    StrigDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, 
    MatDialogModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,

  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [
    MatDatepickerModule
  ],
  entryComponents:[DialogBoxComponent,StrigDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

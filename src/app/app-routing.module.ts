import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdduserComponent } from './adduser/adduser.component';
import { ProComponent } from './pro/pro.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MaterialTableComponent } from '../app/material-table/material-table.component';
import { MaterialTableEditComponent } from '../app/material-table-edit/material-table-edit.component';

const routes: Routes = [
  {path:'',component:AdduserComponent},  
{path:'add_user',component:AdduserComponent},
{path:'users',component:ProComponent},
{path:'edit_user/:id',component:EditUserComponent},
{path:'material',component:MaterialTableComponent},
{path:'material_dyn/:id',component:MaterialTableEditComponent},
{path:'material_dyn',component:MaterialTableEditComponent},
{path:"**",component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Routingcomponents = [ ProComponent,
                                   AdduserComponent,
                                   PageNotFoundComponent
                                  ]
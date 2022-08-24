import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRecordsComponent } from './user-records/user-records.component';
import { UserDetailsComponent } from './user-records/user-details/user-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-records' },
  { path: 'user-records', component: UserRecordsComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
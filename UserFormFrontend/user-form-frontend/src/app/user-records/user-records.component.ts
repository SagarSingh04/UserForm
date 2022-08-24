import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRecordsService } from './services/user-recorde.services'

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imgPath: string
}

const ELEMENT_DATA: User[] = [
  {firstName: 'Sagar', lastName: 'Singh', email: 'sagar@gmail.com', phoneNumber: '9664759553', imgPath: "C://image.png"},
  {firstName: 'Sagar', lastName: 'Singh', email: 'sagar@gmail.com', phoneNumber: '9664759553', imgPath: "C://image.png"},
];

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'imgPath', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router, private userRecordService: UserRecordsService) { }

  ngOnInit(): void {
    this.userRecordService.getUserRecords().subscribe(response => {
      console.log(response);
      this.dataSource = response.response;
    });
    
  }

  onClick(id: string) {
    console.log('Onclick method')
    console.log(id);
    this.router.navigate(['/user-details/' + id]);
  }

  onAdd() {
    this.router.navigate(['/user-details/' + "add"]);
  }

}

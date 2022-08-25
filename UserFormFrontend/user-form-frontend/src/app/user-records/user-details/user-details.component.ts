import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from '../services/user-details.services';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    imgPath: new FormControl('')
  });
  submitted = false;
  id: any = '0';

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file?: File = undefined; // Variable to store file

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
    private userDetailsService: UserDetailsService, private router: Router,
    private _snackBar: MatSnackBar) {
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)]],
        imgPath: ['', Validators.required]
      }
    );

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);

      if(this.id !== "add"){
        this.userDetailsService.getUserdetails(this.id).subscribe(response => {
          // console.log(response.response.firstName);
          this.form.patchValue({
            firstName: response.response.firstName,
            lastName: response.response.lastName,
            email: response.response.email,
            phoneNumber: response.response.phoneNumber
          });
          console.log(this.form.controls)
        });
      }
      
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.userDetailsService.updateUser(this.id, this.form.value).subscribe(res => {
      console.log(res);
      this.openSnackBar("Updated", "Close");
    });
  }

  onDelete(): void {
    this.submitted = false;
    
    this.userDetailsService.deleteUser(this.id).subscribe(response => {
      console.log(response)
      if(response.message === "success"){
        this.form.reset();
        this.openSnackBar("Deleted", "Close");
        this.router.navigate(['/user-records']);
      }
    });
  }

  onAdd() {
    console.log("Add clicked");
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append("image", this.file!);
    formData.append("firstName", this.form.value.firstName);
    formData.append("lastName", this.form.value.lastName);
    formData.append("email", this.form.value.email);
    formData.append("phoneNumber", this.form.value.phoneNumber);
    console.log(JSON.stringify(this.form.value, null, 2));
    console.log(formData);

    this.userDetailsService.addUser(formData).subscribe(res => {
      console.log(res);
      if(res.message === "success"){
        this._snackBar.open("Added", "Close");
        this.router.navigate(['/user-records']);
      }
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    console.log("File: ", this.file);
}

// OnClick of button Upload
onUpload() {
  console.log("On upload clicked");
    // this.loading = !this.loading;
    // console.log(this.file);
    // this.fileUploadService.upload(this.file).subscribe(
    //     (event: any) => {
    //         if (typeof (event) === 'object') {

    //             // Short link via api response
    //             this.shortLink = event.link;

    //             this.loading = false; // Flag variable 
    //         }
    //     }
    // );
}

}

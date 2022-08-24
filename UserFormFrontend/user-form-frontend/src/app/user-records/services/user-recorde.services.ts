import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserRecordsService {
    
    constructor(private http: HttpClient) {
    }


    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getUserRecords() {
        return this.http.get<any>('http://localhost:3000/users/getUsers');
    }


}
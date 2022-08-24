import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserDetailsService {
    
    constructor(private http: HttpClient) {
    }


    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getUserdetails(id: any) {
        return this.http.get<any>('http://localhost:3000/users/getUserDetails/' + id);
    }

    deleteUser(id: any) {
        return this.http.delete<any>('http://localhost:3000/users/deleteUser/' + id)
    }

    updateUser(id: any, data: any) {
        return this.http.patch<any>('http://localhost:3000/users/updateUser/' + id, data);
    }

    addUser(data: any) {
        return this.http.post<any>('http://localhost:3000/users/createUser', data);
    }
}
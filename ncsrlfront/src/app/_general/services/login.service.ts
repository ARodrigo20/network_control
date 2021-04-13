import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import { AuthModel } from '../models/auth.model';
import { UserPass } from '../models/userpass.model';
import { ChangePassword } from '../models/change-password.model';

@Injectable({
	providedIn: "root"
})
export class LoginService{
    constructor(private http: HttpClient) {}
    
    autentication(userpass: UserPass): Observable<AuthModel> {
        return this.http.post<AuthModel>(`${environment.apiBase}` + 'login', userpass);
    }

    changePassword(changePassword: ChangePassword, id: number): Observable<any> {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/update/password/' + id, changePassword);
    }
}
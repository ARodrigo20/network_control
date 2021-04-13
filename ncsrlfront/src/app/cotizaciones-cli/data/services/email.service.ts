import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";

@Injectable({
	providedIn: "root"
})
export class EmailService{
    constructor(private http: HttpClient) {}
    
    sendEmail(formData: FormData): Observable<any> {
        return this.http.post<any>(`${environment.apiBase}` + 'email/send-email', formData);
    }
}
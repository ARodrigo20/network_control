import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '@app/router.animations';
import { LoginService } from '@app/_general/services/login.service';
import { UserPass } from '@app/_general/models/userpass.model';
import { AuthModel } from '@app/_general/models/auth.model';
import { AuthService } from '@app/_general/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: UserPass = {email: "", password: ""};
    loading: boolean = false;

    constructor(
      public router: Router,
      private fb: FormBuilder,
      private authService: AuthService,
      private loginService: LoginService
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
			email: ["", Validators.required],
			password: ["", Validators.required]
		});
		this.loginForm.valueChanges.subscribe((data) => {
			this.user.email = data.email;
			this.user.password = data.password;
		});
    }

    onSubmitLogin() {
        this.loading = true;
        this.loginService.autentication(this.user).subscribe(
            (_auth: AuthModel) => {
                _auth.user.token = _auth.token;
                this.authService.logo = _auth.logo;
                this.authService.logo_ext = _auth.logo_ext;

                //console.log("prueba login: ", _auth)
                this.authService.setData(_auth.user, _auth.empresa);
                this.loading = false;
                this.router.navigate(["/dashboard"]);
            },
            (error) => {
                console.log(error);
                this.loading = false;
            }
        );
    }
}

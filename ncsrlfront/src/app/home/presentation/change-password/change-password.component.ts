import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Router } from '@angular/router';
import { LoginService } from '@app/_general/services/login.service';
import { ChangePassword } from '@app/_general/models/change-password.model';
import { AuthService } from '@app/_general/services/auth.service';
import { User } from '@app/_general/models/user.model';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    //formulario    
    old_password: string = "";
    new_password: string = "";
    new_password_verf: string = "";

    submitted: boolean = false;
    showbar: boolean = false;
    //fin de formulario

    user: User;

    constructor(
            public router: Router,
            private messageService: MessageService,
            public activatedroute: ActivatedRoute, 
            private authService: AuthService,
            public gS: GeneralService,
            private loginService: LoginService
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.user = this.authService.getusuarioJson();
        
    }

    onSubmit() {
        this.submitted = true;
        this.showbar = true;

        if(!this.validOldPassword || !this.validNewPassword) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let changes: ChangePassword = {
                email: this.user.email,
                old_password: this.old_password,
                new_password: this.new_password
            }

            this.loginService.changePassword(changes, this.user.id_col).subscribe(
                (_resp: any) => {
                    console.log("prueba change: ", _resp)
                    if(_resp.code === 101) {
                        this.showMessage('error', 'Error', 'Credenciales no validas');
                    } else if (_resp.code === 200 ){
                        this.showMessage('success', 'Exito', 'Contraseña Modificada');
                        this.router.navigate(["/dashboard"]);
                    }
                    this.showbar = false;
                },
                (error) => {
                    console.log(error);
                    this.showbar = false;
                }
            );

        }
    }

    resetForm() {
    }

    
    cancel() {
        this.submitted = false;
        this.router.navigate(["/dashboard"]);
		// this.resetForm();
		// this.displayModal = false;
    }

    //validadores
    get validOldPassword(): boolean {
        return this.old_password !== "";
    }

    get validNewPassword(): boolean {
        return this.new_password !== "";
    }

    get verifiPasswords(): boolean {
        return this.new_password === this.new_password_verf;
    }


    //end validadores

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
}

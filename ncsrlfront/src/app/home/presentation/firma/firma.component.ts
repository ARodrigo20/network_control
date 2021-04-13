import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Router } from '@angular/router';
import { LoginService } from '@app/_general/services/login.service';
import { AuthService } from '@app/_general/services/auth.service';
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Empresa } from '@app/empresa/data/models/empresa.model';
import { ColaboradorService } from '@app/usuarios/data/services/colaborador.service';

@Component({
    selector: 'app-firma',
    templateUrl: './firma.component.html',
    styleUrls: ['./firma.component.scss']
})
export class FirmaComponent implements OnInit {

    //formulario    
    img_emp: string = "";
    imgext_emp: string = "";

    submitted: boolean = false;
    showbar: boolean = false;
    editForm: boolean = false;
    //fin de formulario

    // files: File[] = [];
    logo: File;
    mySrc: any;
    base64data: string;
    

    empresa: Empresa = new Empresa();
    respaldo: Empresa;
    showButton: boolean = false;

    constructor(
        public router: Router,
        private messageService: MessageService,
        public activatedroute: ActivatedRoute,
        private tipodocService: TipoDocService,
        private usuarioService: ColaboradorService,
        private authService: AuthService,
        private sanitizer: DomSanitizer,
        public gS: GeneralService,
        private loginService: LoginService
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.getFirma();
    }


    getFirma() {
        this.showbar = true;
        this.usuarioService.getFirma(this.authService.getusuarioJson().id_col).subscribe(
            (_resp: any) => {
                //console.log("emp:", _resp.firma);
                if(_resp.firma){
                    this.mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/' + 'jpeg' + ';base64,' + _resp.firma);
                }
                this.showButton = true;
                this.showbar = false;
            },
            (error) => {
                this.showbar = false;
                console.log(error);
            }

        );
    }

    setDatosEmpresa(empresa: Empresa) {
        this.img_emp = empresa.img_emp ? empresa.img_emp : "";
        this.imgext_emp = empresa.imgext_emp ? empresa.imgext_emp : "";
    }

    onSubmit() {

        this.submitted = true;
        this.showbar = true;

        let formData = new FormData();
        formData.append("user_id", ""+this.authService.getusuarioJson().id_col)
        if(this.logo) {
            formData.append("firma", this.logo);
        }

        this.usuarioService.updateFirma(formData).subscribe(
            (_resp: any) => {
                this.showMessage('success', 'Exito', 'Firma actualizada');
                
                if(_resp['firma']) {
                    this.mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/' + 'jpeg' + ';base64,' + _resp['firma']);
                    this.authService.updateFirma(_resp['firma']);
                }
                this.logo = null;

                this.editForm = false;
                this.showbar = false;
            },
            (error) => {
                console.log(error);
                this.showbar = false;
            }
        );
    }

    editar() {
        this.respaldo = new Empresa();

        this.respaldo.img_emp = this.img_emp;
        this.respaldo.imgext_emp = this.imgext_emp;

        this.editForm = true;
    }

    cancelar() {
        this.editForm = false;

        this.img_emp = this.respaldo.img_emp;
        this.imgext_emp = this.respaldo.imgext_emp;

        this.logo = null;

        this.respaldo = null;
    }

    handleFiles(event) {
        console.log(event)
        if (event && event.target && event.target.files.length > 0) {
            this.logo = event.target.files[0];
            console.log(event.target.files[0])
        }
    }

    removeFile() {
        this.logo = null;
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Router } from '@angular/router';
import { LoginService } from '@app/_general/services/login.service';
import { ChangePassword } from '@app/_general/models/change-password.model';
import { AuthService } from '@app/_general/services/auth.service';
import { User } from '@app/_general/models/user.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { EmpresaService } from '@app/empresa/data/services/empresa.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EmpresaFile } from '@app/empresa/data/models/empresa-file.model';
import { Empresa } from '@app/empresa/data/models/empresa.model';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

    //formulario    
    nom_emp: string = "";
    numdoc_emp: string = "";
    dir_emp: string = "";
    dis_emp: string = "";
    ciu_emp: string = "";
    tel_emp: string = "";
    cel_emp: string = "";
    codciu_emp: string = "";
    img_emp: string = "";
    imgext_emp: string = "";

    tipdocs: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;

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
        private empresaService: EmpresaService,
        private authService: AuthService,
        private sanitizer: DomSanitizer,
        public gS: GeneralService,
        private loginService: LoginService
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.getTiposDocumento();
        this.getEmpresa();
    }


    getEmpresa() {
        this.empresaService.getEmpresa(null).subscribe(
            (_empresa: EmpresaFile) => {
                console.log("emp:", _empresa);
                if(_empresa.logo){
                    this.mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/' + _empresa.empresa.imgext_emp + ';base64,' + _empresa.logo);
                }
                this.setDatosEmpresa(_empresa.empresa);
                this.showButton = true;
                //    _empresa['file']
                //    this.logo = btoa(_empresa['file']);
            },
            (error) => {
                console.log(error);
            }

        );
    }

    getTiposDocumento() {
        this.tipodocService.getTipDoc(null)
        .subscribe(
            (_tipdocs: GeneralCollection<TipoDoc>) => {
                this.tipdocs = _tipdocs['data'];
            },
            (error) => {
            }

        );
    }

    setDatosEmpresa(empresa: Empresa) {

        this.selectedTipdoc = this.tipdocs.filter(unit => unit.id_tipdoc === empresa.id_tipdoc)[0];
        this.nom_emp = empresa.nom_emp ? empresa.nom_emp : "";
        this.numdoc_emp = empresa.numdoc_emp ? empresa.numdoc_emp : "";
        this.dir_emp = empresa.dir_emp ? empresa.dir_emp : "";
        this.dis_emp = empresa.dis_emp ? empresa.dis_emp : "";
        this.ciu_emp = empresa.ciu_emp ? empresa.ciu_emp : "";
        this.tel_emp = empresa.tel_emp ? empresa.tel_emp : "";
        this.cel_emp = empresa.cel_emp ? empresa.cel_emp : "";
        this.codciu_emp = empresa.codciu_emp ? empresa.codciu_emp : "";
        this.img_emp = empresa.img_emp ? empresa.img_emp : "";
        this.imgext_emp = empresa.imgext_emp ? empresa.imgext_emp : "";
    }

    onSubmit() {

        this.submitted = true;
        this.showbar = true;

        let formData = new FormData();
        formData.append("nom_emp", this.nom_emp);
        formData.append("numdoc_emp", this.numdoc_emp);
        formData.append("dir_emp", this.dir_emp);
        formData.append("dis_emp", this.dis_emp);
        formData.append("ciu_emp", this.ciu_emp);
        formData.append("tel_emp", this.tel_emp);
        formData.append("cel_emp", this.cel_emp);
        formData.append("codciu_emp", this.codciu_emp);
        formData.append("id_tipdoc", this.selectedTipdoc ? this.selectedTipdoc.id_tipdoc.toString() : "");
        if(this.logo) {
            formData.append("logo", this.logo);
        }

        this.empresaService.updateEmpresa(formData).subscribe(
            (_resp: any) => {
                this.showMessage('success', 'Exito', 'Datos Actualizados');
                
                if(_resp['logo']) {
                    this.mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/' + _resp['ext'] + ';base64,' + _resp['logo']);
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

        this.respaldo.tipo_documento = this.selectedTipdoc;
        this.respaldo.nom_emp = this.nom_emp;
        this.respaldo.numdoc_emp = this.numdoc_emp;
        this.respaldo.dir_emp = this.dir_emp;
        this.respaldo.dis_emp = this.dis_emp;
        this.respaldo.ciu_emp = this.ciu_emp;
        this.respaldo.tel_emp = this.tel_emp;
        this.respaldo.cel_emp = this.cel_emp;
        this.respaldo.codciu_emp = this.codciu_emp;
        this.respaldo.img_emp = this.img_emp;
        this.respaldo.imgext_emp = this.imgext_emp;

        this.editForm = true;
    }

    cancelar() {
        this.editForm = false;
        
        this.selectedTipdoc = this.respaldo.tipo_documento;
        this.nom_emp = this.respaldo.nom_emp;
        this.numdoc_emp = this.respaldo.numdoc_emp;
        this.dir_emp = this.respaldo.dir_emp;
        this.dis_emp = this.respaldo.dis_emp;
        this.ciu_emp = this.respaldo.ciu_emp;
        this.tel_emp = this.respaldo.tel_emp;
        this.cel_emp = this.respaldo.cel_emp;
        this.codciu_emp = this.respaldo.codciu_emp;
        this.img_emp = this.respaldo.img_emp;
        this.imgext_emp = this.respaldo.imgext_emp;

        this.logo = null;

        this.respaldo = null;
    }

    // onSelect(event) {
    //     if (event && event.currentFiles && event.currentFiles.length > 0) {
    //         //console.log("gfiles; ", event)
    //         this.files = [];
    //         this.files.push(event.currentFiles[0]);
    //         this.logo = event.currentFiles[0];
    //     }
    // }

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

    // onRemove(event) {
    //     this.files = [];
    // }

    // myUploader(event) {
    //     for(let file of event.files) {
    //       this.uploadedFiles.push(file);
    //     }
    //   }



    //validadores
    // get validOldPassword(): boolean {
    //     return this.old_password !== "";
    // }

    // get validNewPassword(): boolean {
    //     return this.new_password !== "";
    // }

    // get verifiPasswords(): boolean {
    //     return this.new_password === this.new_password_verf;
    // }


    //end validadores

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}

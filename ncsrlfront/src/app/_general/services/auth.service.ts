import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { Empresa } from '@app/empresa/data/models/empresa.model';

@Injectable()
export class AuthService {
    
	public token: string;
	public logo: string;
	public logo_ext: string;
	private empresaJson: Empresa;
	private usuario: string;
	public gotologin: boolean;
	private userJson: User;

	private cliJson: User; ////////////////
    //public tablas: Tabla[];
    
	constructor(private messageService: MessageService, public router: Router) {

		this.token = localStorage.getItem("token");
		this.logo = localStorage.getItem("logo");
		this.logo_ext = localStorage.getItem("logo_ext");
		this.gotologin = false;
		//this.tablas = JSON.parse(localStorage.getItem("tablas"));
		//if (this.tablas) this.tablas = [];
	}

	public getusuarioJson(): User {
		if (this.userJson == null) {
			return (this.userJson = JSON.parse(localStorage.getItem("user"))); //new CryptoVar(this.appConfig).desencriptar(localStorage.getItem("userjson")));
		}
		return this.userJson;
	}

	public getEmpresaJson(): Empresa {
		if (this.empresaJson == null) {
			return (this.empresaJson = JSON.parse(localStorage.getItem("empresa"))); //new CryptoVar(this.appConfig).desencriptar(localStorage.getItem("userjson")));
		}
		return this.empresaJson;
	}

	public getclienteJson(): User {
		if (this.cliJson == null) {
			return (this.cliJson = JSON.parse(localStorage.getItem("cliente"))); //new CryptoVar(this.appConfig).desencriptar(localStorage.getItem("userjson")));
		}
		return this.cliJson;
	}

	public getlogin(): boolean {
		if (!this.gotologin) {
			if (localStorage.getItem("islogin") == "true") return true;
			return false;
		}
		return this.gotologin;
	}
	public isLogin(): boolean {
        if (localStorage.getItem("islogin") == "true") return true;
		return false;
	}

	ErrorServer() {
		this.messageService.add({
			severity: "error",
			summary: "Error",
			detail: "Hubo un error conectandose al servidor"
		});
	}
	addsmsError(sms: string) {
		this.messageService.add({severity: "error", summary: "Error", detail: sms});
	}
	addsmsWarn(sms: string) {
		this.messageService.add({severity: "warn", summary: "Advertencia", detail: sms});
	}
	addsmsSuccess(sms: string) {
		this.messageService.add({severity: "success", summary: "Operacion Exitosa", detail: sms});
    }
    addsmsInfo(sms: string) {
		this.messageService.add({severity: "info", summary: "Informacion", detail: sms});
	}

	public setData(user: User, empresa: Empresa) {
		
		this.token = user.token;
		
		//this.usuario = user.usuario;
		user.token = "";
		// localStorage.setItem("menu", JSON.stringify(user.barMenu));
        // user.barMenu = [];
        
		localStorage.setItem("token", this.token);
		localStorage.setItem("logo", this.logo);
		localStorage.setItem("logo_ext", this.logo_ext);
		localStorage.setItem("islogin", "true");
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("empresa", JSON.stringify(empresa));
        
		this.userJson = user;
		this.empresaJson = empresa;
		this.gotologin = true;
	}

	updateFirma(firma: string) {
		if (this.userJson == null) {
			this.userJson = JSON.parse(localStorage.getItem("user")); //new CryptoVar(this.appConfig).desencriptar(localStorage.getItem("userjson")));
		}
		this.userJson.firma = firma;
		localStorage.setItem("user", JSON.stringify(this.userJson));
	}

	logout() {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}
}

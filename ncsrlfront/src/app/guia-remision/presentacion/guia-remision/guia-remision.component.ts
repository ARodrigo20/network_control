import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import * as moment from 'moment';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '@app/empresa/data/services/empresa.service';
import { AuthService } from '@app/_general/services/auth.service';
import { EmailService } from '@app/_general/services/email.service';

import { GuiaRemisionService } from "@app/guia-remision/data/services/guia-remision.service";
import { GuiaRemisionDetalle } from '@app/guia-remision/data/models/guia-remision-detalle.model';
import { GuiaRemisionEnvio, Llegada, Partida } from '@app/guia-remision/data/models/guia-remision-envio.model';
import { GuiaRemision } from '@app/guia-remision/data/models/guia-remision.model';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Address, Company, Destinatario, GuiaSunat } from '@app/guia-remision/data/models/guia-sunat.model';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Transporte } from '@app/tablas-referenciales/data/models/transporte.model';

declare let pdfMake: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.scss']
})

export class GuiaRemisionComponent implements OnInit {


  guiaRemisionDetalle: GuiaRemisionDetalle[]=[];
  guiaRemisionEnvio: GuiaRemisionEnvio[]=[];
  guiaSunat: GuiaSunat[]=[];

  transportista : Transporte[]=[];
  //ordenes activas
  //ordenesActivas: OrdenCompra[] = [];
  //selectedOrdenActiva: OrdenCompra;
  guiaActivas: any[] = [];
  selectedGuiaActiva: GuiaRemision;
  totalActivas: number;
  loadingActivas: boolean = false;
  
  //ordenes anuladas
  guiaAnuladas: GuiaRemision[] = [];
  selectedGuiaAnulada: GuiaRemision;
  //ordenesAnuladas: OrdenCompra[] = [];
  //selectedOrdenAnulada: OrdenCompra;
  totalAnuladas: number;
  loadingAnuladas: boolean = false;

  showbar: boolean = false;
  rowsNumber: number = 10;

  loadingPdf: boolean = false;
  credito: SelectItem[] = [];

  displayModalEnviar: boolean = false;
  userName: string = "";
  asunto: string = "Orden de Compra";
  mensaje: string = "";

  showbarEmail: boolean = false;

  prueba: number = 0;

  constructor(
    private messageService: MessageService,
    //private confirmationService: ConfirmationService,
    //private ordenCompraService: OrdenCompraService,
    private guiaRemisionService: GuiaRemisionService,
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService,
    public activatedroute: ActivatedRoute,
    public gS: GeneralService
  ) {
    var titles = this.activatedroute.snapshot.data['title'];
    this.gS.setTitle(titles.split('/'));
  }

  ngOnInit() {
    //this.getOrdenes();
    this.getGuias();
    this.userName = this.authService.getusuarioJson().nom_col;
  }

  
  getGuias() {
    this.loadingActivas = true;
    this.guiaRemisionService.getGuias(null).subscribe(
      (_guias: GeneralCollection<GuiaRemision>) => {
        this.separarOrdenes(_guias['data']);
        //this.guiaActivas.push(_guias['data']);
        this.loadingActivas = false;
        console.log("DOCS:: ", _guias)
      },
      (error) => {
        this.loadingActivas = false;
        console.log("ocurrio un error");
      }
    );
  }

  separarOrdenes(ordenes: GuiaRemision[]) {
    this.guiaActivas = [];
    this.guiaAnuladas = [];
    ordenes.map((orden: GuiaRemision) => {
      // this.ordenesActivas.push(orden);
      if (orden.est_reg === "") {
        this.guiaActivas.push(orden);
      } else {
        this.guiaAnuladas.push(orden);
      }
    });
    this.totalActivas = this.guiaActivas.length
    this.totalAnuladas = this.guiaAnuladas.length

  }

  enviar() {
    
    if (this.selectedGuiaActiva) {
        //this.displayModalEnviar = true;
        
        this.guiaRemisionService.getGuia(this.selectedGuiaActiva.id_guia_remision).subscribe(
          (_guia: any) => {

            if(_guia.est_env !== "E"){

              let empresa = this.authService.getEmpresaJson();
            console.log("este s una empresa",empresa);
                                    
            let guiaEnviar = {
              "tipoDoc": "09",
              "serie": _guia.serie + _guia.correlativo,
              "correlativo": _guia.correlativo,
              "observacion": _guia.observacion,
              //"fechaEmision": (_guia.fechaEmision).substring(0,10)+"T"+(_guia.fechaEmision).substring(11,19)+"+01:00",
              "fechaEmision": moment(_guia.fechaEmision).format("YYYY-MM-DDTHH:mm:ssZ"),
              "company": {
                  "ruc": empresa.numdoc_emp,
                  "razonSocial": empresa.nom_emp,
                  "nombreComercial": "-",
                  "address": {
                      "ubigueo": "-",
                      "codigoPais": "PE",
                      "departamento": "AREQUIPA",
                      "provincia": empresa.ciu_emp,
                      "distrito": empresa.dis_emp,
                      "urbanizacion": "-",
                      "direccion": empresa.dir_emp
                  }
              },
              "destinatario": {
                  "tipoDoc": "6",
                  "numDoc": _guia.cliente.numdoc_cli,
                  "rznSocial": _guia.cliente.razsoc_cli
              },
              "envio": {
                  "codTraslado": _guia.envio.codTraslado, ////aqui///
                  "desTraslado": _guia.envio.desTraslado,
                  "indTransbordo": false,
                  "pesoTotal": _guia.envio.pesoTotal,
                  "undPesoTotal": _guia.envio.undPesoTotal, 
                  "numBultos": _guia.envio.numBultos,
                  "modTraslado": _guia.envio.modTraslado, //////aqui////
                  //"fecTraslado": (_guia.envio.fecTraslado).substring(0,10)+"T"+(_guia.envio.fecTraslado).substring(11,19)+"+01:00",
                  "fecTraslado": moment(_guia.envio.fecTraslado).format("YYYY-MM-DDTHH:mm:ssZ"),
                  //"numContenedor": _guia.envio.numContenedor,
                  "numContenedor": "-",
                  //"codPuerto": _guia.envio.codPuerto,
                  "codPuerto": "-",
                  "transportista": {
                      "TipoDoc": _guia.envio.transportista.TipoDoc,
                      "NumDoc": _guia.envio.transportista.NumDoc,
                      "RznSocial": _guia.envio.transportista.RznSocial,
                      "Placa": _guia.envio.transportista.Placa,
                      "ChoferTipoDoc": _guia.envio.transportista.ChoferTipoDoc,
                      "ChoferDoc": _guia.envio.transportista.ChoferDoc
                  },
                  "llegada": {
                      "ubigueo": _guia.envio.ubigueoLlegada,
                      "direccion": _guia.envio.direccionLlegada
                  },
                  "partida": {
                      "ubigueo": _guia.envio.ubigueoSalida,
                      "direccion": _guia.envio.direccionSalida
                  }
              },
              "details": _guia.guia_remision_det
            }

            console.log("este es guia", guiaEnviar);

            //console.log("guia:: ", guia);
            this.guiaRemisionService.enviarGuia(guiaEnviar).subscribe(
                (_resp) => {
                    this.showbar = false;
                    this.showMessage('success', 'Exito', 'guia remision enviada');
                    console.log(_resp);
                    
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema al enviar');
                    console.log("error: ", error)
                    this.showbar = false;
            });
                      

              this.guiaRemisionService.getGuiaInvoice(guiaEnviar).subscribe(
                (_resp) => {
                    //this.showbar = false;
                    console.log("PDF: ", _resp)
                    var fileURL = URL.createObjectURL(_resp);
                    window.open(fileURL);
                    //this.showMessage('success', 'Exito', 'guia remision enviada');
                    //_guia.est_env=== "E";
                    //console.log(_resp);
                    //this.cancel();
                    this.guiaRemisionService.cambiarEstado(this.selectedGuiaActiva.id_guia_remision).subscribe(
                      (_resp) => {                
                          //this.showMessage('success', 'Exito', 'estado cambiado');
                          _guia.est_env= "E";
                          console.log(_resp);
                          location.reload();
                          //this.cancel();
                      },
                      (error) => {
                          this.showMessage('error', 'Error', 'Ocurrio un problema al cambiar');
                          console.log("error: ", error)
                          //this.showbar = false;
                    });
                },
                (error) => {                    
                    console.log("pdf error: ", error)
                    
              });
            }else{
              this.showMessage('info', 'Informacion', 'guia de remision ya enviada');
            }
            
            
          },
          (error) => {
            console.log("ocurrio un error");
          }
        );
    
        
    } else {
        this.showMessage('info', 'Informacion', 'Seleccione una guia de remision');
    }
  }

  generarPdf() {
    
    if (this.selectedGuiaActiva) {
        //this.displayModalEnviar = true;
        
        this.guiaRemisionService.getGuia(this.selectedGuiaActiva.id_guia_remision).subscribe(
          (_guia: any) => {

            if(_guia.est_env === "E"){

              let empresa = this.authService.getEmpresaJson();
            console.log("este s una empresa",empresa);
                                    
            let guiaEnviar = {
              "tipoDoc": "09",
              "serie": _guia.serie + _guia.correlativo,
              "correlativo": _guia.correlativo,
              "observacion": _guia.observacion,
              //"fechaEmision": (_guia.fechaEmision).substring(0,10)+"T"+(_guia.fechaEmision).substring(11,19)+"+01:00",
              "fechaEmision": moment(_guia.fechaEmision).format("YYYY-MM-DDTHH:mm:ssZ"),
              "company": {
                  "ruc": empresa.numdoc_emp,
                  "razonSocial": empresa.nom_emp,
                  "nombreComercial": "-",
                  "address": {
                      "ubigueo": "-",
                      "codigoPais": "PE",
                      "departamento": "AREQUIPA",
                      "provincia": empresa.ciu_emp,
                      "distrito": empresa.dis_emp,
                      "urbanizacion": "-",
                      "direccion": empresa.dir_emp
                  }
              },
              "destinatario": {
                  "tipoDoc": "6",
                  "numDoc": _guia.cliente.numdoc_cli,
                  "rznSocial": _guia.cliente.razsoc_cli
              },
              "envio": {
                  "codTraslado": _guia.envio.codTraslado, ////aqui///
                  "desTraslado": _guia.envio.desTraslado,
                  "indTransbordo": false,
                  "pesoTotal": _guia.envio.pesoTotal,
                  "undPesoTotal": _guia.envio.undPesoTotal, 
                  "numBultos": _guia.envio.numBultos,
                  "modTraslado": _guia.envio.modTraslado, //////aqui////
                  //"fecTraslado": (_guia.envio.fecTraslado).substring(0,10)+"T"+(_guia.envio.fecTraslado).substring(11,19)+"+01:00",
                  "fecTraslado": moment(_guia.envio.fecTraslado).format("YYYY-MM-DDTHH:mm:ssZ"),
                  //"numContenedor": _guia.envio.numContenedor,
                  "numContenedor": "-",
                  //"codPuerto": _guia.envio.codPuerto,
                  "codPuerto": "-",
                  "transportista": {
                      "TipoDoc": _guia.envio.transportista.TipoDoc,
                      "NumDoc": _guia.envio.transportista.NumDoc,
                      "RznSocial": _guia.envio.transportista.RznSocial,
                      "Placa": _guia.envio.transportista.Placa,
                      "ChoferTipoDoc": _guia.envio.transportista.ChoferTipoDoc,
                      "ChoferDoc": _guia.envio.transportista.ChoferDoc
                  },
                  "llegada": {
                      "ubigueo": _guia.envio.ubigueoLlegada,
                      "direccion": _guia.envio.direccionLlegada
                  },
                  "partida": {
                      "ubigueo": _guia.envio.ubigueoSalida,
                      "direccion": _guia.envio.direccionSalida
                  }
              },
              "details": _guia.guia_remision_det
            }

            //console.log("este es guia", guiaEnviar);

            //console.log("guia:: ", guia); 
              this.guiaRemisionService.getGuiaInvoice(guiaEnviar).subscribe(
                (_resp) => {
                    console.log("PDF: ", _resp)
                    var fileURL = URL.createObjectURL(_resp);
                    window.open(fileURL);
                                        
                },
                (error) => {                    
                    console.log("pdf error: ", error)
                    
              });
            }else{
              this.showMessage('info', 'Informacion', 'La guia de remision aun no fue enviada');
            }
            
            
          },
          (error) => {
            console.log("ocurrio un error");
          }
        );
    
        
    } else {
        this.showMessage('info', 'Informacion', 'Seleccione una guia de remision');
    }
  }

  //mensajes 
  showMessage(_severity: string, _summary: string, _detail: string) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
  }

}
















/*let guia = new GuiaSunat();
            
            guia.tipoDoc = "09";
            guia.serie = _guia.serie;
            guia.correlativo = _guia.correlativo;
            guia.observacion = _guia.observacion;
            //guia.fechaEmision = (_guia.fechaEmision).substring(0,10);
            "fechaEmision" ; (_guia.fechaEmision).substring(0,10)+"T23:21:12+01:00"
            
            guia.company = {
              'ruc' : empresa.numdoc_emp,
              'razonSocial' : empresa.nom_emp,
              'nombreComercial' : "",
            }

            guia.company = new Company();
            guia.company.ruc = empresa.numdoc_emp;
            guia.company.razonSocial = empresa.nom_emp;
            guia.company.nombreComercial = "";
            guia.company.address = new Address();
            guia.company.address.ubigueo = "";
            guia.company.address.codigoPais = "PE";
            guia.company.address.departamento = "AREQUIPA";
            guia.company.address.provincia = empresa.ciu_emp;
            guia.company.address.distrito = empresa.dis_emp;
            guia.company.address.urbanizacion = "";
            guia.company.address.direccion = empresa.dir_emp;

            guia.destinatario = new Destinatario();
            guia.destinatario.tipoDoc = "6";
            guia.destinatario.numDoc = _guia.cliente.numdoc_cli;
            guia.destinatario.rznSocial = _guia.cliente.razsoc_cli;

            guia.envio = new GuiaRemisionEnvio();
            guia.envio.codTraslado = _guia.envio.codTraslado;
            guia.envio.desTraslado =  _guia.envio.desTraslado;
            guia.envio.indTransbordo = _guia.envio.indTransbordo;
            guia.envio.pesoTotal = _guia.envio.pesoTotal;
            guia.envio.undPesoTotal = _guia.envio.undPesoTotal;
            guia.envio.numBultos = _guia.envio.numBultos;
            guia.envio.modTraslado = _guia.envio.modTraslado;
            //guia.envio.fecTraslado = _guia.envio.fecTraslado;
            "fecTraslado"; (_guia.envio.fecTraslado).substring(0,10)+"T23:21:12+01:00",
            guia.envio.numContenedor = _guia.envio.numContenedor;
            guia.envio.codPuerto = _guia.envio.codPuerto;
            //guia.envio = _guia.envio;
            
            guia.envio.transportista = new Transporte();
            guia.envio.transportista.Placa = _guia.envio.transportista.Placa;
           
            guia.envio.llegada = new Llegada();
            guia.envio.llegada.ubigueo = _guia.envio.ubigueoLlegada;
            guia.envio.llegada.direccion = _guia.envio.direccionLlegada;

            guia.envio.partida = new Partida();
            guia.envio.partida.ubigueo = _guia.envio.ubigueoSalida;
            guia.envio.partida.direccion = _guia.envio.direccionSalida;

            //guia.details = new GuiaRemisionDetalle;

            //guia.details = new GuiaRemisionDetalle[];

            guia.details = _guia.guia_remision_det;
            console.log("este es detalle", guia.details);
            
            /*_guia.detalle_guia.map((_detalle: GuiaRemisionDetalle) => {
              let deta = new GuiaSunat;

              deta.details.codigo = _detalle.codigo;
              this.guiaSunat.push(deta);
              //console.log(detalle, "entrando a detalle");
            });*/
                  //let detalle = new GuiaRemisionDetalle();
            //guia.details = new GuiaRemisionDetalle[];

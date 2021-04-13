import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
//import { CotizacionesService } from "@app/cotizaciones/data/services/cotizaciones.service"; ///
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proformas, ProformasJSON } from '@app/proforma/data/models/proforma.model';  ///
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { ProformasDetalle } from '@app/proforma/data/models/proforma-detalle.model';
import * as moment from 'moment';
import { ProformasService } from '@app/proforma/data/services/proformas.service';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpresaService } from '@app/empresa/data/services/empresa.service';
import { AuthService } from '@app/_general/services/auth.service';
import { EmailService } from '@app/_general/services/email.service';
import { Body } from '@angular/http/src/body';
import { Seccion } from '@app/tablas-referenciales/data/models/seccion.model';
import { SeccionService } from '@app/tablas-referenciales/data/services/seccion.service';

declare let pdfMake: any ;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-proforma',
    templateUrl: './proforma.component.html',
    styleUrls: ['./proforma.component.scss']
})

export class ProformaComponent implements OnInit {

  
     
    //proformas activas
    proformasActivas: Proformas[] = [];
    selectedProformaActiva: Proformas;
    totalActivas: number;
    loadingActivas: boolean = false;
    //proformas anuladas
    proformasAnuladas: Proformas[] = [];
    selectedProformaAnulada: Proformas;
    totalAnuladas: number;
    loadingAnuladas: boolean = false;

    showbar: boolean = false;
    rowsNumber: number = 10;

    //pdfSrc = "";
    //pdfSrc : any;
    //displayPdfModal: boolean = false;

    //pdf: PdfMakeWrapper;
    //dialogTitle: string = "";
    loadingPdf: boolean = false;
    credito: SelectItem[] = [];

    displayModalEnviar: boolean = false;
    userName: string = "";
    asunto: string = "Proforma";
    mensaje: string = "";

    showbarEmail: boolean = false;

    prueba: number = 0;

    secciones: Seccion[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private proformasService: ProformasService,
        private authService: AuthService,
        private router: Router,
        private seccionService: SeccionService,
        private emailService: EmailService,
        public activatedroute: ActivatedRoute,
        public gS: GeneralService
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.getSecciones();
        // this.getProyectosProceso();
        // this.getProyectosTerminados();

        this.getProformas();
        this.credito = [
            {label: 'Credito', value: 1},
            {label: 'Contado', value: 2},
            {label: 'Transaccion', value: 3},
        ];
        this.userName = this.authService.getusuarioJson().nom_col;
    }

    //proformas
    getProformas() {
        this.loadingActivas = true;
        this.proformasService.getProformas(null).subscribe(
            (_proformas: GeneralCollection<Proformas>) => {
                this.separarProformas(_proformas['data']);
                this.loadingActivas = false;
                // this.cotizacionesActivas = _cotizaciones['data'];
                // this.totalActivas = _cotizaciones['size'];
                console.log("DOCS:: ", _proformas)
            },
            (error) => {
                this.loadingActivas = false;
                console.log("ocurrio un error: ", error);
            }
        );
    }

    separarProformas(proformas: Proformas[]) {
        this.proformasActivas = [];
        this.proformasAnuladas = [];
        proformas.map((proforma: Proformas) => {
            if (proforma.est_reg === "A") {
                this.proformasActivas.push(proforma);
            } else {
                this.proformasAnuladas.push(proforma);
            }
        });
        this.totalActivas = this.proformasActivas.length
        this.totalAnuladas = this.proformasAnuladas.length
               
    }

   

    crear() {
        this.router.navigate(["/proforma/form/new"]);
        //this.formMode = true;
    }

    editProforma() {
      if(this.selectedProformaActiva) {

        this.router.navigate(["/proforma/form/mod-"+this.selectedProformaActiva.id_pro]);
          
      } else {
          this.showMessage('info', 'Informacion', 'Seleccione una proforma');
      }
    }


    getSecciones() {
      this.seccionService.getSecciones(null).subscribe(
          (_secciones: GeneralCollection<Seccion>) => {
              this.secciones = _secciones['data'];
          },
          (error) => {
          }
      );
    } 

    anular() {
        if (this.selectedProformaActiva) {
            this.confirmationService.confirm({
                message: '¿Quieres anular esta proforma?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'anularProforma',
                accept: () => {
                    this.showbar = true;
                    this.proformasService.anularProforma(this.selectedProformaActiva.id_pro).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Proforma anulada');
                            this.getProformas();
                            this.selectedProformaActiva = null;
                            this.showbar = false;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema al anular');
                            this.showbar = false;
                        });
                },
                reject: () => {

                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una proforma');
        }
    }

    enviarCorreo() {
      if (this.selectedProformaActiva) {
          this.displayModalEnviar = true;
          //console.log("proforma: ", this.selectedProformaActiva)
      } else {
          this.showMessage('info', 'Informacion', 'Seleccione una Proforma');
      }
    }

    cancelEnviar() {
        this.asunto = "Proforma";
        this.mensaje = "";
        this.displayModalEnviar = false;
    }

    enviarPDF() {
      this.showbarEmail = true;
      let correo_cliente = (this.selectedProformaActiva && this.selectedProformaActiva.cliente_contacto) ? this.selectedProformaActiva.cliente_contacto.ema_cli_con : this.selectedProformaActiva.cliente.ema_cli
      if(!correo_cliente || correo_cliente === ""){
        this.showMessage('info', 'Advertencia', 'La proforma no tiene un correo de cliente');
        this.showbarEmail = false;
        return;
      }
      this.proformasService.getProforma(this.selectedProformaActiva.id_pro).subscribe(
            (_proforma: Proformas) => {
              // if(!_proforma.cliente_contacto || !_proforma.cliente_contacto.ema_cli_con || _proforma.cliente_contacto.ema_cli_con === ""){
              //   this.showMessage('info', 'Advertencia', 'La proforma no tiene un correo de contacto');
              //   this.showbarEmail = false;
              //   return;
              // }

              //----------------
              const documentDefinition = this.getDocumentDefinition(_proforma, 1);
              const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

              pdfDocGenerator.getBlob((pdf) => {
                  let formData = new FormData();
                  if(this.asunto && this.asunto !== ""){
                    formData.append("asunto", this.asunto);
                  }
                  formData.append("cc", this.authService.getusuarioJson().email);
                  if(this.mensaje && this.mensaje !== ""){
                    formData.append("mensaje", this.mensaje);
                  }
                  formData.append("destinatario", correo_cliente);
                  //formData.append("destinatario", "aflorespam@unsa.edu.pe");
                  formData.append("archivo", new File([pdf], "proforma.pdf"));
                  formData.append("tabla", "proforma");
                  formData.append("doc_referencia",_proforma.id_pro.toString());

                  this.emailService.sendEmail(formData).subscribe(
                      (_resp: any) => {
                          this.showMessage('success', 'Exito', 'Proforma enviada');
                          this.cancelEnviar();
                          this.getProformas();
                          this.showbarEmail = false;
                          //
                      },
                      (error) => {
                          console.log(error);
                          this.showbarEmail = false;
                      }
                  );
              });

          },
          (error) => {
              console.log("ocurrio un error");
              this.showbarEmail = false;
          }
      );
    }

    test(cant: number): string{
      let resp = "";
      if(cant){
        resp = this.gS.NumeroALetras(cant, 1);
      }
      return resp;
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }

    ///pdfs
    generarPdfProformaActiva(tipo: number) {
        if (this.selectedProformaActiva) {
            this.showbar = true;
            this.loadingPdf = true;
            this.proformasService.getProforma(this.selectedProformaActiva.id_pro).subscribe(
                (_proforma: Proformas) => {
                    console.log("proforma::", _proforma)
                    const documentDefinition = this.getDocumentDefinition(_proforma, tipo);
                    pdfMake.createPdf(documentDefinition).open();
                    this.showbar = false;
                    this.loadingPdf = false;
                },
                (error) => {
                    console.log("ocurrio un error");
                    this.showbar = false;
                    this.loadingPdf = false;
                }
            );
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una proforma');
        }
      }

      generarPdfProformaAnulada(tipo: number) {
        if (this.selectedProformaAnulada) {
            this.showbar = true;
            this.loadingPdf = true;
            this.proformasService.getProforma(this.selectedProformaAnulada.id_pro).subscribe(
                (_proforma: Proformas) => {
                    console.log("proforma::", _proforma)
                    const documentDefinition = this.getDocumentDefinition(_proforma, tipo);
                    pdfMake.createPdf(documentDefinition).open();
                    this.showbar = false;
                    this.loadingPdf = false;
                },
                (error) => {
                    console.log("ocurrio un error");
                    this.showbar = false;
                    this.loadingPdf = false;
                }
            );
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una proforma');
        }
      }
    
      getDocumentDefinition(proforma: Proformas, tipo: number) {
        return {
          content: [
            {
              columns: [
                {
                  image: 'data:image/' + this.authService.logo_ext + ';base64,' + this.authService.logo,
                  fit: [120, 120]
                },
                [
                  {
                    text: 'PROFORMA N° ' + proforma.prof_cod,
                    bold: true,
                    fontSize: 15,
                    alignment: 'right',
                    margin: [0, 20, 0, 0]
                  }
                ]
              ]
            },
            {
              columns: [
                {
                  text: "CLIENTE",
                  style: 'name',
                  margin: [0, 20, 0, 5],
                  fontSize: 12,
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Nombre',
                  width: '20%',
                  fontSize: 10,
                },
                {
                  text: (proforma.cliente) ? ': ' + proforma.cliente.razsoc_cli : ': ',
                  width: '55%',
                  fontSize: 10,
                },
                {
                  text: 'Fecha',
                  width: '10%',
                  fontSize: 10,
                },
                {
                  text: ': ' + moment(proforma.prof_fec).format("YYYY-MM-DD"),
                  width: '15%',
                  fontSize: 10,
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Ciudad',
                  width: '20%',
                  fontSize: 10,
                },
                {
                  text: (proforma.cliente_direccion) ? ': ' + proforma.cliente_direccion.ciu_cli : ': ',
                  width: '55%',
                  fontSize: 10,
                },
                {
                  text: 'Moneda',
                  width: '10%',
                  fontSize: 10,
                },
                {
                  text: (proforma.prof_mon) ? ': ' + (+proforma.prof_mon === 1 ? 'SOL' : 'DOLAR') : ': ',
                  width: '15%',
                  fontSize: 10,
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Direccion',
                  width: '20%',
                  fontSize: 10,
                },
                {
                  text: (proforma.cliente_direccion) ? ': ' + proforma.cliente_direccion.dir_cli : ': ',
                  width: '80%',
                  fontSize: 10,
                }
              ]
            },
            {
              columns: [
                  {
                      text: 'Documento',
                      width: '20%',
                      fontSize: 10,
                  },
                  {
                    text: (proforma.cliente && proforma.cliente.tipo_documento) ? ': ' + proforma.cliente.tipo_documento.des_tipdoc + ' - ' + proforma.cliente.numdoc_cli : ': ',
                    width: '80%',
                    fontSize: 10,
                  }
              ]
            },
            {
                columns: [
                    {
                        text: 'Contacto',
                        width: '20%',
                        fontSize: 10,
                    },
                    {
                        text: (proforma.cliente_contacto) ? ': ' + proforma.cliente_contacto.nom_cli_con : ': ',
                        width: '80%',
                        fontSize: 10,
                    }
                ]
            },
            {
              columns: [
                  {
                      text: "INTEGRADOR",
                      style: 'name',
                      fontSize: 12,
                      margin: [0, 20, 0, 5]
                  },
                  {
                      text: "PROYECTO",
                      style: 'name',
                      fontSize: 12,
                      margin: [0, 20, 0, 5]
                  }
              ]
            },
            {
              columns: [
                  {
                      text: (proforma.usuario) ? proforma.usuario.nom_col + ' ' + proforma.usuario.ape_col : ' ',
                      fontSize: 10,
                  },
                  {
                      text: ((proforma.proyecto) ? proforma.proyecto.ser_proy + proforma.proyecto.num_proy: '') + ' ' + ((proforma.proyecto) ? proforma.proyecto.nom_proy : ''),
                      fontSize: 10,
                  }
              ]
            },
            {
              text: "",
              style: 'name',
              margin: [0, 20, 0, 0]
            },
            // {
            //   table: this.getPdfDetalleTable(proforma,tipo),
            //   fontSize: (tipo === 1) ? 10 : 8,
            // },
            {
              table: {
                widths: (tipo === 1) ? ['*',30, 50, 40, 50, 36] : ['*',22,40, 32, 36, 40, 36, 40, 50, 30],
                body: this.getPdfDetalleTable(proforma,tipo),
                
              },
              fontSize: (tipo === 1) ? 7 : 7,
            },
            {
              text: "",
              style: 'name',
              margin: [0, 10, 0, 0]
            },
            {
              text: (proforma.prof_obs && proforma.prof_obs !== "") ? "OBSERVACIONES: " + proforma.prof_obs : '',
              margin: [0, 5, 0, 0]
            },
            {
              columns: [
                {
                    text: 'SON: ' + this.gS.NumeroALetras(+proforma.prof_neto.toFixed(2), +proforma.prof_mon),
                    //text: 'Son: Doscientos Cincuenta Dolares',
                    fontSize: 10,
                    margin: [0, 4, 0, 2]
                }
              ]
            },
            {
                columns: [
                    {
                        //text: "Forma de Pago: " + ((proforma.prof_cre) ? this.credito.find(unit => unit.value === proforma.prof_cre).label : ''),
                        text: "Forma de Pago: " + proforma.prof_con_pag,
                        //text: "Forma de Pago: CREDITO 30 DIAS",
                        fontSize: 10,
                        margin: [0, 0, 0, 5]
                    }
                ]
            },
            {
              columns: [
                [
                  {
                    table: {
                        widths: ['*',50],
                        body: [
                                [
                                    {
                                      text: 'Validez de la proforma'
                                    },
                                    {
                                      text: proforma.prof_val + ' dias'
                                    }
                                ],
                                [
                                  {
                                    text: 'Tiempo de instalacion'
                                  },
                                  {
                                    text: proforma.prof_tie_ins + ' dias'
                                  }
                                ],
                                [
                                  {
                                    text: 'Tiempo de entrega'
                                  },
                                  {
                                    text: proforma.prof_tie_ent + ' dias'
                                  }
                                ]
                        ]
                    },
                    fontSize: (tipo === 1) ? 9 : 8,
                    margin: [0, 0, 5, 0]
                  }
                ],
                [
                  {
                    table: {
                        widths: ['*',50],
                        body: [
                                [
                                    {
                                      text: 'Saldo a Financiar',
                                      bold: true
                                    },
                                    {
                                      text: ''
                                    }
                                ],
                                [
                                  {
                                    text: 'Factor'
                                  },
                                  {
                                    text: ( proforma.prof_fac) ? proforma.prof_fac.toFixed(2) + ' %' : proforma.prof_fac
                                  }
                                ],
                                [
                                  {
                                    text: 'Financiación'
                                  },
                                  {
                                    text: (proforma.prof_finan) ? proforma.prof_finan.toFixed(2) : proforma.prof_finan
                                  }
                                ],
                                [
                                  {
                                    text: 'Valor Cuota'
                                  },
                                  {
                                    text: (proforma.prof_val_cuo) ? proforma.prof_val_cuo.toFixed(2) : proforma.prof_val_cuo
                                  }
                                ]
                        ]
                    },
                    fontSize: (tipo === 1) ? 9 : 8,
                    margin: [5, 0, 5, 0]
                  },
                ],
                [
                  {
                    table: {
                        widths: ['*',80],
                        body: this.getCosteEspecial(proforma)
                    },
                    fontSize: (tipo === 1) ? 9 : 8,
                    margin: [5, 0, 0, 0]
                  },
                ]
              ]
            },
          ],
          pageSize: 'A4',
          //pageOrientation: 'landscape',
          info: {
            title:"proforma.pdf",
            author: "NETWORK CONTROL",
    
          },
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 20, 0, 10],
              decoration: 'underline'
            },
            name: {
              fontSize: 14,
              bold: true
            },
            jobTitle: {
              fontSize: 14,
              bold: true,
              italics: true
            },
            sign: {
              margin: [0, 50, 0, 10],
              alignment: 'right',
              italics: true
            },
            tableHeader: {
              bold: true,
              fillColor: "#B2BABB"
            }
          }
        };
      }

    getPdfDetalleTable(proforma: Proformas, tipo: number){
        if(tipo === 1) {
          var body = [];
          let header = [
           
            {
              text: 'DESCRIPCION',
              style: 'tableHeader'
            },
            {
              text: 'UND',
              style: 'tableHeader'
            },
            {
              text: 'CANTIDAD',
              style: 'tableHeader'
            },
            {
              text: 'PRECIO LISTA',
              style: 'tableHeader'
            },
            {
                text: 'IMPORTE',
                style: 'tableHeader'
            },
            {
                text: 'STOCK',
                style: 'tableHeader'
            }
          ];
          body.push(header);
          
          proforma.proforma_detalle.sort(function(a, b){
            return (+a.id_sec) - (+b.id_sec)
          });
          proforma.proforma_detalle.forEach((detalle) => {
            let find_seccion = this.secciones.find(unit => unit.id_sec === detalle.id_sec);
            detalle.sec_des = (find_seccion) ? find_seccion.des_sec : null;
          });

          let _prof_detalle : ProformasDetalle[] = [];
          _prof_detalle.push.apply(_prof_detalle, proforma.proforma_detalle.filter(unit => unit.sec_des === null))
          _prof_detalle.push.apply(_prof_detalle, proforma.proforma_detalle.filter(unit => unit.sec_des && !unit.sec_des.toUpperCase().includes("INDIRECT")))
          _prof_detalle.push.apply(_prof_detalle, proforma.proforma_detalle.filter(unit => unit.sec_des && unit.sec_des.toUpperCase().includes("INDIREC")))


          let seccion_temp = null;
          _prof_detalle.forEach((detalle) => {
            if (detalle.id_sec !== seccion_temp){
              seccion_temp = detalle.id_sec;
              let find_seccion = this.secciones.find(unit => unit.id_sec === detalle.id_sec);
              let desc_seccion = (find_seccion) ? find_seccion.des_sec : '';

              body.push([{colSpan: 6, alignment: 'center', text: desc_seccion}, '','','','','']);
            }

            var dataRow = [
              //{ text: (detalle.prof_prod_serv === 1) ? 'Producto' : 'Servicio' },
              { text: detalle.prof_des_prod },
              { text: (detalle.prof_prod_serv === 1 && detalle.producto && detalle.producto.unidad_medida) ? detalle.producto.unidad_medida.nom_unimed : '' },
              { text: detalle.prof_det_can },
              { text: (detalle.prof_det_pre_lis) ? detalle.prof_det_pre_lis.toFixed(2) : detalle.prof_det_pre_lis },
              { text: (detalle.prof_det_imp) ? detalle.prof_det_imp.toFixed(2) : detalle.prof_det_imp },
              { text: (detalle.prof_prod_serv === 1 && detalle.prof_det_stock) ? detalle.prof_det_stock : 'STOCK' },
              ];
              
              body.push(dataRow);
          });
          return body;

        } else {
          var body = [];
          let header = [
            
            {
              text: 'DESCRIPCION',
              style: 'tableHeader'
            },
            {
              text: 'UND',
              style: 'tableHeader'
            },
            {
              text: 'CANTIDAD',
              style: 'tableHeader'
            },
            {
                text: 'COSTO',
                style: 'tableHeader'
            },
            {
                text: 'TCOSTO',
                style: 'tableHeader'
            },
            {
                text: 'COMISION %',
                style: 'tableHeader'
            },
            {
              text: 'PRECIO LISTA',
              style: 'tableHeader'
            },
            {
                text: 'IMPORTE',
                style: 'tableHeader'
            },
            {
                text: 'PROVEEDOR',
                style: 'tableHeader'
            },
            {
                text: 'STOCK',
                style: 'tableHeader'
            }
          ];
          body.push(header);

          proforma.proforma_detalle.sort(function(a, b){
            return (+a.id_sec) - (+b.id_sec)
          });
          proforma.proforma_detalle.forEach((detalle) => {
            let find_seccion = this.secciones.find(unit => unit.id_sec === detalle.id_sec);
            detalle.sec_des = (find_seccion) ? find_seccion.des_sec : null;
          });

          let _prof_detalle : ProformasDetalle[] = [];
          _prof_detalle.push.apply(_prof_detalle, proforma.proforma_detalle.filter(unit => unit.sec_des === null))
          _prof_detalle.push.apply(_prof_detalle, proforma.proforma_detalle.filter(unit => unit.sec_des && !unit.sec_des.toUpperCase().includes("INDIRECT")))
          _prof_detalle.push.apply(_prof_detalle, proforma.proforma_detalle.filter(unit => unit.sec_des && unit.sec_des.toUpperCase().includes("INDIREC")))

          
          let seccion_temp = null;
          _prof_detalle.forEach((detalle) => {
            if (detalle.id_sec !== seccion_temp){
              seccion_temp = detalle.id_sec;
              let find_seccion = this.secciones.find(unit => unit.id_sec === detalle.id_sec);
              let desc_seccion = (find_seccion) ? find_seccion.des_sec : '';
              body.push([{colSpan: 10, alignment: 'center',  text: desc_seccion}, '','','','','','','','','']);
            }

            var dataRow = [
              //{ text: (detalle.prof_prod_serv === 1) ? 'Producto' : 'Servicio' }, 
              { text: detalle.prof_des_prod },
              { text: (detalle.prof_prod_serv === 1 && detalle.producto && detalle.producto.unidad_medida) ? detalle.producto.unidad_medida.nom_unimed : '' },
              { text: detalle.prof_det_can },
              { text: (detalle.prof_det_cos) ? detalle.prof_det_cos.toFixed(2) : detalle.prof_det_cos },
              { text: (detalle.prof_det_tcos) ? detalle.prof_det_tcos.toFixed(2) : detalle.prof_det_tcos },
              { text: (detalle.prof_det_com) ? detalle.prof_det_com.toFixed(2) : detalle.prof_det_com },
              { text: (detalle.prof_det_pre_lis) ? detalle.prof_det_pre_lis.toFixed(2) : detalle.prof_det_pre_lis },
              { text: (detalle.prof_det_imp) ? detalle.prof_det_imp.toFixed(2) : detalle.prof_det_imp },
              { text: (detalle.prof_prod_serv === 1 && detalle.proveedor) ? detalle.proveedor.razsoc_prov : '' },
              { text: (detalle.prof_prod_serv === 1 && detalle.prof_det_stock) ? detalle.prof_det_stock : 'STOCK' },
            ];
              
              body.push(dataRow);
          });
          return body;
        }
    }

    getCosteEspecial(proforma: Proformas){
      if(proforma.prof_desc && proforma.prof_desc !== 0){
        return [
          [
              {
                text: 'Costo Directo',
              },
              {
                text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_cos_dir.toFixed(2), alignment: 'right'
              }
          ],
          /*[
            {
              text: 'Gastos Indirectos'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_gas_ind.toFixed(2), alignment: 'right'
            }
          ],*/
          [
            {
              text: 'Utilidad "' + proforma.prof_uti + '" %'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + ((proforma.prof_uti/100) * proforma.prof_cos_dir).toFixed(2), alignment: 'right'
            }
          ],
          [
            {
              text: 'Descuento ' + proforma.prof_desc.toFixed(2) + '%'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + ((proforma.prof_cos_dir * proforma.prof_desc)/100).toFixed(2), alignment: 'right'
            }
          ],
          [
            {
              text: 'Costo Especial'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + (proforma.prof_cos_dir - ((proforma.prof_cos_dir * proforma.prof_desc)/100)).toFixed(2), color: "#FF3E3E", bold: true, alignment: 'right'
            }
          ],
          [
            {
              text: 'I.G.V. 18%'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_igv.toFixed(2), alignment: 'right'
            }
          ],
          [
            {
              text: 'Neto a Pagar'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_neto.toFixed(2), alignment: 'right'
            }
          ]
        ]
      } else {
        return [
          [
              {
                text: 'Costo Directo',
              },
              {
                text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_cos_dir.toFixed(2), alignment: 'right'
              }
          ],
        /*  [
            {
              text: 'Gastos Indirectos'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_gas_ind.toFixed(2), alignment: 'right'
            }
          ], */
          [
            {
              text: 'Utilidad "' + proforma.prof_uti + '" %'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + ((proforma.prof_uti/100) * proforma.prof_cos_dir).toFixed(2), alignment: 'right'
            }
          ],
          [
            {
              text: 'Base Imponible'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_bas_imp.toFixed(2), alignment: 'right'
            }
          ],
          [
            {
              text: 'I.G.V. 18%'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_igv.toFixed(2), alignment: 'right'
            }
          ],
          [
            {
              text: 'Neto a Pagar'
            },
            {
              text: (proforma.prof_mon ? (+proforma.prof_mon === 1 ? 'S/' : 'USD') : '') + '\t' + proforma.prof_neto.toFixed(2), alignment: 'right'
            }
          ]
        ] 
      }
    }
    
}


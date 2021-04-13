import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CotizacionesService } from "@app/cotizaciones-cli/data/services/cotizaciones.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cotizacion, CotizacionJSON } from '@app/cotizaciones-cli/data/models/cotizacion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { CotizacionDetalle } from '@app/cotizaciones-cli/data/models/cotizacion-detalle.model';




import * as moment from 'moment';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '@app/_general/services/auth.service';

//declare let pdfMake: any ;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-cotizaciones',
    templateUrl: './cotizaciones.component.html',
    styleUrls: ['./cotizaciones.component.scss']
})

export class CotizacionesComponent implements OnInit {


    

    //cotizaciones activas
    cotizacionesActivas: Cotizacion[] = [];
    selectedCotizacionActiva: Cotizacion;
    totalActivas: number;
    loadingActivas: boolean = false;
    //
    cotizacionesAnuladas: Cotizacion[] = [];
    selectedCotizacionAnulada: Cotizacion;
    totalAnuladas: number;
    loadingAnuladas: boolean = false;

    showbar: boolean = false;
    rowsNumber: number = 10;

    idsend: number = 0;

    pdfSrc = "";
    //pdfSrc : any;
    displayPdfModal: boolean = false;

    //pdf: PdfMakeWrapper;
    dialogTitle: string = "";
    loadingPdf: boolean = false;

    constructor(
       
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cotizacionesService: CotizacionesService,
        private router: Router,
        private authService: AuthService,
        public activatedroute: ActivatedRoute,
        public gS: GeneralService
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        // this.getProyectosProceso();
        // this.getProyectosTerminados();

        this.getCotizaciones();

    }
    

    //cotizaciones
    getCotizaciones() {
        this.loadingActivas = true;
        this.cotizacionesService.getCotizaciones(null).subscribe(
            (_cotizaciones: GeneralCollection<Cotizacion>) => {
                this.separarCotizaciones(_cotizaciones['data']);
                this.loadingActivas = false;
                // this.cotizacionesActivas = _cotizaciones['data'];
                // this.totalActivas = _cotizaciones['size'];
                console.log("DOCS:: ", _cotizaciones)
            },
            (error) => {
                this.loadingActivas = false;
                console.log("ocurrio un error");
            }
        );
    }

    separarCotizaciones(cotizaciones: Cotizacion[]) {
        this.cotizacionesActivas = [];
        this.cotizacionesAnuladas = [];
        cotizaciones.map((cotizacion: Cotizacion) => {
            if (cotizacion.est_reg === "A") {
                this.cotizacionesActivas.push(cotizacion);
            } else {
                this.cotizacionesAnuladas.push(cotizacion);
            }
        });
        this.totalActivas = this.cotizacionesActivas.length
        this.totalAnuladas = this.cotizacionesAnuladas.length
    }

     
    

    crear() {
        this.router.navigate(["/cotizaciones-cli/form/new"]);
    }

    // ---------------- EDITAR ---------------------------------

    editar() {
        if(this.selectedCotizacionActiva) {
            this.router.navigate(["/cotizaciones-cli/form/mod " + this.selectedCotizacionActiva.solcli_id]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }
    }

    cotizarProveedor() {
        if (this.selectedCotizacionActiva) {
            this.showbar = true;
            this.router.navigate(["/cotizaciones-prov/form/new-cli", {solCli: this.selectedCotizacionActiva.solcli_id}]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }
    }

    cotizarProforma() {
        if (this.selectedCotizacionActiva) {
            this.showbar = true;
            this.router.navigate(["/proforma/form/" + this.selectedCotizacionActiva.solcli_id]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }
    }

    /*abrirProforma() {
        if(this.selectedCotizacionActiva) {            
            this.router.navigate(["/proformas/form/new"]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }
        
    }*/

    anular() {
        if (this.selectedCotizacionActiva) {
            this.confirmationService.confirm({
                message: '¿Quieres anular esta cotizacion?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'anularCotizacion',
                accept: () => {
                    this.showbar = true;
                    this.cotizacionesService.anularCotizacion(this.selectedCotizacionActiva.solcli_id).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Cotizacion anulada');
                            this.getCotizaciones();
                            this.selectedCotizacionActiva = null;
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
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }
    }

    

    generarPdfCotizacionActiva() {
        if (this.selectedCotizacionActiva) {
            this.showbar = true;
            this.loadingPdf = true;
            this.cotizacionesService.getCotizacion(this.selectedCotizacionActiva.solcli_id).subscribe(
                (_cotizacionJSON: CotizacionJSON) => {
                    
                    const documentDefinition = this.getDocumentDefinition(_cotizacionJSON);
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
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }

    }

    generarPdfCotizacionAnulada() {

        if (this.selectedCotizacionAnulada) {
            this.showbar = true;
            this.loadingPdf = true;
            this.cotizacionesService.getCotizacion(this.selectedCotizacionAnulada.solcli_id).subscribe(
                (_cotizacionJSON: CotizacionJSON) => {

                    const documentDefinition = this.getDocumentDefinition(_cotizacionJSON);
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
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }

    }

    // async makePdf(cotizacion: Cotizacion, ext: string, logo: string) {
        
    // }

    downloadPdf() {
        //this.pdf.create().download(this.dialogTitle);
    }

    cancel() {
        this.displayPdfModal = false;
    }

    getDocumentDefinition(_cotizacionJSON: CotizacionJSON) {
        return {
            content: [
                {
                    columns: [
                        {
                            image: 'data:image/' + _cotizacionJSON.extension + ';base64,' + _cotizacionJSON.logo,
                            fit: [120, 120],
                            width: '40%',
                        },
                        [
                          {
                            text: 'SOLICITUD N°: ' + _cotizacionJSON.cotizacion.solcli_cod,
                            bold: true,
                            fontSize: 12,
                            alignment: 'right',
                            margin: [0, 20, 0, 0],
                            width: '60%',
                          }
                        ]
                    ]
                },
                {
                    text: "",
                    style: 'name',
                    margin: [0, 20, 0, 0]
                },
                {
                    columns: [
                      {
                        stack: [
                          this.authService.getEmpresaJson().dir_emp,
                          this.authService.getEmpresaJson().dis_emp,
                          this.authService.getEmpresaJson().ciu_emp + ' 054',
                          'tel: 054- ' + this.authService.getEmpresaJson().tel_emp,
                          'mob: ' + this.authService.getEmpresaJson().cel_emp,
                          { text: 'RUC: ' + this.authService.getEmpresaJson().numdoc_emp, bold: true, fontSize: 11 },
                          {
                            text: "Cliente: ",
                            style: 'name',
                            margin: [0, 8, 0, 0],
                            fontSize: 12
                          },
                          { text: 'Nombre' + ': ' +  _cotizacionJSON.cotizacion.solcli_cli_nom },
                          { text: 'Direccion' + ': ' + _cotizacionJSON.cotizacion.solcli_cli_dir },
                          { text: (_cotizacionJSON.cotizacion.solcli_cli_tipdoc) ? 'Tipo Documento: ' + _cotizacionJSON.cotizacion.solcli_cli_tipdoc : 'Tipo Documento: ' },
                          { text: (_cotizacionJSON.cotizacion.solcli_cli_numdoc) ? 'Nro. Documento: ' + _cotizacionJSON.cotizacion.solcli_cli_numdoc : 'Nro. Documento: ' },
                          { text: (_cotizacionJSON.cotizacion.solcli_cli_con) ? 'Contacto: ' + _cotizacionJSON.cotizacion.solcli_cli_con : 'Contacto: ' },
                        ],
                        fontSize: 10
                      },
                      {
                        width: '20%',
                        table: {
                          widths: ['*'],
                          body: [
                            [
                              {
                                stack: [
                                  { text: 'Fecha:', bold: true },
                                  moment(_cotizacionJSON.cotizacion.solcli_fec).format("DD/MM/YYYY"),
                                ]
                              }
                            ],
                            [
                              {
                                stack: [
                                  { text: 'Integrador:', bold: true },
                                  { text: _cotizacionJSON.cotizacion.solcli_col_nom, color: '#FF3E3E', bold: true }
                                ]
                              }
                            ],
                            [
                              {
                                stack: [
                                  { text: 'Proyecto:', bold: true },
                                  { text:((_cotizacionJSON.cotizacion.solcli_proy_cod) ? _cotizacionJSON.cotizacion.solcli_proy_cod : '') + ' ' + ((_cotizacionJSON.cotizacion.solcli_proy_nom) ? _cotizacionJSON.cotizacion.solcli_proy_nom : ''), color: '#0052DA', }
                                ]
                              }
                            ]
                          ]
                        },
                        fontSize: 8,
                      }
                    ]
                },
                {
                    text: "",
                    style: 'name',
                    margin: [0, 20, 0, 0]
                },
                {
                    table: this.getPdfDetalleTable(_cotizacionJSON.cotizacion),
                    fontSize: 8,
                }
            ],
            info: {
                title: _cotizacionJSON.cotizacion.solcli_cod + ".pdf",
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
                    fontSize: 16,
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

    getPdfDetalleTable(cotizacion: Cotizacion) {
        return {
            widths: [40, 50, 60, '*', 50],
            body: [
              [
                {
                    text: 'TIPO',
                    style: 'tableHeader'
                },
                {
                    text: 'CANTIDAD',
                    style: 'tableHeader'
                },
                {
                    text: 'CODIGO',
                    style: 'tableHeader'
                },
                {
                    text: 'DESCRIPCION',
                    style: 'tableHeader'
                },
                {
                    text: 'MARCA',
                    style: 'tableHeader'
                }
              ],
              ...cotizacion.cotizacion_detalle.map(detalle => {
                return [
                  { text: (detalle.solclidet_prod_serv === 1) ? 'Producto' : 'Servicio' },
                  { text: detalle.solclidet_prod_can },
                  { text: detalle.solclidet_prod_codint },
                  { text: detalle.solclidet_des },
                  { text: detalle.solclidet_prod_marc }
                ]
              })
            ]
        }
      }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }

}

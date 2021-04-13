import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CotizacionesProvService } from "@app/cotizaciones-prov/data/services/cotizaciones.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cotizacion, CotizacionJSON } from '@app/cotizaciones-prov/data/models/cotizacion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_general/services/auth.service';
import { GeneralService } from '@app/_general/services/general.service';
import { EmailService } from '@app/_general/services/email.service';
import { ProveedorService } from "@app/proveedores/data/services/proveedor.service";
import { CotizacionProvDetalle } from '@app/cotizaciones-prov/data/models/cotizacion-detalle.model';
import { Mensaje } from '@app/cotizaciones-prov/data/models/mensaje.model';
import * as moment from 'moment';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-cotizaciones',
    templateUrl: './cotizaciones.component.html',
    styleUrls: ['./cotizaciones.component.scss']
})

export class CotizacionesProvComponent implements OnInit {

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

    userName: string = "";
    asunto: string = "Cotización";
    mensaje: string = "Estimados  Sres...  Adjuntamos Cotización, Presupuesto Solicitado";
    destinatario: string = "";
    proveedor: Proveedor;

    pdfSrc = "";
    displayPdfModal: boolean = false;
    displayModalEnviar: boolean = false;

    dialogTitle: string = "";
    loadingPdf: boolean = false;
    showbarEmail: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cotizacionesService: CotizacionesProvService,
        private proveedorService: ProveedorService,
        private emailService: EmailService,
        private router: Router,
        private authService: AuthService,
        public activatedroute: ActivatedRoute,
        public gS: GeneralService
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.userName = this.authService.getusuarioJson().nom_col;
        this.getCotizaciones();
    }

    //cotizaciones
    getCotizaciones() {
        this.loadingActivas = true;
        this.cotizacionesService.getCotizaciones(null).subscribe(
            (_cotizaciones: GeneralCollection<Cotizacion>) => {
                this.separarCotizaciones(_cotizaciones['data']);
                this.loadingActivas = false;
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
        this.router.navigate(["/cotizaciones-prov/form/new"]);
    }

    anular() {
        if (this.selectedCotizacionActiva) {
            this.confirmationService.confirm({
                message: '¿Quieres anular esta cotizacion?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'anularCotizacion',
                accept: () => {
                    this.showbar = true;
                    this.cotizacionesService.anularCotizacion(this.selectedCotizacionActiva.cotprov_id).subscribe(
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

    getDestinatario() {
        this.destinatario = this.selectedCotizacionActiva.cotprov_ema;
        if (!this.destinatario) {
            this.proveedorService.getProveed(this.selectedCotizacionActiva.id_prov).subscribe(
                (_proveedor: Proveedor) => {
                    this.proveedor = _proveedor;
                    console.log("provee: ", this.proveedor);
                    (this.proveedor.ema_prov) ? this.destinatario = this.proveedor.ema_prov : this.destinatario = "";
                    console.log("destinatario: ", this.destinatario);
                },
                (error) => {
                }
            );
        }
    }

    enviarPDF() {
        this.showbarEmail = true;
        this.cotizacionesService.getCotizacion(this.selectedCotizacionActiva.cotprov_id).subscribe(
            (_cotizacionJSON: CotizacionJSON) => {
                //----------------
                const documentDefinition = this.getDocumentDefinition(_cotizacionJSON);
                const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

                let msj = new Mensaje();
                msj.asunto = this.asunto;
                msj.cc = this.authService.getusuarioJson().email;
                msj.mensaje = this.mensaje;
                msj.destinatario = this.destinatario;
                msj.tabla = "cot-prov";
                msj.doc_referencia = "" + this.selectedCotizacionActiva.cotprov_id;
                console.log("msj: ", msj);
                if (!this.validDestino) {
                    this.showMessage('warn', 'Advertencia', 'Falta correo de destino');
                    this.showbarEmail = false;
                    return;
                } else {
                    pdfDocGenerator.getBlob((pdf) => {
                        let formData = new FormData();
                        formData.append("asunto", msj.asunto);
                        formData.append("cc", msj.cc);
                        formData.append("mensaje", msj.mensaje);
                        formData.append("destinatario", msj.destinatario);
                        formData.append("archivo", new File([pdf], "cotizacion.pdf"));
                        formData.append("tabla", msj.tabla);
                        formData.append("doc_referencia", msj.doc_referencia);

                        this.emailService.sendEmail(formData).subscribe(
                            (_resp: any) => {
                                this.showMessage('success', 'Exito', 'Cotizacion enviada');
                                this.cancelEnviar();
                                this.getCotizaciones();
                                this.showbarEmail = false;
                            },
                            (error) => {
                                console.log(error);
                                this.showbarEmail = false;
                            }
                        );
                    });
                }
            },
            (error) => {
                console.log("ocurrio un error");
                this.showbarEmail = false;
            }
        );
    }

    nuevoEnviar() {
        if (this.selectedCotizacionActiva) {
            this.getDestinatario();
            this.displayModalEnviar = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una Cotización');
        }
    }

    cancelEnviar() {
        this.asunto = "Cotización";
        this.mensaje = "Estimados  Sres..  adjuntamos Cotización, Presupuesto Solicitado";
        this.displayModalEnviar = false;
    }

    generarPdfCotizacionActiva() {
        if (this.selectedCotizacionActiva) {
            this.showbar = true;
            this.loadingPdf = true;
            this.cotizacionesService.getCotizacion(this.selectedCotizacionActiva.cotprov_id).subscribe(
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
            this.cotizacionesService.getCotizacion(this.selectedCotizacionAnulada.cotprov_id).subscribe(
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

    cancel() {
        this.displayPdfModal = false;
    }

    generarOrdenCompra() {
        if (this.selectedCotizacionActiva) {
            this.showbar = true;
            this.router.navigate(["/orden/form/" + this.selectedCotizacionActiva.cotprov_id]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
        }
    }

    getDocumentDefinition(_cotizacionJSON: CotizacionJSON) {
        return {
            content: [
                {
                    columns: [
                        {
                            image: 'data:image/' + this.authService.logo_ext + ';base64,' + this.authService.logo,
                            fit: [120, 120],
                            width: '40%',
                        },
                        [
                            {
                                text: 'COTIZACIÓN N°: ' + _cotizacionJSON.cotizacion.cotprov_cod,
                                bold: true,
                                fontSize: 12,
                                alignment: 'right',
                                margin: [0, 20, 0, 0],
                                width: '60%'
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
                                    text: "Emitido para: ",
                                    style: 'name',
                                    margin: [0, 8, 0, 0],
                                    fontSize: 12
                                },
                                { text: (_cotizacionJSON.cotizacion.cotprov_razsoc) ? _cotizacionJSON.cotizacion.cotprov_razsoc : '', color: '#0086DD' },
                                { text: _cotizacionJSON.cotizacion.cotprov_dir, color: '#0086DD' },
                                { text: (_cotizacionJSON.cotizacion.cotprov_ema && _cotizacionJSON.cotizacion.cotprov_ema !== "") ? _cotizacionJSON.cotizacion.cotprov_ema : '', color: '#0052DA', style: 'email' },
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
                                                moment(_cotizacionJSON.cotizacion.cotprov_fec).format("DD/MM/YYYY"),
                                            ]
                                        }
                                    ],
                                    [
                                        {
                                            stack: [
                                                { text: 'A la atencion de:', bold: true },
                                                { text: _cotizacionJSON.cotizacion.cotprov_col_nom, color: '#FF3E3E', bold: true }
                                            ]
                                        }
                                    ],
                                    [
                                        {
                                            stack: [
                                                { text: 'Email:', bold: true },
                                                { text: _cotizacionJSON.cotizacion.cotprov_ema, color: '#0052DA', style: 'email' }
                                            ]
                                        }
                                    ]
                                ]
                            },
                            fontSize: 10,
                        }
                    ]
                },
                {
                    text: "",
                    style: 'name',
                    margin: [0, 20, 0, 0]
                },
                {
                    table: {
                        widths: [40, 40, 50, '*', 30, 30],
                        body: [
                            [
                                {
                                    text: 'CODIGO NTWC',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'N° PARTE',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'FABRICANTE',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'DESCRIPCION',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'UNIDAD',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'CANT.',
                                    style: 'tableHeader'
                                }
                            ],
                            ..._cotizacionJSON.cotizacion.cotizacion_detalle.map(detalle => {
                                return [
                                    detalle.cotprovdet_prod_codint,
                                    detalle.cotprovdet_prod_numpar,
                                    detalle.cotprovdet_prod_fabr,
                                    detalle.cotprovdet_desc,
                                    detalle.cotprovdet_prod_unimed,
                                    detalle.cotprovdet_cant
                                ]
                            })
                        ]
                    },
                    fontSize: 8,
                },
                {
                    text: "",
                    style: 'name',
                    margin: [0, 10, 0, 0]
                },
                { text: 'Atentamente,', margin: [0, 10, 0, 0], bold: true, italics: true, fontSize: 10 },
                {
                    text: "",
                    style: 'name',
                    margin: [0, 10, 0, 0]
                },
                this.getFirma()
            ],
            pageSize: 'A4',
            info: {
                title: "cotizacion_de_proveedor.pdf",
                author: "NETWORK CONTROL",

            },
            styles: {
                header: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 0, 0, 5],
                },
                email: {
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

    getFirma() {
        if (this.authService.getusuarioJson().firma) {
            let firma = {
                image: 'data:image/' + 'jpeg' + ';base64,' + this.authService.getusuarioJson().firma,
                fit: [100, 100],
                margin: [20, 10, 0, 0],
            };
            return firma;
        } else {
            return {};
        }
    }

    get validDestino(): boolean {
        return this.destinatario !== "";
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }

}

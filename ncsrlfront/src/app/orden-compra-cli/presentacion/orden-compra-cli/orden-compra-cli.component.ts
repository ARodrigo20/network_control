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
import { OrdenCompraCliService } from '@app/orden-compra-cli/data/services/orden-compra-cli.service';
import { OrdenCompraCli } from '@app/orden-compra-cli/data/models/orden-compra-cli.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare let pdfMake: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-orden-compra-cli',
    templateUrl: './orden-compra-cli.component.html',
    styleUrls: ['./orden-compra-cli.component.scss']
})

export class OrdenCompraCliComponent implements OnInit {


  //ordenes activas
  ordenesActivas: OrdenCompraCli[] = [];
  selectedOrdenActiva: OrdenCompraCli;
  totalActivas: number;
  loadingActivas: boolean = false;
  //ordenes anuladas
  ordenesAnuladas: OrdenCompraCli[] = [];
  selectedOrdenAnulada: OrdenCompraCli;
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
  asunto: string = "Orden de Compra";
  mensaje: string = "";

  showbarEmail: boolean = false;

  prueba: number = 0;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ordenCompraService: OrdenCompraCliService,
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
    this.getOrdenes();
    this.userName = this.authService.getusuarioJson().nom_col;
  }

  //proformas
  getOrdenes() {
    this.loadingActivas = true;
    this.ordenCompraService.getOrdenes(null).subscribe(
      (_ordenes: GeneralCollection<OrdenCompraCli>) => {
        this.separarOrdenes(_ordenes['data']);
        this.loadingActivas = false;
        console.log("DOCS:: ", _ordenes)
      },
      (error) => {
        this.loadingActivas = false;
        console.log("ocurrio un error");
      }
    );
  }

  separarOrdenes(ordenes: OrdenCompraCli[]) {
    this.ordenesActivas = [];
    this.ordenesAnuladas = [];
    ordenes.map((orden: OrdenCompraCli) => {
      // this.ordenesActivas.push(orden);
      if (orden.est_reg === "A") {
        this.ordenesActivas.push(orden);
      } else {
        this.ordenesAnuladas.push(orden);
      }
    });
    this.totalActivas = this.ordenesActivas.length
    this.totalAnuladas = this.ordenesAnuladas.length

  }

  crear() {
    this.router.navigate(["/ordenCompraCli/form/new"]);
  }

  editar(){
    if(this.selectedOrdenActiva) {
      //this.router.navigate(["/cotizaciones-cli/form/new"]);
      this.router.navigate(["/ordenCompraCli/form/mod" + this.selectedOrdenActiva.id_ord_com]);
      //this.formMode = false;
      //this.setForm(this.selectedCotizacionActiva);
      //this.titlePanel = "Actualizar Colaborador";
      //this.submitLabel = "Actualizar"
      //this.displayModal = true;
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione una orden de compra');
    }
  }

  guiaRemision() {
    if (this.selectedOrdenActiva) {
        this.showbar = true;
        this.router.navigate(["/guia-remision/form/" + this.selectedOrdenActiva.id_ord_com]);
    } else {
        this.showMessage('info', 'Informacion', 'Seleccione una orden de compra');
    }
  }

  anular() {
    if (this.selectedOrdenActiva) {
      this.confirmationService.confirm({
        message: '¿Quieres anular esta orden de compra?',
        header: 'Confirmacion',
        icon: 'pi pi-info-circle',
        key: 'anularOrden',
        accept: () => {
          this.showbar = true;
          this.ordenCompraService.anularOrdenCompra(this.selectedOrdenActiva.id_ord_com).subscribe(
            (_resp) => {
              this.showMessage('success', 'Exito', 'Orden anulada');
              this.getOrdenes();
              this.selectedOrdenActiva = null;
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
      this.showMessage('info', 'Informacion', 'Seleccione una orden');
    }
  }

  enviarCorreo() {
    if (this.selectedOrdenActiva) {
        this.displayModalEnviar = true;
        
    } else {
        this.showMessage('info', 'Informacion', 'Seleccione una Proforma');
    }
  }

  cancelEnviar() {
    this.asunto = "Orden de Compra";
    this.mensaje = "";
    this.displayModalEnviar = false;
  }

  enviarPDF() {
    this.showbarEmail = true;
    //MODIFICACDO
    let correo_proveedor = (this.selectedOrdenActiva && this.selectedOrdenActiva.ord_com_prov_ema) ? this.selectedOrdenActiva.ord_com_prov_ema : this.selectedOrdenActiva.cliente.ema_cli
    if(!correo_proveedor || correo_proveedor === ""){
      this.showMessage('info', 'Advertencia', 'La orden no tiene un correo de contacto');
      this.showbarEmail = false;
      return;
    }
    this.ordenCompraService.getOrden(this.selectedOrdenActiva.id_ord_com).subscribe(
          (_orden: OrdenCompraCli) => {

            //----------------
            const documentDefinition = this.getDocumentDefinition(_orden, 1);
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
                formData.append("destinatario", correo_proveedor);
                //formData.append("destinatario", "aflorespam@unsa.edu.pe");
                formData.append("archivo", new File([pdf], "orden_compra.pdf"));
                formData.append("tabla", "orden");
                formData.append("doc_referencia",_orden.id_ord_com.toString());

                this.emailService.sendEmail(formData).subscribe(
                    (_resp: any) => {
                        this.showMessage('success', 'Exito', 'Orden de Compra enviada');
                        this.cancelEnviar();
                        this.getOrdenes();
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

  test(cant: number): string {
    let resp = "";
    if (cant) {
      resp = this.gS.NumeroALetras(cant, 1);
    }
    return resp;
  }

  //mensajes 
  showMessage(_severity: string, _summary: string, _detail: string) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
  }

  ///pdfs
  generarPdfOrdenActiva(tipo: number) {
    if (this.selectedOrdenActiva) {
      this.showbar = true;
      this.loadingPdf = true;
      this.ordenCompraService.getOrden(this.selectedOrdenActiva.id_ord_com).subscribe(
        (_orden: OrdenCompraCli) => {
          console.log("ORDEN::", _orden)
          const documentDefinition = this.getDocumentDefinition(_orden, tipo);
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
      this.showMessage('info', 'Informacion', 'Seleccione una orden');
    }
  }

  generarPdfOrdenAnulada(tipo: number) {
    if (this.selectedOrdenAnulada) {
      this.showbar = true;
      this.loadingPdf = true;
      this.ordenCompraService.getOrden(this.selectedOrdenAnulada.id_ord_com).subscribe(
        (_orden: OrdenCompraCli) => {
          const documentDefinition = this.getDocumentDefinition(_orden, tipo);
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
      this.showMessage('info', 'Informacion', 'Seleccione una orden');
    }
  }

  generarFactura() {
    if(this.selectedOrdenActiva) {
      this.router.navigate(["/facturas/form/" + this.selectedOrdenActiva.id_ord_com]);
    } else {
        this.showMessage('info', 'Informacion', 'Seleccione una cotizacion');
    }
  }

  getDocumentDefinition(orden: OrdenCompraCli, tipo: number) {
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
                text: 'ORDEN DE COMPRA N# ' + orden.ord_com_cod,
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
                  text: "Emitido para: ",
                  style: 'name',
                  margin: [0, 8, 0, 0],
                  fontSize: 12
                },

                //MODIFICANDO
                { text: (orden.cliente) ? orden.cliente.razsoc_cli : '', color: '#0086DD' },
                { text: orden.ord_com_prov_dir, color: '#0086DD' },
                { text: (orden.ord_com_prov_ema && orden.ord_com_prov_ema !== "") ? orden.ord_com_prov_ema : orden.cliente.ema_cli, color: '#0052DA', style: 'email' },
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
                        moment(orden.ord_com_fec).format("DD/MM/YYYY"),
                      ]
                    }
                  ],
                  [
                    {
                      stack: [
                        { text: 'A la atencion de:', bold: true },
                        { text: orden.usuario.nom_col + ' ' + orden.usuario.ape_col, color: '#FF3E3E', bold: true }
                      ]
                    }
                  ],
                  [
                    {
                      stack: [
                        { text: 'Email:', bold: true },
                        { text: orden.usuario.email, color: '#0052DA', style: 'email' }
                      ]
                    }
                  ],
                  /*[
                    {
                      stack: [
                        { text: 'Terminos:', bold: true },
                        { text: orden.ord_com_term, color: '#FF3E3E', bold: true }
                      ]
                    }
                  ]*/
                ]
              },
              fontSize: (tipo === 1) ? 10 : 8,
            }
          ]
        },
        {
          text: "",
          style: 'name',
          margin: [0, 20, 0, 0]
        },
        {
          table: this.getPdfDetalleTable(orden, tipo),
          fontSize: (tipo === 1) ? 7 : 7,
        },
        {
          text: "",
          style: 'name',
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              stack: [
                '',
              ],
              fontSize: 12

            },
            {
              width: '30%',
              table: {
                widths: ['*', 44],
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      text: 'BASE INPONIBLE', alignment: 'right', bold: true
                    },
                    {
                      border: [false, false, false, false],
                      text: orden.ord_com_bas_imp.toFixed(2), alignment: 'right',
                    },
                  ],
                  [
                    {
                      border: [false, false, false, false],
                      text: '18% I.G.V.', alignment: 'right', bold: true
                    },
                    {
                      border: [false, false, false, true],
                      text: orden.ord_com_igv.toFixed(2), alignment: 'right',
                    },
                  ],
                  [
                    {
                      border: [false, false, false, false],
                      text: 'TOTAL', alignment: 'right', bold: true
                    },
                    {
                      border: [false, false, false, false],
                      text: orden.ord_com_tot.toFixed(2), alignment: 'right',
                    },
                  ]
                ]
              },
              fontSize: 8
            }
          ]
        },
        {
          text: "",
          style: 'name',
          margin: [0, 10, 0, 0]
        },
        { text: 'CONDICIONES GENERALES', style: 'header', italics: true, fontSize: 10 },
        {
          ol: [
            'Facturar a nombre de NETWORK CONTROL S.R.L. / R.U.C. 20601974003',
            'Entregar su factura : EN UN PLAZO MAX IMO DE 45 DIAS DESPUES DE ENTREGADO EL MATERIAL Y/O PRESTADO EL SERVICIO',
            'Direccion de entrega Urb. Villa Eléctrica Mza. C Lote 17 Dist. Jose Luis Bustamante y Rivero Arequipa-Perú',
            'En su guia de remisión y factura, colocar el número de Orden de Compra',
            
            'El plazo de Fecha de pago se inicia a la prestación de su Factura',
            'En caso que el(los) ´productos(s) defectuosos o vicios ocultos, el proveedor se obliga a abonar a NETWORK CONTROL S.R.L. el del producto devuelto, independientemente de reemblsarle los gastos de inversión producción y administrativos que hubiere.'
          ],
          italics: true,
          fontSize: 10
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
      //pageOrientation: 'landscape',
      info: {
        title: "orden_de_compra.pdf",
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
    if(this.authService.getusuarioJson().firma) {
      let firma = {
        image: 'data:image/' + 'jpeg' + ';base64,' + this.authService.getusuarioJson().firma,
        fit: [200, 200],
        margin: [50, 10, 0, 0],
      };
      return firma;
    } else {
      return {};
    }
  }

  getPdfDetalleTable(orden: OrdenCompraCli, tipo: number) {
    if (tipo === 1) {
      return {
        widths: [40, 40, 50, '*', 30, 30, 44, 44],
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
              text: 'CAT.',
              style: 'tableHeader'
            },
            {
              text: 'P.UNITARIO',
              style: 'tableHeader'
            },
            {
              text: 'P.TOTAL',
              style: 'tableHeader'
            }
          ],
          ...orden.orden_detalle.map(detalle => {
            return [
              { text: (detalle.producto) ? detalle.producto.cod_prod : 'NTWC'},
              { text: detalle.ord_com_det_numpar},
              { text: detalle.ord_com_det_fab},
              { text: detalle.ord_com_det_des},
              { text: detalle.ord_com_det_unimed},
              { text: detalle.ord_com_det_can},
              { text: detalle.ord_com_det_preuni.toFixed(2), alignment: 'right' },
              { text: (detalle.ord_com_det_preuni * detalle.ord_com_det_can).toFixed(2), alignment: 'right'},
            ]
          })
        ]
      }
    } else {
      return {
        widths: [40, 40, 50, '*', 30, 30, 44, 44],
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
              text: 'CAT.',
              style: 'tableHeader'
            },
            {
              text: 'P.UNITARIO',
              style: 'tableHeader'
            },
            {
              text: 'P.TOTAL',
              style: 'tableHeader'
            }
          ],
          ...orden.orden_detalle.map(detalle => {
            return [
              { text: (detalle.producto) ? detalle.producto.cod_prod : 'NTWC'},
              { text: detalle.ord_com_det_numpar},
              { text: detalle.ord_com_det_fab },
              { text: detalle.ord_com_det_des },
              { text: detalle.ord_com_det_unimed},
              { text: detalle.ord_com_det_can },
              { text: detalle.ord_com_det_preuni.toFixed(2), alignment: 'right'},
              { text: (detalle.ord_com_det_preuni * detalle.ord_com_det_can).toFixed(2), alignment: 'right' },
            ]
          })
        ]
      }
    }
  }
}

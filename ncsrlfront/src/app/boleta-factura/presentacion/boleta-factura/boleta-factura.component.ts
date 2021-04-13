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
import { OrdenCompraService } from '@app/orden-compra/data/services/orden_compra.service';
import { OrdenCompra } from '@app/orden-compra/data/models/orden-compra.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FacturaService } from '@app/boleta-factura/data/services/factura.service';
import { Factura } from '@app/boleta-factura/data/models/factura.model';
import { SunatResponse } from '@app/boleta-factura/data/models/sunat-response.model';

declare let pdfMake: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-boleta-factura',
  templateUrl: './boleta-factura.component.html',
  styleUrls: ['./boleta-factura.component.scss']
})

export class BoletaFacturaComponent implements OnInit {

  facturas: Factura[] = [];
  selectedFactura: Factura;
  totalFacturas: number;
  loading: boolean = false;

  //ordenes activas
  // ordenesActivas: OrdenCompra[] = [];
  // selectedOrdenActiva: OrdenCompra;
  // totalActivas: number;
  // loadingActivas: boolean = false;
  // //ordenes anuladas
  // ordenesAnuladas: OrdenCompra[] = [];
  // selectedOrdenAnulada: OrdenCompra;
  // totalAnuladas: number;
  // loadingAnuladas: boolean = false;

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
    private facturaService: FacturaService,
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
    this.getFacturas();
    this.userName = this.authService.getusuarioJson().nom_col;
  }

  //proformas
  getFacturas() {
    this.loading = true;
    this.facturaService.getFacturas(null).subscribe(
      (_facturas: GeneralCollection<Factura>) => {
        this.facturas = _facturas['data'];
        this.totalFacturas = _facturas['size'];
        this.loading = false;
        console.log("DOCS:: ", _facturas)
      },
      (error) => {
        this.loading = false;
        console.log("ocurrio un error");
      }
    );
  }

  envioSunat() {
    if (this.selectedFactura) {
      if(+this.selectedFactura.est_env === 0) {
        this.showMessage('info', 'Informacion', 'La factura ya fue aceptada');
        return;
      }

      this.showbar = true;
      console.log("factura: ", this.selectedFactura)
      let factura =  {
        "tipoDoc": "01",
        "serie": this.selectedFactura.serie,
        "correlativo": this.selectedFactura.correlativo.toString(),
        "fechaEmision": moment(this.selectedFactura.fechaEmision).format("YYYY-MM-DDTHH:mm:ssZ"),
        "fecVencimiento": moment(this.selectedFactura.fecVencimiento).format("YYYY-MM-DDTHH:mm:ssZ"),
        "observacion": this.selectedFactura.observacion,
        "tipoMoneda": this.selectedFactura.tipoMoneda,
        "mtoOperGravadas": this.selectedFactura.mtoOperGravadas,
        "mtoOperInafectas": this.selectedFactura.mtoOperInafectas,
        "mtoOperExoneradas": this.selectedFactura.mtoOperExoneradas,
        "mtoIGV": this.selectedFactura.mtoIGV,
        "mtoImpVenta": this.selectedFactura.mtoImpVenta,
        "client": {
          "tipoDoc": (this.selectedFactura.cliente && this.selectedFactura.cliente.tipo_documento) ? this.selectedFactura.cliente.tipo_documento.cod_tipdoc.toString() : null,
          "numDoc": (this.selectedFactura.cliente) ? this.selectedFactura.cliente.numdoc_cli : null,
          "rznSocial": (this.selectedFactura.cliente) ? this.selectedFactura.cliente.razsoc_cli.toString() : null,
        },
        "company": {
          "ruc": this.authService.getEmpresaJson().numdoc_emp,
          "razonSocial": this.authService.getEmpresaJson().nom_emp,
          "nombreComercial": this.authService.getEmpresaJson().nom_emp,
          "address": {
            "ubigueo": "040129",
            "codigoPais": "PE",
            "departamento": this.authService.getEmpresaJson().ciu_emp,
            "provincia": this.authService.getEmpresaJson().ciu_emp,
            "distrito": this.authService.getEmpresaJson().dis_emp,
            "urbanizacion": "-",
            "direccion": this.authService.getEmpresaJson().dir_emp
          }
        },
        "details": this.selectedFactura.factura_det,
        "legends": [
          {
            "code": "1000",
            "value": (this.selectedFactura.tipoMoneda === 'PEN') ? 'SON ' + this.gS.NumeroALetras(this.selectedFactura.mtoImpVenta, 1) : 'SON ' + this.gS.NumeroALetras(this.selectedFactura.mtoImpVenta, 2)
          }
        ]
      };

      // console.log("send fact: ", factura)

      // let factura = {
      //   "tipoDoc": "01",
      //   "serie": "F001",
      //   "correlativo": "111",
      //   "fechaEmision": "2018-01-20T12:34:00+01:00",
      //   "client": {
      //     "tipoDoc": "6",
      //     "numDoc": "20546687668",
      //     "rznSocial": "COMPANY SAC"
      //   },
      //   "company": {
      //     "ruc": "20123456789",
      //     "razonSocial": "LYCET COMPANY SAC",
      //     "nombreComercial": "COMPANY ",
      //     "address": {
      //       "ubigueo": "150101",
      //       "codigoPais": "PE",
      //       "departamento": "LIMA",
      //       "provincia": "LIMA",
      //       "distrito": "LIMA",
      //       "urbanizacion": "-",
      //       "direccion": "AV ITALIA"
      //     }
      //   },
      //   "tipoMoneda": "PEN",
      //   "mtoOperGravadas": 100,
      //   "mtoOperInafectas": 0,
      //   "mtoOperExoneradas": 0,
      //   "mtoIGV": 18,
      //   "mtoImpVenta": 118,
      //   "details": [
      //     {
      //       "unidad": "NIU",
      //       "cantidad": 12,
      //       "codProducto": "string",
      //       "descripcion": "PRODUCTO 1",
      //       "mtoValorUnitario": 100,
      //       "igv": 18,
      //       "tipAfeIgv": "10",
      //       "mtoPrecioUnitario": 118,
      //       "mtoValorVenta": 100
      //     }
      //   ],
      //   "legends": [
      //     {
      //       "code": "1000",
      //       "value": "SON CIEN CON 00/100 SOLES"
      //     }
      //   ]
      // }
      // console.log("f1: ", _factura)
      // console.log("f2: ", factura)

      this.facturaService.sendInvoice(factura).subscribe(
        (_resp: SunatResponse) => {
          this.showbar = false;
          console.log("enviado: ", _resp)
          if(_resp.sunatResponse.success) {
            this.showMessage('success', _resp.sunatResponse.cdrResponse.id, _resp.sunatResponse.cdrResponse.description);
            this.facturaService.updateEstadoEnvio(this.selectedFactura.id_factura, {estado: 0}).subscribe(
              (_resp: any) => {
                this.selectedFactura.est_env = '0'
              },
              (error) => {
                this.showbar = false;
                console.log("error: ", error)
              }
            );

          }else{
            this.showMessage('error', _resp.sunatResponse.error.code, _resp.sunatResponse.error.message);
            this.facturaService.updateEstadoEnvio(this.selectedFactura.id_factura, {estado: 1}).subscribe(
              (_resp: any) => {
                this.selectedFactura.est_env = '1'
              },
              (error) => {
                this.showbar = false;
                console.log("error: ", error)
              }
            );
          }

        },
        (error) => {
          this.showbar = false;
          console.log("PDFe: ", error)
        }
      );

    } else {
      this.showMessage('info', 'Informacion', 'Seleccione una factura');
    }
  }

  generarPdf() {
    if (this.selectedFactura) {
      this.showbar = true;
      console.log("factura: ", this.selectedFactura)
      let factura =  {
        "tipoDoc": "01",
        "serie": this.selectedFactura.serie,
        "correlativo": this.selectedFactura.correlativo.toString().padStart(4, '0000'),
        "fechaEmision": moment(this.selectedFactura.fechaEmision).format("YYYY-MM-DDTHH:mm:ssZ"),
        "fecVencimiento": moment(this.selectedFactura.fecVencimiento).format("YYYY-MM-DDTHH:mm:ssZ"),
        "observacion": this.selectedFactura.observacion,
        "tipoMoneda": this.selectedFactura.tipoMoneda,
        "mtoOperGravadas": this.selectedFactura.mtoOperGravadas,
        "mtoOperInafectas": this.selectedFactura.mtoOperInafectas,
        "mtoOperExoneradas": this.selectedFactura.mtoOperExoneradas,
        //"mtoOperGratuitas": this.selectedFactura.mtoOperGratuitas,
        "mtoIGV": this.selectedFactura.mtoIGV,
        "mtoImpVenta": this.selectedFactura.mtoImpVenta,
        "client": {
          "tipoDoc": (this.selectedFactura.cliente && this.selectedFactura.cliente.tipo_documento) ? this.selectedFactura.cliente.tipo_documento.cod_tipdoc : null,
          "numDoc": (this.selectedFactura.cliente) ? this.selectedFactura.cliente.numdoc_cli : null,
          "rznSocial": (this.selectedFactura.cliente) ? this.selectedFactura.cliente.razsoc_cli : null,
        },
        "company": {
          "ruc": this.authService.getEmpresaJson().numdoc_emp,
          "razonSocial": this.authService.getEmpresaJson().nom_emp,
          "nombreComercial": this.authService.getEmpresaJson().nom_emp,
          "address": {
            "ubigueo": "040129",
            "codigoPais": "PE",
            "departamento": this.authService.getEmpresaJson().ciu_emp,
            "provincia": this.authService.getEmpresaJson().ciu_emp,
            "distrito": this.authService.getEmpresaJson().dis_emp,
            "urbanizacion": "-",
            "direccion": this.authService.getEmpresaJson().dir_emp
          }
        },
        "details": this.selectedFactura.factura_det,
        "legends": [
          {
            "code": "1000",
            "value": (this.selectedFactura.tipoMoneda === 'PEN') ? 'SON ' + this.gS.NumeroALetras(this.selectedFactura.mtoImpVenta, 1) : 'SON ' + this.gS.NumeroALetras(this.selectedFactura.mtoImpVenta, 2)
          }
        ]
      };

      console.log("send fact: ", factura)

      this.facturaService.getPdfInvoice(factura).subscribe(
        (_resp: any) => {
          console.log("PDF: ", _resp)
          var fileURL = URL.createObjectURL(_resp);
          window.open(fileURL); 
          this.showbar = false;
        },
        (error) => {
          console.log("PDFe: ", error)
          this.showbar = false;
        }
      );

    } else {
      this.showMessage('info', 'Informacion', 'Seleccione una factura');
    }
  }


  //mensajes 
  showMessage(_severity: string, _summary: string, _detail: string) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
  }


}


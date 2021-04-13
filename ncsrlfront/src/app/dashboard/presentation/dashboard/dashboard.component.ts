import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotizacionesService } from '@app/cotizaciones-cli/data/services/cotizaciones.service';
import { CargoService } from '@app/tablas-referenciales/data/services/cargo.service';
import { GeneralService } from '@app/_general/services/general.service';
import { Cotizacion, CotizacionJSON } from '@app/cotizaciones-cli/data/models/cotizacion.model';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmailService } from '@app/_general/services/email.service';

//declare let pdfMake: any ;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  images: any[];

  constructor(public activatedroute: ActivatedRoute, public gS: 
    GeneralService, private cargoService: CargoService,
    private emailService: EmailService,
    private cotizacionesService: CotizacionesService) {
    var titles = this.activatedroute.snapshot.data['title'];
    this.gS.setTitle(titles.split('/'));
  }

  ngOnInit() {
    this.images = [];
    this.images.push({ src: "assets/images/logo.jpg", alt: '100', title: 'Logo de la empresa' });
    this.cargoService.getCargo(null);
  }


  generarPdf() {
    // this.cotizacionesService.getCotizacion(14).subscribe(
    //     (_cotizacionJSON: CotizacionJSON) => {
            
    //         const documentDefinition = this.getDocumentDefinition(_cotizacionJSON.logo);
    //         const pdfDocGenerator =  pdfMake.createPdf(documentDefinition);

    //           pdfDocGenerator.getBlob((pdf) => {
    //             let formData = new FormData();
    //             formData.append("asunto", "proforma desde angular");
    //             formData.append("cc", "christianpar19@gmail.com");
    //             formData.append("mensaje", "buenos dias le envio la cotizacion");
    //             formData.append("destinatario", "cpenaa@unsa.edu.pe");
    //             formData.append("archivo", new File([pdf], "proforma.pdf"));

    //             this.emailService.sendEmail(formData).subscribe(
    //               (_resp: any) => {
    //                   console.log("mensaje enviado")
    //               },
    //               (error) => {
    //                   console.log(error);
    //               }
    //             );
    //         });
    //     },
    //     (error) => {
    //         console.log("ocurrio un error");
    //     }
    // );
  }

  // getDocumentDefinition(logo: any) {
  //   return {
  //     content: [
  //       {
  //         columns: [
  //           {
  //             image: 'data:image/jpeg;base64,' + logo,
  //             fit: [120, 120]
  //           },
  //           [
  //             {
  //               text: 'PROFORMA N° 0001',
  //               bold: true,
  //               fontSize: 16,
  //               alignment: 'right',
  //               margin: [0, 20, 0, 0]
  //             }
  //           ]
  //         ]
  //       },
  //       {
  //         columns: [
  //           {
  //             text: "CLIENTE",
  //             style: 'name',
  //             margin: [0, 20, 0, 5]
  //           }
  //         ]
  //       },
  //       {
  //         columns: [
  //           {
  //             text: 'Nombre',
  //             width: '20%',
  //           },
  //           {
  //             text: ': E&E',
  //             width: '55%',
  //           },
  //           {
  //             text: 'Fecha',
  //             width: '10%',
  //           },
  //           {
  //             text: ': 12/10/2020',
  //             width: '15%',
  //           }
  //         ]
  //       },
  //       {
  //         columns: [
  //           {
  //             text: 'Ciudad',
  //             width: '20%',
  //           },
  //           {
  //             text: ': Arequipa',
  //             width: '55%',
  //           },
  //           {
  //             text: 'Moneda',
  //             width: '10%',
  //           },
  //           {
  //             text: ': dolares',
  //             width: '15%',
  //           }
  //         ]
  //       },
  //       {
  //         columns: [
  //           {
  //             text: 'Direccion',
  //             width: '20%',
  //           },
  //           {
  //             text: ': Arequipa 123',
  //             width: '80%',
  //           }
  //         ]
  //       },
  //       {
  //         columns: [
  //             {
  //                 text: 'Documento',
  //                 width: '20%',
  //             },
  //             {
  //                 text: ': RUC - 20156398578',
  //                 width: '80%',
  //             }
  //         ]
  //       },
  //       {
  //           columns: [
  //               {
  //                   text: 'Contacto',
  //                   width: '20%',
  //               },
  //               {
  //                   text: ': Esteban C',
  //                   width: '80%',
  //               }
  //           ]
  //       },
  //       {
  //         columns: [
  //             {
  //                 text: "INTEGRADOR",
  //                 style: 'name',
  //                 margin: [0, 20, 0, 5]
  //             },
  //             {
  //                 text: "PROYECTO",
  //                 style: 'name',
  //                 margin: [0, 20, 0, 5]
  //             }
  //         ]
  //       },
  //       {
  //         columns: [
  //             {
  //                 text: 'Oscar Daza',
  //             },
  //             {
  //                 text: 'NTWC-P0003: Proyecto 3',
  //             }
  //         ]
  //       },
  //       {
  //         text: "",
  //         style: 'name',
  //         margin: [0, 20, 0, 0]
  //       },
  //       {
  //         table: {
  //             widths: [50,'*',60, 50, 60, 50],
  //             body: [
  //                     [
  //                         {
  //                           text: 'TIPO',
  //                           style: 'tableHeader'
  //                         },
  //                         {
  //                           text: 'DESCRIPCION',
  //                           style: 'tableHeader'
  //                         },
  //                         {
  //                           text: 'CANTIDAD',
  //                           style: 'tableHeader'
  //                         },
  //                         {
  //                           text: 'PRECIO LISTA',
  //                           style: 'tableHeader'
  //                         },
  //                         {
  //                             text: 'IMPORTE',
  //                             style: 'tableHeader'
  //                         },
  //                         {
  //                             text: 'STOCK',
  //                             style: 'tableHeader'
  //                         }
  //                     ],
  //                     [
  //                       'Servicio','Instalacion','','','',''
  //                     ],
  //                     [
  //                       'Producto','Ethernet Cat 8', 10, 12500,62500,100
  //                     ]
  //             ]
  //         }
  //       },
  //       {
  //         text: "",
  //         style: 'name',
  //         margin: [0, 20, 0, 0]
  //       },
  //       // {
  //       //   columns: [
  //       //     {
  //       //         text: 'Son: \nDoscientos Cincuenta Dolares',
  //       //         fontSize: 12,
  //       //         margin: [0, 5, 0, 5],
  //       //         width: '33%',
  //       //     }
  //       //   ]
  //       // },
  //       {
  //         columns: [
  //           [
  //             {
  //               text: 'Son: \nDoscientos Cincuenta Dolares',
  //               fontSize: 12,
  //             },
  //             {
  //               table: {
  //                   widths: ['*',50],
  //                   body: [
  //                           [
  //                               {
  //                                 text: 'Validez de la proforma'
  //                               },
  //                               {
  //                                 text: '5 dias'
  //                               }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Tiempo de instalacion'
  //                             },
  //                             {
  //                               text: '3 dias'
  //                             }
  //                           ]
  //                   ]
  //               },
  //               fontSize: 10,
  //               margin: [0, 0, 5, 0]
  //             },
  //             {
  //               text: "Forma de Pago: \nCREDITO 30 DIAS",
  //               fontSize: 12,
  //               margin: [0, 5, 0, 0]
  //             }
  //           ],
  //           [
  //             {
  //               table: {
  //                   widths: ['*',50],
  //                   body: [
  //                           [
  //                               {
  //                                 text: 'Saldo a Financiar',
  //                                 style: 'tableHeader'
  //                               },
  //                               {
  //                                 text: ''
  //                               }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Factor'
  //                             },
  //                             {
  //                               text: '0.000 %'
  //                             }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Financiación'
  //                             },
  //                             {
  //                               text: '0.000'
  //                             }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Valor Cuota'
  //                             },
  //                             {
  //                               text: '0.000'
  //                             }
  //                           ]
  //                   ]
  //               },
  //               fontSize: 10,
  //               margin: [5, 0, 5, 0]
  //             },
  //           ],
  //           [
  //             {
  //               table: {
  //                   widths: ['*',80],
  //                   body: [
  //                           [
  //                               {
  //                                 text: 'Costo Directo',
  //                               },
  //                               {
  //                                 text: 'USD \t187.500'
  //                               }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Gastos Indirectos'
  //                             },
  //                             {
  //                               text: 'USD \t5.625'
  //                             }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Utilidad "x" %'
  //                             },
  //                             {
  //                               text: 'USD \t18.750'
  //                             }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Base Imponible'
  //                             },
  //                             {
  //                               text: 'USD \t211.875'
  //                             }
  //                           ],
  //                           [
  //                             {
  //                               text: 'I.G.V. 18%'
  //                             },
  //                             {
  //                               text: 'USD \t38.138'
  //                             }
  //                           ],
  //                           [
  //                             {
  //                               text: 'Neto a Pagar'
  //                             },
  //                             {
  //                               text: 'USD \t250.03'
  //                             }
  //                           ]
  //                   ]
  //               },
  //               fontSize: 10,
  //               margin: [5, 0, 0, 0]
  //             },
  //           ]
  //         ]
  //       },
  //     ],
  //     pageSize: 'A4',
  //     info: {
  //       title:"proforma.pdf",
  //       author: "NETWORK CONTROL",

  //     },
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 20, 0, 10],
  //         decoration: 'underline'
  //       },
  //       name: {
  //         fontSize: 14,
  //         bold: true
  //       },
  //       jobTitle: {
  //         fontSize: 14,
  //         bold: true,
  //         italics: true
  //       },
  //       sign: {
  //         margin: [0, 50, 0, 10],
  //         alignment: 'right',
  //         italics: true
  //       },
  //       tableHeader: {
  //         bold: true,
  //       }
  //     }
  //   };
  // }
}

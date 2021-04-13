import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { KardexService } from "@app/kardex/data/services/kardex.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Kardex, KardexJSON } from '@app/kardex/data/models/kardex.model';
import { KardexExcel, KardexExcelJSON } from '@app/kardex/data/models/kadexExcel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_general/services/auth.service';
import { GeneralService } from '@app/_general/services/general.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

//declare let pdfMake: any ;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-kardex',
    templateUrl: './kardex.component.html',
    styleUrls: ['./kardex.component.scss']
})

export class KardexComponent implements OnInit {

    //kardex
    kardex: Kardex[] = [];
    kardexJSON: KardexJSON;
    kardexExcelJSON: KardexExcelJSON = new KardexExcelJSON;
    totalKardex: number;
    loadingKardex: boolean = false;
    //

    //Filtrar activos
    kardexFiltro: Kardex[] = [];
    kardexFiltroExcel: KardexExcel[] = [];
    kardexActivosFiltro: KardexJSON = new KardexJSON;

    filtro: SelectItem[] = [];
    selectedFiltro: SelectItem;
    filtroGen: boolean = true;
    filtroM: boolean = false;
    filtroY: boolean = false;
    submitF: boolean = false;

    meses: SelectItem[] = [];
    selectedMes: SelectItem;
    year: SelectItem[] = [];
    a: SelectItem;
    selectedYear: SelectItem;

    fecha: Date = new Date();
    showbar: boolean = false;
    rowsNumber: number = 10;
    estados: SelectItem[] = [];
    selectedEstado: SelectItem;
    displayModalFiltro: boolean = false;
    showbarFiltro: boolean = false;

    userName: string = "";

    dialogTitle: string = "";
    loadingPdf: boolean = false;
    showbarEmail: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private kardexService: KardexService,
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
        this.getEstados()
        this.getKardex();
        this.getKardexExcel();

        this.getMeses();
        this.getYear();
        this.getFiltro();
    }

    //kardex
    getKardex() {
        this.loadingKardex = true;
        this.kardexService.getKardexJSON(null).subscribe(
            (_kardex: KardexJSON) => {
                this.loadingKardex = false;
                this.kardex = [];
                this.kardexJSON = _kardex;
                this.kardexJSON.kardex_ingreso = _kardex['data'];
                this.kardex = this.kardexJSON.kardex_ingreso;
                this.kardexActivosFiltro.kardex_ingreso = this.kardexJSON.kardex_ingreso;
                this.kardexActivosFiltro.logo = this.kardexJSON.logo;
                this.kardexActivosFiltro.extension = this.kardexJSON.extension;
                this.totalKardex = this.kardexJSON.kardex_ingreso.length;
                console.log("DOCS:: ", this.kardex)
            },
            (error) => {
                this.loadingKardex = false;
                console.log("ocurrio un error");
            }
        );
    }

    getKardexExcel() {
        this.loadingKardex = true;
        this.kardexService.getExcelKardex(null).subscribe(
            (_kardex: KardexJSON) => {
                this.loadingKardex = false;
                this.kardexExcelJSON.regKardex = [];
                this.kardexExcelJSON.regKardex = _kardex['data'];
                console.log("KardexExcel:: ", this.kardexExcelJSON.regKardex)
            },
            (error) => {
                this.loadingKardex = false;
                console.log("ocurrio un error en get excel", error);
            }
        );
    }

    getEstados() {
        this.estados = [
            { label: 'Pendiente', value: 0 },
            { label: 'Incompleto', value: 1 },
            { label: 'Completo', value: 2 },
        ];
        this.selectedEstado = this.estados[0];
    }

    //Métodos de filtrado Excel y PDF
    filtrarMeses(kardex: KardexExcel[]) {
        this.kardexFiltroExcel = [];
        kardex.map((_kardex: KardexExcel) => {
            console.log("filY:", _kardex.Fecha.toString().substring(5, 7))
            if (+_kardex.Fecha.toString().substring(5, 7) === this.selectedMes.value) {
                this.kardexFiltroExcel.push(_kardex);
            }
        });
        console.log("Meses: ", this.kardexFiltroExcel)
    }
    filtrarYear(kardex: KardexExcel[]) {
        this.kardexFiltroExcel = [];
        kardex.map((_kardex: KardexExcel) => {
            console.log("filY:", _kardex.Fecha.toString().substring(0, 4))
            if (+_kardex.Fecha.toString().substring(0, 4) === this.selectedYear.value) {
                this.kardexFiltroExcel.push(_kardex);
            }
        });
        console.log("Años: ", this.kardexFiltroExcel)
    }
    filtrarMesesPDF(kardexAc: Kardex[]) {
        this.kardexFiltro = [];
        kardexAc.map((_kardex: Kardex) => {
            if (+_kardex.fec_kar.toString().substring(5, 7) === this.selectedMes.value) {
                this.kardexFiltro.push(_kardex);
            }
        });
        console.log("Meses: ", this.kardexFiltro)
        this.kardexActivosFiltro.kardex_ingreso = this.kardexFiltro
    }
    filtrarYearPDF(kardex: Kardex[]) {
        this.kardexFiltro = [];
        kardex.map((_gasto: Kardex) => {
            if (+_gasto.fec_kar.toString().substring(0, 4) === this.selectedYear.value) {
                this.kardexFiltro.push(_gasto);
            }
        });
        console.log("Años: ", this.kardexFiltro)
        this.kardexActivosFiltro.kardex_ingreso = this.kardexFiltro
    }
    //Fin métodos de filtrado

    //Generador de listas de filtros
    getYear() {
        var l = this.fecha.toString().substring(11, 15);
        for (let index = 0; index < 11; index++) {
            this.a = { label: "2000", value: 2000 };
            var y = +l;
            this.a.label = "" + (y - index);
            this.a.value = +this.a.label;
            this.year.push(this.a);
        }
    }
    getMeses() {
        this.meses = [
            { label: "Enero", value: 1 },
            { label: "Febrero", value: 2 },
            { label: "Marzo", value: 3 },
            { label: "Abril", value: 4 },
            { label: "Mayo", value: 5 },
            { label: "Junio", value: 6 },
            { label: "Julio", value: 7 },
            { label: "Agosto", value: 8 },
            { label: "Septiembre", value: 9 },
            { label: "Octubre", value: 10 },
            { label: "Noviembre", value: 11 },
            { label: "Diciembre", value: 12 }
        ];
    }
    getFiltro() {
        this.filtro = [
            { label: "General", value: 1 },
            { label: "Por mes", value: 2 },
            { label: "Por año", value: 3 }
        ];
    }
    //Fin de Generador de listas de filtros

    filtrar() {
        this.displayModalFiltro = true;
    }

    cancelFiltro() {
        this.displayModalFiltro = false;
        this.selectedFiltro = null;
        this.selectedMes = null;
        this.submitF = false;
    }

    onChangeFiltro() {
        if (this.selectedFiltro && this.selectedFiltro.value == 2) {
            this.filtroGen = false;
            this.filtroM = true;
            this.filtroY = false;
        } else if (this.selectedFiltro && this.selectedFiltro.value == 3) {
            this.filtroGen = false;
            this.filtroM = false;
            this.filtroY = true;
        } else {
            this.filtroGen = true;
            this.filtroM = false;
            this.filtroY = false;
        }
    }

    exportExcel() {
        this.submitF = true;
        this.showbarFiltro = true;
        if (!this.validFiltros) {
            this.showbarFiltro = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {

        }
        import("xlsx").then(xlsx => {
            switch (this.selectedFiltro.value) {
                case 1:
                    this.kardexFiltroExcel = this.kardexExcelJSON.regKardex
                    break;
                case 2:
                    this.filtrarMeses(this.kardexExcelJSON.regKardex)
                    break;
                case 3:
                    this.filtrarYear(this.kardexExcelJSON.regKardex)
                    break;
            }
            if (this.kardexFiltroExcel.length == 0) {
                this.showMessage('warn', 'Advertencia', 'No tiene reistros en la fecha seleccionada');
                return;
            } else {
                const header = ['ID', 'Fecha', 'Codigo', 'ID_detalle', 'ID_orden', 'Descripcion', 'N. Parte', 'Uni. Med.', 'Cantidad', 'Prove-Clie', 'N. Fact', 'N. Bole', 'N. Guia', 'Colaborador', 'Usuario', 'Estado', 'Creado', 'Actualizado'];
                const worksheet = xlsx.utils.json_to_sheet(this.kardexFiltroExcel);
                const workbook = { headers: { 'header': header }, Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "kardex");
            }
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + moment(this.fecha).format("DD_MM_YYYY") + EXCEL_EXTENSION);
        });
    }

    generarPdfKardex() {

        this.submitF = true;
        if (!this.validFiltros) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            this.kardexActivosFiltro.kardex_ingreso = this.kardexJSON.kardex_ingreso;
            switch (this.selectedFiltro.value) {
                case 1:
                    break;
                case 2:
                    this.filtrarMesesPDF(this.kardexActivosFiltro.kardex_ingreso);
                    break;
                case 3:
                    this.filtrarYearPDF(this.kardexJSON.kardex_ingreso)
                    break;
            }

        }

        if (this.kardexActivosFiltro.kardex_ingreso.length == 0) {
            this.showMessage('warn', 'Advertencia', 'No tiene reistros en la fecha seleccionada');
            return;
        } else {
            this.showbarFiltro = true;
            this.loadingPdf = true;

            const documentDefinition = this.getDocumentDefinition(this.kardexActivosFiltro);
            pdfMake.createPdf(documentDefinition).open();
            this.showbarFiltro = false;
            this.loadingPdf = false;
        }
    }

    getDocumentDefinition(_kardexJSON: KardexJSON) {
        return {
            pageOrientation: 'landscape',
            content: [
                {
                    columns: [
                        {
                            image: 'data:image/' + _kardexJSON.extension + ';base64,' + _kardexJSON.logo,
                            fit: [120, 120]
                        },
                        [
                            {
                                text: 'KARDEX ',
                                bold: true,
                                fontSize: 20,
                                alignment: 'right',
                                margin: [0, 20, 0, 0]
                            },
                            {
                                text: 'Fecha: ' + moment(this.fecha).format("YYYY-MM-DD"),
                                bold: true,
                                fontSize: 12,
                                alignment: 'right',
                                margin: [0, 2, 0, 0]
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
                    table: {
                        widths: [45, 45, 170, 40, 20, 35, 80, 60, 60, 60, 45],
                        body: [
                            [
                                {
                                    text: 'Fecha',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Código',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Descripción',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'N° Parte',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Und.',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Cantidad',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Proveedor/Cli',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'N° Factura',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'N° Boleta',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'N° Guía Rem',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Colaborador',
                                    style: 'tableHeader'
                                }
                            ],
                            ..._kardexJSON.kardex_ingreso.map(detalle => {
                                return [
                                    moment(detalle.fec_kar).format("DD-MM-YYYY"),
                                    detalle.cod_kar,
                                    detalle.prod_desc,
                                    detalle.prod_numpar,
                                    detalle.prod_unimed,
                                    detalle.prod_cant,
                                    detalle.prov_razsoc,
                                    detalle.fac_kar,
                                    detalle.bol_kar,
                                    detalle.guirem_kar,
                                    detalle.col_usu
                                ]
                            })
                        ]
                    },
                    fontSize: 8,
                }
            ],
            info: {
                title: "kardex.pdf",
                author: "NETWORK CONTROL",

            },
            styles: {
                header: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 20, 0, 10],
                    decoration: 'underline'
                },
                name: {
                    fontSize: 10,
                    bold: true
                },
                jobTitle: {
                    fontSize: 12,
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
                }
            }
        };
    }

    get validFiltros(): boolean {
        if (this.selectedFiltro && this.selectedFiltro.value == 1) {
            return true;
        } else if (this.selectedFiltro && this.selectedFiltro.value == 2 && this.selectedMes) {
            return true;
        } else if (this.selectedFiltro && this.selectedFiltro.value == 3 && this.selectedYear) {
            return true;
        } else {
            return false;
        }
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }

}

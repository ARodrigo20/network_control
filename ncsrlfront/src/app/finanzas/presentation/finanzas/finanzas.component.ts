import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import { FinanzasService } from "@app/finanzas/data/services/gastos.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Gastos, GastosJSON } from '@app/finanzas/data/models/gastos.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_general/services/auth.service';
import { GeneralService } from '@app/_general/services/general.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import * as moment from 'moment';
import { GastosExcel, GastosExcelJSON } from '@app/finanzas/data/models/gastosExcel.model';

//declare let pdfMake: any ;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-finanzas',
    templateUrl: './finanzas.component.html',
    styleUrls: ['./finanzas.component.scss']
})

export class FinanzasComponent implements OnInit {

    //Registros Activos
    registrosActivos: Gastos[] = [];
    gastosActivos: GastosJSON = new GastosJSON;
    gastosActivosExcel: GastosExcelJSON = new GastosExcelJSON;
    selectedRegistroActivo: Gastos;
    totalActivos: number;
    loadingActivos: boolean = false;

    //Filtrar activos
    registrosActivosFiltro: Gastos[] = [];
    registrosFiltroExcel: GastosExcel[] = [];
    gastosActivosFiltro: GastosJSON = new GastosJSON;

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

    //Registros Anulados
    registrosAnulados: Gastos[] = [];
    registrosAnuladosExcel: GastosExcel[] = [];
    selectedRegistroAnulado: Gastos;
    totalAnulados: number;
    loadingAnulados: boolean = false;

    fecha: Date = new Date();
    fec_ini: Date;
    fec_fin: Date;
    loadingPdf: boolean = false;
    displayModalFiltro: boolean = false;
    showbarFiltro: boolean = false;

    showbar: boolean = false;
    rowsNumber: number = 10;
    userName: string = "";

    constructor(
        private messageService: MessageService,
        private finanzasService: FinanzasService,
        private confirmationService: ConfirmationService,
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
        this.getGastos();
        this.getGastosExcel();
        
        this.getMeses();
        this.getYear();
        this.getFiltro();
    }

    //Gastos
    getGastos() {
        this.loadingActivos = true;
        this.finanzasService.getGastos(null).subscribe(
            (_registrosActivos: GeneralCollection<Gastos>) => {
                this.separarGastos(_registrosActivos['Gasto']);
                this.gastosActivos.logo = _registrosActivos['logo'];
                this.gastosActivos.extension = _registrosActivos['extension'];
                this.gastosActivosFiltro.logo = this.gastosActivos.logo;
                this.gastosActivosFiltro.extension = this.gastosActivos.extension;
                this.loadingActivos = false;
                console.log("DOCS:: ", this.gastosActivos.regGastos)
            },
            (error) => {
                this.loadingActivos = false;
                console.log("ocurrio un error", error);
            }
        );
    }

    getGastosExcel() {
        this.finanzasService.getGastosExcel(null).subscribe(
            (_registrosActivos: GeneralCollection<GastosExcel>) => {
                this.gastosActivosExcel.regGastos = _registrosActivos['Gasto']
                this.gastosActivosExcel.logo = _registrosActivos['logo'];
                this.gastosActivosExcel.extension = _registrosActivos['extension'];
                console.log("DOCSExcel:: ", this.gastosActivosExcel.regGastos)
            },
            (error) => {
                console.log("ocurrio un error en get excel", error);
            }
        );
    }

    separarGastos(gastos: Gastos[]) {
        this.registrosActivos = [];
        this.registrosAnulados = [];
        gastos.map((gasto: Gastos) => {
            if (gasto.est_reg === "A") {
                this.registrosActivos.push(gasto);
            } else {
                this.registrosAnulados.push(gasto);
            }
        });
        this.totalActivos = this.registrosActivos.length
        this.totalAnulados = this.registrosAnulados.length
        this.gastosActivos.regGastos = this.registrosActivos
        this.gastosActivosFiltro.regGastos = this.gastosActivosFiltro.regGastos;
    }
    modificarGasto() {
        if (this.selectedRegistroActivo) {
            this.showbar = true;
            this.router.navigate(["/finanzas/form/" + this.selectedRegistroActivo.id_gas]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un registro');
        }
    }

    anularGasto() {
        if (this.selectedRegistroActivo) {
            this.confirmationService.confirm({
                message: '¿Quieres anular este Gasto?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'anularGasto',
                accept: () => {
                    this.showbar = true;
                    this.finanzasService.anularGasto(this.selectedRegistroActivo.id_gas).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Gasto anulado');
                            this.showbar = false;
                            this.getGastos();
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                            this.showbar = false;
                        });
                },
                reject: () => {

                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un registro');
        }
    }

    registrarGasto() {
        this.router.navigate(["/finanzas/form/new"]);
    }

    //Métodos de filtrado Excel y PDF
    filtrarMeses(gastos: GastosExcel[]) {
        this.registrosFiltroExcel = [];
        gastos.map((_gasto: GastosExcel) => {
            if (+_gasto.Fecha.toString().substring(5, 7) === this.selectedMes.value) {
                this.registrosFiltroExcel.push(_gasto);
            }
        });
        console.log("Meses: ", this.registrosFiltroExcel)
    }
    filtrarYear(gastos: GastosExcel[]) {
        this.registrosFiltroExcel = [];
        gastos.map((_gasto: GastosExcel) => {
            if (+_gasto.Fecha.toString().substring(0, 4) === this.selectedYear.value) {
                this.registrosFiltroExcel.push(_gasto);
            }
        });
        console.log("Años: ", this.registrosFiltroExcel)
    }
    filtrarMesesPDF(gastos: Gastos[]) {
        this.registrosActivosFiltro = [];
        gastos.map((_gasto: Gastos) => {
            if (+_gasto.gas_fec.toString().substring(5, 7) === this.selectedMes.value) {
                this.registrosActivosFiltro.push(_gasto);
            }
        });
        console.log("Meses: ", this.registrosActivosFiltro)
        this.gastosActivosFiltro.regGastos = this.registrosActivosFiltro
    }
    filtrarYearPDF(gastos: Gastos[]) {
        this.registrosActivosFiltro = [];
        gastos.map((_gasto: Gastos) => {
            if (+_gasto.gas_fec.toString().substring(0, 4) === this.selectedYear.value) {
                this.registrosActivosFiltro.push(_gasto);
            }
        });
        console.log("Años: ", this.registrosActivosFiltro)
        this.gastosActivosFiltro.regGastos = this.registrosActivosFiltro
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
        if (!this.validFiltros) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            import("xlsx").then(xlsx => {
                switch (this.selectedFiltro.value) {
                    case 1:
                        this.registrosFiltroExcel = this.gastosActivosExcel.regGastos
                        break;
                    case 2:
                        this.filtrarMeses(this.gastosActivosExcel.regGastos)
                        break;
                    case 3:
                        this.filtrarYear(this.gastosActivosExcel.regGastos)
                        break;
                }
                if (this.registrosFiltroExcel.length == 0) {
                    this.showMessage('warn', 'Advertencia', 'No tiene reistros en la fecha seleccionada');
                    return;
                } else {
                    const worksheet = xlsx.utils.json_to_sheet(this.registrosFiltroExcel);
                    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                    this.saveAsExcelFile(excelBuffer, "gastos");
                }
            });
        }
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

    generarPdfGastos() {
        this.submitF = true;
        if (!this.validFiltros) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            this.gastosActivosFiltro.regGastos = this.gastosActivos.regGastos;
            switch (this.selectedFiltro.value) {
                case 1:
                    break;
                case 2:
                    this.filtrarMesesPDF(this.gastosActivosFiltro.regGastos)
                    break;
                case 3:
                    this.filtrarYearPDF(this.gastosActivosFiltro.regGastos)
                    break;
            }

        }

        if (this.gastosActivosFiltro.regGastos.length == 0) {
            this.showMessage('warn', 'Advertencia', 'No tiene reistros en la fecha seleccionada');
            return;
        } else {
            this.showbarFiltro = true;
            this.loadingPdf = true;
    
            const documentDefinition = this.getDocumentDefinition(this.gastosActivosFiltro);
            pdfMake.createPdf(documentDefinition).open();
            this.showbarFiltro = false;
            this.loadingPdf = false;
        }
    }

    getDocumentDefinition(_gastos: GastosJSON) {
        return {
            pageOrientation: 'landscape',
            content: [
                {
                    columns: [
                        {
                            image: 'data:image/' + _gastos.extension + ';base64,' + _gastos.logo,
                            fit: [120, 120]
                        },
                        [
                            {
                                text: 'Gastos ',
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
                        widths: [45, 70, 100, 50, 140, 65, 40, 40, 40, 40, 30],
                        body: [
                            [
                                {
                                    text: 'Fecha',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Núm. Factura',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Proveedor',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'RUC',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Proyecto.',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Descripción',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Sub Total',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'IGV S/',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Total',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Dolares',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Tipo',
                                    style: 'tableHeader'
                                }
                            ],
                            ..._gastos.regGastos.map(detalle => {
                                return [
                                    moment(detalle.gas_fec).format("DD-MM-YYYY"),
                                    detalle.gas_fac_ser + "-" + detalle.gas_fac.toString().padStart(8, '00000000'),
                                    detalle.prov_razsoc,
                                    detalle.prov_ruc,
                                    detalle.nom_proy,
                                    detalle.gas_desc,
                                    detalle.gas_subtot,
                                    detalle.gas_igv,
                                    detalle.gas_tot,
                                    detalle.gas_totdol,
                                    detalle.gas_tipcam
                                ]
                            })
                        ]
                    },
                    fontSize: 8,
                }
            ],
            info: {
                title: "gastos.pdf",
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

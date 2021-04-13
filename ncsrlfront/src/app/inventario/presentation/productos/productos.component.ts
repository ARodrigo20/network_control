import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { ProductosService } from "../../data/services/productos.service";
import { MarcaService } from '@app/tablas-referenciales/data/services/marca.service';
import { ModeloService } from '@app/tablas-referenciales/data/services/modelo.service';
import { FabricanteService } from '@app/tablas-referenciales/data/services/fabricante.service';
import { UniMedService } from '@app/tablas-referenciales/data/services/unimed.service';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Producto } from '../../data/models/product.model';
import { Fabricante } from '@app/tablas-referenciales/data/models/fabricante.model';
import { Marca } from '@app/tablas-referenciales/data/models/marca.model';
import { Modelo } from '@app/tablas-referenciales/data/models/modelo.model';
import { UniMed } from '@app/tablas-referenciales/data/models/unimed.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';


@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

    //drops
    marcas: Marca[] = [];
    selectedMarca: Marca;
    modelos: Modelo[] = [];
    selectedModelo: Modelo;
    fabricantes: Fabricante[] = [];
    selectedFabricante: Fabricante;
    unimeds: UniMed[] = [];
    selectedUnimed: UniMed;
    monedas: SelectItem[] = [];
    selectedMoneda: SelectItem;
    //fin drops

    //panel
    titlePanel: string = "Registrar Producto"
    cols: any[];
    //fin panel

    //formulario    
    id_prod: number = -1;
    cod_prod: string = "";
    num_parte_prod: string = "";
    stk_prod: number = 0;
    des_prod: string = "";
    pre_com_prod: number = 0;
    id_mar: number = 0;
    id_mod: number = 0;
    id_unimed: number = 0;
    id_fab: number = 0;

    submitted: boolean = false;
    showbar: boolean = false;
    submitLabel: string = "Guardar";
    formMode: boolean = true; //true = crear //false = editar
    displayModal: boolean = false;
    //fin de formulario

    //formulario marca
    des_mar: string = "";
    submittedMarca: boolean = false;
    displayFormMarca: boolean = false;
    titlePanelMarca: string = "Registrar Marca"
    formModeMarca: boolean = true; //true = crear //false = editar
    submitLabelMarca: string = "Guardar"
    //fin marca
    //formulario modelo
    des_mod: string = "";
    submittedModelo: boolean = false;
    displayFormModelo: boolean = false;
    titlePanelModelo: string = "Registrar Modelo"
    formModeModelo: boolean = true; //true = crear //false = editar
    submitLabelModelo: string = "Guardar";
    //fin modelo
    //formulario Unidad de Medida
    nom_unimed: string = "";
    des_unimed: string = "";
    submittedUnimed: boolean = false;
    displayFormUnimed: boolean = false;
    titlePanelUnimed: string = "Registrar Unidad de Medida"
    formModeUnimed: boolean = true; //true = crear //false = editar
    submitLabelUnimed: string = "Guardar"
    //fin Unidad de Medida
    //formulario Fabricante
    des_fab: string = "";
    submittedFabricante: boolean = false;
    displayFormFabricante: boolean = false;
    titlePanelFabricante: string = "Registrar Fabricante"
    formModeFabricante: boolean = true; //true = crear //false = editar
    submitLabelFabricante: string = "Guardar"
    //fin Fabricante

    //display de modales referenciales
    displayModalMarca: boolean = false;
    displayModalModelo: boolean = false;
    displayModalUniMed: boolean = false;
    displayModalFabricante: boolean = false;
    //fin display referenciales

    //tabla
    productos: Producto[];
    dropdown: Dropdown;
    selectedProducto: Producto;
    totalRegistros: number;
    rowsNumber: number = 10;
    loading: boolean = false;
    //fin tabla

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private productosService: ProductosService,

            private marcaService: MarcaService,
            private modeloService: ModeloService,
            private fabricanteService: FabricanteService,
            private unimedService: UniMedService,

            public activatedroute: ActivatedRoute, 
            public gS: GeneralService,
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.getProductos();

        this.getModelo();
        this.getFabricante();
        this.getUniMed();
        this.getMarca();
        this.getMonedas();
    }

    getMarca(){
        this.marcaService.getMarcas(null).subscribe(
            (_marcas: GeneralCollection<Marca>) => {
                this.marcas = _marcas['data'];
                
            },
            (error) => {
                
            }
        );
    }
    getModelo(){
        this.modeloService.getModelos(null).subscribe(
            (_modelos: GeneralCollection<Modelo>) => {
                this.modelos = _modelos['data'];
            },
            (error) => {
                
            }
        );
    }
    getFabricante(){
        this.fabricanteService.getFabricantes(null).subscribe(
            (_fabricantes: GeneralCollection<Fabricante>) => {
                this.fabricantes = _fabricantes['data'];
            },
            (error) => {
                
            }
        );
    }
    getUniMed(){
        this.unimedService.getUniMeds(null).subscribe(
            (_unimeds: GeneralCollection<UniMed>) => {
                this.unimeds = _unimeds['data'];
            },
            (error) => {
                
            }
        );
    }

    getMonedas() {
        this.monedas = [
            {label: "SOL", value: 1},
            {label: "DOLAR", value: 2},
        ];
    }

    //métodos referenciales
    newMarca() {
        this.resetFormMarca();
        this.displayFormMarca = true;
    }
    newModelo() {
        this.resetFormModelo();
        this.displayFormModelo = true;
    }
    newUniMed() {
        this.resetFormUnimed();
        this.displayFormUnimed = true;
    }
    newFabricante() {
        this.resetFormFabricante();
        this.displayFormFabricante = true;
      }

    resetFormMarca() {
        this.id_mar = -1;
        this.des_mar = "";
        this.submittedMarca = false;
    }
    resetFormModelo() {
        this.id_mod = -1;
        this.des_mod = "";
        this.submittedModelo = false;
    }
    resetFormUnimed() {
        this.id_unimed = -1;
        this.nom_unimed = "";
        this.des_unimed = "";
        this.submittedUnimed = false;
    }
    resetFormFabricante() {
        this.id_fab = -1;
        this.des_fab = "";
        this.submittedFabricante = false;
        this.titlePanelFabricante = "Registrar Fabricante";
        this.submitLabelFabricante = "Guardar";
    }

    submitMarca() {
        this.submittedMarca = true;
        this.showbar = true;
        if (!this.validMarca) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {
            let marca = new Marca();
            marca.id_mar = this.id_mar;
            marca.des_mar = this.des_mar;
            this.marcaService.createMarca(marca).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'Marca registrada');
                    this.getMarca();
                    this.resetFormMarca();
                    this.cancelMarca();
                    this.showbar = false;
                },
                (error) => {
                    this.showbar = false;
                    this.showMessage('error', 'Error', 'Ocurrio un problema De Marca en el servidor');
                });
        }
    }
    submitModelo(){
        this.submittedModelo = true;
        this.showbar = true;
        if(!this.validModelo) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {
            let modelo = new Modelo();
            modelo.id_mod = this.id_mod;
            modelo.des_mod = this.des_mod;
            this.modeloService.createModelo(modelo).subscribe(
            (_resp) => {
                this.showMessage('success', 'Exito¡', 'Modelo registrado');
                this.getModelo();
                this.resetFormModelo();
                this.cancelModelo();
                this.showbar = false;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema de Modelo en el servidor');
                this.showbar = false;
            });
        }
    }
    submitUnimed() {
        this.submittedUnimed = true;
        this.showbar = true;
        if (!this.validNomUnimed) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {
            let unimed = new UniMed();
            unimed.id_unimed = this.id_unimed;
            unimed.nom_unimed = this.nom_unimed;
            unimed.des_unimed = this.des_unimed;
            this.unimedService.createUnimed(unimed).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'Unidad de Medida Registrada');
                    this.getUniMed();
                    this.resetFormUnimed();
                    this.cancelUnimed();
                    this.showbar = false;
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                    this.showbar = false;
                });
        }
    }
    submitFabricante(){
        this.submittedFabricante = true;
        this.showbar = true;
        if(!this.validFabricante) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {
            let fabricante = new Fabricante();
            fabricante.id_fab = this.id_fab;
            fabricante.des_fab = this.des_fab;
            this.fabricanteService.createFabricante(fabricante).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'Fabricante registrado');
                    this.getFabricante();
                    this.resetFormFabricante();
                    this.cancelFabricante();
                    this.showbar = false;
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                    this.showbar = false;
                });
            }
        }

    cancelMarca() {
        this.submittedMarca = false;
        this.resetFormMarca();
        this.displayFormMarca = false;
    }
    cancelModelo() {
        this.submittedModelo = false;
        this.resetFormModelo();
        this.displayFormModelo = false;
    }
    cancelUnimed() {
        this.submittedUnimed = false;
        this.resetFormUnimed();
        this.displayFormUnimed = false;
    }
    cancelFabricante() {
        this.submittedFabricante = false;
        this.resetFormFabricante();
        this.displayFormFabricante = false;
    }

    //fin métodos referenciales

    getProductos() {
        this.loading = true;
        this.productosService.getProductos(null).subscribe(
            (_productos: GeneralCollection<Producto>) => {
                this.productos = [];
                this.productos = _productos['data'];
                this.totalRegistros = _productos['size'];
                this.loading = false;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                this.loading = false;
            }
        );
    }

    resetForm() {
        this.id_prod = -1;
        this.cod_prod = "";
        this.num_parte_prod = "";
        this.stk_prod = null;
        this.des_prod = "";
        this.pre_com_prod = null;

        this.selectedMoneda = null;
        this.selectedUnimed = null;
        this.selectedFabricante = null;
        this.selectedModelo = null;
        this.selectedMarca = null;
        
        this.submitted = false;
        this.submitLabel = "Guardar";
        this.titlePanel = "Registrar Producto"
        this.formMode = true;
    }

    setForm(p: Producto) {

        this.id_prod = p.id_prod;
        this.cod_prod = p.cod_prod;
        this.num_parte_prod = p.num_parte_prod;
        this.stk_prod = p.stk_prod;
        this.des_prod = p.des_prod;
        this.pre_com_prod = p.pre_com_prod;
        
        var s_mon = this.monedas.filter( unit => unit.value === p.mon_prod );
        this.selectedMoneda = (s_mon.length > 0) ? s_mon[0] : null;
        var s_mod = this.modelos.filter( unit => unit.id_mod === p.id_mod );
        this.selectedModelo = (s_mod.length > 0) ? s_mod[0] : null;
        var s_mar = this.marcas.filter( unit => unit.id_mar === p.id_mar );
        this.selectedMarca = (s_mar.length > 0) ? s_mar[0] : null;
        var s_fab = this.fabricantes.filter( unit => unit.id_fab === p.id_fab );
        this.selectedFabricante = (s_fab.length > 0) ? s_fab[0] : null;
        var s_und =  this.unimeds.filter( unit => unit.id_unimed === p.id_unimed );
        this.selectedUnimed = (s_und.length > 0) ? s_und[0] : null;
    }

    submit() {
        this.submitted = true;
        this.showbar = true;
        this.id_mar = (this.selectedMarca) ? this.selectedMarca.id_mar : null;
        this.id_mod = (this.selectedModelo) ? this.selectedModelo.id_mod : null;
        this.id_unimed = (this.selectedUnimed) ? this.selectedUnimed.id_unimed : null;
        this.id_fab = (this.selectedFabricante) ? this.selectedFabricante.id_fab : null;

        if(!this.validDescripcion) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let product = new Producto();
            product.id_prod = this.id_prod;
            product.cod_prod = this.cod_prod;
            product.num_parte_prod = this.num_parte_prod;
            product.stk_prod = this.stk_prod;
            product.des_prod = this.des_prod;
            product.pre_com_prod = this.pre_com_prod;
            product.mon_prod = (this.selectedMoneda) ? this.selectedMoneda.value : null;
            product.id_mod = this.id_mod;
            product.id_mar = this.id_mar;
            product.id_fab = this.id_fab;
            product.id_unimed = this.id_unimed;
            
            if(this.formMode) {
                this.productosService.createProducto(product).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Producto registrado');
                        this.getProductos();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedProducto = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        
                        this.showbar = false;
                });    
            } else {
                this.productosService.updateProducto(product).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Producto actualizado');
                        this.getProductos();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedProducto = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        this.showbar = false;
                });
            }
        }
    }

    // update(producto: Producto) {
    //     this.formMode = false;
    //     this.setForm(producto);
    //     this.titlePanel = "Actualizar Producto";
    //     this.submitLabel = "Actualizar"
    // }
    
    // delete(producto: Producto) {
        
        
    // }

    //modales referenciales
    
    //fin modales


    newProduct() {
        this.resetForm();
        this.displayModal = true;
    }

    editProduct() {
        if(this.selectedProducto) {
            this.formMode = false;
            this.setForm(this.selectedProducto);
            this.titlePanel = "Actualizar Producto";
            this.submitLabel = "Actualizar"
            this.displayModal = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un producto');
        }
    }

    deleteProduct() {
        if(this.selectedProducto) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar este producto',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                accept: () => {
                    this.productosService.deleteProducto(this.selectedProducto.id_prod).subscribe(
                        (_resp) => {
                            
                            this.showMessage('success', 'Exito', 'Producto eliminado');
                            this.getProductos();
                            this.selectedProducto = null;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');

                    });
                },
                reject: () => {
                    
                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un producto');
        }
    }

    cancel() {
		this.submitted = false;
		this.resetForm();
		this.displayModal = false;
    }

    //validadores

    get validDescripcion(): boolean {
        return this.des_prod !== "";
    }
    get validNumPart(): boolean {
        return this.num_parte_prod !== "";
    }
    get validPreCom(): boolean {
        return this.pre_com_prod >= 0;
    }
    get validStock(): boolean {
        return this.stk_prod >= 0;
    }
    //end validadores

    //validadores marca
    get validMarca(): boolean {
        return this.des_mar !== "";
    }
    get validModelo(): boolean {
        return this.des_mod !== "";
    }
    get validNomUnimed(): boolean {
        return this.nom_unimed !== "";
    }
    get validFabricante(): boolean {
        return this.des_fab !== "";
    }
    //

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
}

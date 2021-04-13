import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api/menuitem';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    items: MenuItem[];
    home: MenuItem;

    constructor(private http: HttpClient) {
        // var menu_item : MenuItem = { label: title }
        this.items = [];
        // this.items = [
        //     menu_item,
        // ];
        this.home = {icon: 'pi pi-home', url: '#'};
    }
    
    setTitle(titulos: string[]) {
        this.items = [];
        titulos.map((item : string) => {
            var menu_item : MenuItem = { label: item }
            this.items.push(menu_item);
        });
        // this.title = text;
    }


    ////conversion de numeros a letras
    // Unidades(num){

    //     switch(num)
    //     {
    //         case 1: return "UN";
    //         case 2: return "DOS";
    //         case 3: return "TRES";
    //         case 4: return "CUATRO";
    //         case 5: return "CINCO";
    //         case 6: return "SEIS";
    //         case 7: return "SIETE";
    //         case 8: return "OCHO";
    //         case 9: return "NUEVE";
    //     }
    
    //     return "";
    // }//Unidades()
    
    // Decenas(num){
    
    //     let decena = Math.floor(num/10);
    //     let unidad = num - (decena * 10);
    
    //     switch(decena)
    //     {
    //         case 1:
    //             switch(unidad)
    //             {
    //                 case 0: return "DIEZ";
    //                 case 1: return "ONCE";
    //                 case 2: return "DOCE";
    //                 case 3: return "TRECE";
    //                 case 4: return "CATORCE";
    //                 case 5: return "QUINCE";
    //                 default: return "DIECI" + this.Unidades(unidad);
    //             }
    //         case 2:
    //             switch(unidad)
    //             {
    //                 case 0: return "VEINTE";
    //                 default: return "VEINTI" + this.Unidades(unidad);
    //             }
    //         case 3: return this.DecenasY("TREINTA", unidad);
    //         case 4: return this.DecenasY("CUARENTA", unidad);
    //         case 5: return this.DecenasY("CINCUENTA", unidad);
    //         case 6: return this.DecenasY("SESENTA", unidad);
    //         case 7: return this.DecenasY("SETENTA", unidad);
    //         case 8: return this.DecenasY("OCHENTA", unidad);
    //         case 9: return this.DecenasY("NOVENTA", unidad);
    //         case 0: return this.Unidades(unidad);
    //     }
    // }//Unidades()
    
    // DecenasY(strSin, numUnidades) {
    //     if (numUnidades > 0)
    //     return strSin + " Y " + this.Unidades(numUnidades)
    
    //     return strSin;
    // }//DecenasY()
    
    // Centenas(num) {
    //     let centenas = Math.floor(num / 100);
    //     let decenas = num - (centenas * 100);
    
    //     switch(centenas)
    //     {
    //         case 1:
    //             if (decenas > 0)
    //                 return "CIENTO " + this.Decenas(decenas);
    //             return "CIEN";
    //         case 2: return "DOSCIENTOS " + this.Decenas(decenas);
    //         case 3: return "TRESCIENTOS " + this.Decenas(decenas);
    //         case 4: return "CUATROCIENTOS " + this.Decenas(decenas);
    //         case 5: return "QUINIENTOS " + this.Decenas(decenas);
    //         case 6: return "SEISCIENTOS " + this.Decenas(decenas);
    //         case 7: return "SETECIENTOS " + this.Decenas(decenas);
    //         case 8: return "OCHOCIENTOS " + this.Decenas(decenas);
    //         case 9: return "NOVECIENTOS " + this.Decenas(decenas);
    //     }
    
    //     return this.Decenas(decenas);
    // }//Centenas()
    
    // Seccion(num, divisor, strSingular, strPlural) {
    //     let cientos = Math.floor(num / divisor)
    //     let resto = num - (cientos * divisor)
    
    //     let letras = "";
    
    //     if (cientos > 0)
    //         if (cientos > 1)
    //             letras = this.Centenas(cientos) + " " + strPlural;
    //         else
    //             letras = strSingular;
    
    //     if (resto > 0)
    //         letras += "";
    
    //     return letras;
    // }//Seccion()
    
    // Miles(num) {
    //     let divisor = 1000;
    //     let cientos = Math.floor(num / divisor)
    //     let resto = num - (cientos * divisor)
    
    //     let strMiles = this.Seccion(num, divisor, "UN MIL", "MIL");
    //     let strCentenas = this.Centenas(resto);
    
    //     if(strMiles == "")
    //         return strCentenas;
    
    //     return strMiles + " " + strCentenas;
    // }//Miles()
    
    // Millones(num) {
    //     let divisor = 1000000;
    //     let cientos = Math.floor(num / divisor)
    //     let resto = num - (cientos * divisor)
    
    //     let strMillones = this.Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    //     let strMiles = this.Miles(resto);
    
    //     if(strMillones == "")
    //         return strMiles;
    
    //     return strMillones + " " + strMiles;
    // }//Millones()
    
    // NumeroALetras(num: number, moneda?: number) {
    //     var data = {
    //         numero : num,
    //         enteros: Math.floor(num),
    //         centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    //         letrasCentavos: "",
    //         letrasMonedaPlural: (moneda) ? (moneda === 1 ? 'SOLES' : 'DOLARES') : '',
    //         letrasMonedaSingular: (moneda) ? (moneda === 1 ? 'SOL' : 'DOLAR') : '',
    
    //         letrasMonedaCentavoPlural: (moneda) ? (moneda === 1 ? 'CENTIMOS' : 'CENTAVOS') : '',
    //         letrasMonedaCentavoSingular: (moneda) ? (moneda === 1 ? 'CENTIMO' : 'CENTAVO') : ''
    //     };
    
    //     if (data.centavos > 0) {
    //         data.letrasCentavos = "CON " + (function (){
    //             if (data.centavos == 1)
    //                 return this.Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
    //             else
    //                 return this.Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
    //             })();
    //     };
    
    //     if(data.enteros == 0)
    //         return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    //     if (data.enteros == 1)
    //         return this.Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    //     else
    //         return this.Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    // }


    //////////////////////////////////
    Unidades(num){
        
        switch(num)
        {
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }

        return '';
    }//Unidades()

    Decenas(num){

        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);

        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + this.Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + this.Unidades(unidad);
                }
            case 3: return this.DecenasY('TREINTA', unidad);
            case 4: return this.DecenasY('CUARENTA', unidad);
            case 5: return this.DecenasY('CINCUENTA', unidad);
            case 6: return this.DecenasY('SESENTA', unidad);
            case 7: return this.DecenasY('SETENTA', unidad);
            case 8: return this.DecenasY('OCHENTA', unidad);
            case 9: return this.DecenasY('NOVENTA', unidad);
            case 0: return this.Unidades(unidad);
        }
    }//Unidades()

    DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + this.Unidades(numUnidades)

        return strSin;
    }//DecenasY()

    Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + this.Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
            case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
            case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
        }

        return this.Decenas(decenas);
    }//Centenas()

    Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = this.Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    }//Seccion()

    Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = this.Centenas(resto);

        if(strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    }//Miles()

    Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = this.Miles(resto);

        if(strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    }//Millones()

    NumeroALetras(num: number, moneda?: number) {
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: '',
            letrasMonedaSingular: '',
            //letrasMonedaPlural: (moneda) ? (moneda === 1 ? ' SOLES' : ' DOLARES AMERICANOS') : '',
            //letrasMonedaSingular: (moneda) ? (moneda === 1 ? ' SOL' : ' DOLAR AMERICANO') : '',
            letrasMonedaCentavoPlural: (moneda) ? (moneda === 1 ? ' SOLES' : ' DOLARES AMERICANOS') : '',
            letrasMonedaCentavoSingular: (moneda) ? (moneda === 1 ? ' SOLES' : ' DOLARES AMERICANOS') : ''
        };

        if (data.centavos > 0) {
            //data.letrasCentavos = 'CON ' + ((data.centavos == 1) ? (this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular) : (this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural));
            data.letrasCentavos = 'CON ' + ((data.centavos == 1) ? ((data.centavos + '/100') + ' ' + data.letrasMonedaCentavoSingular) : ((data.centavos + '/100') + ' ' + data.letrasMonedaCentavoPlural));
        } else {
            data.letrasCentavos = data.letrasMonedaCentavoPlural;
        }

        if(data.enteros == 0)
            //return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            return 'CERO' + ' ' + data.letrasMonedaPlural;
        if (data.enteros == 1)
            return this.Millones(data.enteros) + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
            //return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular;
        else
            return this.Millones(data.enteros) + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            //return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural;
    };

}

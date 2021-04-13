export class Kardex {
    id_kar: number;
    fec_kar: Date;
    cod_kar: string;
    id_ord_det: number;
    id_ord_com: number;
    prod_desc: string;
    prod_numpar: string;
    prod_unimed: string;
    prod_cant: number;
    prov_razsoc: string;
    fac_kar: string;
    guirem_kar: string;
    bol_kar: string;
    tip_kar: string;
    id_col: number;
    col_usu: string;
    ord_com_det_est: string;
    ord_com_det_feclleg: string;
    ord_com_det_canent: number;
    ord_com_det_canfal: number;
    est_reg: string;
}

export class KardexJSON {
    kardex_ingreso: Kardex[];
    logo: any;
    extension: any;
}
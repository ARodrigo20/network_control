<?php

namespace App\Http\Controllers\ProformaCliente;

use App\Http\Controllers\Utilitarios\Console;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\Controller;
use App\Models\Clientes\Cliente;
use App\Models\Clientes\ClienteDireccion;
use App\Models\Proveedores\ProveedorDireccion;
use App\Models\ProformaCliente\ProformaCliente;
use App\Models\ProformaCliente\ProformaClienteDet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DateTime;

/**
 * @group ProformaCliente
 * APIs para proforma cliente
 */


class ProformaClienteController extends Controller
{

    /**
     * Retornar proformas cliente
     *
     * Retorna todas las proformas cliente activas y anuladas
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              "id_pro": 0,
     *              "id_cli": 0,
     *              "prof_fec": "date",
     *              "prof_mon": 0,
     *              "id_proy": 0,
     *              "id_col": 0,
     *              "solcli_id": 0,
     *              "prof_cre": 0,
     *              "prof_imp_ini": 0,
     *              "prof_int": 0,
     *              "prof_cuo": 0,
     *              "prof_val": "string",
     *              "prof_tie_ent": "string",
     *              "prof_cos_dir": 0,
     *              "prof_gas_ind": 0,
     *              "prof_uti": 0,
     *              "prof_bas_imp": 0,
     *              "prof_tie_ins": "string",
     *              "prof_con_pag": "string",
     *              "prof_igv": 0,
     *              "prof_neto": 0,
     *              "prof_fac": 0,
     *              "prof_finan": 0,
     *              "prof_val_cuo": 0,
     *              "prof_cli_id_dir": 0,
     *              "prof_cli_id_con": 0,
     *              "prof_cli_ciu":"String",
     *              "prof_cod":"2020-1",
     *              "est_reg": "string",
     *              "est_env": "string",
     *              "proyecto":{
     *                  "id_proy":0,
     *                  "nom_proy":"string",
     *                  "ser_proy": "string",
     *                  "num_proy": 0,
     *                  "id_cli": 0,
     *                  "est_reg": "string"
     *              },
     *              "cliente": {
     *                  "id_cli": 0,
     *                  "razsoc_cli": "string",
     *                  "numdoc_cli": 0,
     *                  "ema_cli": "string",
     *                  "id_tipdoc": 0,
     *                  "est_reg": "string"
     *              },
     *              "usuario": {
     *                  "id_col": 0,
     *                  "nom_col": "string",
     *                  "ape_col": "string"
     *              },
     *              "cliente_contacto": {
     *                  "nom_cli_con": "string",
     *                  "ema_cli_con": "string"
     *              }
     *          }
     *      ],
     *      "size":0
     * }
     */
    public function get()
    {
        try {
            $proforma_cabecera = ProformaCliente::with(['proyecto', 'cliente','usuario','cliente_contacto','cliente_direccion'])->orderBy('id_pro', 'desc')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
        return response()->json([
            'data' => $proforma_cabecera,
            'size' => count($proforma_cabecera),
        ], 200, [], JSON_NUMERIC_CHECK);
    }


    /**
     * Retornar proforma del cliente
     *
     * Retorna proforma del cliente por medio de su Id
     *
     * @urlParam  id required El ID de la proforma del cliente.
     *
     * @response {
     *              "id_pro": 0,
     *              "id_cli": 0,
     *              "prof_fec": "date",
     *              "prof_mon": 0,
     *              "id_proy": 0,
     *              "id_col": 0,
     *              "solcli_id": 0,
     *              "prof_cre": 0,
     *              "prof_imp_ini": 0,
     *              "prof_int": 0,
     *              "prof_cuo": 0,
     *              "prof_val": "string",
     *              "prof_tie_ent": "string",
     *              "prof_cos_dir": 0,
     *              "prof_gas_ind": 0,
     *              "prof_uti": 0,
     *              "prof_bas_imp": 0,
     *              "prof_tie_ins": "string",
     *              "prof_con_pag":"string,
     *              "prof_igv": 0,
     *              "prof_neto": 0,
     *              "prof_fac": 0,
     *              "prof_finan": 0,
     *              "prof_val_cuo": 0,
     *              "prof_cli_id_dir": 0,
     *              "prof_cli_id_con": 0,
     *              "est_reg": "string",
     *              "prof_cli_ciu":"String",
     *              "prof_cod":"2020-1",
     *              "proyecto":{
     *                  "id_proy":0,
     *                  "nom_proy":"string",
     *                  "ser_proy": "string",
     *                  "num_proy": 0,
     *                  "id_cli": 0,
     *                  "est_reg": "string"
     *              },
     *              "cliente": {
     *                  "id_cli": 0,
     *                  "razsoc_cli": "string",
     *                  "numdoc_cli": 0,
     *                  "ema_cli": "string",
     *                  "id_tipdoc": 0,
     *                  "est_reg": "string"
     *              },
     *              "cliente_contacto": {
     *                  "nom_cli_con": "string",
     *                  "ema_cli_con": "string"
     *              },
     *              "cliente_direccion": {
     *                  "dir_cli": "string"
     *              },
     *              "usuario": {
     *                  "id_col": 0,
     *                  "nom_col": "string",
     *                  "ape_col": "string"
     *              },
     *              "producto": {
     *                  "id_prod": 6,
     *                  "unidad_medida": {
     *                      "id_unimed": 8,
     *                      "nom_unimed": "string",
     *                      "des_unimed": "string"
     *                  }
     *              },
     *              "proforma_detalle": [
     *                  {
     *                      "id_prof_det": 0,
     *                      "id_pro": 0,
     *                      "id_prod": 0,
     *                      "prof_det_can": 0,
     *                      "prof_det_pre_lis": 0,
     *                      "prof_det_imp": 0,
     *                      "prof_det_cos": 0,
     *                      "prof_det_tcos": 0,
     *                      "prof_det_por_com": 0,
     *                      "prof_det_com": 0,
     *                      "id_prov": 0,
     *                      "prof_prod_serv": 0,
     *                      "prof_des_prod": "string",
     *                      "prof_can_prod": 0,
     *                      "prof_dir_prov": "string",
     *                      "prof_ema_prov": "algo@gmail.com",
     *                      "seccion": {
     *                          "id_sec": 1,
     *                          "des_sec": "string",
     *                          "est_reg": "A"
     *                      }
     *                  }
     *              ]
     *          }
     */
    public function getById($id)
    {
        try {
            $proforma_cabecera = ProformaCliente::with(['proyecto', 'cliente', 'proforma_detalle','usuario','cliente_contacto','cliente_direccion'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        if ($proforma_cabecera) {
            return response()->json($proforma_cabecera, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro la proforma cliente',
            ], 500);
        }
    }



    /**
     * Crear Proforma Cliente
     *
     * Crea una proforma cliente
     *
     * @bodyParam id_cli int Id del cliente.
     * @bodyParam prof_mon int Moneda de la proforma.
     * @bodyParam id_proy int Id del proyecto.
     * @bodyParam id_col int Id del colaborador.
     * @bodyParam solcli_id int Id de la solicitud de cliente.
     * @bodyParam prof_cre int Codigo de seleccion del cliente (1-2-3).
     * @bodyParam prof_imp_ini float Importe inicial.
     * @bodyParam prof_int float Interes, Porcentaje de Interes.
     * @bodyParam prof_cuo int Cuotas.
     * @bodyParam prof_val string Validez de la proforma.
     * @bodyParam prof_tie_ent string Tiempo de entrega.
     * @bodyParam prof_cos_dir float Costo directo.
     * @bodyParam prof_gas_ind float Gastos indirectos.
     * @bodyParam prof_uti float Utilidad.
     * @bodyParam prof_bas_imp float Base imponible.
     * @bodyParam prof_igv float float IGV.
     * @bodyParam prof_neto float Neto a pagar.
     * @bodyParam prof_fac float Factor.
     * @bodyParam prof_finan float Financiacion.
     * @bodyParam prof_val_cuo float Valor Cuota.
     * @bodyParam prof_cli_id_dir int Id de la direccion de cliente.
     * @bodyParam prof_cli_id_con int Id del contacto de cliente.
     * @bodyParam prof_obs  char observaciones del cliente.
     * @bodyParam prof_tie_ins  char proforma tiempo de instalacion.
     * @bodyParam prof_con_pag  char Condiciones de pago.
     * @bodyParam prof_desc float procentaje de descuento.
     * @bodyParam prof_cli_ciu Direccion del cliente.
     * @bodyParam proforma_detalle array required Ejemplo: [{"id_prof_det": 1,"id_pro": 5,"id_prod": 10,"prof_det_can": 10,"prof_det_pre_lis": 20,"prof_det_imp": 10,"prof_det_cos": 10,"prof_det_tcos": 10, "prof_det_por_com": 0, "prof_det_com": 10,"id_prov": 2,"id_sec": 1,"prof_prod_serv": 1,"prof_des_prod": "producto","prof_can_prod": 10,  "prof_dir_prov": "String", "prof_ema_prov": "algo@gmail.com"}]
     * 
     * @response {
     *    "resp": "proforma cliente creada"
     * }
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        
        // $cliente_direccion = ClienteDireccion::find($request->input('id_cli_dir'));
        // $cli_ciu = $cliente_direccion->ciu_cli;
        // echo Console::log('un_nombre', $cliente);
        try {
            $proformaCliente = ProformaCliente::create([
                'id_cli' => $request->input('id_cli'),
                'prof_fec' => new DateTime(),
                'prof_mon' => $request->input('prof_mon'),
                'id_proy' => $request->input('id_proy'),
                'id_col' => $request->input('id_col'),
                'solcli_id' => $request->input('solcli_id'),
                'prof_cre' => $request->input('prof_cre'),
                'prof_imp_ini' => $request->input('prof_imp_ini'),
                'prof_int' => $request->input('prof_int'),
                'prof_cuo' => $request->input('prof_cuo'),
                'prof_val' => $request->input('prof_val'),
                'prof_tie_ent' => $request->input('prof_tie_ent'),
                'prof_cos_dir' => $request->input('prof_cos_dir'),
                'prof_gas_ind' => $request->input('prof_gas_ind'),
                'prof_uti' => $request->input('prof_uti'),
                'prof_bas_imp' => $request->input('prof_bas_imp'),
                'prof_igv' => $request->input('prof_igv'),
                'prof_neto' => $request->input('prof_neto'),
                'prof_fac' => $request->input('prof_fac'),
                'prof_finan' => $request->input('prof_finan'),
                'prof_val_cuo' => $request->input('prof_val_cuo'),
                'prof_cli_id_dir' => $request->input('prof_cli_id_dir'),
                'prof_cli_id_con' => $request->input('prof_cli_id_con'),
                'prof_obs' => $request->input('prof_obs'),
                'prof_desc' => $request->input('prof_desc'),
                'prof_cli_ciu' => $request->input('prof_cli_ciu'),
                'prof_tie_ins' => $request->input('prof_tie_ins'),
                'prof_con_pag' => $request->input('prof_con_pag'),
                'prof_cod' => $this->next_cod(),
                'est_env' => '0',
                'est_reg' => 'A',
            ]);

            $detalles = $request->input('proforma_detalle');

            if($detalles) {
                foreach($detalles as $detalle) {
                    $proformaClientedet = ProformaClienteDet::create([
                        'id_pro' => $proformaCliente->id_pro,
                        'id_prod' => $detalle['id_prod'],
                        'prof_det_can' => $detalle['prof_det_can'],
                        'prof_det_pre_lis' => $detalle['prof_det_pre_lis'],
                        'prof_det_imp' => $detalle['prof_det_imp'],
                        'prof_det_cos' => $detalle['prof_det_cos'],
                        'prof_det_tcos' => $detalle['prof_det_tcos'],
                        'prof_det_por_com' => $detalle['prof_det_por_com'],
                        'prof_det_com' => $detalle['prof_det_com'],
                        'id_prov' => $detalle['id_prov'],
                        'prof_prod_serv' => $detalle['prof_prod_serv'],
                        'prof_des_prod' => $detalle['prof_des_prod'],
                        'prof_can_prod' => $detalle['prof_can_prod'],
                        'prof_det_stock' => $detalle['prof_det_stock'],
                        'prof_dir_prov' => $detalle['prof_dir_prov'],
                        'id_prov_dir' => $detalle['id_prov_dir'],
                        'prof_ema_prov' => $detalle['prof_ema_prov'],
                        'id_sec' => $detalle['id_sec'],
                        'est_reg' => 'A'
                    ]);
                }
            }

            DB::commit();
            //all good
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
        //Logs
        $descripcion = "Se creo la proforma de cliente con codigo: PROFORMA-".sprintf("%'.04d", $proformaCliente->id_pro);
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Proforma cliente creada',
        ], 200, [], JSON_NUMERIC_CHECK);
    }


    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $proformaCliente = ProformaCliente::find($id);
            $proformaCliente->fill(array(
                'id_cli' => $request->input('id_cli'),
                'prof_mon' => $request->input('prof_mon'),
                'id_proy' => $request->input('id_proy'),
                'id_col' => $request->input('id_col'),
                'solcli_id' => $request->input('solcli_id'),
                'prof_cre' => $request->input('prof_cre'),
                'prof_imp_ini' => $request->input('prof_imp_ini'),
                'prof_int' => $request->input('prof_int'),
                'prof_cuo' => $request->input('prof_cuo'),
                'prof_val' => $request->input('prof_val'),
                'prof_tie_ent' => $request->input('prof_tie_ent'),
                'prof_cos_dir' => $request->input('prof_cos_dir'),
                'prof_gas_ind' => $request->input('prof_gas_ind'),
                'prof_uti' => $request->input('prof_uti'),
                'prof_bas_imp' => $request->input('prof_bas_imp'),
                'prof_igv' => $request->input('prof_igv'),
                'prof_neto' => $request->input('prof_neto'),
                'prof_fac' => $request->input('prof_fac'),
                'prof_finan' => $request->input('prof_finan'),
                'prof_val_cuo' => $request->input('prof_val_cuo'),
                'prof_cli_id_dir' => $request->input('prof_cli_id_dir'),
                'prof_cli_id_con' => $request->input('prof_cli_id_con'),
                'prof_obs' => $request->input('prof_obs'),
                'prof_desc' => $request->input('prof_desc'),
                'prof_cli_ciu' => $request->input('prof_cli_ciu'),
                'prof_tie_ins' => $request->input('prof_tie_ins'),
                'prof_con_pag' => $request->input('prof_con_pag'),
            ))->save();

            $detalles = $request->input('proforma_detalle');

            if($detalles) {
                foreach($detalles as $detalle) {
                    //nuevos => id < 0 //existentes > 0
                    if($detalle['id_prof_det'] < 0){
                        $proformaClientedet = ProformaClienteDet::create([
                            'id_pro' => $proformaCliente->id_pro,
                            'id_prod' => $detalle['id_prod'],
                            'prof_det_can' => $detalle['prof_det_can'],
                            'prof_det_pre_lis' => $detalle['prof_det_pre_lis'],
                            'prof_det_imp' => $detalle['prof_det_imp'],
                            'prof_det_cos' => $detalle['prof_det_cos'],
                            'prof_det_tcos' => $detalle['prof_det_tcos'],
                            'prof_det_por_com' => $detalle['prof_det_por_com'],
                            'prof_det_com' => $detalle['prof_det_com'],
                            'id_prov' => $detalle['id_prov'],
                            'prof_prod_serv' => $detalle['prof_prod_serv'],
                            'prof_des_prod' => $detalle['prof_des_prod'],
                            'prof_can_prod' => $detalle['prof_can_prod'],
                            'prof_det_stock' => $detalle['prof_det_stock'],
                            'prof_dir_prov' => $detalle['prof_dir_prov'],
                            'id_prov_dir' => $detalle['id_prov_dir'],
                            'prof_ema_prov' => $detalle['prof_ema_prov'],
                            'id_sec' => $detalle['id_sec'],
                            'est_reg' => 'A'
                        ]);
                    } else {
                        $proformaClientedet = ProformaClienteDet::find($detalle['id_prof_det']);
                        $proformaClientedet->fill(array(
                            'id_prod' => $detalle['id_prod'],
                            'prof_det_can' => $detalle['prof_det_can'],
                            'prof_det_pre_lis' => $detalle['prof_det_pre_lis'],
                            'prof_det_imp' => $detalle['prof_det_imp'],
                            'prof_det_cos' => $detalle['prof_det_cos'],
                            'prof_det_tcos' => $detalle['prof_det_tcos'],
                            'prof_det_por_com' => $detalle['prof_det_por_com'],
                            'prof_det_com' => $detalle['prof_det_com'],
                            'id_prov' => $detalle['id_prov'],
                            'prof_prod_serv' => $detalle['prof_prod_serv'],
                            'prof_des_prod' => $detalle['prof_des_prod'],
                            'prof_can_prod' => $detalle['prof_can_prod'],
                            'prof_det_stock' => $detalle['prof_det_stock'],
                            'prof_dir_prov' => $detalle['prof_dir_prov'],
                            'id_prov_dir' => $detalle['id_prov_dir'],
                            'prof_ema_prov' => $detalle['prof_ema_prov'],
                            'id_sec' => $detalle['id_sec'],
                            'est_reg' => $detalle['est_reg'],
                        ))->save();
                    }
                }
            }

            DB::commit();
            //all good
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
        //Logs
        $descripcion = "Se modifico la proforma de cliente con codigo: PROFORMA-".sprintf("%'.04d", $proformaCliente->id_pro);
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////
        return response()->json([
            'resp' => 'Proforma cliente creada',
        ], 200, [], JSON_NUMERIC_CHECK);
    }


    /**
     * Anular proforma de cliente
     *
     * Anula una proforma
     *
     * @urlParam  id required El ID de la proforma del cliente.
     *
     * @response {
     *    "resp": "Proforma anulada"
     * }
     */

    public function annul($id) {
        try {
            $proformaCliente = ProformaCliente::find($id);
            $proformaCliente->fill(array('est_reg' => 'AN'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        //Logs
        $descripcion = "Se anulo la proforma de cliente con codigo: PROFORMA-".sprintf("%'.04d", $proformaCliente->id_pro);
        $logs = new LogsController();
        $logs->create_log($descripcion, 4);
        ///////
        return response()->json([
            'resp' => 'Proforma del cliente Anulada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }


    public function next_cod()
    {
        $cod_cotizacion_max = DB::table('proforma_cliente')->whereYear('prof_fec', '=', date("Y"))->max('prof_cod');
        if($cod_cotizacion_max == null) $cod_cotizacion_max = date("Y")."-1";
        else {
            $numberStr = substr($cod_cotizacion_max,5,6);
            $max = intval($numberStr) + 1;
            $cod_cotizacion_max = date("Y")."-".$max;
        }
        return $cod_cotizacion_max;
    }


    /**
     * Modifica cabecera de la proforma cliente
     * 
     *
     * @urlParam  id required El Id de la cabecera de la proforma. 
     * @bodyParam id_cli int Id del cliente.
     * @bodyParam prof_mon int Moneda de la proforma.
     * @bodyParam id_proy int Id del proyecto.
     * @bodyParam id_col int Id del colaborador.
     * @bodyParam solcli_id int Id de la solicitud de cliente.
     * @bodyParam prof_cre int Codigo de seleccion del cliente (1-2-3).
     * @bodyParam prof_imp_ini float Importe inicial.
     * @bodyParam prof_int float Interes, Porcentaje de Interes.
     * @bodyParam prof_cuo int Cuotas.
     * @bodyParam prof_val string Validez de la proforma.
     * @bodyParam prof_tie_ent string Tiempo de entrega.
     * @bodyParam prof_cos_dir float Costo directo.
     * @bodyParam prof_gas_ind float Gastos indirectos.
     * @bodyParam prof_uti float Utilidad.
     * @bodyParam prof_bas_imp float Base imponible.
     * @bodyParam prof_igv float float IGV.
     * @bodyParam prof_neto float Neto a pagar.
     * @bodyParam prof_fac float Factor.
     * @bodyParam prof_finan float Financiacion.
     * @bodyParam prof_val_cuo float Valor Cuota.
     * @bodyParam prof_cli_id_dir int Id de la direccion de cliente.
     * @bodyParam prof_cli_id_con int Id del contacto de cliente.
     * @bodyParam prof_obs  char observaciones del cliente.
     * @bodyParam prof_tie_ins  char proforma tiempo de instalacion.
     * @bodyParam prof_con_pag  char Condiciones de pago.
     * @bodyParam prof_desc float porcentaje de descuento.
     * @bodyParam id_cli_dir Id direccion cliente.
     * @bodyParam prof_cli_ciu Direccion del cliente.
     * @response {
     *    "resp": "Proforma Actualizado.
     * }
     */
    public function updateHeaderProforma(Request $request, $id) 
    {
        try {
            $prof_cliente = ProformaCliente::find($id);
            $prof_cliente->fill(array(
                'id_cli' => $request->input('id_cli'),
                'prof_fec' => new DateTime(),
                'prof_mon' => $request->input('prof_mon'),
                'id_proy' => $request->input('id_proy'),
                'id_col' => $request->input('id_col'),
                'solcli_id' => $request->input('solcli_id'),
                'prof_cre' => $request->input('prof_cre'),
                'prof_imp_ini' => $request->input('prof_imp_ini'),
                'prof_int' => $request->input('prof_int'),
                'prof_cuo' => $request->input('prof_cuo'),
                'prof_val' => $request->input('prof_val'),
                'prof_tie_ent' => $request->input('prof_tie_ent'),
                'prof_cos_dir' => $request->input('prof_cos_dir'),
                'prof_gas_ind' => $request->input('prof_gas_ind'),
                'prof_uti' => $request->input('prof_uti'),
                'prof_bas_imp' => $request->input('prof_bas_imp'),
                'prof_igv' => $request->input('prof_igv'),
                'prof_neto' => $request->input('prof_neto'),
                'prof_fac' => $request->input('prof_fac'),
                'prof_finan' => $request->input('prof_finan'),
                'prof_val_cuo' => $request->input('prof_val_cuo'),
                'prof_cli_id_dir' => $request->input('prof_cli_id_dir'),
                'prof_cli_id_con' => $request->input('prof_cli_id_con'),
                'prof_obs' => $request->input('prof_obs'),
                'prof_desc' => $request->input('prof_desc'),
                'id_cli_dir' => $request->input('id_cli_dir'),
                'prof_cli_ciu' => $request->input('prof_cli_ciu'),
                'prof_tie_ins' => $request->input('prof_tie_ins'),
                'prof_con_pag' => $request->input('prof_con_pag'),
                'est_env' => '0',
                'est_reg' => 'A',
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }


        return response()->json([
            'resp' => 'Proforma Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modifica detalle de una proforma cliente
     * 
     * Modifica los campos de un solo detalle, todos los campos son editable excepto el id de proforma cabecera por obvias razones XD :)
     *
     * @urlParam  id required El ID del detalle de la proforma.
     * @bodyParam  id_prod num Id del producto.
     * @bodyParam prof_det_can num cantidad.
     * @bodyParam prof_det_pre_lis num precio de lista.
     * @bodyParam prof_det_imp num. 
     * @bodyParam prof_det_cos num.
     * @bodyParam prof_det_tcos num.
     * @bodyParam prof_det_com num.
     * @bodyParam id_prov num Id del proveedor.
     * @bodyParam id_sec num Id de la seccion.
     * @bodyParam prof_prod_serv string.
     * @bodyParam prof_des_prod string producto.
     * @bodyParam prof_can_prod num cantidad de producto.  
     * @bodyParam prof_dir_prov string direccion del proveedor.
     * @bodyParam prof_ema_prov string email del proveedro.
     * @bodyParam id_prov_dir num Id direccion proveedor.
     * @response {
     *    "resp": "Proforma detalle Actualizado"
     * }
     */
    public function updateDetailProforma(Request $detalle, $id) 
    {
        try {
            $proforma_cliente_det = ProformaClienteDet::find($id);
            $proforma_cliente_det->fill(array(
                        'id_prod' => $detalle['id_prod'],
                        'prof_det_can' => $detalle['prof_det_can'],
                        'prof_det_pre_lis' => $detalle['prof_det_pre_lis'],
                        'prof_det_imp' => $detalle['prof_det_imp'],
                        'prof_det_cos' => $detalle['prof_det_cos'],
                        'prof_det_tcos' => $detalle['prof_det_tcos'],
                        'prof_det_com' => $detalle['prof_det_com'],
                        'id_prov' => $detalle['id_prov'],
                        'prof_prod_serv' => $detalle['prof_prod_serv'],
                        'prof_des_prod' => $detalle['prof_des_prod'],
                        'prof_can_prod' => $detalle['prof_can_prod'],
                        'prof_det_stock' => $detalle['prof_det_stock'],
                        'id_prov_dir' => $detalle['id_prov_dir'],
                        'prof_dir_prov' => $detalle['prof_dir_prov'],
                        'prof_ema_prov' => $detalle['prof_ema_prov'],
                        'id_sec' => $detalle['id_sec'],
                        'est_reg' => 'A'
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

       
        ///////
        return response()->json([
            'resp' => 'Proforma detalle Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

}

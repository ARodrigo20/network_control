<?php

namespace App\Http\Controllers\Kardex;

use DateTime;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\LogsController;

use Mockery\Exception;
use Symfony\Component\HttpFoundation\Response;

use App\Models\Empresa\Empresa;
use App\Models\Kardex\Kardex;
use Illuminate\Support\Facades\Storage;
use App\Models\OrdenCompra\OrdenCompra;
use App\Models\OrdenCompra\OrdenCompraDet;
use App\Models\Almacen\Producto;

/**
 * @group Kardex
 * APIs para kardex
 */
class KardexController extends Controller
{
    
    
    /**
     * Retornar Kardex
     *
     * Retorna todos los productos de ingreso y de salida
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              "id_kar": 0,
     *              "fec_kar": "date",
     *              "cod_kar": "string",
     *              "id_ord_det": 0,
     *              "id_ord_com": 0,
     *              "prod_desc": "string",
     *              "prod_numpar": "string",
     *              "prod_unimed": "char",
     *              "prod_cant": "float",
     *              "prov_razsoc": "string",
     *              "fac_kar": "string",
     *              "guirem_kar": "string",
     *              "bol_kar": "string",
     *              "tip_kar": "char",
     *              "id_col": 0,
     *              "col_usu": "string",
     *              "est_reg": "char"       
     *          }
     *      ],
     *      "size":0,
     *      "logo":"string",
     *      "extension":"string"
     * }
     */
    
    
    public function get(){
        try {
            $kardex= DB::table('kardex')->where('est_reg', '!=', 'E')->orderBy('id_kar','desc')->get();
            //$kardex = kardex::with([''])->orderBy('id_kar', 'desc')->get();
        } catch (Exception $e){
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        if($kardex) {
            $empresa = Empresa::find(1);
            $b64_file = null;
            if($empresa && $empresa->img_emp) {
                $b64_file = base64_encode(Storage::disk('local')->get($empresa->img_emp));
                return response()->json([
                    'data' => $kardex,
                    'logo' => $b64_file,
                    'extension' => $empresa->imgext_emp
                ], 200, [], JSON_NUMERIC_CHECK);
            } else {
                return response()->json([
                    'data' => $kardex,
                    'logo' => null,
                    'extension' => null
                ], 200, [], JSON_NUMERIC_CHECK);
            }

        } else {
            return response()->json([
                'resp' => 'No se encontro el kardex'
            ], 500);
        }

    }

    
    /**
     * Crear Kardex
     *
     * Crea un Kardex
     *
     * @bodyParam  kardex_ingreso array required Ejemplo: [{"cod_kar": "String", "id_ord_det":0, "id_ord_com":0, "prod_desc":"string", "prod_numpar":"string", "prod_unimed":"char", "prod_cant":"float", "prov_razsoc":"string", "fac_kar":"string", "guirem_kar":"string", "bol_kar":"string", "tip_kar":"char","id_col":0,"col_usu":"string", "ord_com_det_est":"char", "ord_com_det_feclleg":"date", "ord_com_det_canent":"float", "ord_com_det_canfal":"float"}].
     *
     * @response {
     *    "resp": "Kardex Registrado"
     * }
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        $actualStock=null;
        try {
            $detalles = $request->input('kardex_ingreso');
            if($detalles){
                foreach ($detalles as $detalle){
                    
                    
                        $kardex=Kardex::create([
                        
                            'fec_kar' => new DateTime(),
                            'cod_kar' => $detalle['cod_kar'],
                            'id_ord_det' => $detalle['id_ord_det'],
                            'id_ord_com' => $detalle['id_ord_com'],
                            'prod_desc' => $detalle['prod_desc'],
                            'prod_numpar' => $detalle['prod_numpar'],
                            'prod_unimed' => $detalle['prod_unimed'],
                            'prod_cant' => $detalle['prod_cant'],
                            'prov_razsoc' => $detalle['prov_razsoc'],
                            'fac_kar' => $detalle['fac_kar'],
                            'guirem_kar' => $detalle['guirem_kar'],
                            'bol_kar' => $detalle['bol_kar'],
                            'tip_kar' => $detalle['tip_kar'],
                            'id_col' => $detalle['id_col'],
                            'col_usu' => $detalle['col_usu'],
                            'est_reg' => 'A',
                        ]);
                        $updateOrdenCompraDet = OrdenCompraDet::find($detalle['id_ord_det']);
                        $updateOrdenCompraDet->fill(array(
                            'ord_com_det_est' => $detalle['ord_com_det_est'],
                            'ord_com_det_feclleg' => $detalle['ord_com_det_feclleg'],
                            'ord_com_det_canent' => $detalle['ord_com_det_canent'],
                            'ord_com_det_canfal' => $detalle['ord_com_det_canfal'],
                        ))->save();
                        
                        $idProd=DB::table('orden_compra_det')
                                            ->select('id_prod')
                                            ->where('id_ord_det','=',$detalle['id_ord_det'])->get();
                        
                        $actualStock=DB::table('producto')
                                            ->select('stk_prod')
                                            ->where('id_prod','=',$idProd[0]->id_prod)->get();
                        $stock=$actualStock[0]->stk_prod+$detalle['prod_cant'];
                        $updateStock=Producto::find($idProd[0]->id_prod);
                        
                        $updateStock->fill(array(
                            'stk_prod'=>$stock
                        ))->save();
                    
                    
                }
            }
            
            DB::commit();
            //all good
        }catch (Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        //$descripcion = "Se creo registro del kardex "  ;
        //$logs = new LogsController();
        //$logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'kardex registrado',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar ordenes pendites o incompletas 
     *
     * Retorna todos las ordenes de compra que tengan en el detalle pendiente o incompleto a la hora de realizar la entrega del producto
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              "id_ord_com": 0,
     *              "ord_comfec": "date",
     *              "ord_com_cod": "string",
     *              "usu_ema": 0,
     *              "id_col":0,
     *              "prov_razsoc": "string"       
     *          }
     *      ],
     *      "size":0
     * }
     */
    
    
    public function getPendientes(){
        try {
            $kardex= DB::table('orden_compra')
                                ->select('orden_compra.id_ord_com','ord_com_fec','ord_com_cod','users.email as usu_ema','orden_compra.id_col','cotizacion_proveedor.cotprov_razsoc as prov_razsoc')
                                ->join('users','users.id_col','=','orden_compra.id_col')
                                ->join('cotizacion_proveedor','cotizacion_proveedor.cotprov_id','=','orden_compra.cotprov_id')
                                ->join('orden_compra_det','orden_compra_det.id_ord_com','=','orden_compra.id_ord_com')
                                ->where('orden_compra_det.ord_com_det_est','=',"0")
                                ->orWhere('orden_compra_det.ord_com_det_est','=','1')
                                ->where('orden_compra.est_reg', '!=', 'AN')
                                ->groupBy('orden_compra.id_ord_com')
                                ->orderBy('orden_compra.id_ord_com','asc')
                                ->get();
            //$kardex = kardex::with([''])->orderBy('id_kar', 'desc')->get();
        } catch (Exception $e){
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        return  response()->json([
            'data' => $kardex,
            'size' => count($kardex)
        ],200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar ordenes pendientes o incompletas por ID
     *
     * Retorna todos las ordenes de compra por ID que tengan en el detalle pendiente o incompleto a la hora de realizar la entrega del producto
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              "id_ord_com": 0,
     *              "ord_comfec": "date",
     *              "ord_com_cod": "string",
     *              "usu_ema": 0,
     *              "prov_razsoc": "string"       
     *          }
     *      ],
     *      "size":0
     * }
     */
    
    
    public function getPendiente($id){
        try {
            $kardex= DB::table('orden_compra')
                                ->select('orden_compra.id_ord_com','ord_com_fec','ord_com_cod','users.email as usu_ema','cotizacion_proveedor.cotprov_razsoc as prov_razsoc')
                                ->join('users','users.id_col','=','orden_compra.id_col')
                                ->join('cotizacion_proveedor','cotizacion_proveedor.cotprov_id','=','orden_compra.cotprov_id')
                                ->join('orden_compra_det','orden_compra_det.id_ord_com','=','orden_compra.id_ord_com')
                                ->where('orden_compra.est_reg', '!=', 'E')
                                ->where('orden_compra.id_ord_com','=',$id)
                                ->groupBy('orden_compra.id_ord_com')
                                ->orderBy('orden_compra.id_ord_com','asc')
                                ->get();
            //$kardex = kardex::with([''])->orderBy('id_kar', 'desc')->get();
        } catch (Exception $e){
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        return  response()->json([
            'data' => $kardex,
            'size' => count($kardex)
        ],200, [], JSON_NUMERIC_CHECK);
    }

    
    /**
     * Retornar Kardex para excel
     *
     * Retorna todos los kardex para el excel
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              
     *              "fecha": "date",
     *              "codigo": "string",
     *              "descripcion del producto": "string",
     *              "Numero de parte": "string",
     *              "Unidad de medida": "char",
     *              "Cantidad": "float",
     *              "Proveedor_Cliente": "string",
     *              "Factura": "string",
     *              "Guia Remision": "string",
     *              "Boleta": "string",
     *              "Tipo": "char",
     *              "Usuario": "string"
     *          }
     *      ]
     *      
     * }
     */
    
    
    public function getExcel(){
        try {
            $kardex= DB::table('kardex')->select('fec_kar as Fecha','cod_kar as Codigo','prod_desc as Descripcion de Producto','prod_numpar as Numero de parte','prod_unimed as Unidad de Medida','prod_cant as cantidad','prov_razsoc as Proveedor_Cliente','fac_kar as Factura','guirem_kar as Guia Remision','bol_kar as Boleta','col_usu as Usuario',\DB::raw('(CASE 
            WHEN tip_kar="1" THEN "Ingreso"
            ELSE "Salida" END) as Tipo'))
            ->where('est_reg', '!=', 'E')->orderBy('id_kar','desc')->get();
            //$kardex = kardex::with([''])->orderBy('id_kar', 'desc')->get();
        } catch (Exception $e){
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        if($kardex) {
            $empresa = Empresa::find(1);
            $b64_file = null;
            if($empresa && $empresa->img_emp) {
                $b64_file = base64_encode(Storage::disk('local')->get($empresa->img_emp));
                return response()->json([
                    'data' => $kardex,
                    'logo' => $b64_file,
                    'extension' => $empresa->imgext_emp
                ], 200, [], JSON_NUMERIC_CHECK);
            } else {
                return response()->json([
                    'data' => $kardex,
                    'logo' => null,
                    'extension' => null
                ], 200, [], JSON_NUMERIC_CHECK);
            }

        } else {
            return response()->json([
                'resp' => 'No se encontro el kardex'
            ], 500);
        }

    }

    
    

    
}

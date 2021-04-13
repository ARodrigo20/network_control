<?php

namespace App\Http\Controllers\CotizacionProveedor;

use DateTime;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Illuminate\Support\Facades\Mail;
use App\Mail\CotizacionProveedorReceived;
use Mockery\Exception;
use Symfony\Component\HttpFoundation\Response;
use App\Models\CotizacionProveedor\CotizacionProveedor;
use App\Models\CotizacionProveedor\CotizacionProveedorDetalle;
use App\Models\Empresa\Empresa;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Proveedores\Proveedor\ProveedorRequest as ProveedorRequest;
use App\Http\Requests\Proveedores\Proveedor\ProveedorColaboradorRequest as ProveedorColaboradorRequest;
use App\Http\Requests\Proveedores\Proveedor\ProveedorBancoRequest as ProveedorBancoRequest;
use App\Http\Requests\Proveedores\Proveedor\ProveedorDireccionRequest as ProveedorDireccionRequest;

/**
 * @group CotizacionProveedor
 * APIs para cotizaciones de proveedores
 */
class CotizacionProveedorController extends Controller
{
    
    /**
     * Retornar cotizaciones
     *
     * Retorna todos las cotizaciones activas y anuladas
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              "cotprov_id": 0,
     *              "solcli_id": 0,
     *              "id_proy": 0,
     *              "id_cli": 0,
     *              "id_prov": 0,
     *              "cotprov_fec": "date",
     *              "cotprov_razsoc": "string",
     *              "cotprov_ruc": "char",
     *              "cotprov_tipdoc": "char",
     *              "cotprov_dir": "string",
     *              "cotprov_con": "string",
     *              "cotprov_ema": "string",
     *              "est_reg": "char",
     *              "est_env": "char",
     *              "cotprov_cod": "string",
     *              "id_col": 0,
     *              "cotprov_col_nom": "string",
     *              "cotprov_col_usu": "string",
     *              "proyecto":{
     *                  "id_proy": 0,
     *                  "nom_proy":"string",
     *                  "ser_proy": "string",
     *                  "num_proy": 0,
     *                  "id_cli": 0,
     *                  "est_reg": "A"
     *              },
     *              "cotizacion_cliente":{
     *                  "solcli_id": 0,
     *                  "solcli_cod": "string"
     *              }
     *          }
     *      ],
     *      "size":0
     * }
     */
    
    
    public function get(){
        try {
            $cotizacionesProveedor = CotizacionProveedor::with(['proyecto','cotizacionCliente'])->orderBy('cotprov_id', 'desc')->get();
        } catch (Exception $e){
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        return  response()->json([
            'data' => $cotizacionesProveedor,
            'size' => count($cotizacionesProveedor)
        ],200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar cotizacion del proveedor
     *
     * Retorna cotizacion del proveedor por medio de su Id
     *
     * @urlParam  id required El ID de la cotizacion del proveedor.
     *
     * @response {
     *      "cotizacion" :
     *          {
     *              "cotprov_id": 0,
     *              "solcli_id": 0,
     *              "id_proy": 0,
     *              "id_cli": 0,
     *              "id_prov": 0,
     *              "cotprov_fec": "date",
     *              "cotprov_razsoc": "string",
     *              "cotprov_ruc": "char",
     *              "cotprov_tipdoc": "char",
     *              "cotprov_dir": "string",
     *              "cotprov_con": "string",
     *              "cotprov_ema": "string",
     *              "est_reg": "char",
     *              "est_env": "char",
     *              "cotprov_cod": "string",
     *              "id_col": 0,
     *              "cotprov_col_nom": "string",
     *              "cotprov_col_usu": "string",
     *              "proyecto":{
     *                  "id_proy":0,
     *                  "nom_proy":"string",
     *                  "ser_proy": "NTWC-P-",
     *                  "num_proy": 0,
     *                  "id_cli": 0,
     *                  "est_reg": "A",
     *                  "cliente": {}
     *               },
     *              "cotizacion_proveedor_detalle": [{
     *                  "cotprovdet_id": 0,
     *                  "cotprovdet_cant": "string",
     *                  "cotprovdet_desc": "string",
     *                  "cotprov_id": 0,
     *                  "id_prod": 0,
     *                  "cotprovdet_prod_codint": "string",
     *                  "cotprovdet_prod_numpar": "string",
     *                  "cotprovdet_prod_fabr": "string",
     *                  "cotprovdet_prod_marc": "string",
     *                  "cotprovdet_prod_unimed": "string"
     *              }]
     *          },
     *      "size":0
     * }
     */

    public function getById($id)
    {
        try {
            $cotizacionProveedor = CotizacionProveedor::with(['cotizacion_detalle','proyecto'] )->find($id);
            
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($cotizacionProveedor) {
            $empresa = Empresa::find(1);
            $b64_file = null;
            if($empresa && $empresa->img_emp) {
                $b64_file = base64_encode(Storage::disk('local')->get($empresa->img_emp));
                return response()->json([
                    'cotizacion' => $cotizacionProveedor,
                    'logo' => $b64_file,
                    'extension' => $empresa->imgext_emp
                ], 200, [], JSON_NUMERIC_CHECK);
            } else {
                return response()->json([
                    'cotizacion' => $cotizacionProveedor,
                    //'detalle'=>$CotizacionProveedorDetalle,
                    'logo' => null,
                    'extension' => null
                ], 200, [], JSON_NUMERIC_CHECK);
            }

        } else {
            return response()->json([
                'resp' => 'No se encontro la cotizacion'
            ], 500);
        }
    }

    /**
     * Crear Cotizacion Proveedor
     *
     * Crea una Cotizacion de Proveedor
     *
     * @bodyParam  solcli_id int Id de la solicitud de cotizacion del cliente.
     * @bodyParam  id_proy int Id del proyecto.
     * @bodyParam  id_cli int Id del cliente.
     * @bodyParam  id_prov int Id del proveedor.
     * @bodyParam  cotprov_razsoc string razon social del Proveedor.
     * @bodyParam  cotprov_ruc char numero ruc de la empresa a quien se realiza la cotizacion.
     * @bodyParam  cotprov_tipdoc char Tipo de documento del proveedor.
     * @bodyParam  cotprov_dir string Direccion del Proveedor.
     * @bodyParam  cotprov_con string Contacto del Proveedor.
     * @bodyParam  cotprov_ema string Email del contacto a quien se enviara.
     * @bodyParam  id_col string Id del usuario.
     * @bodyParam  cotprov_col_nom string Nombre del usuario.
     * @bodyParam  cotprov_col_usu string Usuario o email del usuario.
     * @bodyParam  cotizacion_proveedor_detalle array required Ejemplo: [{"cotprov_id": 0,"cotprovdet_cant":"int","id_prod":"int","cotprovdet_desc":"char","cotprovdet_prod_codint":"string","cotprovdet_prod_numpar":"string","cotprovdet_prod_fabr":"string","cotprovdet_prod_marc":"string",cotprovdet_prod_unimed":"char"}]
     *
     * @response {
     *    "resp": "cotizacion Proveedor creada"
     * }
     */
    public function create(Request $request)
    {
        DB::beginTransaction();

        try {
            $cotizacionProveedor = CotizacionProveedor::create([
                'solcli_id' => $request->input('solcli_id'),
                'id_proy' => $request->input('id_proy'),
                'id_cli' => $request->input('id_cli'),
                'id_prov' => $request->input('id_prov'),
                'cotprov_fec' => new DateTime(),
                'cotprov_razsoc' => $request->input('cotprov_razsoc'),
                'cotprov_ruc' => $request->input('cotprov_ruc'),
                'cotprov_tipdoc' => $request->input('cotprov_tipdoc'),
                'cotprov_dir' => $request->input('cotprov_dir'),
                'cotprov_con' => $request->input('cotprov_con'),
                'cotprov_ema' => $request->input('cotprov_ema'),
                'cotprov_cod' => $this->next_cod(),
                'id_col' => $request->input('id_col'),
                'cotprov_col_nom' => $request->input('cotprov_col_nom'),
                'cotprov_col_usu' => $request->input('cotprov_col_usu'),
                'est_reg' => 'A',
                'est_env' => '0',
            ]);

            $detalles = $request->input('cotizacion_detalle');

            if($detalles) {
                foreach ($detalles as $detalle){
                    $cotizacionProveedorDetalle = CotizacionProveedorDetalle::create([
                        'cotprov_id' => $cotizacionProveedor->cotprov_id,
                        'cotprovdet_cant' => $detalle['cotprovdet_cant'],
                        'cotprovdet_desc' => $detalle['cotprovdet_desc'],
                        'id_prod' => $detalle['id_prod'],
                        'cotprovdet_prod_codint' => $detalle['cotprovdet_prod_codint'],
                        'cotprovdet_prod_numpar' => $detalle['cotprovdet_prod_numpar'],
                        'cotprovdet_prod_fabr' => $detalle['cotprovdet_prod_fabr'],
                        'cotprovdet_prod_marc' => $detalle['cotprovdet_prod_marc'],
                        'cotprovdet_prod_unimed' => $detalle['cotprovdet_prod_unimed']
                        
                    ]);
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
        $descripcion = "Se creo la cotizacion de proveedor con codigo: ".$cotizacionProveedor->cotprov_cod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Cotizacion creada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Anular cotizacion del Proveedor
     *
     * Anula una cotizacion
     *
     * @urlParam  id required El ID de la cotizacion del proveedor.
     *
     * @response {
     *    "resp": "Cotizacion anulada"
     * }
     */

    public function annul($id) {
        try {
            $cotizacionProveedor = CotizacionProveedor::find($id);
            $cotizacionProveedor->fill(array('est_reg' => 'AN'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        //Logs
        $descripcion = "Se anulo la cotizacion de proveedor con codigo: ".$cotizacionProveedor->cotprov_cod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 4);
        ///////
        return response()->json([
            'resp' => 'Cotizacion del Proveedor Anulada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function sendTo($id, Request $request){

        try {
            $cotizacionProveedor = CotizacionProveedor::find($id);
            $cotizacionProveedor->fill(array('est_env' => '1'))->save();
            $correo = CotizacionProveedor::where('cotprov_id','=',$id)->value('cotprov_ema');
            $usuario= CotizacionProveedor::where('cotprov_id','=',$id)->value('cotprov_col_usu');

            $data=[
                'name' => $request->name,
                'pdf' => $request->file('pdf'),
                'usu' =>$usuario
            ];

            Mail::to($correo)->send(new CotizacionProveedorReceived($data));

        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        return response()->json([
            'resp' => 'Cotizacion del Proveedor Enviada'
        ], 200, [], JSON_NUMERIC_CHECK);

    }

    public function update(){
        
    }
    public function next_cod()
    {
        $cod_cotizacion_max = DB::table('cotizacion_proveedor')->whereYear('cotprov_fec', '=', date("Y"))->max('cotprov_cod');
        if($cod_cotizacion_max == null) $cod_cotizacion_max = "#0001-NTWC-".date("Y");
        else {
            $numberStr = substr($cod_cotizacion_max,1,5);
            $max = intval($numberStr) + 1;
            $cod_cotizacion_max = "#".sprintf("%'.04d", $max)."-NTWC-".date("Y");
        }
        return $cod_cotizacion_max;
    }

}

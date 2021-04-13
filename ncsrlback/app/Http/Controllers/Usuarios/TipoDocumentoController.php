<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Usuarios\TipoDocumento;
use App\Http\Controllers\LogsController;
use App\Http\Requests\Usuarios\TipoDocumento\TipoDocumentoRequest as TipoDocumentoRequest;

/**
 * @group Tipo de Documento
 * APIs para tipos de documento
 */
class TipoDocumentoController extends Controller
{   
    /**
     * Retornar tipos de documento
     * 
     * Retorna todos los tipos de documento
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_tipdoc": 0,
     *       "cod_tipdoc": "string",
     *       "des_tipdoc": "string",
     *       "est_reg": "string"
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $tipos_doc = DB::table('tipo_documento')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $tipos_doc,
            'size' => count($tipos_doc)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar tipo de documento
     * 
     * Retorna tipo de documento por Id
     * 
     * @urlParam  id required El ID del tipo de documento.
     * 
     * @response {
     *    "id_tipdoc": 0,
     *    "cod_tipdoc": "string",
     *    "des_tipdoc": "string",
     *    "est_reg": "string"
     * }
     */
    public function getById($id)
    {
        try {
            $tip_doc = DB::table('tipo_documento')->where('id_tipdoc', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($tip_doc) {
            return response()->json($tip_doc, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el tipo de documento'
            ], 500);
        }
    }

    /**
     * Crear tipo de documento
     * 
     * Crea un tipo de documento
     *
     * @bodyParam  cod_tipdoc string required Codigo del tipo de documento. 
     * @bodyParam  des_tipdoc string required Descripcion del tipo de documento.
     * 
     * @response {
     *    "resp": "tipo de documento creado"
     * }
     */
    public function create(TipoDocumentoRequest $request)
    {
        try {
            $tip_doc = TipoDocumento::create([
                'cod_tipdoc' => $request->input('cod_tipdoc'),
                'des_tipdoc' => $request->input('des_tipdoc'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el tipo de documento con ID: ".$tip_doc->id_tipdoc;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Tipo de Documento Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar tipo de documento
     * 
     * Modifica un tipo de documento
     *
     * @urlParam  id required El ID del tipo de documento.
     * @bodyParam  cod_tipdoc string required Codigo del tipo de documento. 
     * @bodyParam  des_tipdoc string required Descripcion del tipo de documento.
     * 
     * @response {
     *    "resp": "tipo de documento actualizado"
     * }
     */
    public function update(TipoDocumentoRequest $request, $id) 
    {
        try {
            $tip_doc = TipoDocumento::find($id);
            $tip_doc->fill(array(
                'cod_tipdoc' => $request->input('cod_tipdoc'),
                'des_tipdoc' => $request->input('des_tipdoc')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el tipo de documento con ID: ".$tip_doc->id_tipdoc;
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////
        return response()->json([
            'resp' => 'Tipo de Documento Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar tipo de documento
     * 
     * Elimina un tipo de documento
     *
     * @urlParam  id required El ID del tipo de documento.
     * 
     * @response {
     *    "resp": "tipo de documento eliminado"
     * }
     */
    public function delete($id) {
        try {
            $tip_doc = TipoDocumento::find($id);
            $tip_doc->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el tipo de documento con ID: ".$tip_doc->id_tipdoc;
        $logs = new LogsController();
        $logs->create_log($descripcion,3);
        ///////
        return response()->json([
            'resp' => 'Tipo de Documento Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    

}

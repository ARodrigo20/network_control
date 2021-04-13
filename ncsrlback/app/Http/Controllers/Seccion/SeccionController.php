<?php

namespace App\Http\Controllers\Seccion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Seccion\Seccion;



/**
 * @group Seccion
 * APIs para seccion del pdf a imprimir
 */
class SeccionController extends Controller
{   
    /**
     * Retornar Seccion
     * 
     * Retorna todos las secciones est_reg A
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_sec": 0,
     *       "des_sec": "string",
     *       "est_reg": "string"
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $tipos_doc = DB::table('seccion_pdfs')->where('est_reg', '!=', 'E')->get();
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
     * Retornar  Seccion
     * 
     * Retorna seccion por Id
     * 
     * @urlParam  id required El ID de la seccion
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
            $tip_doc = DB::table('seccion_pdfs')->where('id_sec', $id)->first();
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
                'resp' => 'No se encontro la seccion'
            ], 500);
        }
    }

    /**
     * Crear seccion
     * 
     * Crea una seccion
     * 
     * @bodyParam  des_sec string required Descripcion de la seccion
     * 
     * @response {
     *    "resp": "tipo de documento creado"
     * }
     */
    public function create(Request $request)
    {
        try {
            $tip_doc = Seccion::create([
                'des_sec' => $request->input('des_sec'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        
        return response()->json([
            'resp' => 'Seccion creada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modifica descripcion seccion
     * 
     * Modifica la descripcion seccion
     *
     * @urlParam  id required El ID de la seccion. 
     * @bodyParam  des_sec string required Descripcion de la seccion.
     * 
     * @response {
     *    "resp": "descripcion seccion actualizado"
     * }
     */
    public function update(Request $request, $id) 
    {
        try {
            $tip_doc = Seccion::find($id);
            $tip_doc->fill(array(
                'des_tipdoc' => $request->input('des_sec')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

       
        ///////
        return response()->json([
            'resp' => 'Seccion Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar seccion
     * 
     * Elimina una seccion
     *
     * @urlParam  id required El ID de la seccion.
     * 
     * @response {
     *    "resp": "seccion eliminado"
     * }
     */
    public function delete($id) {
        try {
            $tip_doc = Seccion::find($id);
            $tip_doc->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        ///////
        return response()->json([
            'resp' => 'Seccion Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    

}

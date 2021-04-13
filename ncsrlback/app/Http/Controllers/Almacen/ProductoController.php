<?php

namespace App\Http\Controllers\Almacen;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Almacen\Producto;
use App\Http\Controllers\LogsController;
use App\Http\Requests\Almacen\Producto\ProductoRequest as ProductoRequest;

/**
 * @group Productos
 * APIs para Productos
 */
class ProductoController extends Controller
{

    /**
     * Retornar productos
     *
     * Retorna todos los productos
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_prod": 0,
     *       "cod_prod": "string",
     *       "num_parte_prod": "string",
     *       "stk_prod": 0,
     *       "des_prod": "string",
     *       "pre_com_prod": 0,
     *       "mon_prod": 0,
     *       "id_unimed": 0,
     *       "id_mar": 0,
     *       "id_mod": 0,
     *       "id_fab": 0,
     *       "est_reg": "string",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z",
     *       "unidad_medida": {
     *          "id_unimed": 0,
     *          "nom_unimed": "string"
     *       },
     *       "marca": {
     *          "id_mar": 0,
     *          "des_mar": "string"
     *       },
     *       "modelo": {
     *          "id_mod": 0,
     *          "des_mod": "string"
     *       },
     *       "fabricante": {
     *          "id_fab": 0,
     *          "des_fab": "string"
     *       }
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $productos = Producto::with(['marca','modelo','fabricante','unidad_medida'])->where('est_reg', '!=', 'E')->get();
            //$productos = DB::table('producto')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        return response()->json([
            'data' => $productos,
            'size' => count($productos)
        ], 200, [], JSON_NUMERIC_CHECK);
        //$productos = Producto::get();
        //return ProductoResource::collection($productos);
    }

    /**
     * Retornar producto
     *
     * Retorna producto por Id
     *
     * @urlParam  id required El ID del producto.
     *
     * @response {
     *       "id_prod": 0,
     *       "cod_prod": "string",
     *       "num_parte_prod": "string",
     *       "stk_prod": 0,
     *       "des_prod": "string",
     *       "pre_com_prod": 0,
     *       "mon_prod": 0,
     *       "id_unimed": 0,
     *       "id_mar": 0,
     *       "id_mod": 0,
     *       "id_fab": 0,
     *       "est_reg": "string",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z",
     *       "unidad_medida": {
     *          "id_unimed": 0,
     *          "nom_unimed": "string"
     *       },
     *       "marca": {
     *          "id_mar": 0,
     *          "des_mar": "string"
     *       },
     *       "modelo": {
     *          "id_mod": 0,
     *          "des_mod": "string"
     *       },
     *       "fabricante": {
     *          "id_fab": 0,
     *          "des_fab": "string"
     *       }
     * }
     */
    public function getById($id)
    {
        try {
            $producto = Producto::with(['marca','modelo','fabricante','unidad_medida'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($producto) {
            return response()->json($producto, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el producto'
            ], 500);
        }
    }

    /**
     * Crear producto
     *
     * Crea un producto
     *
     * @bodyParam  cod_prod string Codigo del producto.
     * @bodyParam  num_parte_prod string Numero de parte del producto.
     * @bodyParam  stk_prod int Stock del producto.
     * @bodyParam  des_prod string required Descripcion del producto
     * @bodyParam  pre_com_prod int Precio de compra del producto.
     * @bodyParam  mon_prod int Moneda del producto (1=sol, 2=dolar).
     * @bodyParam  id_unimed int Codigo de unidad de medida.
     * @bodyParam  id_mar int Codigo de marca.
     * @bodyParam  id_mod int Codigo de modelo.
     * @bodyParam  id_fab int Codigo de fabricante
     *
     * @response {
     *    "resp": "cliente creado"
     * }
     */
    public function create(ProductoRequest $request) {
        try {
            $producto = Producto::create([
                'cod_prod' => $request->input('cod_prod'),
                'num_parte_prod' => $request->input('num_parte_prod'),
                'stk_prod' => $request->input('stk_prod') ? $request->input('stk_prod') : 0,
                'des_prod' => $request->input('des_prod'),
                'pre_com_prod' => $request->input('pre_com_prod'),
                'mon_prod' => $request->input('mon_prod'),
                'id_unimed' => $request->input('id_unimed'),
                'id_mar' => $request->input('id_mar'),
                'id_mod' => $request->input('id_mod'),
                'id_fab' => $request->input('id_fab'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        //Logs
        $descripcion = "Se creo el producto con ID: ".$producto->id_prod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Producto Creado'
        ], 200, [], JSON_NUMERIC_CHECK);

        // DB::table('producto')->insert(
        //     ['num_parte_prod' => $num_parte_prod, 'des_prod' => $descripcion, 'est_reg' => 'A']
        // );
        //Log::info('Viendo request All '.$descripcion);
        //$producto = Producto::create($request->all() + ['est_reg' => 'A']);
    }

    /**
     * Modificar producto
     *
     * Modifica un producto
     *
     * @urlParam  id required El ID del producto.
     *
     * @bodyParam  cod_prod string Codigo del producto.
     * @bodyParam  num_parte_prod string Numero de parte del producto.
     * @bodyParam  stk_prod int Stock del producto.
     * @bodyParam  des_prod string required Descripcion del producto
     * @bodyParam  pre_com_prod int Precio de compra del producto.
     * @bodyParam  mon_prod int Moneda del producto (1=sol, 2=dolar).
     * @bodyParam  id_unimed int Codigo de unidad de medida.
     * @bodyParam  id_mar int Codigo de marca.
     * @bodyParam  id_mod int Codigo de modelo.
     * @bodyParam  id_fab int Codigo de fabricante
     *
     * @response {
     *    "resp": "producto actualizado"
     * }
     */
    public function update(ProductoRequest $request, $id) {

        try {
            $producto = Producto::find($id);
            $producto->fill(array(
                'cod_prod' => $request->input('cod_prod'),
                'num_parte_prod' => $request->input('num_parte_prod'),
                'stk_prod' => $request->input('stk_prod') ? $request->input('stk_prod') : 0,
                'des_prod' => $request->input('des_prod'),
                'pre_com_prod' => $request->input('pre_com_prod'),
                'mon_prod' => $request->input('mon_prod'),
                'id_unimed' => $request->input('id_unimed'),
                'id_mar' => $request->input('id_mar'),
                'id_mod' => $request->input('id_mod'),
                'id_fab' => $request->input('id_fab'),
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el producto con ID: ".$producto->id_prod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////
        return response()->json([
            'resp' => 'Producto Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);

        //Log::info('Obteniendo producto '.$producto);
        //$num_parte_prod = $request->input('num_parte_prod');
        //$descripcion = $request->input('des_prod');
        //$producto->fill(array('num_parte_prod' => $num_parte_prod, 'des_prod' => $descripcion))->save();
        //$producto->fill($request->all())->save();
    }

    /**
     * Eliminar producto
     *
     * Elimina un producto
     *
     * @urlParam id required El ID del producto.
     *
     * @response {
     *    "resp": "producto eliminado"
     * }
     */
    public function delete($id) {
        try {
            $producto = Producto::find($id);
            $producto->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el producto con ID: ".$producto->id_prod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Producto Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }


}

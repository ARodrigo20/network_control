<?php

namespace App\Http\Resources\Almacen\Producto;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id_prod' => $this->id_prod,
            'cod_prod' => $this->cod_prod,
            'num_parte_prod' => $this->num_parte_prod,
            'stk_prod' => $this->stk_prod,
            'des_prod' => $this->des_prod,
            'pre_com_prod' => $this->pre_com_prod,
            'pre_ven_prod' => $this->pre_ven_prod,
            'id_unimed' => $this->id_unimed,
            'id_mar' => $this->id_mar,
            'id_mod' => $this->id_mod,
            'id_fab' => $this->id_fab,
            'est_reg' => $this->est_reg,
        ];
    }
}

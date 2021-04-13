<?php

use Illuminate\Database\Seeder;
use App\Models\Logs\TipoCambio;

class TiposCambioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipos = [
            [
                'id_tipcam'  => 1,
                'des_tipcam' => 'Crear',
            ],
            [
                'id_tipcam'  => 2,
                'des_tipcam' => 'Modificar',
            ],
            [
                'id_tipcam'  => 3,
                'des_tipcam' => 'Eliminar',
            ],
            [
                'id_tipcam'  => 4,
                'des_tipcam' => 'Anular',
            ]
        ];

        TipoCambio::insert($tipos);
    }
}

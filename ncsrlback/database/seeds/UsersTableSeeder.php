<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'nom_col'        => 'Admin',
                'ape_col'        => 'General',
                'email'          => 'admin@admin.com',
                'password'       => '$2y$10$GuEZ22bDayU6ubtlCOQ9M.WA/hcaTgcVsBSnCMLgxX/I6ysnC5UXW',
                'num_doc_col'    => '11111111',
                'est_reg'        => 'SU',
            ],
        ];

        User::insert($users);
    }
}

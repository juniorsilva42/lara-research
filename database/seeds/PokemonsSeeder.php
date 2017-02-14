<?php

use Illuminate\Database\Seeder;

class PokemonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pokemons = [
            1 => [
                'nome_pokemon' => 'Caterpie',
                'numero_pokemon' => 010,
                'descricao_pokemon' => 'Caterpie has a voracious appetite. It can devour leaves bigger than its body right before your eyes. From its antenna, this Pokémon releases a terrifically strong odor.',
                'altura_pokemon' => 0,3,
                'categoria_pokemon' => 'Worm',
                'peso_pokemon' => 2,9
            ]
        ];

        DB::table('pokemons')->insert($pokemons);
    }
}

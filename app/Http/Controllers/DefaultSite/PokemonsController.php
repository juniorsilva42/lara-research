<?php

namespace App\Http\Controllers\DefaultSite;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Pokemons;


class PokemonsController extends Controller
{
    private $pokemon;

    public function __construct(Pokemons $pokemon){
        $this->pokemon = $pokemon;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Pokemons $pokemon)
    {
        $pokemons = $this->pokemon->all();
        return view('modules.pokemons.index', compact('pokemons'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $values = [
            'nome_pokemon' => 'Pidgey',
            'numero_pokemon' => 016,
            'descricao_pokemon' => 'Pidgey has an extremely sharp sense of direction. It is capable of unerringly returning home to its nest, however far it may be removed from its familiar surroundings.',
            'altura_pokemon' => '0,3',
            'categoria_pokemon' => 'Tiny Bird',
            'peso_pokemon' => '1,8'
        ];

        $insert = $this->pokemon->insert($values);

        return view('modules.pokemons.create', compact('insert'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function tests(){
        return 'Testes no controller';
    }



}

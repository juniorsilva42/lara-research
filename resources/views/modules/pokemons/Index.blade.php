<h1>Pokédex</h1><br>

@forelse ($pokemons as $pokemon)
    <b>ID: </b>#{{ $pokemon->id }}<br>
    <b>Nome: </b>{{ $pokemon->nome_pokemon }}<br>
    <b>Tipo: </b>{{ $pokemon->tipo_pokemon }}<br>
    <b>Força: </b>{{ $pokemon->forca_pokemon }}<br>
    <b>Poder: </b>{{ $pokemon->poder_pokemon }}<br><br>
@empty
    <p>Seus pokémons ficam aqui</p>
@endforelse

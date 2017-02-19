<h1>Pokédex</h1>

@forelse ($pokemons as $pokemon)
    {{ $pokemon->nome_pokemon }}<br>
    N° {{ $pokemon->numero_pokemon }}<br>
    {{ $pokemon->descricao_pokemon }}<br>
    {{ $pokemon->altura_pokemon }} m<br>
    {{ $pokemon->categoria_pokemon }}<br>
    {{ $pokemon->peso_pokemon }} Kg<br><br>
@empty
    <p>Seus pokémons ficam aqui</p>
@endforelse

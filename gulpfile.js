const elixir = require('laravel-elixir');

elixir(function(mix){

    mix.scripts([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ], 'public/static/js/app-illuminate.js');

    mix.sass('application.sass', 'resources/assets/css/app-illuminate-dev.css');

    mix.styles([
        '*.css',
        './node_modules/font-awesome/css/font-awesome.css',
        './node_modules/bootstrap/dist/css/bootstrap.css'
    ], 'public/static/css/app-illuminate.css');

    mix.version([
       'public/static/css/app-illuminate.css',
       'public/static/js/app-illuminate.js'
   ]);

});

const elixir = require('laravel-elixir');

elixir(function(mix){

    // Concat Scripts
    mix.scripts([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/pace-progress/pace.js',
        './node_modules/progressbar.js/dist/progressbar.js',
        './node_modules/tether/dist/js/tether.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        'application/**/*.js',
    ], 'public/static/js/app-illuminate.js');

    // Sass compile
    mix.sass([
        'application.sass',
    ], 'resources/assets/css/app-illuminate-dev.css');

    // Concat styles
    mix.styles([
        '*.css',
        './node_modules/font-awesome/css/font-awesome.css',
        './node_modules/bootstrap/dist/css/bootstrap.css',
    ], 'public/static/css/app-illuminate.css');

    // Version of scripts and styles
    mix.version([
       'public/static/css/app-illuminate.css',
       'public/static/js/app-illuminate.js'
   ]);

});

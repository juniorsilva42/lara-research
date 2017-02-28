<?php

namespace ThreeSoft\DevKit\Support;

class MinhaPrimeiraClasse{

    public static function test()
    {
        return 'helper enjoy!';
    }

    public static function getData($hora){
        // retorna, mas poderia ser "echo", whatever
        return ($hora ? date("d/m/Y H:i") : date("d/m/Y")) ;
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use ThreeSoft\DevKit\Support\MinhaPrimeiraClasse;


class GetColorsController extends Controller
{

    public function getGridColors(){

        $tab = Input::get('tab');

        echo MinhaPrimeiraClasse::getData(true);

    }



}

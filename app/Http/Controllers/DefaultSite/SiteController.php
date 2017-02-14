<?php

namespace App\Http\Controllers\DefaultSite;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SiteController extends Controller
{
    public function index(){
        return view('Modules.Home.Index');
    }

}

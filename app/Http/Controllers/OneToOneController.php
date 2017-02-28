<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\Location;
use Illuminate\Support\Facades\Input;

class OneToOneController extends Controller
{

    public function oneToOne(){

        $country = Country::where('name', 'Brasil')->get()->first();
        $location = $country->location()->get()->first();

        return view('modules.one-to-one.index', compact('country', 'location'));

    }

    public function oneToOneInverse(){
        $latitude = '37.0902';
        $longitude = '-95.7129';

        $location = Location::where('latitude', $latitude)->where('longitude', $longitude)->get()->first();
        $country = $location->country;

        return view('modules.one-to-one.index', compact('country', 'location'));
    }


}

@extends('templates.app')
<h1>CountryDéx</h1>

<!--País: <b>$country->name</b><br> Latitude: <b>$location->latitude</b><br> Longitude: <b>$location->longitude</b>-->

<p>O país atual é o <b>{{$country->name}},</b> situado em <b>{{$location->latitude}}°</b> latitudinal e <b>{{$location->longitude}}°</b> longitudinal</p>

<?php
namespace Request;
class Params
{
    function __construct(){
        
    }
    static  function params()
    {
        $action = $_SERVER['REQUEST_URI'];
        global $routes;
        $action = trim($action, '/');
        // Split the action into segments
        $segments = explode('/', $action);
        // die($segments[0]);

        // Check if the first segment matches a defined route
        $callback = $routes[$segments[0]];

        // Extract the URL parameters
        $params = array_slice($segments, 1);

        return $params;
    }
}

<?php

/**
 * Summary of Route
 */

namespace Routes;

class Route
{
    public function __construct()
    {
        // Constructor code here
    }
    /**
     * Summary of routes
     * @var array
     */
    static $routes = [];
    /**
     * Summary of route
     * @param mixed $action
     * @param mixed $callback
     * @return void
     */
    static function route($action, $callback)
    {

        global $routes;

        $action = trim($action, '/');
        $routes[$action] = self::checkCallback($callback);

    }
    /**
     * Summary of get
     * @param mixed $action
     * @param mixed $callback
     * @return void
     */
    static function get($action, $callback)
    {

        // GET Route
        // Route::redirect('index','AdminController')
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            // Check the requested path
            $path = $_SERVER['REQUEST_URI'];
            $name = $_GET['name'] ?? 'Anonymous';

            global $routes;

            $action = trim($action, '/');

            // die(gettype($callback));

            // die();
            $routes[$action] = self::checkCallback($callback);
        }
    }

    /**
     * Summary of post
     * @param mixed $action
     * @param mixed $callback
     * @return void
     */
    static function post($action, $callback)
    {
        // POST Route
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Check the requested path
            $path = $_SERVER['REQUEST_URI'];
            global $routes;

            $action = trim($action, '/');
            $routes[$action] = self::checkCallback($callback);
        }
    }
    /**
     * Summary of dispatch
     * @param mixed $action
     * @return void
     */
    static function dispatch($action)
    {
        global $routes;
        $action = trim($action, '/');
        // Split the action into segments
        $segments = explode('/', $action);
        // die($segments[0]);

        // Check if the first segment matches a defined route
        if (array_key_exists($segments[0], $routes)) {
            $callback = $routes[$segments[0]];

            // Extract the URL parameters
            $params = array_slice($segments, 1);

            return call_user_func_array($callback, $params);

            // Call the callback function with the parameters
        } else {
            header("HTTP/1.0 404 Not Found");
            echo "404 - Page not found";
        }
    }


    /**
     * Summary of redirect
     * @param mixed $method
     * @param mixed $controllerName
     * @return void
     */
    static function redirect( $controllerName,$method)
    {
        // die(gettype($method) );

        require_once 'controllers/' . $controllerName . '.php';
        $controller = new $controllerName();
        $controller->$method();
    }
    /**
     * Summary of checkCallback
     * @param mixed $callback
     * @return mixed
     */
// static function checkCallback array or callback function
     static function checkCallback($callback){
        if (gettype($callback) === 'array') {
             return fn () => self::redirect( $callback[0],$callback[1]);
        }else{
            return $callback;
        }
    }
}

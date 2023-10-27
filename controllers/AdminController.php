<?php
require_once "models/User.php";
use Models\User;
class AdminController
{

    public function index()
    {

        require 'view/home.php';
    }
    public function login()
    {

        require 'view/login.php';
    }
    public function sign()
    {   
        // print_r($_POST['username']);
        // die($_POST);
        User::create( [
            'username'=>$_POST['username'],
            'password'=>$_POST['password']
        ]);
        require 'view/home.php';
    }

}

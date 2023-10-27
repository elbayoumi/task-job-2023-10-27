<?php 
namespace Models;
use DatabaseConnection;

require_once "./database/DatabaseConnection.php";
// use Databases\DatabaseConnection;
class Affiliate{

static function all(){

    $database=new DatabaseConnection();
    $data=$database->getAllDataFromCurrentDatabase();
   return $data;
    
}
/**
 * Summary of process
 * @param mixed $name
 * @param mixed $value
 * @param mixed $nameidValue
 * @param mixed $idValue
 * @return 
 */
static function update($name, $value, $nameidValue, $idValue){
    $database=new DatabaseConnection();
    $database->storeColumn('affiliates',$name, $value, $nameidValue, $idValue);
    
}
static function select($sql){
    $database=new DatabaseConnection();
    $data=$database->select($sql);
    // mysqli_close($connectToDatabase);
   return $data;
}
static function find($id){
    $database=new DatabaseConnection();
    $data=$database->find('affiliates',$id);
    // mysqli_close($connectToDatabase);
   return $data;
}
/// throw associative array 
/**
 * Summary of process
 * @param mixed $query
 * @return void
 */
static function create( array $query){
    $database=new DatabaseConnection();
    $database->create('affiliates',$query);
    
}


}
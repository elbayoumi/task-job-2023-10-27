<?php
// Fetch data from your data source (database, API, etc.)
require_once "models/User.php";// Fetch data from your data source (database, API, etc.)
require_once "./Request/Param.php";
use Request\Params;
use Models\User;

$params= (Params::params())[0];
$index_of_a= strpos($params, '?');
$param = substr($params, 0, $index_of_a);
if($param===''){
    $param=$params;
}
$data = User::find($param);
$allData=$data[0]['data'];
$allDataJSON = json_decode($data[0]['data'],true);

// print_r ($summary['tableData'] );

$response = array(
    'data' => $allDataJSON['tableData'],
    'summary' => $allDataJSON['summary'],
    'param'=>$param
);

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
exit();

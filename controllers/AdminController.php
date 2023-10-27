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
    public function adminStoreData()
    {
        // Fetch data from your data source (database, API, etc.)

        $data = json_decode($_POST['data'], true); // Decode the JSON string into an array
        $records =json_decode($data);
        // Perform any necessary processing
        // Return the response
                foreach($records as $record){
            $allData=User::update('wholesalePricePerItem', $record->value, 'itemBarcode', $record->itemBarcode);
            $save=User::update('totalWholesalePrice', $record->totalWholesalePrice, 'itemBarcode', $record->itemBarcode);
        }
        // $allData=User::update('wholesalePricePerItem', $records[0]->value, 'itemBarcode', $records[0]->itemBarcode);
        $response = array('status' => 'success', 'message' => 'Data received successfully.',"data"=>json_encode($records[0]->itemBarcode));
        echo json_encode($response);
    }

    public function store(){
        // Fetch data from your data source (database, API, etc.)

        $data = json_decode($_POST['data'], true); // Decode the JSON string into an array
        // $records =$data;
        // die(json_encode($records['product_name']));
        $allDataJSON=[
            "tableData"=> [
            [
            "offerName"=> "Offer 1",
            "productName"=> "Product 1",
            "itemBarcode"=> "9999999999999",
            "averageCostOfItem"=> "10.00",
            "cost"=> "100.00",
            "totalCountOfItemBarcode"=> "5",
            "totalCostOfItemBarcode"=> "500.00",
            "supplierName"=> "Supplier A",
            "ownerName"=> "Owner 1",
            "wholesalePricePerItem"=> "50.00",
            "totalWholesalePrice"=> "250.00"
            ],
            [
            "offerName"=> "Offer 2",
            "productName"=> "Product 2",
            "itemBarcode"=> "789012",
            "averageCostOfItem"=> "15.00",
            "cost"=> "300.00",
            "totalCountOfItemBarcode"=> "8",
            "totalCostOfItemBarcode"=> "400.00",
            "supplierName"=> "Supplier B",
            "ownerName"=> "Owner 2",
            "wholesalePricePerItem"=> "40.00",
            "totalWholesalePrice"=> "320.00"
            ],
            [
            "offerName"=> "Offer 3",
            "productName"=> "Product 3",
            "itemBarcode"=> "345678",
            "averageCostOfItem"=> "12.00",
            "cost"=> "240.00",
            "totalCountOfItemBarcode"=> "10",
            "totalCostOfItemBarcode"=> "500.00",
            "supplierName"=> "Supplier C",
            "ownerName"=> "Owner 3",
            "wholesalePricePerItem"=> "45.00",
            "totalWholesalePrice"=> "450.00"
            ]
            ],
            "summary"=> [
            "totalSoldProduct"=> 3,
            "totalCollectedCash"=> 4856,
            "totalShipmentsCount"=> 21,
            "totalWholesalePerAllItems"=> 1020
            ]
            ];
        User::create( [
            'data'=>$_POST['data'], 
            'isSaved'=>'1', 
        ]);
        $response = array('status' => 'success', 'message' => 'Data received successfully.',"data"=>json_encode($data[0]));
        echo  json_encode($response);
    }
}

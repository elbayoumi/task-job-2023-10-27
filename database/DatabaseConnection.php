<?php
// namespace Databases 
class DatabaseConnection
{
    private function connect()
    {
        try {
            $servername = "localhost";
            $username = "root";
            $password = "603721";
            $database = "task20231027";
            $conn = new mysqli($servername, $username, $password, $database);
            if ($conn->connect_error) {
                throw new Exception("Connection failed: " . $conn->connect_error);
            }
            return $conn;
        } catch (Exception $e) {
            die("Database connection error: " . $e->getMessage());
        }
    }
    public function disconnect()
    {
    }
    /**
     * Summary of currentDatabase
     * @return mysqli
     */
    public function getAllDataFromCurrentDatabase()
    {

        $conn = $this->connect();

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            $sql = "SELECT * FROM affiliates";
            // $sql = "UPDATE 'affiliates' SET 'WholesalePricePerItem' = '1' WHERE 'itemBarcode' = '214213423'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $data = array();

                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return "No data found.";
            }
        }
        $conn->close();
    }
    public function storeColumn( $table, $name, $value, $nameidValue, $idValue)
    {

        $conn = $this->connect();

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {

            $sql = "UPDATE $table SET $name = ? WHERE $nameidValue = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ss', $value, $idValue);
            $stmt->execute();
            $stmt->close();
        }
        // Prepare the SQL statement
    }
    public function select( $sql)
    {

        $conn = $this->connect();

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            // $sql = "SELECT * FROM affiliates";
            // $sql = "UPDATE 'affiliates' SET 'WholesalePricePerItem' = '1' WHERE 'itemBarcode' = '214213423'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $data = array();

                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return "No data found.";
            }
        }
        // Prepare the SQL statement
        $conn->close();
    }

    /**
     * Summary of find
     * @param mixed $table
     * @param mixed $id
     * @return array|string
     */
    public function find($table,$id){
        return $this->select( "SELECT * FROM $table WHERE id = $id");
    }
    /**
     * Summary of create
     * @param mixed $table
     * @param array $query
     * @return string
     */
    public function create( $table, array $query)
    {

        $conn = $this->connect();
        $values = implode(', ', array_map(function($value) {
            return "'" . $value . "'";
        }, $query));
        $names = implode(', ', array_map(function($key) {
            return "`" . $key . "`";
        }, array_keys($query)));
        //  $values= implode(', ', $query);
        //  $names= implode(', ', array_keys($query));

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            
            // 
            $sql = "INSERT INTO $table ($names) VALUES ($values);";
            // die($sql);
            if ($conn->query($sql) === TRUE) {
                return "New record created successfully";
            } else {
                return "Error: " . $sql . "<br>" . $conn->error;
            }

            // Close the connection
            $conn->close();
        }
        // Prepare the SQL statement
    }



    // INSERT INTO `affiliates` (`offerName`, `productName`, `itemBarcode`, `averageCostOfItem`, `cost`, `totalCountOfItemBarcode`, `totalCostOfItemBarcode`, `supplierName`, `ownerName`, `totalWholesalePrice`, `WholesalePricePerItem`) VALUES ('Offer 12', 'Product 12', '3221166', '12', '121.00', '21', '521.00', 'Supplier A', 'Owner 12', '89', '1699');

}

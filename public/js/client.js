$(document).ready(function () {
    // let inputDataWholesalePricePerItem=[]
    // let inputData =localStorage.getItem('inputDataWholesalePricePerItem')
    // if(!inputData){
    //     localStorage.setItem('inputDataWholesalePricePerItem', inputDataWholesalePricePerItem);
    // }
    // console.log(localStorage.getItem('inputDataWholesalePricePerItem'),'kkk')
    var url = '/adminData';
    // console.log(url);

    var table = $('#myTable').DataTable({

        ajax: '../../clientServer.php/2',
        type: 'GET',
        columns: [{
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton offerName"  id="offerName${row.itemBarcode}" value="${data.offerName}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton productName"  id="productName${row.itemBarcode}" value="${data.productName}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton itemBarcode"  id="itemBarcode${row.itemBarcode}" value="${data.itemBarcode}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton averageCostOfItem"  id="averageCostOfItem${row.itemBarcode}" value="${data.averageCostOfItem}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton cost"  id="cost${row.itemBarcode}" value="${data.cost}" >`;
            }
        },

        {
            data: null,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton totalCountOfItemBarcode"  id="count${row.itemBarcode}" value="${data.totalCountOfItemBarcode}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton totalCostOfItemBarcode"  id="totalCostOfItemBarcode${row.itemBarcode}" value="${data.totalCostOfItemBarcode}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton supplierName"  id="supplierName${row.itemBarcode}" value="${data.supplierName}" >`;
            }
        },
        {
            data: null, searchable: true,
            render: function (data, type, row) {

                return `<input type="button" class="resetButton ownerName"  id="ownerName${row.itemBarcode}" value="${data.ownerName}" >`;
            }
        },
        {
            data: null,
            render: function (data, type, row) {
                // console.log(data.wholesalePricePerItem)
                return `<input type="button"  id="${row.itemBarcode}" class="resetButton wholesalePricePerItem"  value="${data.wholesalePricePerItem}" >`;
            }
        },

        {
            data: null,
            render: function (data, type, row) {
                // console.log(data)
                return `<input type="button" class="resetButton total"  id="total${row.itemBarcode}" value="${data.total}" >`;

            }
        },

        ]
    });
    $.ajax({
        url: '../../clientServer.php/2',
        method: 'GET',
        success: function(response) {
          // Handle the response data here
        //   console.log( JSON.parse(response) ,'data');
          let summary=response.summary;
          
          console.log(response.param ,'data');

          $('#totalofSoldProduct').html(summary.totalSoldProduct);
          $('#totalofCollectedCash').html(summary.totalCollectedCash);
          $('#totalShipmentsCount').html(summary.totalShipmentsCount);
          $('#total_of_wholesale_per_all_items').html(summary.totalWholesalePerAllItems);
        },
        error: function(xhr, status, error) {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      });
      








});

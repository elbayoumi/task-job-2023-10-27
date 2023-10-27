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

        ajax: '../../server.php',
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
                return `<input type="number" step="0.01" id="${row.itemBarcode}" class="custom-input wholesalePricePerItem"  value="${data.wholesalePricePerItem}" >`;
            }
        },

        {
            data: null,
            render: function (data, type, row) {

                // total_of_wholesale_per_all_items
                // let total_of_wholesale_per_all_items_prev = localStorage.getItem('inputDataWholesalePricePerItem') ? localStorage.getItem('inputDataWholesalePricePerItem') : 0;
                // total_of_wholesale_per_all_items_prev = parseInt(total_of_wholesale_per_all_items_prev);

                // console.log(total_of_wholesale_per_all_items_prev)

                // localStorage.removeItem('total_of_wholesale_per_all_items')

                // localStorage.setItem('total_of_wholesale_per_all_items', JSON.stringify(total_of_wholesale_per_all_items_prev + parseInt(data.totalWholesalePrice)))
                // console.log(document.querySelectorAll('.total').forEach(function(item){
                //     console.log(item.value)
                // }));
                getTotalPrice()
                return `<input type="button" class="resetButton total"  id="total${row.itemBarcode}" value="${data.totalWholesalePrice}" >`;

            }
        },

        ]
    });
    $.ajax({
        url: '../../server.php',
        method: 'GET',
        success: function(response) {
          // Handle the response data here
        //   console.log( JSON.parse(response) ,'data');
          let summary=response.summary;
        //   console.log(summary ,'data');

          $('#totalofSoldProduct').html(summary.totalSoldProduct);
          $('#totalofCollectedCash').html(summary.totalCollectedCash);
          $('#totalShipmentsCount').html(summary.totalShipmentsCount);
        },
        error: function(xhr, status, error) {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      });
      
    // var summaryTable=$('.summary_Table').DataTable({
    //     ajax: '../../summary.php',
    //     type: 'GET', 
    //     columns: [
    //         {
    //             data: 'offerName',searchable: true
    //         },
    //             ]
    // })
    $(document).on('blur', '.custom-input', function () {
        processData($(this).attr('id'), $(this).val())
        // updateData($(this).attr('id'))
        $(`#${$(this).attr('id')}`).addClass('success');
    });
    $(document).on('keydown', '.custom-input', function (event) {
        if (event.key === "Enter")
            processData($(this).attr('id'), $(this).val())
    });

    function processData(id, val) {
        var itemBarcode = id;
        var value = val;
        let countOfItems = $(`#count${itemBarcode}`).val();
        var totalWholesalePrice = value * countOfItems;
        let total_of_wholesale_per_all_item = $(`#total${itemBarcode}`).val()
        let calculatedPrice = totalWholesalePrice - total_of_wholesale_per_all_item;
        // if(total_of_wholesale_per_all_item >totalWholesalePrice){
        //     calculatedPrice=total_of_wholesale_per_all_item-totalWholesalePrice
        // }else {
        //     calculatedPrice=totalWholesalePrice-total_of_wholesale_per_all_item
        // }
        // console.log(totalWholesalePrice)
        let inputData = localStorage.getItem('inputDataWholesalePricePerItem');

        if (!inputData) {
            localStorage.setItem('inputDataWholesalePricePerItem', JSON.stringify([{
                "itemBarcode": itemBarcode,
                "value": value,
                "totalWholesalePrice": totalWholesalePrice,
                'total_of_wholesale_per_all_item': calculatedPrice
            }]))

        } else {
            let inputData = JSON.parse(localStorage.getItem('inputDataWholesalePricePerItem'));
            let count = 0;
            inputData.forEach(element => {

                // console.log(element.itemBarcode==itemBarcode)
                if (element.itemBarcode == itemBarcode) {
                    inputData.splice(inputData.indexOf(element), 1)

                    count++
                }
            });

            inputData.push({
                "itemBarcode": itemBarcode,
                "value": value,
                "totalWholesalePrice": totalWholesalePrice,
                'total_of_wholesale_per_all_item': calculatedPrice
            })

            localStorage.setItem('inputDataWholesalePricePerItem', JSON.stringify(inputData))

        }
        let inputDataField = JSON.parse(localStorage.getItem('inputDataWholesalePricePerItem'));

        let total_of_wholesale_per_all_items = Number(localStorage.getItem('stable_total_of_wholesale_per_all_items'));
        // let balance_count =total_of_wholesale_per_all_items-totalWholesalePrice;
        let totalPriceCount = total_of_wholesale_per_all_items
        inputDataField.forEach(element => {
            totalPriceCount += element.total_of_wholesale_per_all_item;
            element.total_of_wholesale_per_all_item = 0;
        })
        localStorage.setItem('total_of_wholesale_per_all_items', JSON.stringify(totalPriceCount));

        $('#total_of_wholesale_per_all_items').text(totalPriceCount)

        // $(`#total${itemBarcode}`).text(totalWholesalePrice)
        totalWholesaleP(itemBarcode, totalWholesalePrice)
    }
    function totalWholesaleP(itemBarcode, totalWholesalePrice) {
        $(`#total${itemBarcode}`).val(totalWholesalePrice)
    }
    function updateData(props) {
        var data = $(`#${props}`).val();
        var dataWithBarcodes = {
            "data": data,
            "itemBarcode": props
        }

        $.ajax({
            url: '/adminStoreData',
            type: 'POST',
            data: {
                data: JSON.stringify(dataWithBarcodes)
            },
            success: function (response) {
                console.log(response);
                $(`#${props}`).addClass('success');
            },
            error: function (xhr, status, error) {
                console.error(error);
                $(`#${props}`).addClass('error');
            }
        });
    }
    function storeData(uri, formData) {
        var data = formData;
        $.ajax({
            url: uri,
            type: 'POST',
            data: {
                data: JSON.stringify(data)
            },
            success: function (response) {
                console.log(response);
                localStorage.removeItem('inputDataWholesalePricePerItem');
                $(".savingSVG").show();
                $(".savingP").show();
                table.ajax.reload();
                // $(`#${props}`).addClass('success');
                if(uri=='/create'){
                    // dialog.close();
                    $('#message').show();
                }

            },
            error: function (xhr, status, error) {
                console.error(error);
                // $(`#${props}`).addClass('error');
            }
        });
    }
    $('.close').on('click', function(){
        $('#message').hide();
    })
    $('#saveAllDataStoredInLocalStorage').on('click', () => {
        let inputData = localStorage.getItem('inputDataWholesalePricePerItem')
        // console.log(inputData)
        let get_tr_element = document.querySelectorAll('.tbodyData tr');
        let get_td_element = document.querySelectorAll('.tbodyData tr td');
        let opjAllDataTable =[];

        get_tr_element.forEach((tr,index) => {

            // console.log(get_td_element.length/get_tr_element.length)
            // console.log(index)
            let opjTr ={};
            tr.childNodes.forEach((child) => {
                child.childNodes.forEach((child) => {
                    let key = child.className.split(" ")[1];
                    opjTr[key]=child.value;
                    // console.log(opjTr);
                })
            })
            opjAllDataTable.push(opjTr);

        })
        // $('#totalofSoldProduct').html(summary.totalSoldProduct);
        // $('#totalofCollectedCash').html(summary.totalCollectedCash);
        // $('#totalShipmentsCount').html(summary.totalShipmentsCount);
        let opjDataTransfer = {
            tableData:opjAllDataTable,
            summary:{
                totalSoldProduct:$('#totalofSoldProduct').html(),
                totalCollectedCash:$('#totalofCollectedCash').html(),
                totalShipmentsCount:$('#totalShipmentsCount').html(),
                totalWholesalePerAllItems:$('#total_of_wholesale_per_all_items').html(),

            }
        }

        // console.log(JSON.stringify(opjDataTransfer));
            storeData('/create', opjDataTransfer);
        

        // if (inputData) {
        //     storeData('/create', inputData)
        // }
    });
    $(document).click(function () {
        $(".savingSVG").hide();
        $(".savingP").hide();
    });
    function getTotalPrice() {
        // localStorage.removeItem('total_of_wholesale_per_all_items');

        let totalPriceCount = 0
        document.querySelectorAll('.total').forEach(function (item) {
            totalPriceCount += Number(item.value)
        });
        // console.log(totalPriceCount);
        localStorage.setItem('total_of_wholesale_per_all_items', JSON.stringify(totalPriceCount));
        localStorage.setItem('stable_total_of_wholesale_per_all_items', JSON.stringify(totalPriceCount));

        $('#total_of_wholesale_per_all_items').text(totalPriceCount)
    }
    // $("#btnModal").on('click', function(){
    //     $("#exampleModal").modal('show');
    // })
    $('#add').on('click', function () {
        const formData = new FormData(document.getElementById('form_create'));

        const formDataJson = Object.fromEntries(formData);
        // const formData = new FormData($('#form_create'), $('#add'));
        // console.log(formDataJson)
        storeData('/create', formDataJson)

    });
    // const dialog = document.getElementById('dialog');
    // $('#show-dialog').on('click', () => {
    //     dialog.showModal();
    // });
    // $('.class_form').on('click', () => {
    //     dialog.close();
    // });
    // dialog.addEventListener('click', (e) => {
    //     if (e.target.tagName === 'DIALOG') {
    //         dialog.close();
    //     }
    // });
    $('.close_alert').on('click', () => {
        $('#message').hide();
    });
});

console.log('Testing Console');
    
var products = [
    {id: 1, name: 'Red Men T-Shirt', price:'$3.99'},
    {id: 2, name: 'Pink Women T-Shirt', price:'$5.99'},
    {id: 3, name: 'Nike Wite Shoes', price:'$300'}
];

var db;
var db_id = 3;


var request = window.indexedDB.open('EXAMPLE_DB', 1);
//Creating Database


request.onsuccess = function(event) {
    console.log('Database Created successfully');

    
    db = event.target.result;
    
    //Create transaction from databasee
    //Create Table
    var transaction = db.transaction('products', 'readwrite');
    
    //add success event headleer for transaction
    //you should also add onerror, onabort event handlers
    transaction.onsuccess = function(event) {
        console.log('[Transaction] ALL DONE !');
    }
    
    var productsStore = transaction.objectStore('products');
    
    products.forEach(
        function(product) {
            var db_op_req = productsStore.add (product)
            
            db_op_req.onsuccess = function(event) {
                console.log(event.target.result == product.id);
            }
        }
    )
    
}

request.onerror = function(event) {
    console.log('[onerror]', request.error);
}

request.onupgradeneeded = function(event){
    var db = event.target.result;
    var productsStore = db.createObjectStore('products', {keyPath: 'id'});
}



function my_add() {
    var obj_name = document.getElementById("id_name");
    var obj_price = document.getElementById("id_price");
    
    var transaction = db.transaction('products', 'readwrite');
    
    db_id = db_id + 1;
    var request = transaction.objectStore('products').add({ id: db_id, name: obj_name.value, price:  obj_price.value });
           
    request.onsuccess = function(event) {
        alert("Kenny has been added to your database.");
    };
           
    request.onerror = function(event) {
        alert("Unable to add data\r\nKenny is aready exist in your database! ");
    }
    
    
}
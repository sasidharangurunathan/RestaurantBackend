var mysql = require("mysql");

var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var app = express();
var fs = require("fs");
var cors = require("cors");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactjs",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

app.use(cors());
app.get("/", function (req, res) {
  console.log("hai default");
});
app.get("/listMenu", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    res.end("result");

    /*var sql = "INSERT INTO menu_list (menu_name, menu_image, menu_video, description, menu_status) VALUES ('northindian-meal','', '','lunch', '1')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result)
            res.end( "result" );
            });*/
  });
});
app.post("/saveMenu", function (req, res) {
  let menuName = req.body.menu_name;
  let menuImage = req.body.menu_image;
  let menuVideo = req.body.menu_video;
  let menuDescription = req.body.menu_description;
  let menuStatus = "1";
  let menuPrice = req.body.menu_price;

  var sql =
    "INSERT INTO menu_list (menu_name, menu_image, menu_video, description, menu_status, menu_price) VALUES ('" +
    menuName +
    "','" +
    menuImage +
    "', '" +
    menuVideo +
    "','" +
    menuDescription +
    "','" +
    menuStatus +
    "','" +
    menuPrice +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//save menu
app.post("/saveMenudata", function (req, res) {
  let menuName = req.body.menu_name;
  let menuImage = req.body.menu_image;
 
  let menuDescription = req.body.description;
  let menuStatus = "1";
  let menuPrice = req.body.menu_price;
  let Discount = req.body.Discount;

  var sql =
    "INSERT INTO menulists (menu_name, menu_image, description, menu_status, menu_price,Discount) VALUES ('" +
    menuName +
    "','" +
    menuImage +
    "','" +
    menuDescription +
    "','" +
    menuStatus +
    "','" +
    menuPrice +
    "','" +
    Discount +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

//select query
app.get("/selectMenu", function (req, res) {
  let id = req.body.id;
  console.log(id);
  var sql = "SELECT * from menu_list where description='" + id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//select all table
app.get("/selectAllMenu", function (req, res) {
  var sql = "SELECT * from menu_list";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//select all menus
app.get("/selectAllMenu1", function (req, res) {
  var sql = "SELECT * from menulists";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//select all Lunch Menu
app.post("/selectLunchMenu1", function (req, res) {
  console.log("check");
  let description = req.body.data;
  console.log(description);

  var sql = "SELECT * from menulists WHERE description='" + description + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

//update menu
app.post("/menuUpdate", function (req, res) {
  let id = req.body.data;
  console.log(id);

  var sql = "SELECT * from menu_list WHERE id='" + id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//report
app.post("/report", function (req, res) {
  let id = req.body.start.data;
  let id1 = req.body.end.data1;
  console.log("check",id,id1);

  var sql = "SELECT * FROM orders WHERE date BETWEEN '" + id + "' and '" + id1 + "'  ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

//update query
app.post("/deleteMenu", function (req, res) {
  let id = req.body.data;
  console.log(id);
  var sql = "UPDATE menu_list SET menu_status='2' WHERE id='" + id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

//update food status

app.post("/FoodMenu", function (req, res) {
  let id = req.body.data;
  console.log(id);
  var sql = "UPDATE orders SET order_status='packed' WHERE order_id='" + id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});


app.post("/addtocart", function (req, res) {
  let menu_name = req.body.menu_name;
  let menu_price = req.body.menu_price;
  let menu_quanity = req.body.menu_quantity;
  let net_price = menu_price * menu_quanity;

  var sql =
    "INSERT INTO cart (menu_name, menu_price, menu_quantity, net_price) VALUES ('" +
    menu_name +
    "','" +
    menu_price +
    "','" +
    menu_quanity +
    "','" +
    net_price +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

//addorders
// app.post("/addorderdetails", function (req, res) {
//   let order_id = '2'
//   let menu_name = req.body.menu_name;
//   let menu_quanity = req.body.menu_quantity;
//   let menu_price = req.body.menu_price;

//   var sql =
//     "INSERT INTO order_details (order_id,menu_name, menu_quantity, menu_price ) VALUES ('" +
//     order_id +
//     "','" +
//     menu_name +
//     "','" +

//     menu_quanity +
//     "','" +
//     menu_price+

//     "')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//     console.log(result);
//     res.end("result");
//   });
// });
//addcustom
app.post("/orders", function (req, res) {
  let table_id = req.body.table_id;
  let person_name = req.body.person_name;
  let mobile = req.body.mobile;

  var sql =
    "INSERT INTO orders (table_id, person_name, mobile) VALUES ('" +
    table_id +
    "','" +
    person_name +
    "','" +
    mobile +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);

    //ordersdetails
    let order_id = result.insertId;
    console.log(result.insertId);
    let menu_name = req.body.menu_name;
    let menu_quanity = req.body.menu_quantity;
    let menu_price = req.body.menu_price;

    //var sql = "INSERT INTO Test (name, email, n) VALUES ?";
    var sql =
      "INSERT INTO order_details (order_id,menu_name, menu_quantity, menu_price ) VALUES ?";
    var values = [
      [order_id, "demian", "1", "10"],
      [order_id, "john", "2", "20"],
      [order_id, "mark", "3", "30"],
      [order_id, "pete", "4", "40"],
    ];

    // var sql =
    // "INSERT INTO order_details (order_id,menu_name, menu_quantity, menu_price ) VALUES ('" +
    // order_id +
    // "','" +
    // menu_name +
    // "','" +

    // menu_quanity +
    // "','" +
    // menu_price+

    // "')";

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(result);
    });

    res.end("result");
  });
});
//select cart data
app.get("/selectcart", function (req, res) {
  var sql = "SELECT * from cart";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

//login
app.post("/login", function (req, res) {
  let Email = req.body.email;
  let Password = req.body.password;
  console.log("email,password", Email, Password);
  var sql =
    "SELECT * from customer where email='" +
    Email +
    "' and password='" +
    Password +
    "' LIMIT 1";
  con.query(sql, function (err, result) {
    if (err) {
      console.log("ërror", err);
      res.end(JSON.stringify("Enter invalid data"));
    } else {
      if (result.length > 0) {
        console.log("login success");
        console.log(result);
        // res.end(JSON.stringify({result}));
        const jsonContent = JSON.stringify(result[0]);
        res.end(jsonContent);
      } else {
        res.end(JSON.stringify({ error: "invalid email and password" }));
      }
    }
  });
});
//select myorder
app.post("/myorder", function (req, res) {
  let user = req.body.userDetails;

  console.log("login", user, user.email);
  let Email = user.email;
  let Password = user.password;
  console.log("email,password", Email, Password);
  var sql =
    "SELECT * from customer where email='" +
    Email +
    "' and password='" +
    Password +
    "'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("data from login data");
    console.log(JSON.stringify(result[0].Email));
    // res.end(JSON.stringify(result[0].FirstName));
    var sql1 =
      "SELECT * from orders where person_name='" +
      result[0].Email +
      "'  ";
    con.query(sql1, function (err, result1) {
      if (err) throw err;
      console.log("res", JSON.stringify(result1));
      let datas = JSON.stringify(result1);
      //
      for (var i = 0; i < result1.length; i++) {
        var sql2 =
          "SELECT * from order_details where order_id='" +
          result1[i].order_id +
          "'  ";
        con.query(sql2, function (err, result2) {
          if (err) throw err;
          console.log("data", JSON.stringify(result2));

          res.end(JSON.stringify(result2));
        });
      }

      // res.end(JSON.stringify(result2));
    });
  });
});

//view the order page
app.post("/vieworder", function (req, res) {
  var sql =
      "SELECT * from orders";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    
    
    res.end(JSON.stringify(result));
  });
});

//customer registraction
app.post("/register", function (req, res) {
  let FirstName = req.body.FirstName;
  let LastName = req.body.LastName;
  let Email = req.body.Email;
  let Mobile = req.body.Mobile;
  let password = req.body.password;
  console.log("data",FirstName,LastName,Email,Mobile,password);
  var sql =
    "INSERT INTO customer (FirstName, LastName, Email, Mobile, password) VALUES ('" +
    FirstName +
    "','" +
    LastName +
    "','" +
    Email +
    "','" +
    Mobile +
    "','" +
    password +
    "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    
    
    res.end(JSON.stringify(result));
    // if (err) {
    //   console.log("ërror", err);
    //   res.end(JSON.stringify({ uid: 0 }));
    // } else {
    //   console.log("1 record inserted");
    //   console.log(result.insertId);
    //   res.end(JSON.stringify({ uid: result.insertId }));
    // }
  });
});

//add table data
app.post("/addTable", function (req, res) {
  let table_name = req.body.table_name;
  let table_sheet = req.body.table_sheet;
  let table_status = "active";
  

  var sql =
    "INSERT INTO table_list (table_name, table_sheet, table_status) VALUES ('" +
    table_name +
    "','" +
    table_sheet +
    "','" +
    table_status +
    
    "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      console.log(result);
      
      
      res.end(JSON.stringify(result));
    });
});

//delete table

app.post("/deleteTable", function (req, res) {
  let table_id = req.body.table_id;
  console.log(table_id);
  var sql =
  "DELETE FROM table_list WHERE table_id ='"+table_id +"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      console.log(result);
      
      
      res.end(JSON.stringify(result));
    });
});

app.post("/order", function (req, res) {
  let user = (req.body.userDetails);

  let table_id = "5";
  let person_name = user.email;
  let mobile = req.body.mobile;

  console.log("fds", user);

  console.log("hjk", req.body.productList);
  let data = (req.body.productList);
  
  
  var sql =
    "INSERT INTO orders (table_id, person_name, mobile) VALUES ('" +
    table_id +
    "','" +
    person_name +
    "','" +
    mobile +
    "')";
    
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
    let order_ids = result.insertId;
    
    console.log("hjk", req.body.productList);
    console.log("hjkww", data[1]);

    //ordersdetails
    let data1 = (req.body.productList);
    console.log("ssss", data1.length);
    

    for (var i = 0; i < data.length; i++) {
      console.log("ssss", data[i].title);

      let menu_name = data[i].title;
      let menu_quantity = data[i].quantity;
      let menu_price = data[i].itemTotal;
      let order_id=order_ids;

      //var sql = "INSERT INTO Test (name, email, n) VALUES ?";
      var sql =
        "INSERT INTO order_details (order_id,menu_name, menu_quantity, menu_price ) VALUES ('" +
        order_id +
        "','" +
        menu_name +
        "','" +
        menu_quantity +
        "','" +
        menu_price +
        "')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(result);
      });
    }

    res.end("result");
  
  });


});
app.get("/selectAllTable", function (req, res) {
  var sql = "SELECT * from table_list";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//select order
app.get("/ordersAll", function (req, res) {
  var sql = "SELECT * from orders";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});
//select orderdetails
app.get("/order_detailsAll", function (req, res) {
  var sql = "SELECT * from order_details";
  con.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
    console.log(result);
    res.end(JSON.stringify(result));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

const express = require('express')
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const nodemailer = require('nodemailer');
const port = 9000;
const BASEURL = "http://dokandari1.com"
const con = mysql.createConnection({
  host: "localhost",
  user: "awais",
  database: 'dokandari',
  password: 'Sf7Y>6"LZB^\p%W8'
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ddokandari@gmail.com',
    pass: 'Dokandari123',
  },
});

const USER_TABLE_NAME = "users";
const SHOP_TABLE_NAME = "shops";
const FOLLOW_TABLE_NAME = "followers";
const NOTICE_TABLE_NAME = "notices";
const PRODUCT_TABLE_NAME = "products";
app.options('*', cors()) // include before other routes

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Type", "application/json; charset=UTF-8");

    // res.header("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.post('/signup', (req, res) => {

  let userName = req.body.username;
  let selectQuery = "SELECT COUNT(id) as userCount FROM "+USER_TABLE_NAME+" WHERE username='"+userName+"' LIMIT 1";
  con.query(selectQuery,async function(selectErr,selectResult) {
    // console.log(selectResult[0].userCount);
    if(selectErr) {
      console.log('MYSQL SELECT ERROR SIGNUP',selectErr);
    }
    else {
      if(selectResult && selectResult.length>0 && selectResult[0].userCount==0) {
        // console.log(req.body);
        let hashPassword = req.body.password;
        let phoneNumber = req.body.phonenumber
        let email = req.body.email;
        let userType = req.body.userType;
        var insertQuery = " INSERT INTO "+USER_TABLE_NAME+" (username,email,password,phone_number,user_type,resetToken,resetTokenExpire) VALUES ('"+userName+"', '"+email+"','"+hashPassword+"','"+phoneNumber+"','"+userType+"',NULL,NULL)";

        con.query(insertQuery, function (err, result) {
          if (err){
            // throw err;
            console.log('Signup MYSQL ERROR',err)
            res.send({success:"no",message:"Signup Failed"});
            res.end();
          } 
          else {
            res.send({success:"yes",message:"User Signup Successfull"});
            res.end();
          }
        });
      }
      else {
        // console.log(req.body);
        res.send({success:"no",message:"User Already Exists"});
        res.end();
      }
    }
  });
})

app.post('/createProduct',upload.fields([
    {
      name: 'file1', maxCount: 1
    }, {
      name: 'file2', maxCount: 1
    }, {
      name: 'file3', maxCount: 1
    }, {
      name: 'file4', maxCount: 1
    }
  ]) , (req, res) => {
  console.log(req.files);
  console.log(req.body);
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;
  let condition = req.body.condition;
  let shopId = req.body.shopID;
  let file1 = req.files.file1;
  let file2 = req.files.file2;
  let file3 = req.files.file3;
  let file4 = req.files.file4;

  let selectQuery = "SELECT COUNT(id) as productCount FROM "+PRODUCT_TABLE_NAME+" WHERE name='"+name+"' AND shopId="+shopId+" LIMIT 1";
  con.query(selectQuery,async function(selectErr,selectResult) {
    // console.log(selectResult[0].shopCount);
    if(selectErr) {
      console.log('MYSQL SELECT ERROR SIGNUP',selectErr);
    }
    else {
      if(selectResult && selectResult.length>0 && selectResult[0].productCount==0) {
        // console.log(req.body);
        try{
          file1 = JSON.stringify(req.files.file1[0]);
        }catch(e) {
          file1 = "";
        }

        try{
          file2 = JSON.stringify(req.files.file2[0]);
        }catch(e) {
          file2 = "";
        }

        try{
          file3 = JSON.stringify(req.files.file3[0]);
        }catch(e) {
          file3 = "";
        }

        try{
          file4 = JSON.stringify(req.files.file4[0]);
        }catch(e) {
          file4 = "";
        }

        var insertQuery = " INSERT INTO "+PRODUCT_TABLE_NAME;
        insertQuery+= " (name,price,description,type,shopId,file1,file2,file3,file4) ";
        insertQuery+= " VALUES ('"+name+"',"+price+",'"+description+"','"+condition+"',"+shopId+",'"+file1+"','"+file2+"','"+file3+"','"+file4+"')";
        con.query(insertQuery, function (err, result) {
          if (err){
            // throw err;
            console.log('Signup MYSQL ERROR',err)
            res.send({success:"no",message:"Signup Failed"});
            res.end();
          } 
          else {
            res.send({success:"yes",message:"Product added Successfully"});
            res.end();
          }
        });
      }
      else {
        // console.log(req.body);
        res.send({success:"no",message:"Product Already Exists with name "+name});
        res.end();
      }
    }
  });

})

app.post('/createNotice', async function(req, res) {

  let shopId = req.body.id;
  let title = req.body.noticeTitle;
  let details = req.body.details;
  let selectQuery = "SELECT * FROM "+SHOP_TABLE_NAME+" WHERE id = '"+shopId+"' LIMIT 1";
  console.log(selectQuery);
  if (shopId) {
    con.query(selectQuery, function(error, results) {
      if (results && results.length > 0) {
        var insertQuery = " INSERT INTO "+NOTICE_TABLE_NAME+" (shopId,title,details) ";
        insertQuery+= " VALUES ('"+shopId+"', '"+title+"','"+details+"')";
        con.query(insertQuery, function(error, results) {
          if(!error) {
            res.send({success:"yes",message:'Notice Created Successfully'});
            res.end();
          }
          else {
            console.log(error);
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'Invalid ID!'});
        res.end();
      }     
    });
  } else {
    res.send({success:"no",message:'Invalid ID!'});
    res.end();
  }
});


app.get('/home', async function(req, res) {

  let selectQuery = "SELECT * FROM "+PRODUCT_TABLE_NAME;
  console.log(selectQuery);
  con.query(selectQuery, function(error, results) {
    let data = {products:[],shops:[]};

    if (results && results.length > 0) {
      data.products = results;
    }

    let selectShopQuery = "SELECT * FROM "+SHOP_TABLE_NAME;
    console.log(selectShopQuery);
    con.query(selectShopQuery, function(error, shops) {
      if (shops && shops.length > 0) {
        data.shops = shops;
      }     
      res.send({success:"yes",message:'Successful',data:data});
      res.end();
    });    
  });
  
});

app.post('/updateProfilePictureUser',upload.single('file'), async function(req, res) {

  let id = req.body.id;
  let selectQuery = "SELECT * FROM "+USER_TABLE_NAME+" WHERE id = '"+id+"' LIMIT 1";
  console.log(selectQuery);
  if (id) {
    con.query(selectQuery, function(error, results) {
      console.log(req.file);
      if (results && results.length > 0) {
        let file = JSON.stringify(req.file);
        console.log(file) 
        let updateQuery = " UPDATE "+USER_TABLE_NAME+" SET filePath='"+file+"' WHERE id='"+id+"'";
        con.query(updateQuery, function(error, results) {
          if(!error) {
            res.send({success:"yes",message:'Picture update Successfully'});
            res.end();
          }
          else {
            console.log(error);
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'Invalid ID!'});
        res.end();
      }     
    });
  } else {
    res.send({success:"no",message:'Invalid ID!'});
    res.end();
  }
});

app.post('/updateProfilePicture',upload.single('file'), async function(req, res) {

  let id = req.body.id;
  let selectQuery = "SELECT * FROM "+SHOP_TABLE_NAME+" WHERE id = '"+id+"' LIMIT 1";
  console.log(selectQuery);
  if (id) {
    con.query(selectQuery, function(error, results) {
      console.log(req.file);
      if (results && results.length > 0) {
        let file = JSON.stringify(req.file);
        console.log(file) 
        let updateQuery = " UPDATE "+SHOP_TABLE_NAME+" SET filePath='"+file+"' WHERE id='"+id+"'";
        con.query(updateQuery, function(error, results) {
          if(!error) {
            res.send({success:"yes",message:'Picture update Successfully'});
            res.end();
          }
          else {
            console.log(error);
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'Invalid ID!'});
        res.end();
      }     
    });
  } else {
    res.send({success:"no",message:'Invalid ID!'});
    res.end();
  }
});

app.post('/follow', async function(req, res) {

  let followerType = req.body.followerType;
  let follower = req.body.follower;
  let following = req.body.following;
  let selectQuery = "SELECT * FROM "+FOLLOW_TABLE_NAME+" WHERE followerType = '"+followerType+"' AND followerId = '"+follower+"' AND followingId = '"+following+"'  LIMIT 1";
  console.log(selectQuery);
  if (followerType && follower && following) {
    con.query(selectQuery, function(error, results) {
      if (results && results.length > 0) {
        res.send({success:"no",message:'You are Already Following this shop'});
        res.end();
      } else {

        var insertQuery = " INSERT INTO "+FOLLOW_TABLE_NAME+" (followerType,followerId,followingId) ";
        insertQuery+= " VALUES ('"+followerType+"', "+follower+","+following+")";
        con.query(insertQuery, function(error, results) {
          if(!error) {
            res.send({success:"yes",message:'Follow Successful!'});
            res.end();
          }
          else {
            console.log("MYSQL ERROR",error)
            res.send({success:"no",message:'MYSQL ERROR!'});
            res.end(); 
          }
        });
      }     
    });
  } else {
    res.send({success:"no",message:'Invalid Request!'});
    res.end();
  }
});

app.get('/userProfile', async function(req, res) {
  let id = req.query.id;
  let selectQuery = "SELECT * FROM "+USER_TABLE_NAME+" WHERE id = '"+id+"' LIMIT 1";
  console.log(selectQuery);
  if (id) {
    con.query(selectQuery, function(error, results) {
      if (results && results.length > 0) {
        let user = results[0]; 
        let selectFollowQuery = "SELECT f.followingId,s.* FROM "+FOLLOW_TABLE_NAME+" as f LEFT JOIN "+SHOP_TABLE_NAME+" as s on s.id=f.followingId WHERE f.followerId = "+id+" AND followerType='user'";
        con.query(selectFollowQuery, function(error, results) {
          let followers = []
          if (results && results.length > 0) {
            results.forEach((follow)=>{
              followers.push(follow);
            })
          }  
          user.followers = followers;
          res.send({success:"yes",message:'Profile get Successfully',data:user});
          res.end();
        });
      } else {
        res.send({success:"no",message:'No Result Found!'});
        res.end();
      }     
      
    });
  } else {
    res.send({success:"no",message:'Invalid ID'});
    res.end();
  }
});

app.get('/shopProfile', async function(req, res) {
  let id = req.query.id;
  let selectQuery = "SELECT * FROM "+SHOP_TABLE_NAME+" WHERE id = '"+id+"' LIMIT 1";
  console.log(selectQuery);
  if (id) {
    con.query(selectQuery, function(error, results) {
      if (results && results.length > 0) {
        let user = results[0]; 
        let selectFollowQuery = "SELECT followingId FROM "+FOLLOW_TABLE_NAME+" WHERE followerId = "+id+" AND followerType='shop'";
        con.query(selectFollowQuery, function(error, results) {
          let followers = []
          if (results && results.length > 0) {
            results.forEach((follow)=>{
              followers.push(follow.followingId);
            })
          }  
          user.followers = followers;
          let selectproductsQuery = "SELECT * FROM "+PRODUCT_TABLE_NAME+" WHERE shopId = "+id;
          con.query(selectproductsQuery, function(error, results) {
            if(results && results.length>0)
              user.products = results;
            res.send({success:"yes",message:'Profile get Successfully',data:user});
            res.end();
          });
        });
      } else {
        res.send({success:"no",message:'No Result Found!'});
        res.end();
      }     
      
    });
  } else {
    res.send({success:"no",message:'Invalid ID'});
    res.end();
  }
});

app.post('/login', async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let userType = req.body.userType;
  let selectQuery = "SELECT * FROM "+USER_TABLE_NAME+" WHERE username = '"+username+"' AND password = '"+password+"' AND user_type= '"+userType+"' LIMIT 1";
  console.log(selectQuery);
  if (username && password) {
    con.query(selectQuery, function(error, results) {
      console.log(results);
      if (results && results.length > 0) {
        let user = results[0]; 
        req.session.loggedin = true;
        req.session.username = username;
        let selectFollowQuery = "SELECT followingId FROM "+FOLLOW_TABLE_NAME+" WHERE followerId = "+user.id+" LIMIT 1";
        console.log(selectFollowQuery);
        con.query(selectFollowQuery, function(error, results) {
          let followers = []
          console.log(results);
          if (results && results.length > 0) {
            results.forEach((follow)=>{
              followers.push(follow.followingId);
            })
          }  
          user.followers = followers;
          res.send({success:"yes",message:'loggedin Successfully',user:user});
          res.end();
        });
      } else {
        res.send({success:"no",message:'Incorrect Username and/or Password!'});
        res.end();
      }     
    });
  } else {
    res.send({success:"no",message:'Please enter Username and Password!'});
    res.end();
  }
});



app.post('/shopLogin', async function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let selectQuery = "SELECT * FROM "+SHOP_TABLE_NAME+" WHERE email = '"+email+"' AND password = '"+password+"' LIMIT 1";
  console.log(selectQuery);
  if (email && password) {
    con.query(selectQuery, function(error, results) {
      console.log(results);
      if (results && results.length > 0) {
        let user = results[0]; 
        req.session.loggedin = true;
        let selectFollowQuery = "SELECT followingId FROM "+FOLLOW_TABLE_NAME+" WHERE followerId = "+user.id+" LIMIT 1";
        con.query(selectFollowQuery, function(error, results) {
          let followers = []
          if (results && results.length > 0) {
            results.forEach((follow)=>{
              followers.push(follow.followingId);
            })
          }  
          user.followers = followers;
          res.send({success:"yes",message:'loggedin Successfully',user:user});
          res.end();
        });
      } else {
        res.send({success:"no",message:'Incorrect Username and/or Password!'});
        res.end();
      }     
    });
  } else {
    res.send({success:"no",message:'Please enter Username and Password!'});
    res.end();
  }
});


app.post('/userForgetPassword', async function(req, res) {
  let email = req.body.email;
  let selectQuery = "SELECT resetToken FROM "+USER_TABLE_NAME+" WHERE email = '"+email+"' LIMIT 1";
  // console.log(selectQuery);
  if (email) {
    con.query(selectQuery, function(error, results) {
      // console.log(results);
      if (results && results.length > 0) {
        let user = results[0]; 
        let tempString = "secret"+Date.now();
        let resetToken = tempString.toString('base64');
        Date.prototype.toMysqlFormat = function() {
          return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
        let resetTokenExpire = new Date(new Date().setHours(new Date().getHours() + 2));
        resetTokenExpire.toISOString().slice(0, 19).replace('T', ' ');
        resetTokenExpire = resetTokenExpire.toMysqlFormat();
        console.log(resetTokenExpire);

        let updateQuery = " UPDATE "+USER_TABLE_NAME+" SET resetToken='"+resetToken+"', resetTokenExpire='"+resetTokenExpire+"' WHERE email='"+email+"'";
        // console.log(updateQuery)
        con.query(updateQuery, function(error, results) {
          if(!error) {
            let resetLink = BASEURL+"/#/getnewpassword?resetToken="+resetToken+"&userType=user";
            console.log(resetLink);
            transporter.sendMail({
              from: '"Dokandari Support" <ddokandari@gmail.com>', // sender address
              to: email, // list of receivers
              subject: "Reset Password Link", // Subject line
              text: "Please Click the provided link "+resetLink, // plain text body
              // html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
            }).then((info)=>{
              console.log(info);
              res.send({success:"yes",message:'Email sent Successfully'});
              res.end();

            }).catch((e)=>{
              res.send({success:"no",message:'Email Failed'});
              res.end();
            });
          }
          else {
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'No user found with the provided email!'});
        res.end();
      }     
      
    });
  } else {
    res.send({success:"no",message:'Please enter Email!'});
    res.end();
  }
});


app.post('/shopForgetPassword', (req, res) => {
  let email = req.body.email;
  let selectQuery = "SELECT resetToken FROM "+SHOP_TABLE_NAME+" WHERE email = '"+email+"' LIMIT 1";
  // console.log(selectQuery);
  if (email) {
    con.query(selectQuery, function(error, results) {
      // console.log(results);
      if (results && results.length > 0) {
        let user = results[0]; 
        let tempString = "secret"+Date.now();
        let resetToken = tempString.toString('base64');
        Date.prototype.toMysqlFormat = function() {
          return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
        let resetTokenExpire = new Date(new Date().setHours(new Date().getHours() + 2));
        resetTokenExpire.toISOString().slice(0, 19).replace('T', ' ');
        resetTokenExpire = resetTokenExpire.toMysqlFormat();
        console.log(resetTokenExpire);

        let updateQuery = " UPDATE "+SHOP_TABLE_NAME+" SET resetToken='"+resetToken+"', resetTokenExpire='"+resetTokenExpire+"' WHERE email='"+email+"'";
        console.log(updateQuery)
        con.query(updateQuery, function(error, updateResults) {
          if(!error) {
            console.log(updateResults)
            let resetLink = BASEURL+"/#/getnewpassword?resetToken="+resetToken+"&userType=shop";
            console.log(resetLink);
            transporter.sendMail({
              from: '"Dokandari Support" <ddokandari@gmail.com>', // sender address
              to: email, // list of receivers
              subject: "Reset Password Link", // Subject line
              text: "Please Click the provided link "+resetLink, // plain text body
              // html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
            }).then((info)=>{
              console.log(info);
              res.send({success:"yes",message:'Email sent Successfully'});
              res.end();

            }).catch((e)=>{
              res.send({success:"no",message:'Email Failed'});
              res.end();
            });
          }
          else {
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'No user found with the provided email!'});
        res.end();
      }     
      
    });
  } else {
    res.send({success:"no",message:'Please enter Email!'});
    res.end();
  }
})


app.post('/shopSignup',upload.single('file'), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  let shopName = req.body.shopName;
  let selectQuery = "SELECT COUNT(id) as shopCount FROM "+SHOP_TABLE_NAME+" WHERE shopName='"+shopName+"' LIMIT 1";
  con.query(selectQuery,async function(selectErr,selectResult) {
    // console.log(selectResult[0].shopCount);
    if(selectErr) {
      console.log('MYSQL SELECT ERROR SIGNUP',selectErr);
    }
    else {
      if(selectResult && selectResult.length>0 && selectResult[0].shopCount==0) {
        // console.log(req.body);
        let name = req.body.name;
        let phone = req.body.phone
        let email = req.body.email;
        let password = req.body.password;
        let city = req.body.city
        let market = req.body.market;
        let shopType = req.body.shopType;
        let file = JSON.stringify(req.file); 
        let shopName = req.body.shopName;
        let shopPhone = req.body.shopPhone;
        let shopAddress = req.body.shopAddress;
        let openTime = req.body.openTime;
        let closeTime = req.body.closeTime;
        var insertQuery = " INSERT INTO "+SHOP_TABLE_NAME;
        insertQuery+= " (fullname,phone,email,password,city,market,shopType,filePath,shopName,shopPhone,shopAddress,openTime,closeTime)";
        insertQuery+= " VALUES ('"+name+"', '"+phone+"','"+email+"','"+password+"','"+city+"','"+market+"','"+shopType+"','"+file+"'";
        insertQuery+= ",'"+shopName+"','"+shopPhone+"','"+shopAddress+"','"+openTime+"','"+closeTime+"')";
        con.query(insertQuery, function (err, result) {
          if (err){
            // throw err;
            console.log('Signup MYSQL ERROR',err)
            res.send({success:"no",message:"Signup Failed"});
            res.end();
          } 
          else {
            res.send({success:"yes",message:"SHOP Signup Successful"});
            res.end();
          }
        });
      }
      else {
        // console.log(req.body);
        res.send({success:"no",message:"Shop Already Exists"});
        res.end();
      }
    }
  });
})

app.post('/updateUserPassword', (req, res) => {
  let resetToken = req.body.resetToken;
  let password = req.body.password;
  let selectQuery = "SELECT id FROM "+USER_TABLE_NAME+" WHERE resetToken = '"+resetToken+"' LIMIT 1";
  console.log(selectQuery);
  if (resetToken) {
    con.query(selectQuery, function(error, results) {
      // console.log(results);
      if (results && results.length > 0) {
        let user = results[0]; 
        let userId = user.id;
        let tempString = "secret"+Date.now();
        let resetToken = tempString.toString('base64');
        Date.prototype.toMysqlFormat = function() {
          return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
        let resetTokenExpire = new Date(new Date().setHours(new Date().getHours() + 2));
        resetTokenExpire.toISOString().slice(0, 19).replace('T', ' ');
        resetTokenExpire = resetTokenExpire.toMysqlFormat();
        console.log(resetTokenExpire);

        let updateQuery = " UPDATE "+USER_TABLE_NAME+" SET resetToken='"+resetToken+"', password='"+password+"' WHERE id='"+userId+"'";
        console.log(updateQuery)
        con.query(updateQuery, function(error, updateResults) {
          if(!error) {
            console.log(updateResults)
            let resetLink = BASEURL+"/#/getnewpassword?resetToken="+resetToken+"&userType=shop";
            console.log(resetLink);
            res.send({success:"yes",message:'Password updated Successfully'});
            res.end();
            
          }
          else {
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'Invalid ResetToken!'});
        res.end();
      }     
      
    });
  } else {
    res.send({success:"no",message:'Invalid ResetToken!'});
    res.end();
  }
})

app.post('/updateShopPassword', (req, res) => {
  let resetToken = req.body.resetToken;
  let password = req.body.password;
  let selectQuery = "SELECT id FROM "+SHOP_TABLE_NAME+" WHERE resetToken = '"+resetToken+"' LIMIT 1";
  console.log(selectQuery);
  if (resetToken) {
    con.query(selectQuery, function(error, results) {
      // console.log(results);
      if (results && results.length > 0) {
        let user = results[0]; 
        let userId = user.id;
        let tempString = "secret"+Date.now();
        let resetToken = tempString.toString('base64');
        Date.prototype.toMysqlFormat = function() {
          return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
        let resetTokenExpire = new Date(new Date().setHours(new Date().getHours() + 2));
        resetTokenExpire.toISOString().slice(0, 19).replace('T', ' ');
        resetTokenExpire = resetTokenExpire.toMysqlFormat();
        console.log(resetTokenExpire);

        let updateQuery = " UPDATE "+SHOP_TABLE_NAME+" SET resetToken='"+resetToken+"', password='"+password+"' WHERE id='"+userId+"'";
        console.log(updateQuery)
        con.query(updateQuery, function(error, updateResults) {
          if(!error) {
            console.log(updateResults)
            let resetLink = BASEURL+"/#/getnewpassword?resetToken="+resetToken+"&userType=shop";
            console.log(resetLink);
            res.send({success:"yes",message:'Password updated Successfully'});
            res.end();
            
          }
          else {
            res.send({success:"no",message:'MYSQL DATABASE ERROR'});
            res.end();
          }
        });
      } else {
        res.send({success:"no",message:'Invalid ResetToken!'});
        res.end();
      }     
      
    });
  } else {
    res.send({success:"no",message:'Invalid ResetToken!'});
    res.end();
  }
})


function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

app.listen(port,'dokandari1.com', () => {
  console.log(`Application listening at http://dokandari1.com:${port}`)
})
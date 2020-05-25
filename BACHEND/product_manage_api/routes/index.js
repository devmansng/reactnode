var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '22488',
  port: 5432,
})


/* GET home page. */
router.get('/', function(req, res, next) {
  // pool.query('SELECT NOW()', (err, res) => {
  //   console.log(err, res)
  //   pool.end()
  // })
  // res.render('index', { title: 'Express' });
});
router.get('/getdata', function(req, res, next){

  pool.query('SELECT * FROM product_info',(err,response)=>{
    if(err){
      console.log(err);
    }else{
      res.send(response.rows);
    }
    // pool.end();
  })
})

router.get('/add', function(req, res, next){
 res.render('add',{});
})
router.post('/add', function(req, res, next){
  var product_name = req.body.product_name,
  product_price = req.body.product_price,
  image = req.body.image;
  pool.query("INSERT INTO product_info (product_name,product_price,image) values ($1,$2,$3)",
  [product_name,product_price,image],(err,resp)=>{
    if(err){res.send(err);}else{
      res.send('Thêm thành công'+product_name);
    }
  })
  
 })
module.exports = router;

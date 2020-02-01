const express = require('express');
const app = express();
const session = require('express-session')
const {route } = require('./route/route')
const{Users,db} = require('./models/db');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');
const hbs = require('hbs')
const path = require('path');
const update = require('./models/update_ex').updateID
let cookieArr = [];



hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine' , 'hbs');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(cookieParser("Shh , its my damn fuckin' secret!!!"));
app.use(session({secret: "Shh, its my fuckin' damn secret!"}));

// const cookies = new Cookies(req , res , {keys: 'edewbh43 YGUYG&^@t2v vedgeg'});
// const cart_cookie = res.get('cart' , {signed: true , overwrite: true});


app.get('/addcart' , async(req,res)=>{
    // res.cookie('name', 'express').send('cookie set');
 
    if(req.query.product){
     
            const id  = await Users.findOne({
                where: {id: req.query.product}
            })
        
       
                if(id){
                    if(req.session.cart_list){
                        req.session.cart_list = req.session.cart_list + '|' + req.query.product
                        let rand =      req.session.cart_list;
                        cookieArr = rand.split('|');
                        
                       
                     }
                     else{
                         req.session.cart_list = req.query.product;
                         cookieArr.push( req.session.cart_list);
                     }
                     res.send("Added To cart")
             
                 }else{
                        res.send("You added yourself some shit and its wrong!!")
                 }  
                 

                }else{
                    res.send("Wrong Shit!!!")
                }

        
   
})



app.get('/api/add' , (req,res)=>{
    res.render('add')
})



app.get('/api/cart' , async (req,res)=>{
                if(cookieArr){
                    let vars = [];
                    for(let i = 0 ; i < cookieArr.length ; i++){
                           
                            let dee = await Users.findOne({
                                where: {id: cookieArr[i]}
                            })
                            vars.push(dee);
                    }
                   
                    console.log(vars)

                    res.render('cart' ,{ vars});
                }else{
                    res.send("Your Cart Is Empty");
                }
  
})

app.get('/api/checkout' , async(req,res)=>{

    if(cookieArr){
        for(let i = 0 ; i< cookieArr.length ; i++){
            let quant = await Users.findOne({
                where:{id: cookieArr[i]}

            });
            console.log(quant.id + " " + quant.quantity)
            await update(quant.id , --quant.quantity);
        }
       

        res.send('Your Order has been placed successfully')
    }else{
        res.send("Your cart is Empty")
       
    }
 

})

app.use('/api' , route);


app.get('/' ,async (req,res)=>{
    const users = await Users.findAll();
    res.render('index' , {users})
    console.log(users);
})



db.sync().then(()=>{
    app.listen(1200, ()=>{
        console.log("Server Up and Running http://localhost:1200/")
    })
})

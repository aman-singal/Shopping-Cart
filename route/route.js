const route = require('express').Router();
const {write } = require('../models/write')
const {Users} = require('../models/db');
const {updates,updateP,updateQ} = require('../models/update_ex.js');
const {del} = require('../models/delete');

//Add Product

route.post('/add' , async(req,res)=>{

    let prod = await Users.findOne({
        where:{product: req.body.product}

    })
    console.log(prod);
    if(!prod){
        // console.log(prod + "   ::  " + req.body.product)
        await write(req.body.product , req.body.price , req.body.quantity)
        console.log("Product Added")
        res.send("Product Added");
    }
    else{
        res.send("Product Already Exists, Try Editing the Quantity");
    }


    
    
  //Update  

    
})

route.post('/update' , async (req,res)=>{
    
    if(req.body.product){

        if(!req.body.price && !req.body.quantity){
            res.send("Invalid Entry");
        }
        else{
            if(req.body.price){
                updateP(req.body.product , req.body.price);
                console.log("Price Updated");
                
            }
             if(req.body.quantity){
                updateQ(req.body.product , req.body.quantity);
                console.log("Quant Updated")
              
            }
            res.send("Updated")
        }
     
       
    }
})

//Delete Product

route.post('/delete' , async (req,res)=>{

if(!req.body.product){
    res.send("Invalid Entry");
}
else{
    let any = await Users.findOne({
        where: {product: req.body.product}
    })
    if(any){
      await  Users.destroy({
            where: {product : req.body.product},
        }).then(()=>{
            console.log("Deleted");
            res.send("Product Deleted")
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        res.send("Invalid Product Name")
    }

}
   
})


route.post('/checkout' , (req,res)=>{

})


module.exports = {
    route,
}
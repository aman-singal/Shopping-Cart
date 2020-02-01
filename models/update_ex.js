const {db, Users} = require('./db');

async function updates(prod){
   await db.sync();

  await Users.update(
      {product: "Galaxy A6"},

      {
          where: { product: prod}
        }

      
  ).then(()=>{
      console.log("Updated")
  }).catch((err)=>{
      console.error(err);
  })
  
}
async function updateQ(prod,quant){
   await db.sync();
   await Users.update(
        {quantity: quant},
        {
            where:{product: prod},
        }
    ).then(()=>{
        console.log("Quantity Updated");
    }).catch((err)=>{
        console.error(err);
    })
}

async function updateP(prod,price){
  await  db.sync();
   await Users.update(
        {price: price},
        {
            where:{product: prod},
        }
    ).then(()=>{
        console.log("Price Updated");
    }).catch((err)=>{
        console.error(err);
    })
}

async function updateID(id,qunat){
    await db.sync();

    await Users.update(
        {quantity: qunat},
        {
            where:{id: id}
        }
    ).then(()=>{
        console.log("Update By ID SUCCESSFULL !!!!!")
    }).catch((err)=>{
        console.error(err);
    })
}

// updateID(1,9);
// updateP("Galaxy A6" , 14000);
// updateQ("Galaxy A6" , 12);

module.exports = {
    updateID,
    updates,
    updateP,
    updateQ,
}
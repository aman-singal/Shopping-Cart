const {db, Users} = require('./db');

async function update(prod){
    db.sync();

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
update("Samsung A6")


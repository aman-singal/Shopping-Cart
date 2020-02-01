const {db,Users} = require('./db');

async function read(){
 
    await db.sync();

    const user  = await Users.findAll();
    for(let u of user){
        console.log(`product: ${u.product} price: ${u.price} quantity: ${u.quantity}`)
    }

}

read();
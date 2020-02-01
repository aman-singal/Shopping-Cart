const {db,Users} = require('./db');

async function write(product , price , amount){
 
    await db.sync();

    Users.create({
        product: product,
        price: price,
        quantity: amount,
    })
}



module.exports = {
    write,
}
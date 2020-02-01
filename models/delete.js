const {db, Users} = require('./db');


async function del(prod){

await db.sync();

Users.destroy({
    where:{product:prod}
})

}

// del("Samsung A6")

module.exports ={
    del,
}
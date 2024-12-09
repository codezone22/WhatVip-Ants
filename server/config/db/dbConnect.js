const mongoose = require('mongoose');
const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true, 
        });
        console.log("Db is connected successfully!");
    }catch(err){
        console.log(`Error: ${err}`);
    }
}
module.exports =  dbConnect;
const secureurl = require('./securemongo');
const mongoose=require ('mongoose');


const mongoURI= secureurl;
console.log(mongoURI);
const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports=connectToMongo
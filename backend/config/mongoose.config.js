const mongoose = require('mongoose')

const mogooseConnect = async()=>{
    try{
       await mongoose.connect(process.env.MONGOOSE_URI)
    }catch(e){
        console.log(e)
    }
}

module.exports = mongoose.connect
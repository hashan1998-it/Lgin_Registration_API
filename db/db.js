const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGO_URL

mongoose.connect(URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('Database Connected');
});
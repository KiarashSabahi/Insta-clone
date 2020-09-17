 import mongoose from "mongoose";

const MongoDB_URI = process.env.MongoDB_URI! ;


mongoose.connect(MongoDB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((connection) => {
    console.log(`connected to ${MongoDB_URI}`)
}).catch((error) => {
    console.log(error)
})
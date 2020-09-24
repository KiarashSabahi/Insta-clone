import mongoose from "mongoose";
const MongoDB_URI = process.env.MongoDB_URI!;



mongoose.connect(MongoDB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log(`connected to ${MongoDB_URI}`)
    } else {
        console.log(err);
    }
})

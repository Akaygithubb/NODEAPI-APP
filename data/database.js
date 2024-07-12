import mongoose from "mongoose";

export const connectdb=()=>{
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((c) => console.log(`Database connected with ${c.connection.host}`))
  .catch((e) => console.log(e));
}
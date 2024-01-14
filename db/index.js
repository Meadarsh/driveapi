import mongoose from "mongoose";

const connectDB=async()=>{
    try {
     const connectionInst=await mongoose.connect(`${process.env.MONGO_URI}`)
     console.log("MongoDB connected:",connectionInst.connection.host);
    } catch (error) {
        console.log('Unable to connect',error)
    }
}
export default connectDB;  
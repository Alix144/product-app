import mongoose from "mongoose";

const connection = {}; 

const connectToDb = async () => {
    try{
        if(connection.isConnected){
            console.log("using a connection already!")
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URL);

        connection.isConnected = db.connections[0].readyState;
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
}

export default connectToDb;
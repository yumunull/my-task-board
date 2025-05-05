import mongoose from "mongoose";

export interface Boards extends mongoose.Document {
    
}

const BoardSchema = new mongoose.Schema<Boards>({})


export default mongoose.models.Board || mongoose.model<Boards>("Board", BoardSchema)
import mongoose from "mongoose";
import {EStatus} from "@/app/_components/Task";
export interface Tasks extends mongoose.Document {
    name: string,
    description?: string,
    icon?: string,
    status?: string,
}

const TaskSchema = new mongoose.Schema<Tasks>({
    name: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        default: "",
    },
    
    icon: {
        type: String,
        required: true,
    },
    
    status: {
        type: String,
        required: true,
    }
})


export default mongoose.models.Task || mongoose.model<Tasks>("Task", TaskSchema)
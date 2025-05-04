import {NextRequest, NextResponse} from "next/server";
import Task from "@/models/Tasks"
import dbConnect from "@/lib/dbConnect";

export const PUT = async (req: NextRequest, { params }: {params: Promise<{taskId: string}>}) => {
    await dbConnect()
    const {taskId} = await params
    const json = await req.json()
    const task = await Task.findOneAndUpdate({_id: taskId}, json, {new: true})
    return NextResponse.json(task)
}
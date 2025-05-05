import Task from "@/models/Tasks"
import {NextRequest, NextResponse} from "next/server";
import dbConnect from "@/lib/dbConnect";

export const POST = async(res: NextRequest) => {
    await dbConnect()
    const json = await res.json()
    const task = await Task.create(json)
    console.log(json, task)
    await task.save()
    return NextResponse.json({id: task._id})
}